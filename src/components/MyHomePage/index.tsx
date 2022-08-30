import { upload } from 'qiniu-js'
import React, { useEffect,useState } from 'react'
import "./index.less"
import back from "/src/images/back.png"
import { getJson,putData } from '../../interface/fetch'
import * as qiniu from 'qiniu-js'
const MyHomePage = (props: any) => {

    const {setComplete,setShowHome,setAvatar,avatar} = props

    const [msg,setmsg] = useState({
        avatar:avatar,
        name:""
    })
    const [file,setFile] = useState(new File([],""))
    const [token,setToken] = useState()

    //获取七牛云token
    useEffect(() => {
        getJson('/user/qiniu_token')
        .then(
            data => {
                setToken(data.data.Token)
            }
        )
    }, [token])
    

    //修改名称
    const editName = (e: { target: { value: any } }) => {
        let name = e.target.value
        setmsg({...msg,name})
    }
    
    //选择头像
    const selectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if(!files){
            return
        }//检测是否有图片

        const file = files[0]
        setFile(file)

        const key = file.name
        
        let avatar = URL.createObjectURL(file)//获取url放在img用于预览图片
        setmsg({...msg,avatar})
        setAvatar(avatar)
    }

    //将头像上传到七牛云
    const upload = () => {
        if(!file||!token){
            return
        }
        const key = file.name
        const putExtra = {}
        const config = {
            useCdnDomain: true,
            region: qiniu.region.z2
        }
        const observable = qiniu.upload(file, key, token, putExtra, config)

        const observer = {
            next(res: any){
              // ...
            },
            error(err: any){
              // ...
            },
            complete(res: any){
              const avatar = "http://ossfresh-test.muxixyz.com/" + res.key
              setmsg({...msg,avatar})
            }
          }

        const subscription = observable.subscribe(observer)
    }

    //更新信息
    const updateInfo = () => {
        upload()
        const {avatar,name} = msg
        const data = {
            avatar_url: avatar,
            name: name
        }
        putData('/user',data,"PUT")
        .then(
            () => {
                setComplete(true)
                alert("修改成功！")
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    const handleSubmit = () => {
        updateInfo();
    }


    return(
        <div className='body'>
            <div className='box'>
                <div className='back'>
                    <img src={back} onClick={()=>setShowHome(false)}/>
                    <button className='back' onClick={()=>setShowHome(false)}>返回</button>
                </div>
                <div className='title'>修改信息</div>
                <div className='content'>
                    <div className='avatar'>
                        <img src={msg.avatar} alt="#" />
                    </div>
                    <div className='title'>名称:</div>
                    <div className='editName'>
                        <input type="text" onBlur={editName}/>
                    </div>
                </div>
                <div className='changeAvatar'>
                    <input  type="file" id='upload' accept='/image*' onChange={(e)=>selectAvatar(e)}/>
                    <label htmlFor="upload">点击修改头像</label>
                </div>
                <div className='submit'><button onClick={handleSubmit}>确认修改</button></div>
            </div>
        </div>
    )
}

export default MyHomePage
