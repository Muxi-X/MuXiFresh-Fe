import React from "react";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 

const Header = () => {
  return (
    <div>
   <div className='header'>
      <div className='muxi'>
        <img src={muxi} alt="muxi" className='logo' ></img>
        <div className='text'>木犀</div>
      </div>
      <div className='avatar'>
          <div className="guide">
            <div className="home">个人主页</div>
            <div className="back">退出登录</div>
          </div>
      </div>
   </div>
  </div>
  )
};

export default Header;