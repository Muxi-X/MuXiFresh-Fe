import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'
import Header from '../header'
import './index.less'

export default function J_layout() {
    
    function computedName({isActive}:any){
        return isActive?'item active':'item';
    }
    
  return (
    <div className='container'>
        <Header></Header>
        <div className="body">
            <div className="box">
                <ul className="nav">                  
                        <li><NavLink className={computedName} to="/manager/">报名表查看</NavLink></li>
                        <li><NavLink className={computedName} to="/manager/progress">进度查询</NavLink></li>
                        <li><NavLink className={computedName} to="/manager/work">作业</NavLink></li>
                        <li><NavLink className={computedName} to="/manager/check">审阅</NavLink></li>
                        <li><NavLink className={computedName} to="/manager/publish">作业发布</NavLink></li>
                        <li><NavLink className={computedName} to="/manager/admin">权限管理</NavLink></li>
                </ul>
                <div className="content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    </div>
  )
}