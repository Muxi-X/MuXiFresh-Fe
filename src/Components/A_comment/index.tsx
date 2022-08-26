import React, { useEffect, useState }from "react";
import './index.less';
import { postData } from "../../interface/fetch";
import muxi from  '/src/images/muxi-logo.png' 
import {getJson} from '../../interface/fetch';

const A_comment:React.FC<{id:number, comments:number[] }> = (props)=> {

    const [file_url,setFileUrl] = useState('')
    const [comments,setComments]=useState([]);
    const Comments =  props.comments
    //传内容
    const [GetSearchVal, SetGetSearchVal] = useState('');
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const getIptValue = (event: { target: { value: any } }) =>{
        SetGetSearchVal(event.target.value);
        /* console.log(GetSearchVal)//会落掉最后一个字 */
       /*  console.log(inputRef.current?.value) *///传这个
    }

    //提交
    function toComment():any{
        const data={
            homework_id : props.id,
            content : inputRef.current?.value,
        }
        postData(
            '/homework/comment',
            data,
            'POST')
        .then(data=>{
            console.log(data);
            SetGetSearchVal('');
            getJson('/homework/comment?id='+props.id+'&limit=5&page=0')
            .then (data => {
                console.log(data.data);
                setComments(data.data.comments);
                /* setName(data.data.comments[0].Name);
                setContent2(data.data.comments[0].Content); */
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }


  return (
<div className="bottom">
    <div className='module'>
    <div className="moduletitle">评语</div>
    <div className="box_table">
        <div className="t">评论：</div>
            <textarea className="m" placeholder="请输入内容" value={GetSearchVal} ref={inputRef} onChange={getIptValue}></textarea>
        </div>
        <div className="button">
            <button  onClick={()=>toComment()}>发表评论</button>
        </div>
    </div>
    <div className="pinglunqu">
    {comments[0]?comments.map((comment) => {
            return (
            <div className="box2">
            <img className='image' src={muxi} alt="muxi" ></img>
            <div className="text">
                <div className='user'>
                    <div className='mingzi'>{comment.Name}</div>
                </div>
                <div className='comment'>{comment.Content}</div>
           </div>
           </div>
            )}):Comments.map((comment) => {
                return (
                <div className="box2">
                <img className='image' src={muxi} alt="muxi" ></img>
                <div className="text">
                    <div className='user'>
                        <div className='mingzi'>{comment.Name}</div>
                    </div>
                    <div className='comment'>{comment.Content}</div>
               </div>
               </div>
                )})}
            {Comments.length?'':<div className="blank">
                还没有人评论哦
            </div>}
    </div>
       
</div>
  )
};

export default A_comment;