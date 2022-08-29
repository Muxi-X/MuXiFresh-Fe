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
                        <li><NavLink className={computedName} to="/visitor/">报名表查看</NavLink></li>
                        <li><NavLink className={computedName} to="/visitor/progress">进度查询</NavLink></li>
                        <li><NavLink className={computedName} to="/visitor/work">作业查询</NavLink></li>
                </ul>
                <div className="content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    </div>
  )
}
