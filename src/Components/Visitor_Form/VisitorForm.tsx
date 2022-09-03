// 游客提交、查看、修改报名表页面组件
import React, { useState, useEffect, useRef } from 'react'
import './VisitorForm.less'
import './bootstrap.min.css'
import Tittle from '../Visitor_Tittle/tittle'
import { getJson, postData, putData } from "../../interface/fetch";
import * as qiniu from 'qiniu-js';
import defaultFigure from '../../images/figure.png'
import { useNavigate } from 'react-router-dom';

const VisitorForm=()=> {
  const navigate = useNavigate()
  // 姓名
  const [name, setName] = useState('')
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  }
  // 学号
  const [id, setId] = useState('')
  const handleIdChange = (event: any) => {
    setId(event.target.value);
  }
  // 学院
  const [school, setSchool] = useState('')
  const handleSchoolChange = (event: any) => {
    setSchool(event.target.value);
  }
  // 专业
  const [major, setMajor] = useState('')
  const handleMajorChange = (event: any) => {
    setMajor(event.target.value);
  }
  // 年级
  const [grade, setGrade] = useState('')
  const handleGradeChange = (event: any) => {
    setGrade(event.target.value);
  }
  // 性别
  const [gender, setGender] = useState('')
  const handleGenderChange = (e: any) => {
    const select = e.target;
    const index = select.selectedIndex;
    setGender(select.options[index].text);
  }
  // 邮箱
  const [mail, setMail] = useState('')
  const handleMailChange = (e: any) => {
    setMail(e.target.value);
  }
  // 其它-选项
  const [approach, setApproach] = useState('')
  const handleApproachChange = (e: any) => {
    const select = e.target;
    const index = select.selectedIndex;
    setApproach(select.options[index].text);
  }
  // 其它-详情
  const [detail, setDetail] = useState('')
  const handleDetailChange = (e: any) => {
    setDetail(e.target.value);
  }
  // 心动组别
  const [intention, setIntention] = useState('')
  const handleIntentionChange = (e: any) => {
    const select = e.target;
    const index = select.selectedIndex;
    setIntention(select.options[index].text);
  }
  // 心动理由
  const [reason, setReason] = useState('')
  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  }
  // 对组别的了解
  const [grasp, setGrasp] = useState('')
  const handleGraspChange = (e: any) => {
    setGrasp(e.target.value);
  }
  // 自我介绍
  const [intro, setIntro] = useState('')
  const handleIntroChange = (e: any) => {
    setIntro(e.target.value);
  }
  // 一些小问题
  const [work, setWork] = useState('')
  const handleWorkChange = (e: any) => {
    setWork(e.target.value)
  }
  // 头像
  const [figure, setFigure] = useState('')
  // 修改资料
  const [update, setUpdate] = useState(0)
  //qiniu-token
  const [token, setToken] = useState('');
  const [filename, setFilename] = useState('');
  /* const [complete, setComplete] = useState(false);
  const [fileurl, setFileurl] = useState(''); */


  const [avatar,setAvatar] = useState('')

  /* useEffect(()=>{
    //获取qiniu-token
    getJson('/user/qiniu_token')
      .then(
        data => {
          setToken(data.data.Token);
        }
      )
  },[]) */

  

  // 获取数据
  useEffect(() => {
    getJson('/form/view')
      .then(
        data => {
          console.log("[Get] Basic Data BE");
          console.log(data);
          setName(data.data.name);
          setId(data.data.student_id);
          setSchool(data.data.college);
          setMajor(data.data.major);
          setGrade(data.data.grade);
          setGender(data.data.gender);
          setMail(data.data.email);
          setApproach(data.data.contact_way);
          setDetail(data.data.contact_number);
          // 在这里需要进行组和数字的转换
          // console.log("The intitial intention is (should be a number) " + intention);
          // console.log("the data.data.group is" + data.data.group);
          // switch (data.data.group) {
          //   case '1': { setIntention('设计组'); break; }
          //   case '2': { setIntention('产品组'); break; }
          //   case '3': { setIntention('安卓组'); break; }
          //   case '4': { setIntention('前端组'); break; }
          //   case '5': { setIntention('后端组'); break; }
          //   default: { setIntention(data.data.group); break; }
          // };
          // console.log(intention);
          // console.log("the intention in state is (cn) " + intention);
          setIntention(data.data.group);
          setReason(data.data.reason);
          setGrasp(data.data.understand);
          setIntro(data.data.self_introduction);
          setWork(data.data.if_other_organization);
          /* setFigure(data.data.avatar); */
          setAvatar(data.data.avatar);
          setUpdate(1);
        }
      )
      .catch(error => console.log(error));
    getJson('/user/info')
      .then(
        data => {
          console.log("[Get] Figure Data BE");
          console.log(data);
          setFigure(data.data.avatar);
        }
      )
      .catch(error => console.log(error));
    //获取qiniu-token
    getJson('/user/qiniu_token')
      .then(
        data => {
          setToken(data.data.Token);
        }
      )
  }, []
  )

  // const refUpload = useRef(null);
  // const handleFigureUpload = (e) => {
  //   alert("handle func works properly");
  //   refUpload.current.onChange(e);
  // };

  function fullfilled() {
    if (name != '' && id != '' && school != '' && major != '' && grade != '' && gender != '' && mail != '' && approach != '' && detail != '' && intention != '' && reason != '' && grasp != '' && intro != '' && work != '')
      return 1;
    else return 0;
  }

  function upload(): any {
     console.log("the intention to upload is " + intention);
     let transferredGroup = '0';
     switch (intention) {
      case '设计组': { transferredGroup = '1'; console.log("设计组 the transferred intention is " + transferredGroup); break; }
      case '产品组': { transferredGroup = '2'; console.log("产品组 the transferred intention is " + transferredGroup); break; }
     case '安卓组': { transferredGroup = '3'; console.log("安卓组 the transferred intention is " + transferredGroup); break; }
       case '前端组': { transferredGroup = '4'; console.log("前端组 the transferred intention is " + transferredGroup); break; }
     case '后端组': { transferredGroup = '5'; console.log("后端组 the transferred intention is " + transferredGroup); break; }
    };
    // console.log("The final intention is " + transferredGroup + " (should be a number)");
    const data = {
      avatar: 'http://ossfresh-test.muxixyz.com/' + filename,
      college: school,
      contact_number: detail,
      contact_way: approach,
      gender: gender,
      grade: grade,
      // group: transferredGroup,
      group: intention,
      if_other_organization: work,
      major: major,
      name: name,
      reason: reason,
      self_introduction: intro,
      student_id: id,
      understand: grasp
    }
    console.log("Check data");
    console.log(data); 


    if (name != '' && id != '' && school != '' && major != '' && grade != '' && gender != '' && mail != '' && approach != '' && detail != '' && intention != '' && reason != '' && grasp != '' && intro != '' && work != '') {
      putData(
        '/form',
        data,
        'PUT')
        .then(data => {
          console.log("[PUT] all data successfully");
          console.log(data);
          alert('上传成功!');
          getJson('/user/info')
            .then(
              data => {
                if (data.data.role === 1) {
                  const toVisitor = () => {
                    navigate('/visitor')
                  }
                  toVisitor()

                }
                else if (data.data.role === 3 || data.data.role === 4) {
                  const toManager = () => {
                    navigate('/manager')
                  }
                  toManager()
                }
              }
            )
        })
        .catch(error => {
          console.log(error);
          alert('上传失败!')
        })

    }
    else {
      postData(
        '/form',
        data,
        'POST')
        .then(data => {
          console.log("[POST] all data successfully");
          console.log(data);
          alert('上传成功!')
          getJson('/user/info')
            .then(
              data => {
                if (data.data.role === 1) {
                  const toVisitor = () => {
                    navigate('/visitor')
                  }
                  toVisitor()
                  alert('visitor')
                }
                else if (data.data.role === 3 || data.data.role === 4) {
                  const toManager = () => {
                    navigate('/manager')
                  }
                  toManager()
                }
              }
            )
        })
        .catch(error => {
          console.log(error);
          alert('上传失败!')
        })

    }
  }

  
  //上传文件
  function selectFile(e: React.ChangeEvent<HTMLInputElement>): any {
    const files = e.target.files;
    const key = files[0].name;
    const file = files[0];
    setFilename(key);
    // console.log(file)
    const putExtra = {};
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2
    };

    let avatar = URL.createObjectURL(file)//获取url放在img用于预览图片
    console.log('url'+avatar);
        setAvatar(avatar);

    //选择并上传文件到七牛云
    const observable = qiniu.upload(file, key, token, putExtra, config);
    const observer = {
      next(res) {
        // ...
      },
      error(err) {
        // ...
        console.log(err)
      },
      complete(res) {
        // ...
        // console.log('http://ossfresh-test.muxixyz.com/' + res.key)
       /*  setFileurl('http://ossfresh-test.muxixyz.com/' + res.key) */
      }
    }
    const subscription = observable.subscribe(observer) // 上传开始
    /* setComplete(true);  */ //上传完成后显示文件名
  }

  return (
    <div>
      {/* <div className='data-listener'>Name:{name},Gender:{gender},Work:{work},Reason:{reason}</div> */}
      <div className='text-center'><b className='tt-1'>我的简历</b></div>
      <div className='d-flex flex-column justify-content-around align-items-center'>
        {/* 个人信息 */}
        <Tittle tittleName='个人信息' />
        <div className='tt-5 formBlock d-flex flex-wrap justify-content-between w-50'>
          {/* 接下来需要修改优化这个部分的样式 */}
          <div className="upload-figure">
{/*             <img className='left-figure-image' id="my-figure"
              src={figure == 'http://ossfresh-test.muxixyz.com/' ? defaultFigure :
                figure == '' ? defaultFigure :
                  figure == 'http://dummyimage.com/100x100' ? defaultFigure :
                    figure} /> */}
                    <div className='avatar'>
                        {avatar?<img src={avatar} alt="#" />:<img src='http://dummyimage.com/100x100'></img>}
                    </div>
            {/* <img className='left-figure-image' id="my-figure" src={figure} /> */}
            <input  type="file" id='upload' onChange={(e)=> selectFile(e)}/>
                    <label htmlFor="upload">点击修改头像</label>
          </div>
          {/* <div style={{ color: "transparent" }}>{figure}</div> */}
          <div className="form-group w-50" id='info-group'>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">姓名:</label>
              <input type="text" className="form-control" value={name} onChange={handleNameChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">学号:</label>
              <input type="text" className="form-control" value={id} onChange={handleIdChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">学院:</label>
              <input type="text" className="form-control" value={school} onChange={handleSchoolChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">专业:</label>
              <input type="text" className="form-control" value={major} onChange={handleMajorChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">年级:</label>
              <input type="text" className="form-control" value={grade} onChange={handleGradeChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">性别:</label>
              <select className="form-control w-100" onChange={handleGenderChange}>
                <option className='tt-5'>{gender == '' ? '请选择' : gender}</option>
                <option className='tt-5'>男</option>
                <option className='tt-5'>女</option>
              </select>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">邮箱:</label>
              <input type="text" className="form-control text-center" value={mail} onChange={handleMailChange} disabled={true} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">其它:</label>
              <div className='w-100 m-0 d-flex justify-content-between'>
                <select className="form-control" id="others-select" onChange={handleApproachChange}>
                  <option className='tt-5'>{approach == '' ? '请选择' : approach}</option>
                  <option className='tt-5'>QQ</option>
                  <option className='tt-5'>Tel</option>
                </select>
                <input type="text" className="form-control text-center" id='others-label' value={detail} onChange={handleDetailChange} />

              </div>
            </div>
          </div>
        </div>
        {/* 报名信息 */}
        <Tittle tittleName='报名信息' />
        <div className="tt-5 form-group w-50">
          <label htmlFor="sel1">心动组别:</label>
          <select className="form-control" onChange={handleIntentionChange}>
            <option className='tt-5'>{intention == '' ? '请选择' : intention}</option>
            <option className='tt-5'>设计组</option>
            <option className='tt-5'>产品组</option>
            <option className='tt-5'>安卓组</option>
            <option className='tt-5'>前端组</option>
            <option className='tt-5'>后端组</option>
          </select>
          <label htmlFor="comment">心动理由:</label>
          <textarea className="form-control self-introduction" rows={3}
            placeholder='' value={reason} onChange={handleReasonChange}>
          </textarea>
          <label htmlFor="comment">对组别的了解·:</label>
          <textarea className="form-control self-introduction" rows={3}
            placeholder='' value={grasp} onChange={handleGraspChange}>
          </textarea>
        </div>
        {/* 自述部分 */}
        <Tittle tittleName='自述部分' />
        <div className="tt-5 form-group w-50">
          <label htmlFor="comment">自我介绍:</label>
          <textarea className="form-control self-introduction" rows={5}
            placeholder='进行一个自我介绍，内容需要包含自己的性格、能力、获得过的相关的成就以及假如自己进入木犀后的想法，可加入其他内容。'
            value={intro} onChange={handleIntroChange}>
          </textarea>
        </div>
        {/* 一些小问题 */}
        <Tittle tittleName='一些小问题' />
        <span className='tt-5'>你是否有加入/正在加入一些其他组织或担任学生工作?
        </span>
        <div className='tt-5 input-group d-flex justify-content-center p-2'>
          <div className="radio mx-1">
            <label><input type="radio" name="optradio" value='True' checked={work == 'True' ? true : false} onChange={handleWorkChange} />是</label>
          </div>
          <div className="radio mx-1">
            <label><input type="radio" name="optradio" value='False' checked={work == 'False' ? true : false} onChange={handleWorkChange} />否</label>
          </div>
        </div>
        <button className='olol button-submit' disabled={fullfilled() == 1 ? false : true} onClick={() => { upload()}}> 提交资料</button>
        {fullfilled() == 1 ? '' : <div className='alert alert-danger my-fix '>请填写完所有的内容后再提交~</div>}
      </div>
    </div>
  )
  
}

export default VisitorForm
