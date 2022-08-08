import React, { useState } from "react";
import J_progress from '../J_progress';
import J_work from '../J_work';
import './Join.less';

const Join = () => {
  
const [flag,setFlag]=useState('a');
    

function Select(e:React.MouseEvent<HTMLDivElement> ):any{
        e.preventDefault();
        const div:HTMLDivElement=e.currentTarget;
        console.log(div.id)
        setClickedDiv(div.id);
}

function setClickedDiv(id:string):void{
    if(id=='a')
        setFlag('a')
    if(id=='b')
        setFlag('b')
    if(id=='c')
        setFlag('c')
        
}

  return (
   <div className='body'>
    <div className='box'> 
    <div className="top">
        <div className={flag=='a'?'selected':"title"} id='a' onClick={(event)=>Select(event)} >报名表查看</div>
        <div className={flag=='b'?'selected':"title"} id='b' onClick={(event)=>Select(event)} >进度查询</div>
        <div className={flag=='c'?'selected':"title"} id='c' onClick={(event)=>Select(event)} >作业查询</div>
    </div>
    {/* 组件  */} 
    {flag=='b'? <J_progress/>:' '}
    {flag=='c'?<J_work/>:' '}
  
    </div>
   </div>
  )
};

export default Join;
