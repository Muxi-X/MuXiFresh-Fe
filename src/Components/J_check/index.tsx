import React, { useState,useEffect, Component }from "react";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 
import A_comment from '../A_comment';
import {getJson, postData} from '../../interface/fetch';


const J_check = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file_url,setFileUrl] = useState('')
    const [details, setDetails] = useState('')
    const [group_id, setId] = useState('')
    const [homework_id, setHomeworkId] = useState('')
    //查看具体作业，改变id
    const id = 12
    //从上一个组件拿值，注意注意这个id是学生提交的id！！！！



    useEffect(() => {
        getJson('/homework/review?id='+ id)
        .then (data => {
            console.log(data.data);
            // setHomework(data.data);
            setDetails(data.data);
            setTitle(data.data.title);
            setContent(data.data.content);
            setFileUrl(data.data.url);
            setId(data.data.group_id);
            setHomeworkId(data.data.homework_id);
            console.log(group_id)
            console.log("wenjian"+data.data.url)
        })
        .catch (error => console.log(error));
    },[]
    
    )
    useEffect(() => {
        getJson('/homework/comment?id='+homework_id+'&limit=5&page=0')
        .then (data => {
            console.log(data.data);
            setComments(data.data.comments);
            setName(data.data.comments[0].Name);
            setContent(data.data.comments[0].Content);
        })
        .catch (error => console.log(error));
    },[]
    )



    //传内容
    const [GetSearchVal, SetGetSearchVal] = useState('');
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const getIptValue = (event: { target: { value: any } }) =>{
        SetGetSearchVal(event.target.value);
        console.log(GetSearchVal)//会落掉最后一个字
        console.log(inputRef.current?.value)//传这个
    }


    const [comments,setComments] = useState([]);
    const [Content,setContent2] = useState('')
    const [Name,setName] = useState('')
    //提交
    function toComment():any{
        const data={
            homework_id : homework_id,
            content : inputRef.current?.value,
        }
        console.log(data);
        postData(
            '/homework/comment',
            data,
            'POST')
        .then(data=>{
            console.log(data);
            SetGetSearchVal('');
            getJson('/homework/comment?id='+homework_id+'&limit=5&page=0')
            .then (data => {
                console.log(data.data);
                setComments(data.data.comments);
                setName(data.data.comments[0].Name);
                setContent2(data.data.comments[0].Content);
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }
    
    //注意：此处应为审阅页面点击跳转，与A_comment页面同时切换id，到不同作业的具体页面
    //同时根据group_id显示大标题xx组作业


  return (
    <div>
        <div className="smalltitle">作业</div>
        <div className="module">
            <div className={group_id=='1'?'moduletitle':"modulehide"} id='a'>设计组作业</div>
            <div className={group_id=='2'?'moduletitle':"modulehide"} id='b'>产品组作业</div>
            <div className={group_id=='3'?'moduletitle':"modulehide"} id='c'>安卓组作业</div>
            <div className={group_id=='4'?'moduletitle':"modulehide"} id='d'>前端组作业</div>
            <div className={group_id=='5'?'moduletitle':"modulehide"} id='e'>后端组作业</div>
            {/* 根据group_id改变，xx组作业 */}
            <table className='table'>
                <tr>
                    <td className="biao">标题：</td>
                    <td><p className='biaoti'>{details.title}</p></td>
                </tr>
                <tr>
                    <td className="jian">内容简介：</td>
                    <td><p className='jianjie'>{details.content}</p></td>
                </tr>
                <tr>
                    <td className="biao">文件：</td>
                    <td className="up">
                        <a href={details.url} className="biaoti">点击查看文件</a>
                        {/* 怎么显示文件，变成链接格式 */}
                    </td>
                </tr>
            </table>
        </div>
        <div className='module'>
            <div className="moduletitle">评语</div>
            <table className='table'>
                <tr>
                    <td className="ping">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论：</td>
                    <td className="pinglun"><textarea className="textarea" placeholder="请输入内容.." value={GetSearchVal} ref={inputRef} onChange={getIptValue}></textarea></td>
                </tr>
            </table>            
            <div className="button" onClick={()=>toComment()}>发表评论</div>
            {/*  */}
        </div>
        {/* <A_comment id={homework_id}/> */}
        <div className="pinglunqu">
        {comments[0]?comments.map((comment) => {
            return (
                <div className='box_comment'>
                    <img className='image' src={muxi} alt="muxi" ></img>
                    <div className='upper'>
                        <div className='mingzi'>{comment.Name}</div>
                        <div className='zubie'>21产品组</div>
                    </div>
                    <div className='lower'>{comment.Content}</div>
                </div>
            )
        }):''}
    </div>
    </div>
  )
};

export default J_check;