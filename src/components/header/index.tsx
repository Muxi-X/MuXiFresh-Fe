import React, { useEffect, useState } from "react";
import MyHomePage from "../MyHomePage/index";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 
import { getJson } from "../../interface/fetch";
import { Navigate, useNavigate } from "react-router-dom";
import defaultFigure from '../../images/default_avatar.png'


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
  
  const back = () => {
    window.location.href = "http://muxi-tech.xyz/"
  }

  const quit = () => {
    localStorage.removeItem('token')
    window.location.replace('/login')
    //navigate('/login')
  }
  const toHome=()=>{
    //setShowHome(true)
    navigate('/home');
  }

  return (
  <div>
   <div className='header'>
      <div className='muxi' onClick={back}>
        <img src={muxi} alt="muxi" className='logo' ></img>
        <div className='text'>木犀官网</div>
      </div>
      <div className='avatar' onClick={forMore}>
      {avatar == 'http://ossfresh-test.muxixyz.com/' ? <img src={defaultFigure}></img> :
                avatar ? <img src={avatar} alt="#" /> : <img src={defaultFigure}></img>}
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