//此页面为管理者导航栏中作业发布下面的内容
//包含修改作业以及发布新作业

import React, { useState, useEffect } from "react";
import './index.less';
import {getJson, postData} from '../../interface/fetch';


const A_publish = () => {

    const [flag,setFlag] = useState('a');

    function Select(e:React.MouseEvent<HTMLDivElement> ):any{
            e.preventDefault();
            const div:HTMLDivElement=e.currentTarget;
            console.log(div.id)
            setClickedDiv(div.id);
            setGroupid(0)
    }

    function setClickedDiv(id:string):void{
        if(id=='a')
            setFlag('a')
        if(id=='b')
            setFlag('b')
    }


    const [homework,setHomework] = useState([]);
    const [tilte,setTitle] = useState('')
    const [hh_id,setId] = useState('')
    const [over,setOver] = useState(false)

    function toPromise():any{

        if(group_id!=0){
            getJson('/homework/published?group_id='+group_id+'&limit=100&page=0')
        .then (data => {
            console.log(data.data);
            setHomework(data.data.homework);
            setTitle(data.data.homework[0].title);
            setId(data.data.homework[0].ID);
            if(data.data.num>6){setOver(true)}
        })
        .catch (error =>{
            console.log(error);
            alert('还未发布过作业!')
        })
        }
    }

    //尝试page+1
    // const [page, setPage] = useState(0)
    // function toPromise():any{
    //     if(group_id!=0){
    //         getJson('/homework/published?group_id='+group_id+'&limit=5&page='+page)
    //     .then (data => {
    //         console.log(data.data);
    //         setHomework(data.data.homework);
    //         setTitle(data.data.homework[0].title);
    //         setId(data.data.homework[0].ID);
    //     })
    //     .catch (error =>{
    //         console.log(error);
    //         alert('还未发布过作业!')
    //     } );
    //     }
    // }





    //选择组别
    const [group_id, setGroupid] = useState(0)

    function chooseGroup(e:React.MouseEvent<HTMLDivElement> ):any{
        // e.preventDefault();
        const div:HTMLDivElement=e.currentTarget;
        console.log(div.id)
        setGroupid(Number(div.id))
    }

     //传选择的id
     function handleChange(e:React.ChangeEvent<HTMLSelectElement>):any{
        e.preventDefault();
        //拿到option的value，即ID
        const select:HTMLSelectElement=e.currentTarget;
        const index = select.selectedIndex;
        const h_id = select.options[index].value;//sting
        //字符串转数字
        setId(h_id);
        console.log(h_id);
    }



    //修改作业
    const [GetSearchVal1, SetGetSearchVal1] = useState('');
    const [GetSearchVal2, SetGetSearchVal2] = useState('');

    const inputRef1 = React.useRef<HTMLInputElement>(null);
    const textareaRef1 = React.useRef<HTMLTextAreaElement>(null);
    const getIptValue1 = (event: { target: { value: any } }) =>{
        console.log(inputRef1.current?.value)//传这个
        SetGetSearchVal1(event.target.value);
        console.log(GetSearchVal1)
    }
    const getTexValue1 = (event: { target: { value: any } }) =>{
        console.log(textareaRef1.current?.value)//传这个
        SetGetSearchVal2(event.target.value);
        console.log(GetSearchVal2)
    }


    //修改
    function toModify():any{
        const data={
            title : inputRef1.current?.value,
            content : textareaRef1.current?.value,
            group_id : group_id,//根据选择
            file_url : ''
        }
        console.log("zuoye"+hh_id)
        postData(
            `/homework/change/published/${hh_id}`,
            data,
            'POST')
        .then(data=>{
            console.log(data);
            SetGetSearchVal1('');
            SetGetSearchVal2('');
            setGroupid(0);
            console.log(group_id);
            alert('修改成功!')
             //提交完毕 切换页面
            //setComment(true);
        })
        .catch(error=>{
            console.log(error);
            alert('修改失败!')
        })
    }


    //发布新作业
    const [GetSearchVal11, SetGetSearchVal11] = useState('');
    const [GetSearchVal22, SetGetSearchVal22] = useState('');


    const inputRef = React.useRef<HTMLInputElement>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const getIptValue = (event: { target: { value: any } }) =>{
        console.log(inputRef.current?.value)//传这个
        SetGetSearchVal11(event.target.value);
    }
    const getTexValue = (event: { target: { value: any } }) =>{
        console.log(textareaRef.current?.value)//传这个
        SetGetSearchVal22(event.target.value);
    }


    //提交
    function toPublish():any{
        // const group_id = $("input[type='radio']:checked").val();

        const data={
            title : inputRef.current?.value,
            content : textareaRef.current?.value,
            group_id : group_id,//根据选择
            file_url : ''
        }
        console.log(data);
        postData(
            '/homework/publish',
            data,
            'POST')
        .then(data=>{
            console.log(data);
            SetGetSearchVal11('');
            SetGetSearchVal22('');
            alert('发布成功!')
             //提交完毕 切换页面
            //setComment(true);
        })
        .catch(error=>{
            console.log(error);
            alert('发布失败!')
        })
    }

  return (
    <div>
        <div className={flag=='a'?'zuoye_show':"zuoye_hidden"}>
            <div className="smalltitle">作业</div>
            <table className='table'>
                <tbody>
                <tr>
                    <td className="box5_zu">组别：</td>
                    <td className="select_zu">
                        <form className='form'>
                            <input type="radio" name="组别" value="前端组" id="4" onClick={(e) =>chooseGroup(e)}/><label htmlFor="4">前端组</label>
                            <input type="radio" name="组别" value="后端组" id="5" onClick={(e) =>chooseGroup(e)}/><label htmlFor="5">后端组</label>
                            <input type="radio" name="组别" value="安卓组" id="3" onClick={(e) =>chooseGroup(e)}/><label htmlFor="3">安卓组</label>
                            <input type="radio" name="组别" value="产品组" id="2" onClick={(e) =>chooseGroup(e)}/><label htmlFor="2">产品组</label>
                            <input type="radio" name="组别" value="设计组" id="1" onClick={(e) =>chooseGroup(e)}/><label htmlFor="1">设计组</label>
                        </form>

                    </td>
                </tr>
                <tr>
                    <td className="box5_biao">标题：</td>
                    <td>
                        {/* <input className="input" placeholder="请选择已布置的作业"></input> */}
                        <form action="" className="">
                            <select name="choosefile" className="input" id='select' onClick={()=>toPromise()} onChange={(e)=>handleChange(e)}>
                                {/* <option value="moren">请选择</option>  */}
                                {/* 做map遍历选项option */}
                                {homework[0]?homework.map((homework) =>{
                                    return(
                                        <option key={homework.ID} value={homework.ID} >{homework.title}</option>
                                    )
                                }):<option>选择组别后点击加载</option>}
                            </select>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td className="box5_biao2">修改标题：</td>
                    <td><input className="input" placeholder="若需要修改请重新输入标题" contentEditable="true" ref={inputRef1} onChange={getIptValue1} value={GetSearchVal1}></input></td>
                </tr>
                <tr>
                    <td className="zuoye_jian">修改内容简介：</td>
                    <td><textarea className="textarea" placeholder="若需要修改请重新输入内容" ref={textareaRef1} onChange={getTexValue1} value={GetSearchVal2}></textarea></td>
                </tr>
                </tbody>
            </table>

        <div className="mo_bottom">
            <div className="left_btn" onClick={() => toModify()}>完成修改</div>
            <div className="right_btn" id='b' onClick={(event)=>Select(event)}>发布新作业</div>
        </div>
        </div>


        <div className={flag=="b"?'zuoye_show':"zuoye_hidden"}>
            <div className="smalltitle">作业</div>
            <table className='table'>
            <tr>
                <td className="box5_zu">组别：</td>
                <td className="select_zu">
                    <form className='form'>
                        <input type="radio" name="组别" value="前端组" id="4" onClick={(e) =>chooseGroup(e)}/><label htmlFor="4">前端组</label>
                        <input type="radio" name="组别" value="后端组" id="5" onClick={(e) =>chooseGroup(e)}/><label htmlFor="5">后端组</label>
                        <input type="radio" name="组别" value="安卓组" id="3" onClick={(e) =>chooseGroup(e)}/><label htmlFor="3">安卓组</label>
                        <input type="radio" name="组别" value="产品组" id="2" onClick={(e) =>chooseGroup(e)}/><label htmlFor="2">产品组</label>
                        <input type="radio" name="组别" value="设计组" id="1" onClick={(e) =>chooseGroup(e)}/><label htmlFor="1">设计组</label>
                    </form>

                </td>
            </tr>
            <tr>
                <td className="box5_biao2">标题：</td>
                <td><input className="input" placeholder="请输入标题" contentEditable="true" ref={inputRef} onChange={getIptValue} value={GetSearchVal11}></input></td>
            </tr>
            <tr>
                <td className="zuoye_jian">内容简介：</td>
                <td><textarea className="textarea" placeholder="请输入多行文字" ref={textareaRef} onChange={getTexValue} value={GetSearchVal22}></textarea></td>
            </tr>
            </table>

        <div className="mo_bottom">
            <div className="left_btn" onClick={() => toPublish()}>发布新作业</div>
            <div className="right_btn" id='a' onClick={(event)=>Select(event)}>返回</div>
        </div>
        </div>
    </div>
  )
};


export default A_publish;