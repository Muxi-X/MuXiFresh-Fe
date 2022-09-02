import React from 'react'
import { Outlet,NavLink } from 'react-router-dom'
import Header from '../header'
import './index.less'

export default function J_layout() {
    
    function computedName({isActive}:any){
        return isActive?'item active':'item';
    }
  return (
    <div className='J-container'>
        <Header></Header>
        <div className="J-body">
            <div className="J-box">
                <ul className="J-nav">                  
                        <li><NavLink className={computedName} to="/visitor/form">报名表查看</NavLink></li>
                        <li><NavLink className={computedName} to="/visitor/progress">进度查询</NavLink></li>
                        <li><NavLink className={computedName} to="/visitor/work">作业查询</NavLink></li>
                </ul>
                <div className="J-content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    </div>
  )
}
