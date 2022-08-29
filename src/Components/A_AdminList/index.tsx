//权限管理页面内部用于显示信息
import React from "react";
import './index.less';

export default function AdminList(props: any) {

    const img = props.img
    const name = props.name
    const group = props.group
    return (
        <div className="admin_list">
            <img src={img} alt="avatar"/>
            <div className="admin_info">
                <div className="admin_name">{name}</div>
                <div className="admin_group">{group}</div>
            </div>
        </div>
    )
}