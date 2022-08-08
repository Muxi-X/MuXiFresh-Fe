import React, { useRef, useState } from 'react';
import './index.less';
import cmp from '../../images/complete.png';
import * as qiniu from 'qiniu-js';
//提交作业


const J_work = () =>{
    
    const [filename,setFilename]=useState('');
    const [complete,setComplete]=useState(false);
    const token='0bNiwJGpdwmvvuVAzLDjM6gnxj9MiwmSagVpIW81:SNBxND7qX92ZwqjCMVIMNx84dZw=:eyJzY29wZSI6Im11eGktZnJlc2gtdGVzdCIsImRlYWRsaW5lIjo1OTU0ODQ0Njg4fQ==';

//上传文件

    function selectFile(e:React.ChangeEvent<HTMLInputElement>):any{
        const files = e.target.files;
        const key = files[0].name;
        const file = files[0];
        console.log(file)
        setFilename(key);
        const  putExtra={};
        const config={
            useCdnDomain: true,
           /*  region: qiniu.region.z1 */
        };
        //选择并上传文件到七牛云
        const observable = qiniu.upload(file, key, token, putExtra, config);
        const observer = {
            next(res){
              // ...
            },
            error(err){
              // ...
                console.log(err)
            },
            complete(res){
              // ...
              console.log(res);
            }
          }
        const subscription = observable.subscribe(observer) // 上传开始
        setComplete(true);  //上传完成后显示文件名
        qiniu.getUploadUrl(config, token).then(res => {
            console.log(res+' url');
        }) 
    }

    function upload():any{
        //提交
    }

   

    return(
        <div className='work'>
            <div className='title'>作业</div>
            <div className='divide'>设计组作业</div>
            <div className='one'>
                <div className='t' >标题：</div>
                <div className='a'>制作一款零零落落零零落落零零落落零零落落零零落落零零落落来了啦啦啦</div>
            </div>
            <div className='two'>
                <div className='t'>内容简介：</div>
                <textarea className='m' placeholder='请输入多行文字'></textarea>
            </div>
            <div className='three'>
                <div className='t'>上传文件：</div>  
                <div className='upload'>
                    <input type="file" id="fileId" onChange={(e)=>selectFile(e)}/>点击上传
                </div>
            </div>
            <div className='filelist'>
            {complete?<div className='w'>
                    <div className='name'>{filename}</div>
                    <img src={cmp}></img>
                </div>:''}
                <div className='w'>
                    <div className='name'>哈哈哈哈哈</div>
                    <img src={cmp}></img>
                </div>
            </div>
            <div className='end'>
                <button className='submit' onClick={upload}>提交作业</button>
            </div>
        </div>
    )
}

export default J_work;