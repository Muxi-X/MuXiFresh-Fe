import { upload } from 'qiniu-js'
import React, { useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom';
import "./index.less"
import back from "/src/images/back.png"
import { getJson,putData } from '../../interface/fetch'
import * as qiniu from 'qiniu-js'
import { useNavigate } from 'react-router-dom'
import defaultFigure from '../../images/default_avatar.png'
import { nanoid } from 'nanoid';

const MyHomePage = (props: any) => {
    const navigate=useNavigate()

    const [username,setUsername]=useState('');
    const [avatar,setAvatar]=useState('');
    const [url,setUrl]=useState('');
    const [filename,setFilename]=useState('');
   /*  const [msg,setmsg] = useState({
        avatar:avatar,
        name:""
    }) */
    const [file,setFile] = useState(new File([],""))
    const [token,setToken] = useState('')

    //获取七牛云token
    useEffect(() => {
        getJson('/user/qiniu_token')
        .then(
            data => {
                setToken(data.data.Token)
            }
        )

        getJson('/user/info').then(data => {
            setUsername(data.data.name);
            setAvatar(data.data.avatar);
          })
          
    }, [token])
    

    //修改名称
    const editName = (e: { target: { value: any } }) => {
        let name = e.target.value
        /* setmsg({...msg,name}) */
        setUsername(name);
    }
    
    //选择头像
    const selectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
       /*  console.log(files) */
        if(!files){
            return
        }//检测是否有图片
        const file = files[0]
        setFile(file)
        const key = file.name + nanoid(10)
        setFilename(key)
        // const key= files[0].name
        // setFilename(key);
        // setFile(files[0])
        /* console.log(files[0]) */
        let pic = URL.createObjectURL(file)//获取url放在img用于预览图片
        /* setmsg({...msg,avatar}) */
       /*  console.log('pix'+pic); */
        setAvatar(pic)
        //上传
        const putExtra = {}
        const config = {
            useCdnDomain: true,
            region: qiniu.region.z2
        }
        const observable = qiniu.upload(files[0], key, token, putExtra, config)

        const observer = {
            next(res: any){
              // ...
            },
            error(err: any){
              // ...
            //   console.log(err);
              alert("选择失败，请再次选择头像");
            },
            complete(res: any){
             /*  const avatar_url = "http://ossfresh-test.muxixyz.com/" + res.key
      */        /*  setmsg({...msg,avatar}) */
            /*  console.log(res) */
             setFilename(res.key);
            }
          }

        const subscription = observable.subscribe(observer)
    }


    //更新信息
    const updateInfo = () => {
      
        /* console.log(username) */
        /* console.log(filename) */
        const data_ = {
            avatar_url: filename===""?avatar:"http://ossfresh-test.muxixyz.com/"+filename,
            name: username
        }
        /* console.log(data_+'data');
        console.log(data_.avatar_url) */
        putData('/user',data_,"PUT")
        .then(
            /* () => {
                //setComplete(true)
                alert("修改成功！")} */
                data=>{
                    /* console.log(data); */
                    alert("修改成功！");
                }
        ).catch(
            error => {
                // console.log(error);
            }
        )
    }

    const handleSubmit = () => {
        updateInfo();
       /*  navigate(-1) */
    }
    const backBefore=()=>{
        navigate(-1)
    }

    return(
        <div className='home-body'>
            <div className='home-box'>
                <div className='back'>
                    <img src={back} onClick={backBefore} /* onClick={()=>setShowHome(false)} *//>
                    <button className='back' onClick={backBefore}>返回</button>
                </div>
                <div className='home-title'>修改信息</div>
                <div className='home-content'>
                    <div className='avatar-box'>
                        <input className='img-changeAvatar' type="file" accept='/image*' onChange={(e)=>selectAvatar(e)}/>
                        <div className='avatar'>
                        {avatar == 'http://ossfresh-test.muxixyz.com/' ? <img src={defaultFigure}></img> :
                    avatar ? <img src={avatar} alt="#" /> : <img src={defaultFigure}></img>}
                        </div>
                    <div className='changeAvatar'>
                    <input  type="file" id='upload' accept='/image*' onChange={(e)=>selectAvatar(e)}/>
                    <label htmlFor="upload">点击修改头像</label>
                    </div>
                    </div>
                    <div className='right-home'>
                    <div className='home-name'>名称:</div>
                    <div className='editName'>
                        <input type="text" placeholder={username} onBlur={editName}/>
                    </div>
                    </div>
                </div>
                
                <div className='home-submit'><button onClick={handleSubmit} className='home-btn'>确认修改</button></div>
            </div>
        </div>
    )
}

export default MyHomePage