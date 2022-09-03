import React, { useRef, useState ,useEffect} from 'react';
import './index.less';
import { getJson, postData } from '../../interface/fetch';
import cmp from '../../images/complete.png';
import * as qiniu from 'qiniu-js';
import A_comment from '../A_comment';
//import { finished } from 'stream';
//提交作业


const J_work = () =>{

    const [filename,setFilename]=useState('');
    const [complete,setComplete]=useState(false);
    const [fileurl,setFileurl]=useState('');
    const [homeworks,setHomeworks]=useState([]);
    const [token,setToken]=useState(''); //qiniu-token
    const [group,setGroup]=useState('');
    const [content,setContent]=useState('');
    const [title,setTitle]=useState('');
    const [homework_id,setHomework_id]=useState(0);
    const [comment,setComment]=useState(false);//是否展示评论
    const [finished,setFinished]=useState(0);
    const [comments,setComments]=useState([]);
    const [handed_id,setHanded_id]=useState(0);
    const [f_name,setF_name]=useState('')//文件名

    
   
    useEffect(()=>{
    //获取作业内容
       getJson('/homework/performance')
            .then(
                data=>{
                    setHomeworks(data.data);
                    setContent(data.data[0].content);
                    setTitle(data.data[0].title);
                    setHomework_id(data.data[0].id);
                    setFinished(data.data[0].status);
                    //当作业已完成
                    console.log(data.data[0].id+'id')
                    console.log(data.data[0].status)
                    if(data.data[0].status==1)
                    {
                        //获取作业文件
                        getJson(`/homework/published/${data.data[0].id}/mine`)
                        .then(
                            data=>{
                                setFileurl(data.data[0].url);
                                let n=data.data[0].url;
                                let fname=n.replace("http://ossfresh-test.muxixyz.com/","")//去掉域名
                                setF_name(fname);//文件名
                                setHanded_id(data.data[0].ID)
                                console.log(data.data[0].url)
                                console.log(data.data[0].ID+'获取评论的id')
                                //获取评论
                                getJson('/homework/comment?id='+data.data[0].ID+'&limit=5&page=0')
                                .then (data => {
                                    if(data.data!='')
                                        setComments(data.data.comments);
                                    else
                                        setComments([]);
                                    console.log(data.data.comments)
                                }).catch (error => console.log(error));
                            }
                        ).catch (error => console.log(error));
                    }
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
           //获取分组
       getJson('/form/view')
       .then(
        data=>{
            setGroup(data.data.group);
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
            }
          }
        const subscription = observable.subscribe(observer) // 上传开始
        setComplete(true);  //上传完成后显示文件名
    }

    //切换作业
    function handleChange(e:React.ChangeEvent<HTMLSelectElement>):any{
        e.preventDefault();
        setFinished(0);
        setComplete(false);
        setComment(false)
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
                   setFinished(data.data.status);
                   console.log(h_id+'作业id')

                   if(data.data.status==1)
                    {
                        //获取作业文件
                        getJson(`/homework/published/${h_id}/mine`)
                        .then(
                            data=>{
                                setFileurl(data.data[0].url);
                                let n=data.data[0].url;
                                let fname=n.replace("http://ossfresh-test.muxixyz.com/","")
                                setF_name(fname);
                                setHanded_id(data.data[0].ID);
                                console.log(data.data[0].url);
                                console.log(data.data[0].ID+'获取评论的作业ID');
                                 //更新评论
                                 getJson('/homework/comment?id='+data.data[0].ID+'&limit=5&page=0')
                                 .then (data => {
                                    if(data.data!='')
                                        setComments(data.data.comments);
                                    else
                                        setComments([]);
                                     console.log(data.data.comments)
                                 }).catch (error => console.log(error));
                            }).catch (error => console.log(error));
                    }
                }).catch(error=>console.log(error)) 
        }

    //提交作业 返回文件url等数据
    function upload():any{
        setComments([]);
        const data={
            title:title,
            content:content,
            homework_id:homework_id,//数字
            file_url:'http://ossfresh-test.muxixyz.com/'+filename
        }
        postData(
            '/homework',
            data,
            'POST')
        .then(data=>{
            console.log(data);
            alert('上传成功！')
             //提交完毕 显示评论区
            setComment(true);
        })
        .catch(error=>{
            console.log(error);
            alert('上传失败!')
        })
    }

    //修改作业
    function reUpload():any{
        const data={
            title:title,
            content:content,
            homework_id:handed_id,//数字
            file_url:'http://ossfresh-test.muxixyz.com/'+filename
        }
        postData(
            `/homework/change/uploaded/${handed_id}`,
            data,
            'POST')
        .then(data=>{
            console.log(data);
            alert('上传成功！')
             //提交完毕 显示评论区
            setComment(true);
        })
        .catch(error=>{
            console.log(error);
            alert('上传失败!')
        })
    }
   
    return(
        <div className='work'>
            <div className='title_'>作业</div>
            <div className='divide'>{group}作业</div>
            <div className='one'>
                <div className='t' >标题：</div>
                <select className='a' id='select' onChange={(e)=>handleChange(e)}>
                {homeworks[0]?homeworks.map((homework)=>{
                    return(
                    <option key={homework.id} value={homework.id} >{homework.title}</option>
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
                {finished==1||comment?'':
                <div className='upload'>
                  <input type="file" id="fileId" onChange={(e)=>selectFile(e)}/>点击上传
                </div>}
                {finished==1||comment?<div className='upload'>
                  <input type="file" id="fileId" onChange={(e)=>selectFile(e)}/>重新上传
                </div>:''}
            </div>
            <div className='filelist'>
            {/* 提交后显示文件名 */}
            {complete?<div className='w'>
                    <div className='name'>{filename}</div>
                    <img src={cmp}></img>
                </div>:''}
            {/* 作业已完成显示 重新提交后消失 */}
            {finished==1 && !complete?<div className='w'>
                    <a href={fileurl} title={fileurl} download='我的作业'>{f_name}</a>
            </div>:''}
            </div>
            {finished==1||comment?'':
            <div className='end'>
                <button className='submit' onClick={upload}>提交作业</button>
            </div>}
            
            {finished==1||comment?<div className='end'>
                <button className='submit' onClick={reUpload}>修改作业</button>
            </div>:''}

            {/* 作业提交或之前已完成 显示评论区 */}
            {finished==1||comment?
                <A_comment id={handed_id} comments={comments} />:''}

           {/*  {finished==1||comment?'': */}
           
        </div>
    )
}

export default J_work;
