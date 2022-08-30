import React, { useEffect, useState } from "react";
import './index.less';
import { getJson } from "../../interface/fetch";

const J_progress = () => {

    const [name,setName]=useState('');
    const [group,setGroup]=useState('');
    const [work,setWork]=useState();
    const [major,setMajor]=useState('');
    const [admission,setAdmission]=useState();//录取状态
    const [form,setForm]=useState();//报名表状态

    useEffect(()=>{
        getJson('/schedule')
        .then(
            data=>{
                setAdmission(data.data.admission_status);
                setForm(data.data.form_status);
                setGroup(data.data.group);
                setMajor(data.data.major);
                setWork(data.data.work);
                setName(data.data.name);
            }
        )
   .catch(error=>console.log(error))
    },[]
    )

    

    return (
    <div className="progress">
        
        <div className="table">
            <div className="tt">木犀招新进度查询</div>
            <div className="div_a">
                <div className="left">姓名</div>
                <div className="right">{name}</div>
                </div>
            <div className="div_b">
                <div className="left">专业</div>
                <div className="right">{major}</div>
                </div>
            <div className="div_a">
                <div className="left">报名组别</div>
                <div className="right">{group}</div>
                </div>
            <div className="div_b">
                <div className="left">报名表状态</div>
                <div className="right">{form?'已提交':'未提交'}</div>
                </div>
            <div className="div_a">
                <div className="left">作业</div>
                <div className="right">{work?'已提交':'未提交'}</div>
            </div>
            <div className="div_bt" >
                <div className="left">录取状态</div>
                <div className="right">{admission?'已录取':'未录取'}</div>
                </div>
        </div>
    </div>
   
    )
};
export default J_progress;