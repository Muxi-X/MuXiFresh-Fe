// 游客提交、查看、修改报名表页面组件
// 哦我亲爱的朋友如果你看见这个我非常推荐你去了解一下叫antd的东西
import React, { useState, useEffect, useRef } from 'react'
import './VisitorForm.less'
import './bootstrap.min.css'
import Tittle from '../Visitor_Tittle/tittle'
import { getJson, postData, putData } from "../../interface/fetch";
import * as qiniu from 'qiniu-js';
import defaultFigure from '../../images/default_avatar.png'
import { useNavigate } from 'react-router-dom';
// 鳖载着理发店
// 导入学院和专业的数据
import theschools from './ccnudata'

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
  // 学院对应的索引——用于找到学院下的专业
  const [schoolnumber, setSchoolnumber] = useState(0)
  // 学院
  const [school, setSchool] = useState('')
  const handleSchoolChange = (event: any) => {
    const select = event.target;
    const index = select.selectedIndex;
    setSchool(select.options[index].text);
    setSchoolnumber(index - 1);
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
    const select = event.target;
    const index = select.selectedIndex;
    setGrade(select.options[index].text);
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
  // const [mail, setMail] = useState('')
  // const handleMailChange = (e: any) => {
  //   setMail(e.target.value);
  //   setShow(0);
  // }
  // Q Q
  const [qq, setQq] = useState('')
  const handleQqChange = (e: any) => {
    setQq(e.target.value);
    setShow(0);
  }
  // 电话
  const [tel, setTel] = useState('')
  const handleTelChange = (e: any) => {
    setTel(e.target.value);
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
  // 组别了解
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
  // 学生工作
  const [workif, setWorkif] = useState('')
  const handleWorkifChange = (e: any) => {
    setWorkif(e.target.value)
    setShow(0);
  }
  // 学生工作——详情
  const [orgni, setOrgni] = useState('')
  const handleOrgniChange = (e: any) => {
    setOrgni(e.target.value);
    setShow(0);
  }
  // 头像相关state
  const [figure, setFigure] = useState('')
  const [filename, setFilename] = useState('');
  const [avatar, setAvatar] = useState('')
  // 修改资料
  const [update, setUpdate] = useState(0)
  //qiniu-token
  const [token, setToken] = useState('');

  // 获取数据
  useEffect(() => {
    console.log(theschools)
    getJson('/form/view')
      .then(
        data => {
          console.log(data)
          console.log(data.data.college)
          theschools.map(function (theschool, index) {
            console.log(theschool)
            if (theschool.schoolName == data.data.college) {
              setSchoolnumber(index)
              console.log(index)
            }
          })
          // 如果获取到了数据则update = 1，表示是更新资料
          // 如果获取到了数据则update = 0，表示是上传资料
          setUpdate(data.data == null ? 0 : 1);
          if (data.data != null) {
            setName(data.data.name);
            setId(data.data.student_id);
            setSchool(data.data.college);
            setMajor(data.data.major);
            setGrade(data.data.grade);
            setGender(data.data.gender);
            setQq(data.data.qq_number);
            setTel(data.data.phone_number);
            setOrgni(data.data.work);
            setIntention(data.data.group);
            setReason(data.data.reason);
            setGrasp(data.data.understand);
            setIntro(data.data.self_introduction);
            setWorkif(data.data.if_other_organization);
            setAvatar(data.data.avatar);
          }
        }
      )
    if (avatar == '') setAvatar(defaultFigure)
    // 由于fetch的返回值是json()，因此正常情况下永远不会catch-error
    // 如果要判断后端数据操作是否成功，可以通过查看response.data.code
    // .catch(error => console.log(error));
    getJson('/user/info')
      .then(
        data => {
          setFigure(data.data.avatar);
          // setMail(data.data.email);
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
    if (name != '' && id != '' && school != '' && major != '' && grade != '' && gender != '' && qq != '' && tel != '' && intention != '' && reason != '' && grasp != '' && intro != '' && (workif == 'False' || (workif == 'True' && orgni != '')))
      return 1;
    else {
      setShow(1);
      return 0;
    };
  }

  function upload(): any {
    const data = {
      //头像链接不能传空字符串
      avatar: filename == '' ? '' + avatar : 'http://ossfresh-test.muxixyz.com/' + filename,
      college: school,
      gender: gender,
      grade: grade,
      group: intention,
      if_other_organization: workif,
      major: major,
      name: name,
      reason: reason,
      self_introduction: intro,
      student_id: id,
      understand: grasp,
      phone_number: tel,
      qq_number: qq,
      work: orgni
    }
    console.log(data)
    // 如果之前从后端获取到了数据则说明是修改表，调用编辑报名表的PUT接口
    // 如果之前为从后端获取到数据则说明是创建表，调用创建报名表的POST接口
    if (update == 1) {
      putData(
        '/form',
        data,
        'PUT')
        .then(data => {
          // 这里要加code的判断
          // data.code = 20002 指错误
          // data.code = 0 指成功
          if (data.code == 0) {
            alert("上传成功!")
            getJson('/user/info')
              .then(
                datas => {
                  console.log(datas)
                  if (datas.data.role === 1) {
                    const toVisitor = () => {
                      navigate('/visitor')
                    }
                    toVisitor()
                  }
                  else if (datas.data.role === 2 || datas.data.role === 4) {
                    const toManager = () => {
                      navigate('/manager')
                    }
                    toManager()
                  }
                }
              )
          }
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
          if (data.code == 0) {
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
                  else if (datas.data.role === 2 || datas.data.role === 4) {
                    const toManager = () => {
                      navigate('/manager')
                    }
                    toManager()
                  }
                }
              )
          }
        })
        .catch(error => {
          // console.log(error);
          alert('上传失败!')
        })

    }
  }

  //上传文件
  function selectFile(e: React.ChangeEvent<HTMLInputElement>): any {
    const files: any = e.target.files;
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
      next(res: any) {
        // ...
      },
      error(err: any) {
        // ...
      },
      complete(res: any) {
        // ...
      }
    }
    const subscription = observable.subscribe(observer) // 上传开始
  }

  return (
    <div className='black-for-you w-100'>
      <div className='change-for-you w-80'>
        <div className='text-center'><b className='tt-1'>我的简历</b></div>
        <div className='d-flex flex-column justify-content-around align-items-center'>

          {/* 个人信息 */}
          <Tittle tittleName='个人信息' />
          <div className='tt-5 formBlock d-flex flex-wrap justify-content-between w-50'>
            <div className="upload-figure">
              <div className='avatar center-fix'>
                {avatar == 'http://ossfresh-test.muxixyz.com/' ? <img src={defaultFigure}></img> :
                  avatar ? <img src={avatar} alt="#" /> : <img src={defaultFigure}></img>}
              </div>
              <input type="file" id='upload' className='cancanneed' onChange={(e) => selectFile(e)} />
            </div>
            <div className="form-group w-50" id='info-group'>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={name == '' ? 'text-warning' : 'text-body'}>姓名:</label>
                <input type="text" className="form-control" value={name} onChange={handleNameChange} />
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={id == '' ? 'text-warning' : 'text-body'}>学号:</label>
                <input type="text" className="form-control" value={id} onChange={handleIdChange} />
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={school == '' ? 'text-warning' : 'text-body'}>学院:</label>
                <select className="form-control fix-mb" onChange={handleSchoolChange}>
                  <option value="" disabled selected>请选择</option>
                  {
                    theschools.map(function (theschool, index) {
                      var theKey = "key" + index;
                      return <option key={'school-' + theKey} className='tt-5' selected={school == theschool.schoolName ? true : false}>{theschool.schoolName}</option>
                    })
                  }
                </select>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={major == '' ? 'text-warning' : 'text-body'}>专业:</label>
                <select className="form-control fix-mb" onChange={handleMajorChange}>
                  <option value="" disabled selected>请选择</option>
                  {
                    theschools[schoolnumber].majorName.map(function (themajor, index) {
                      var theKey = "key" + index;
                      return <option key={'major-' + theKey} className='tt-5' selected={major == themajor ? true : false}>{themajor}</option>
                    })
                  }
                </select>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={grade == '' ? 'text-warning' : 'text-body'}>年级:</label>
                <select className="form-control fix-mb" onChange={handleGradeChange}>
                  <option value="" disabled selected>请选择</option>
                  <option className='tt-5' selected={grade == '2022-本科生' ? true : false}>2022-本科生</option>
                  <option className='tt-5' selected={grade == '2021-本科生' ? true : false}>2021-本科生</option>
                  <option className='tt-5' selected={grade == '2020-本科生' ? true : false}>2020-本科生</option>
                  <option className='tt-5' selected={grade == '2019-本科生' ? true : false}>2019-本科生</option>
                  <option className='tt-5' selected={grade == '2022-研究生' ? true : false}>2022-研究生</option>
                  <option className='tt-5' selected={grade == '2021-研究生' ? true : false}>2021-研究生</option>
                  <option className='tt-5' selected={grade == '2020-研究生' ? true : false}>2020-研究生</option>
                </select>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={gender == '' ? 'text-warning' : 'text-body'}>性别:</label>
                <select className="form-control w-100 fix-mb" onChange={handleGenderChange}>
                  {/* <option className='tt-5'>{gender == '' ? '请选择' : gender}</option> */}
                  <option value="" disabled selected>请选择</option>
                  <option className='tt-5' selected={gender == '男' ? true : false}>男</option>
                  <option className='tt-5' selected={gender == '女' ? true : false}>女</option>
                </select>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={tel == '' ? 'text-warning' : 'text-body'}>电话:</label>
                <input type="text" className="form-control text-center" value={tel} onChange={handleTelChange} />
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <label htmlFor="comment" className={qq == '' ? 'text-warning' : 'text-body'}>Q Q:</label>
                <input type="text" className="form-control text-center" value={qq} onChange={handleQqChange} />
              </div>
            </div>
          </div>

          {/* 报名信息 */}
          <Tittle tittleName='报名信息' />
          <div className="tt-5 form-group w-50">
            <label htmlFor="sel1" className={intention == '' ? 'text-warning' : 'text-body'}>心动组别:</label>
            <select className="form-control fix-mb" onChange={handleIntentionChange}>
              <option value="" disabled selected>请选择</option>
              <option className='tt-5' selected={intention == '设计组' ? true : false}>设计组</option>
              <option className='tt-5' selected={intention == '产品组' ? true : false}>产品组</option>
              <option className='tt-5' selected={intention == '安卓组' ? true : false}>安卓组</option>
              <option className='tt-5' selected={intention == '前端组' ? true : false}>前端组</option>
              <option className='tt-5' selected={intention == '后端组' ? true : false}>后端组</option>
            </select>
            <label htmlFor="comment" className={reason == '' ? 'text-warning' : 'text-body'}>心动理由:</label>
            <textarea className="form-control self-introduction" rows={3}
              placeholder='' value={reason} onChange={handleReasonChange}>
            </textarea>
            <label htmlFor="comment" className={grasp == '' ? 'text-warning' : 'text-body'}>对组别的了解·:</label>
            <textarea className="form-control self-introduction" rows={3}
              placeholder='' value={grasp} onChange={handleGraspChange}>
            </textarea>
          </div>

          {/* 自述部分 */}
          <Tittle tittleName='自述部分' />
          <div className="tt-5 form-group w-50">
            <label htmlFor="comment" className={intro == '' ? 'text-warning' : 'text-body'}>自我介绍:</label>
            <textarea className="form-control self-introduction" rows={5}
              placeholder='进行一个自我介绍，内容需要包含自己的性格、能力、获得过的相关的成就以及假如自己进入木犀后的想法，可加入其他内容。'
              value={intro} onChange={handleIntroChange}>
            </textarea>
          </div>

          {/* 一些小问题 */}
          <Tittle tittleName='一些小问题' />
          <span className='tt-7'>你是否有加入/正在加入一些其他组织或担任学生工作?
          </span><span className='text-warning tt-5'>{(show != 0 && workif == '') ? '(请填写)' : ''}</span>
          <div className='tt-7 input-group d-flex justify-content-center'>
            <div className="radio mx-1">
              <label><input type="radio" name="optradio" value='True' checked={workif == 'True' ? true : false} onChange={handleWorkifChange} />是</label>
            </div>
            <div className="radio mx-1">
              <label><input type="radio" name="optradio" value='False' checked={workif == 'False' ? true : false} onChange={handleWorkifChange} />否</label>
            </div>

          </div>
          {workif == 'True' ? <div className="form-group w-50 tt-5" id='info-group'><div className='d-flex justify-content-center align-items-center'>
            <label htmlFor="comment" className={orgni == '' ? 'text-warning' : 'text-body'}>详情:</label>
            <input type="text" className="form-control" value={orgni} onChange={handleOrgniChange} />
          </div></div> : ''}
          {show == 0 ? '' : <div className='alert alert-danger my-fix '>请填写完所有的内容后再提交~</div>}
          <button className='olol button-submit' onClick={() => { fullfilled() && upload() }}> {update == 1 ? '更新资料' : '提交资料'}</button>
        </div>
      </div></div>
  )
}

export default VisitorForm