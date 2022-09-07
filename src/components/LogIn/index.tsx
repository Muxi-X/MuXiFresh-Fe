import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import "./index.less"
import { getJson, postData } from '../../interface/fetch'
import { useNavigate } from 'react-router-dom'
import Join from '../../images/join.png'

const LogIn = (props: any) => {
    const [form,setForm]=useState(0);//报名表状态

   /*  useEffect(()=>{
        getJson('/schedule')
        .then(
            data=>{
                //0表示未提交 1表示提交
                setForm(data.data.form_status);
                console.log(data.data)
                console.log('##',data.data.form_status)
            }
        )
   .catch(error=>console.log(error))
    },[]
    )
 */

    useEffect(() => {  
        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        else{
            getJson('/schedule')
                .then(
                    data=>{
                        //0表示未提交 1表示提交
                        setForm(data.data.form_status);
                        // console.log(data.data)
                        // console.log('##',data.data.form_status);
        
                        getJson('/user/info')
                        .then(
                            datas => {
                                if(datas.data.role===1){//visitor
                                   const toVisitor = ()=>{
                                    navigate(data.data.form_status==0?'/edit':'/visitor')
                                   }
                                   toVisitor()
                                }
                                else if(datas.data.role===2||datas.data.role===4){
                                    const toManager = ()=>{//manager
                                        navigate(data.data.form_status==0?'/edit':'/manager')
                                    }
                                    toManager()
                                }
                            }
                        )
                    }
                )

        }
    },)
    

    const {setIsLogIn} = props

    const [user,setUser] = useState({
        email:"",
        password:"",
    })

    const [checkEmail,setCheckEmail] = useState(true)
    const [checkPassword,setCheckPassword] = useState(true)

    const navigate = useNavigate()

    const handleChange1 = (e: { target: { value: any } }) => {
        const email = e.target.value
        setUser({...user,email})
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/
        setCheckEmail(isEmail.test(email))
    }

    const handleChange2 = (e: { target: { value: any } }) => {
        const password = e.target.value
        setUser({...user,password})
        if(password.length<6){
            setCheckPassword(false)
        }else{
            setCheckPassword(true)
        }
    }

    async function logIn() {
        
        const {email,password} = user

        if(!email){
            alert("邮箱不能为空！")
            if(!password){
                alert("密码不能为空！")
                return
            }
            return
        }

        if(!checkEmail||!checkPassword){
            alert("邮箱或密码填写有误")
            return
        }

        let usermsg = {
            email: email,
            password: password,
        }
        const res = await fetch('http://fresh.muxixyz.com/api/v1/user/login',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usermsg)
        })
        const json = res.json()

        json.then(
            data => {
                // console.log(data);
                const token = data.data.token
                localStorage.setItem('token',token)

                getJson('/schedule')
                .then(
                    data=>{
                        //0表示未提交 1表示提交
                        setForm(data.data.form_status);
                        // console.log(data.data)
                        // console.log('##',data.data.form_status);
        
                        getJson('/user/info')
                        .then(
                            datas => {
                                if(datas.data.role===1){//visitor
                                   const toVisitor = ()=>{
                                    navigate(data.data.form_status==0?'/edit':'/visitor')
                                   }
                                   toVisitor()
                                }
                                else if(datas.data.role===2||datas.data.role===4){
                                    const toManager = ()=>{//manager
                                        navigate(data.data.form_status==0?'/edit':'/manager')
                                    }
                                    toManager()
                                }
                            }
                        )
                    }
                )
        //    .catch(error=>console.log(error))
        
            }
        ).catch(
            error => {
                // console.log(error);
                alert("邮箱或密码错误")
            }
        )
    }

    const back = () => {
        window.location.href = "http://muxi-tech.xyz/"
    }

    return(
        <div className='login-container'>
            <div className="pic"><img className='background' src={Join}/></div>
            <div className='login'>
                <div className='_title'>登录</div>
                <div className='form' >
                    <div className='box'>
                    <div className='yourEmail'><label className='lab' htmlFor="useremail">邮箱:</label><input className='put' onBlur={handleChange1} type="email" id='usermail' name='useremail' />{checkEmail?"":<div className='attention'>*格式错误</div>}</div>
                    <div className='yourPassWord'><label className='lab' htmlFor='password'>密码:</label><input className='put' onBlur={handleChange2} type="password" id='password'/>{checkPassword?"":<div className='attention'>*格式错误</div>}</div>
                    <div className='_end'><button onClick={logIn}>登录</button><button onClick={()=>setIsLogIn(false)}>注册</button><button onClick={back}>官网</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn