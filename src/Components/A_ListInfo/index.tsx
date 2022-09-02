//审阅页面展示信息
import React, { useState } from "react";
import './index.less';
import { postData, putData } from "../../interface/fetch";
import MoveGroup from "../A_MoveGroup";
import { Link } from "react-router-dom";


export default function A_listInfo(props: any) {

    const name = props.name;
    const grade = props.grade;
    const college = props.college;
    let group = props.group;
    const email = props.email;
    let status = '0'

    const [hide, setHide] = useState(false);
    const close = () => {
        setHide(false)
    }

    if (props.group % 10 == 1) status = '1'
    else if (props.group % 10 == 2) status = '2'


    function admit(name: string) {
        putData(`/schedule/admit`, { "name": name, "admission_status": status }, 'PUT')
            .then(() => {
                props.move()
            })
    }

    function deleteinfo(email: string) {
        postData(`/form/delete`, { 'email': email }, "POST")
            .then(() => {
                props.move()
            })
    }

    if (props.group > 10 && props.group < 20) group = "设计组"
    else if (props.group > 20 && props.group < 30) group = "产品组"
    else if (props.group > 30 && props.group < 40) group = "安卓组"
    else if (props.group > 40 && props.group < 50) group = "前端组"
    else if (props.group > 50 && props.group < 60) group = "后端组"

    return (
        <div className="info_inf">
            <div className="info_info" style={{ width: '1.4rem' }}>{name}</div>
            <div className="info_info" style={{ width: '1.36rem' }}>{grade}</div>
            <div className="info_info" style={{ width: '1.58rem' }}>{college}</div>
            <div className="info_info" style={{ width: '1.36rem' }}>{group}</div>
            <div className="info_info" style={{ width: '1.4rem' }}>
                <Link to={`form/${email}`}>点击查看</Link>
            </div>
            <div className="info_info" style={{ width: '1.36rem' }}>
                <Link to={`work/${email}`}>批阅</Link>
            </div>
            <div className="info_info" style={{ width: '3rem' }}>
                <div className="info_operate" onClick={() => setHide(true)}>移动分组</div>
                <div className="info_vertical"></div>
                {status == '0' ? '' : <div>
                    <div className="info_operate" onClick={() => {
                        admit(name)
                    }}>录取
                    </div>
                    <div className="info_vertical"></div>
                </div>}
                <div className="info_operate" style={{ color: '#FF471A' }} onClick={() => {
                    deleteinfo(email)
                }}>删除
                </div>
            </div>
            <MoveGroup hide={hide} setHide={close} email={email} move={props.move} />
        </div>
    )
}

