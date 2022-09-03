import React, { useEffect, useState } from "react";
import MyHomePage from "../MyHomePage/index";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 
import { getJson } from "../../interface/fetch";
import { Navigate, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate=useNavigate()
  const [showHome,setShowHome] = useState(false)

  const [avatar,setAvatar] = useState()

  //const [complete,setComplete] = useState(false)

  const [dropdown,setDropdown]=useState(false);

  function forMore(){
    if(dropdown==false){
      setDropdown(true);
    }else{
      setDropdown(false);
    }
  }

  useEffect(() => {
    getJson('/user/info').then(data => {
      setAvatar(data.data.avatar);
    })
  })//[complete]
  

  const quit = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const toHome=()=>{
    //setShowHome(true)
    navigate('/home');
  }

  return (
  <div>
   <div className='header'>
      <div className='muxi'>
        <img src={muxi} alt="muxi" className='logo' ></img>
        <div className='text'>木 犀</div>
      </div>
      <div className='avatar' onClick={forMore}>
          {avatar?<img src={avatar} />:""}
      </div>
   </div>

   {dropdown && <div className="select">
      <div className="option mine" onClick={toHome}>个人主页</div>
      <div className="division"></div>
      <div className="option" onClick={quit}>退出登录</div>
    </div>}
    {!dropdown && <div></div>}

   {/* {showHome?<MyHomePage setShowHome={setShowHome} setAvatar={setAvatar} avatar={avatar} setComplete={setComplete}/>:""} */}
  </div>
  )
};

export default Header;