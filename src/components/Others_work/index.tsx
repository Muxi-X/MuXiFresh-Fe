//本页面为审阅处点击查看作业弹出的新页面，内容为该同学上传过的所有作业
//本页面中含组件A_xiangqing

import React, { useState,useEffect, Component }from "react";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 
import {getJson, postData} from '../../interface/fetch';
import { useParams,useNavigate } from "react-router-dom";
import A_xiangqing from '../Check_detail'

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
    //根据上个页面给的email得到该学生上传的所有作业
    //const email = "lalala@qq.com"


    useEffect(() => {
        getJson(`/homework/${email}`)
        .then (data => {
            console.log(data.data);
            //与review一样
            setHomeworks(data.data);
        })
        .catch (error => console.log(error));
    },[]
    )


  return (
  
    <div>
        <div className="smalltitle">作业</div>
        <div className="content">
            {homeworks[0]?homeworks.map((homework) => {
                return (
                    <A_xiangqing id={homework.ID}/>
                )}
            ):''}
        </div>
        
        <div className="btn" onClick={backto}>返回</div>
    </div>
        
  )};

export default J_check;