// 游客提交、查看、修改报名表页面组件
import React, { useState, useEffect, useRef } from 'react'
import './VisitorForm.less'
import './bootstrap.min.css'
import Tittle from '../Visitor_Tittle/tittle'
import { getJson, postData, putData } from "../../interface/fetch";
import * as qiniu from 'qiniu-js';
import defaultFigure from '../../images/default_avatar.png'
import { useNavigate } from 'react-router-dom';

const VisitorForm = () => {
  const navigate = useNavigate()
  // 是否显示“请填写所有字段”的提示
  const [show, setShow] = useState(0)
  // 姓名
  const [name, setName] = useState('')
  const handleNameChange = (event: any) => {
    setName(event.target.value);
    setShow(0);
  }
  // 学号
  const [id, setId] = useState('')
  const handleIdChange = (event: any) => {
    setId(event.target.value);
    setShow(0);
  }
  // 学院
  const [school, setSchool] = useState('')
  const handleSchoolChange = (event: any) => {
    setSchool(event.target.value);
    setShow(0);
  }
  // 专业
  const [major, setMajor] = useState('')
  const handleMajorChange = (event: any) => {
    setMajor(event.target.value);
    setShow(0);
  }
  // 年级
  const [grade, setGrade] = useState('')
  const handleGradeChange = (event: any) => {
    setGrade(event.target.value);
    setShow(0);
  }
  // 性别
  const [gender, setGender] = useState('')
  const handleGenderChange = (e: any) => {
    const select = e.target;
    const index = select.selectedIndex;
    setGender(select.options[index].text);
    setShow(0);
  }
  // 邮箱
  const [mail, setMail] = useState('')
  const handleMailChange = (e: any) => {
    setMail(e.target.value);
    setShow(0);
  }
  // 其它-选项
  const [approach, setApproach] = useState('')
  const handleApproachChange = (e: any) => {
    const select = e.target;
    const index = select.selectedIndex;
    setApproach(select.options[index].text);
    setShow(0);
  }
  // 其它-详情
  const [detail, setDetail] = useState('')
  const handleDetailChange = (e: any) => {
    setDetail(e.target.value);
    setShow(0);
  }
  // 心动组别
  const [intention, setIntention] = useState('')
  const handleIntentionChange = (e: any) => {
    const select = e.target;
    const index = select.selectedIndex;
    setIntention(select.options[index].text);
    setShow(0);
  }
  // 心动理由
  const [reason, setReason] = useState('')
  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
    setShow(0);
  }
  // 对组别的了解
  const [grasp, setGrasp] = useState('')
  const handleGraspChange = (e: any) => {
    setGrasp(e.target.value);
    setShow(0);
  }
  // 自我介绍
  const [intro, setIntro] = useState('')
  const handleIntroChange = (e: any) => {
    setIntro(e.target.value);
    setShow(0);
  }
  // 一些小问题
  const [work, setWork] = useState('')
  const handleWorkChange = (e: any) => {
    setWork(e.target.value)
    setShow(0);
  }
  // 头像
  const [figure, setFigure] = useState('')
  // 修改资料
  const [update, setUpdate] = useState(0)
  //qiniu-token
  const [token, setToken] = useState('');
  const [filename, setFilename] = useState('');
  const [avatar, setAvatar] = useState('')

  // 获取数据
  useEffect(() => {
    getJson('/form/view')
      .then(
        data => {
          // 如果获取到了数据则update=1，表示是更新资料
          // 如果获取到了数据则update=0，表示是上传资料
          setUpdate(data.data == null ? 0 : 1);
          if (data.data != null) {
            setName(data.data.name);
            setId(data.data.student_id);
            setSchool(data.data.college);
            setMajor(data.data.major);
            setGrade(data.data.grade);
            setGender(data.data.gender);
            setApproach(data.data.contact_way);
            setDetail(data.data.contact_number);
            // 这里可以进行组和数字的转换
            // switch (data.data.group) {
            //   case '1': { setIntention('设计组'); break; }
            //   case '2': { setIntention('产品组'); break; }
            //   case '3': { setIntention('安卓组'); break; }
            //   case '4': { setIntention('前端组'); break; }
            //   case '5': { setIntention('后端组'); break; }
            //   default: { setIntention(data.data.group); break; }
            // };
            setIntention(data.data.group);
            setReason(data.data.reason);
            setGrasp(data.data.understand);
            setIntro(data.data.self_introduction);
            setWork(data.data.if_other_organization);
            setAvatar(data.data.avatar);
          }
        }
      )
      // .catch(error => console.log(error));
    getJson('/user/info')
      .then(
        data => {
          setFigure(data.data.avatar);
          setMail(data.data.email);
        }
      )
      // .catch(error => console.log(error));
    //获取qiniu-token
    getJson('/user/qiniu_token')
      .then(
        data => {
          setToken(data.data.Token);
        }
      )
  }, []
  )

  function fullfilled() {
    if (name != '' && id != '' && school != '' && major != '' && grade != '' && gender != '' && mail != '' && approach != '' && detail != '' && intention != '' && reason != '' && grasp != '' && intro != '' && work != '')
      return 1;
    else {
      setShow(1);
      return 0;
    };
  }

  function upload(): any {
    // 这里可以进行组和数字的转换
    // let transferredGroup = '0';
    // switch (intention) {
    //   case '设计组': { transferredGroup = '1'; console.log("设计组 the transferred intention is " + transferredGroup); break; }
    //   case '产品组': { transferredGroup = '2'; console.log("产品组 the transferred intention is " + transferredGroup); break; }
    //   case '安卓组': { transferredGroup = '3'; console.log("安卓组 the transferred intention is " + transferredGroup); break; }
    //   case '前端组': { transferredGroup = '4'; console.log("前端组 the transferred intention is " + transferredGroup); break; }
    //   case '后端组': { transferredGroup = '5'; console.log("后端组 the transferred intention is " + transferredGroup); break; }
    // };
    const data = {
      avatar: filename == '' ? avatar : 'http://ossfresh-test.muxixyz.com/' + filename,
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

    // 如果之前从后端获取到了数据则说明是修改表，调用编辑报名表的PUT接口
    // 如果之前为从后端获取到数据则说明是创建表，调用创建报名表的POST接口
    if (update == 1) {
      putData(
        '/form',
        data,
        'PUT')
        .then(data => {
          alert('上传成功!');
          getJson('/user/info')
            .then(
              datas => {
                if (datas.data.role === 1) {
                  const toVisitor = () => {
                    navigate('/visitor')
                  }
                  toVisitor()

                }
                else if (datas.data.role === 3 || datas.data.role === 4) {
                  const toManager = () => {
                    navigate('/manager')
                  }
                  toManager()
                }
              }
            )
        })
        .catch(error => {
          // console.log(error);
          alert('上传失败!')
        })
    }
    else {
      postData(
        '/form',
        data,
        'POST')
        .then(data => {
          alert('上传成功!')
          getJson('/user/info')
            .then(
              datas => {
                if (datas.data.role === 1) {
                  const toVisitor = () => {
                    navigate('/visitor')
                  }
                  toVisitor()
                }
                else if (datas.data.role === 3 || datas.data.role === 4) {
                  const toManager = () => {
                    navigate('/manager')
                  }
                  toManager()
                }
              }
            )
        })
        .catch(error => {
          // console.log(error);
          alert('上传失败!')
        })

    }
  }


  //上传文件
  function selectFile(e: React.ChangeEvent<HTMLInputElement>): any {
    const files:any = e.target.files;
    const key = files[0].name;
    const file = files[0];
    setFilename(key);
    const putExtra = {};
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2
    };

    let avatar = URL.createObjectURL(file)//获取url放在img用于预览图片
    setAvatar(avatar);

    //选择并上传文件到七牛云
    const observable = qiniu.upload(file, key, token, putExtra, config);
    const observer = {
      next(res:any) {
        // ...
      },
      error(err:any) {
        // ...
        // console.log(err)
      },
      complete(res:any) {
        // ...
      }
    }
    const subscription = observable.subscribe(observer) // 上传开始
  }

  return (
    <div>
      <div className='text-center'><b className='tt-1'>我的简历</b></div>
      <div className='d-flex flex-column justify-content-around align-items-center'>
        {/* 个人信息 */}
        <Tittle tittleName='个人信息' />
        <div className='tt-5 formBlock d-flex flex-wrap justify-content-between w-50'>
          <div className="upload-figure">
            {/* <img className='left-figure-image' id="my-figure"
              src={figure == 'http://ossfresh-test.muxixyz.com/' ? defaultFigure :
                figure == '' ? defaultFigure :
                  figure == 'http://dummyimage.com/100x100' ? defaultFigure :
                    figure} /> */}
            {/* 由于前面之前默认用户可以不上传头像提交报名表，所以为了避免后端返回的是非图片的根链接而导致的默认头像无法显示，这里进行了一些修改 */}
            <div className='avatar center-fix'>
              {avatar == 'http://ossfresh-test.muxixyz.com/' ? <img src={defaultFigure}></img> :
                avatar ? <img src={avatar} alt="#" /> : <img src={defaultFigure}></img>}
            </div>
            <input type="file" id='upload' onChange={(e) => selectFile(e)} />
            <label htmlFor="upload">点击修改头像</label>
          </div>
          <div className="form-group w-50" id='info-group'>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={name == '' ? 'text-danger' : 'text-body'}>姓名:</label>
              <input type="text" className="form-control" value={name} onChange={handleNameChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={id == '' ? 'text-danger' : 'text-body'}>学号:</label>
              <input type="text" className="form-control" value={id} onChange={handleIdChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={school == '' ? 'text-danger' : 'text-body'}>学院:</label>
              <input type="text" className="form-control" value={school} onChange={handleSchoolChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={major == '' ? 'text-danger' : 'text-body'}>专业:</label>
              <input type="text" className="form-control" value={major} onChange={handleMajorChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={grade == '' ? 'text-danger' : 'text-body'}>年级:</label>
              <input type="text" className="form-control" value={grade} onChange={handleGradeChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={gender == '' ? 'text-danger' : 'text-body'}>性别:</label>
              <select className="form-control w-100" onChange={handleGenderChange}>
                <option className='tt-5'>{gender == '' ? '请选择' : gender}</option>
                <option className='tt-5'>男</option>
                <option className='tt-5'>女</option>
              </select>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={mail == '' ? 'text-danger' : 'text-body'}>邮箱:</label>
              <input type="text" className="form-control text-center" value={mail} onChange={handleMailChange} disabled={true} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment" className={approach == '' || approach == '请选择' || detail == '' ? 'text-danger' : 'text-body'}>其它:</label>
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
          <label htmlFor="sel1" className={intention == '' ? 'text-danger' : 'text-body'}>心动组别:</label>
          <select className="form-control" onChange={handleIntentionChange}>
            <option hidden className='tt-5'>{intention == '' ? '请选择' : intention}</option>
            <option className='tt-5'>设计组</option>
            <option className='tt-5'>产品组</option>
            <option className='tt-5'>安卓组</option>
            <option className='tt-5'>前端组</option>
            <option className='tt-5'>后端组</option>
          </select>
          <label htmlFor="comment" className={reason == '' ? 'text-danger' : 'text-body'}>心动理由:</label>
          <textarea className="form-control self-introduction" rows={3}
            placeholder='' value={reason} onChange={handleReasonChange}>
          </textarea>
          <label htmlFor="comment" className={grasp == '' ? 'text-danger' : 'text-body'}>对组别的了解·:</label>
          <textarea className="form-control self-introduction" rows={3}
            placeholder='' value={grasp} onChange={handleGraspChange}>
          </textarea>
        </div>
        {/* 自述部分 */}
        <Tittle tittleName='自述部分' />
        <div className="tt-5 form-group w-50">
          <label htmlFor="comment" className={intro == '' ? 'text-danger' : 'text-body'}>自我介绍:</label>
          <textarea className="form-control self-introduction" rows={5}
            placeholder='进行一个自我介绍，内容需要包含自己的性格、能力、获得过的相关的成就以及假如自己进入木犀后的想法，可加入其他内容。'
            value={intro} onChange={handleIntroChange}>
          </textarea>
        </div>
        {/* 一些小问题 */}
        <Tittle tittleName='一些小问题' />
        <span className='tt-5'>你是否有加入/正在加入一些其他组织或担任学生工作?
        </span><span className='text-danger tt-5'>{work == '' ? '(请填写)' : ''}</span>
        <div className='tt-5 input-group d-flex justify-content-center p-2'>
          <div className="radio mx-1">
            <label><input type="radio" name="optradio" value='True' checked={work == 'True' ? true : false} onChange={handleWorkChange} />是</label>
          </div>
          <div className="radio mx-1">
            <label><input type="radio" name="optradio" value='False' checked={work == 'False' ? true : false} onChange={handleWorkChange} />否</label>
          </div>
        </div>
        {show == 0 ? '' : <div className='alert alert-danger my-fix '>请填写完所有的内容后再提交~</div>}
        <button className='olol button-submit' onClick={() => { fullfilled() && upload() }}> {update == 1 ? '更新资料' : '提交资料'}</button>
      </div>
    </div>
  )

}

export default VisitorForm
