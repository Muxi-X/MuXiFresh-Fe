import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import "./index.less"
import Join from '../../images/join.png'

const Register = (props: any) => {

    const {setIsLogIn} = props

    const [user,setUser] = useState({
        email:"",
        student_id:"",
        password:"",
        password1:"",
        name:nanoid(10),
    })

    const [check,setCheck] = useState({
        checkEmail: true,
        checkPassword: true,
        checkPasswordLen: true
    })

    const handleChange1 = (e:{ target: { value: string} }) => {
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/
        var email = e.target.value
        var checkEmail = isEmail.test(email)
        setUser({...user,email})
        setCheck({...check,checkEmail})    
    }

    const handleChange2 = (e:{ target: { value: string} }) => {
        var student_id = e.target.value
        setUser({...user,student_id})
    }

    const handleChange3 = (e: { target: { value: string } }) => {
        var password = e.target.value
        var len = password.length
        var checkPasswordLen = len>=6?true:false
        setUser({...user,password});
        setCheck({...check,checkPasswordLen})
    }

    const handleChange4 = (e: { target: { value: string } }) => {
        var password1 = e.target.value
        var checkPassword = user.password===password1?true:false
        setUser({...user,password1});
        setCheck({...check,checkPassword})
    }
    
    async function register() {
        const {email,student_id,password,password1,name} = user
        const {checkEmail,checkPassword,checkPasswordLen} = check
        //检验数据输入是否正确 不正确则无法注册
        if(!checkEmail||!checkPassword||!checkPasswordLen){
            alert("注册失败")
            return
        }

        //如果某一项输入为空则无法注册
        if(email===""||student_id===""||password===""||password1===""){
            alert("注册失败")
            return
        }
        let usermsg = {
            name: name,
            email: email,
            password: password,
            student_id: student_id
        }
        let res = await fetch('http://119.3.2.168:2022/api/v1/auth/register',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usermsg)
        })
        let json = await res.json()
        if(json.message === "OK"){
            setIsLogIn(true)
        }else{
            alert("注册失败")
        }
        
    }
     
    const back = () => {
        window.location.href = "https://muxi-tech.xyz/"
    }

    return(
        <div className='reg-body did' >
            <img className='background' src={Join}/>
            <div className='register did'>
                <div className='form did' >
                    <div className='title did'>注册</div>
                    <div className='yourEmail did'><label className='lab' htmlFor="useremail">邮箱:</label><input className='reg-put' onBlur={handleChange1} type="email" id='usermail' name='useremail' autoComplete="off" required/>{check.checkEmail?"":<span className='attention'>*格式错误</span>}</div>
                    <div className='studentId did'><label className='lab' htmlFor="userId">学号:</label><input className='reg-put' onBlur={handleChange2} type="text" id='userId' name="userId"  autoComplete="off"/></div>
                    <div className='yourPassWord did'><label className='lab' htmlFor='password'>密码:</label><input className='reg-put' onBlur={handleChange3} type="password" id='password' placeholder='密码不少于6位' />{check.checkPasswordLen?"":<span className='attention'>*格式错误</span>}</div>
                    <div className='checkPassWord did'><label className='lab' htmlFor='password1'>确认密码:</label><input className='reg-put' onBlur={handleChange4}  type="password" id='password1' />{check.checkPassword?"":<span className='attention'>*密码不一致</span>}</div>
                    <div className='confirm did'><button onClick={()=>setIsLogIn(true)}>登录</button><button onClick={register}>注册</button><button onClick={back}>官网</button></div>
                </div>
            </div>
        </div>
    )
}

export default Register