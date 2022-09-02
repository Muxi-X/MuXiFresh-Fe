//此组件为J_check所包含

import React, { useState,useEffect, Component }from "react";
import './index.less';
import props from "react";
import muxi from  '/src/images/muxi-logo.png' 
import {getJson, postData} from '../../interface/fetch';

interface childProps {
        id: number;
    }

const A_xiangqing: React.FC<childProps> = (props) => {
    
    const {id} = props;

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file_url,setFileUrl] = useState('')
    const [details, setDetails] = useState('')
    const [ID, setId] = useState('')
    const [group_id, setGroupId] = useState('')
    const [homework_id, setHomeworkId] = useState('')
    const [wordname, setWordname] = useState('')

    useEffect(() => {
        getJson('/homework/review?id='+ id)
        .then (data => {
            console.log(data.data);
            // setHomework(data.data);
            setDetails(data.data);
            setTitle(data.data.title);
            setContent(data.data.content);
            setFileUrl(data.data.url);
            setId(data.data.ID);
            setGroupId(data.data.group_id)
            setHomeworkId(data.data.homework_id);//homework_id一样的，ID不一样
            console.log("文件："+data.data.url)
            let str=data.data.url;
            let reg="http://ossfresh-test.muxixyz.com/";
            let res=str.replace(reg,"");
            console.log(res);
            setWordname(res);
        })
        .catch (error => console.log(error));
    },[]
    )

    useEffect(() => {
        getJson('/homework/comment?id='+id+'&limit=100&page=0')
        .then (data => {
            // console.log(data.data);
            setComments(data.data.comments);
            setName(data.data.comments[0].Name);
            setContent(data.data.comments[0].Content);
            
        })
    },[])

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
        // const div:HTMLDivElement=e.currentTarget;

        const data={
            homework_id : id,
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
            getJson('/homework/comment?id='+id+'&limit=100&page=0')
            .then (data => {
                console.log(data.data);
                setComments(data.data.comments);
                setName(data.data.comments[0].Name);
                setContent2(data.data.comments[0].Content);
            }),[]
            alert('评论成功!')
        })
        .catch(error=>{
            console.log(error);
            alert('评论失败!')
        }),[]
    }

  return (
    <div className="module">
        <div className={group_id=='1'?'moduletitle':"modulehide"} id='a'>设计组作业</div>
        <div className={group_id=='2'?'moduletitle':"modulehide"} id='b'>产品组作业</div>
        <div className={group_id=='3'?'moduletitle':"modulehide"} id='c'>安卓组作业</div>
        <div className={group_id=='4'?'moduletitle':"modulehide"} id='d'>前端组作业</div>
        <div className={group_id=='5'?'moduletitle':"modulehide"} id='e'>后端组作业</div>
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
                    <a href={details.url} className="biaoti">{wordname}</a>
                </td>
            </tr>
        </table>
        

       <div className='module'>
            <div className="moduletitle">评语</div>
            <table className='table'>
                <tr>
                    <td className="ping">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论：</td>
                    <td className="pinglun"><textarea className="textarea" placeholder="请输入内容.." value={GetSearchVal} ref={inputRef} onChange={getIptValue}></textarea></td>
                </tr>
            </table>            
            <div className="button" onClick={()=>toComment()}>发表评论</div>
        </div>
        <div className="pinglunqu">
            {comments[0]?comments.map((comment) => {
                return (
                    <div className='box_comment'>
                        <img className='image' src={muxi} alt="muxi" ></img>
                        <div className='upper'>
                            <div className='mingzi'>{comment.Name}</div>
                            
                        </div>
                        <div className='lower'>{comment.Content}</div>
                    </div>
                )
            }):''}
        </div>
    </div>
        
            
  )
};

export default A_xiangqing;