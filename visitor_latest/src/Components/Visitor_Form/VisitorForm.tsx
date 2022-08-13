// 游客提交、查看、修改报名表页面组件
import React, { useState, useEffect } from 'react'
import './VisitorForm.less'
import './bootstrap.min.css'
import Tittle from '../Visitor_Tittle/tittle'
import initialFigure from '../../images/null.png'
function VisitorForm() {
  // 姓名
  const [name, setName] = useState('')
  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  // 学号
  const [id, setId] = useState('')
  const handleIdChange = (event) => {
    setId(event.target.value);
  }
  // 学院
  const [school, setSchool] = useState('')
  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  }
  // 专业
  const [major, setMajor] = useState('')
  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  }
  // 年级
  const [grade, setGrade] = useState('')
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  }
  // 性别
  const [gender, setGender] = useState('')
  const handleGenderChange = (e) => {
    const select = e.target;
    const index = select.selectedIndex;
    setGender(select.options[index].text);
  }
  // 邮箱
  const [mail, setMail] = useState('')
  const handleMailChange = (e) => {
    setMail(e.target.value);
  }
  // 其它-选项
  const [approach, setApproach] = useState('')
  const handleApproachChange = (e) => {
    const select = e.target;
    const index = select.selectedIndex;
    setApproach(select.options[index].text);
  }
  // 其它-详情
  const [detail, setDetail] = useState('')
  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  }
  // 心动组别
  const [intention, setIntention] = useState('')
  const handleIntentionChange = (e) => {
    const select = e.target;
    const index = select.selectedIndex;
    setIntention(select.options[index].text);
  }
  // 心动理由
  const [reason, setReason] = useState('')
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  }
  // 对组别的了解
  const [grasp, setGrasp] = useState('')
  const handleGraspChange = (e) => {
    setGrasp(e.target.value);
  }
  // 自我介绍
  const [intro, setIntro] = useState('')
  const handleIntroChange = (e) => {
    setIntro(e.target.value);
  }
  // 一些小问题
  const [work, setWork] = useState('')
  const handleWorkChange = (e) => {
    setWork(e.target.value)
  }
  // 头像
  const [figure, setFigure] = useState('')
  // 修改资料
  const [update, setUpdate] = useState(0)


  return (
    <div>
      {/* <div className='data-listener'>Name:{name},Gender:{gender},Work:{work},Reason:{reason}</div> */}
      <div className='text-center'><b className='tt-1'>我的简历</b></div>
      <div className='d-flex flex-column justify-content-around align-items-center'>
        {/* 个人信息 */}
        <Tittle tittleName='个人信息' />
        <div className='tt-5 formBlock d-flex flex-wrap justify-content-between w-50'>
          <img className='info-figure mx-1' src={figure ? figure : initialFigure}></img>
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
                <option className='tt-5'>请选择</option>
                <option className='tt-5'>男</option>
                <option className='tt-5'>女</option>
              </select>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">邮箱:</label>
              <input type="text" className="form-control" value={mail} onChange={handleMailChange} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="comment">其它:</label>
              <div className='w-100 m-0 d-flex justify-content-between'>
                <select className="form-control" id="others-select" onChange={handleApproachChange}>
                  <option className='tt-5'>请选择</option>
                  <option className='tt-5'>QQ</option>
                  <option className='tt-5'>Tel</option>
                </select>
                <input type="text" className="form-control" id='others-label' />

              </div>
            </div>
          </div>
        </div>
        {/* 报名信息 */}
        <Tittle tittleName='报名信息' />
        <div className="tt-5 form-group w-50">
          <label htmlFor="sel1">心动组别:</label>
          <select className="form-control" onChange={handleIntentionChange}>
            <option className='tt-5'>请选择</option>
            <option className='tt-5'>产品组</option>
            <option className='tt-5'>设计组</option>
            <option className='tt-5'>前端组</option>
            <option className='tt-5'>后端组</option>
            <option className='tt-5'>安卓组</option>
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
            <label><input type="radio" name="optradio" value='YES' onChange={handleWorkChange} />是</label>
          </div>
          <div className="radio mx-1">
            <label><input type="radio" name="optradio" value='NO' onClick={handleWorkChange} />否</label>
          </div>
        </div>
        <button className='olol button-submit' onClick={() => setUpdate(1)}>{update ? '更新资料' : '提交资料'}</button>
      </div>
    </div>
  )
}


export default VisitorForm
