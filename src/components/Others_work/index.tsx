//本页面为审阅处点击查看作业弹出的新页面，内容为该同学上传过的所有作业
//本页面中含组件A_xiangqing

import React, { useState,useEffect, Component }from "react";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 
import {getJson, postData} from '../../interface/fetch';
import { useParams,useNavigate } from "react-router-dom";

// interface childProps {
//     email: string;
// }
const J_check : React.FC = (props) => {
    const navigate=useNavigate()
    const backto=()=>{
        navigate(-1)
    }
    const {email} = useParams()//拿到 从审阅跳转到查看作业，携带的email参数


    const [homeworks, setHomeworks] = useState([])
    
    const [group_id, setGroupId] = useState('')
    //根据上个页面给的email得到该学生上传的所有作业
    // const email = "lalala@qq.com"


    useEffect(() => {
        getJson(`/homework/${email}`)
        .then (data => {
            // console.log(data.data);
            //与review一样
            setHomeworks(data.data);
            //setTitle(data.data.homework[0].title);
            setId(data.data[0].ID);
            //console.log('ll'+data.data[0].ID)
            setGroupId(data.data[0].group_id)
            getJson('/homework/comment?id='+data.data[0].ID+'&limit=100&page=0')
                .then (data => {
                    // console.log(data.data);
                    setComments(data.data.comments);
                    setName(data.data.comments[0].Name);
                    setContent(data.data.comments[0].Content);
                    
                })
            getJson('/homework/review?id='+ data.data[0].ID)
            .then (data => {
                // console.log(data.data);
                // setHomework(data.data);
                setDetails(data.data);
                // console.log("文件："+data.data.url)
                let str=data.data.url;
                let reg="http://ossfresh-test.muxixyz.com/";
                let res=str.replace(reg,"");
                // console.log(res);
                setWordname(res);
        })
        // .catch (error => console.log(error));
    })
    },[]
    )
    const [id, setId] = useState(0)
    function handleChange(e:React.ChangeEvent<HTMLSelectElement>):any{
        e.preventDefault();
        //拿到option的value，即ID
        const select:HTMLSelectElement=e.currentTarget;
        const index = select.selectedIndex;
        const h_id = select.options[index].value;//sting
        //字符串转数字
        setId(Number(h_id));
        // return <A_xiangqing id={id}/>
        // console.log(h_id);
        getJson('/homework/review?id='+ h_id)
        .then (data => {
            // console.log(data.data);
            // setHomework(data.data);
            setDetails(data.data);
            setTitle(data.data.title);
            setContent(data.data.content);
            setFileUrl(data.data.url);
            //setId(data.data.ID);
            //setGroupId(data.data.group_id)
            setHomeworkId(data.data.homework_id);//homework_id一样的，ID不一样
            // console.log("文件："+data.data.url)
            let str=data.data.url;
            let reg="http://ossfresh-test.muxixyz.com/";
            let res=str.replace(reg,"");
            // console.log(res);
            setWordname(res);
            getJson('/homework/comment?id='+h_id+'&limit=100&page=0')
            .then (data => {
                // console.log(data.data);
                setComments(data.data.comments);
                setName(data.data.comments[0].Name);
                setContent(data.data.comments[0].Content);
                
            })
        })
        // .catch (error => console.log(error));
        
    }
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file_url,setFileUrl] = useState('')
    const [details, setDetails] = useState({content:'',url:''})
    //const [ID, setId] = useState('')
    //const [group_id, setGroupId] = useState('')
    const [homework_id, setHomeworkId] = useState('')
    const [wordname, setWordname] = useState('')



    //传内容
    const [GetSearchVal, SetGetSearchVal] = useState('');
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const getIptValue = (event: { target: { value: any } }) =>{
        SetGetSearchVal(event.target.value);
        // console.log(GetSearchVal)//会落掉最后一个字
        // console.log(inputRef.current?.value)//传这个
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
        // console.log(data);
        postData(
            '/homework/comment',
            data,
            'POST')
        .then(data=>{
            // console.log(data);
            SetGetSearchVal('');
            getJson('/homework/comment?id='+id+'&limit=100&page=0')
            .then (data => {
                // console.log(data.data);
                setComments(data.data.comments);
                setName(data.data.comments[0].Name);
                setContent2(data.data.comments[0].Content);
            }),[]
            alert('评论成功!')
        })
        .catch(error=>{
            // console.log(error);
            alert('评论失败!')
        }),[]
    }


  return (
  
    <div>
        {/* <div className="smalltitle">作业</div> */}
        <div className="content">
            <div className="module">
                <div className={group_id=='1'?'moduletitle':"modulehide"} id='a'>设计组作业</div>
                <div className={group_id=='2'?'moduletitle':"modulehide"} id='b'>产品组作业</div>
                <div className={group_id=='3'?'moduletitle':"modulehide"} id='c'>安卓组作业</div>
                <div className={group_id=='4'?'moduletitle':"modulehide"} id='d'>前端组作业</div>
                <div className={group_id=='5'?'moduletitle':"modulehide"} id='e'>后端组作业</div>
                <table className='table'>
                    <tr>
                        <td className="biao">标题：</td>
                        <td>
                            <form action="" className="">
                                <select name="choosefile" className="input" id='select' onChange={(e)=>handleChange(e)}>
                                    {/* <option value="moren">请选择</option>  */}
                                    {/* 做map遍历选项option */}
                                    {homeworks[0]?homeworks.map((homework:any) =>{
                                        return(
                                            <option key={homework.ID} value={homework.ID} >{homework.title}</option>
                                        ) 
                                    }):''}
                                </select>
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td className="jian">内容简介：</td>
                        <td><p className='jianjie'>{details.content}</p></td>
                    </tr>
                    <tr>
                        <td className="wenjian">文件：</td>
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
            {comments[0]?comments.map((comment:any) => {
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
        </div>
        
        <div className="others_btn">返回</div>
    </div>
        
  )};

export default J_check;