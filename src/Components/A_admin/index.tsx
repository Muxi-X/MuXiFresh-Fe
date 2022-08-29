//权限管理页面
import React, {useState, useEffect} from "react";
import './index.less';
import AddAdmin from "../A_AddAdmin";
import AdminList from "../A_AdminList";
import {getJson} from "../../interface/fetch";

export default function Authority() {
    const [hide, setHide] = useState(false);
    const close = () => {
        setHide(false)
    }

    const [data1, setdata1] = useState([{
        "id": '',
        "student_id": "",
        "name": "",
        "email": "",
        "role": '',
        "avatar": ""
    }])
    const [data2, setdata2] = useState([{
        "id": '',
        "student_id": "",
        "name": "",
        "email": "",
        "role": '',
        "avatar": ""
    }])
    const [auth, setAuth] = useState(0)


    useEffect(() => {
        getJson(`/auth/administrator?role=4`)
            .then((res) => {
                    setdata1(res.data)
                }
            )
        getJson(`/auth/administrator?role=2`)
            .then((res) => {
                    setdata2(res.data)
                }
            )
        getJson(`/user/info`)
            .then((res) => {
                    setAuth(res.data.role)
                }
            )
    }, [hide])


    return (
        <div className="auth_box">
            <div className="auth_name">权限管理</div>
            <div className="auth_admin">
                <div className="auth_title">
                    <div className="admin_type">超级管理员</div>
                </div>
                <div className="auth_box2">
                    {data1.map((data) => {
                        return <AdminList name={data.name} group={data.student_id} img={data.avatar}/>

                    })}
                </div>
            </div>
            <div className="auth_admin">
                <div className="auth_title">
                    <div className="admin_type">管理员</div>
                    <div className="admin_add" onClick={() => {
                        if (auth == 4) {
                            setHide(true)
                        } else alert("您没有权限！")
                    }}>添加
                    </div>
                </div>
                <div className="auth_box2">
                    {data2.map((data) => {
                        return <AdminList name={data.name} group={data.student_id} img={data.avatar}/>
                    })}
                </div>
            </div>
            <AddAdmin hide={hide} setHide={close}/>
        </div>
    )
}

