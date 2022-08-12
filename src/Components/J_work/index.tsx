import React, { useRef, useState ,useEffect} from 'react';
import './index.less';
import { getJson, postData } from '../../interface/fetch';
import cmp from '../../images/complete.png';
import * as qiniu from 'qiniu-js';
import A_comment from '../A_comment';
//提交作业


const J_work = () =>{

    const [filename,setFilename]=useState('');
    const [complete,setComplete]=useState(false);
    const [fileurl,setFileurl]=useState('');
    const [homeworks,setHomeworks]=useState([]);
    const [token,setToken]=useState(''); //qiniu-token
    const [group_id,setGroup_id]=useState(5);
    const limit:number=5;
    const page:number=0;
    const [content,setContent]=useState('');
    const [title,setTitle]=useState('');
    const [homework_id,setHomework_id]=useState(0);
    const [comment,setComment]=useState(false);
    

   
    useEffect(()=>{
    //获取作业内容
       getJson('/homework/published?group_id=4&limit=5&page=0')
            .then(
                data=>{
                    setHomeworks(data.data.homework);
                    setContent(data.data.homework[0].content);
                    setTitle(data.data.homework[0].title);
                    setHomework_id(data.data.homework[0].ID)
                }
            )
       .catch(error=>console.log(error));

       //获取qiniu-token
       getJson('/user/qiniu_token')
       .then(
           data=>{
                   setToken(data.data.Token);
           }
       )
        },[]
        )

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
            region: qiniu.region.z2
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
              console.log('http://ossfresh-test.muxixyz.com/'+res.key)
              setFileurl('http://ossfresh-test.muxixyz.com/'+res.key);
            }
          }
        const subscription = observable.subscribe(observer) // 上传开始
        setComplete(true);  //上传完成后显示文件名
    }

    //切换作业
    function handleChange(e:React.ChangeEvent<HTMLSelectElement>):any{
        e.preventDefault();
        //拿到option的value，即ID
        const select:HTMLSelectElement=e.currentTarget;
        const index = select.selectedIndex;
        const id=select.options[index].value;//sting
        //字符串转数字
        const h_id= parseInt(id);

        getJson(`/homework/published/details/${id}`)
            .then(
                data=>{
                   setContent(data.data.content);
                   setTitle(data.data.title);
                   setHomework_id(h_id);
                }
            )
            .catch(error=>console.log(error)) 
        }

        //提交作业 返回文件url等数据
    function upload():any{

        const data={
            title:title,
            content:content,
            homework_id:homework_id,//数字
            file_url:'http://ossfresh-test.muxixyz.com/'+filename
        }
        console.log(data);
        postData(
            '/homework',
            data,
            'POST')
        .then(data=>{
            console.log(data);
             //提交完毕 切换页面
            setComment(true);
        })
        .catch(error=>{
            console.log(error);
            alert('上传失败!')
        })

    }
   
    return(
        <div className='work'>
            <div className='title'>作业</div>
            <div className='divide'>设计组作业</div>
            <div className='one'>
                <div className='t' >标题：</div>
                <select className='a' id='select' onChange={(e)=>handleChange(e)}>
                {homeworks[0]?homeworks.map((homework)=>{
                    return(
                    <option key={homework.ID} value={homework.ID}>{homework.title}</option>
                        )
                }):''}
                </select>
            </div>
            <div className='two'>
                <div className='t'>内容简介：</div>
                <div className='m'>{content}</div>
            </div>
            <div className='three'>
                <div className='t'>上传文件：</div>
                {comment?'':
                <div className='upload'>
                  <input type="file" id="fileId" onChange={(e)=>selectFile(e)}/>点击上传
                </div>}
            </div>
            <div className='filelist'>
            {/* 显示文件名 */}
            {complete?<div className='w'>
                    <div className='name'>{filename}</div>
                    <img src={cmp}></img>
                </div>:''}
               {/*  <div className='w'>
                    <div className='name'>哈哈哈哈哈</div>
                    <img src={cmp}></img>
                </div> */}
            </div>
            {comment?
                <A_comment/>:''}

            {comment?'':
            <div className='end'>
                <button className='submit' onClick={upload}>提交作业</button>
            </div>}
        </div>
    )
}

export default J_work;