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
    }

    const handleChange2 = (e: { target: { value: any } }) => {
        const password = e.target.value
        setUser({...user,password})
    }

    async function logIn() {
        const {email,password} = user
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/
        setCheckEmail(isEmail.test(email))
        if(password.length<6){
            setCheckPassword(false)
        }

        if(!checkEmail||!checkPassword){
            alert("邮箱或密码填写有误")
            return
        }

        let usermsg = {
            email: email,
            password: password,
        }
        const res = await fetch('http://119.3.2.168:2022/api/v1/user/login',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usermsg)
        })
        const json = await res.json()
        const {data} = json
        const {token} = data
        localStorage.setItem('token',token)

        getJson('/schedule')
        .then(
            data=>{
                //0表示未提交 1表示提交
                setForm(data.data.form_status);
                console.log(data.data)
                console.log('##',data.data.form_status);

                getJson('/user/info')
                .then(
                    data => {
                        if(data.data.role===1){//visitor
                           const toVisitor = ()=>{
                            navigate(data.data.form_status==0?'/edit':'/visitor')
                           }
                           toVisitor()
                        }
                        else if(data.data.role===3||data.data.role===4){
                            const toManager = ()=>{//manager
                                navigate(data.data.form_status==0?'/edit':'/manager')
                            }
                            toManager()
                        }
                    }
                )
            }
        )
   .catch(error=>console.log(error))
   
       
    }
    
    const back = () => {
        window.location.href = "https://muxi-tech.xyz/"
    }

    return(
        <div className='login-container'>
            <div className="pic"><img className='background' src={Join}/></div>
            <div className='login'>
                <div className='_title'>登录</div>
                <div className='form' >
                    
                    <div className='box'>
                    <div className='yourEmail'><label className='lab' htmlFor="useremail">邮箱:</label><input className='login-put' onBlur={handleChange1} type="email" id='usermail' name='useremail' autoComplete='off'/>{checkEmail?"":<span className='attention'>*格式错误</span>}</div>
                    <div className='yourPassWord'><label className='lab' htmlFor='password'>密码:</label><input className='login-put' onBlur={handleChange2} type="password" id='password'/>{checkPassword?"":<span className='attention'>*格式错误</span>}</div>
                    <div className='_end'><button onClick={logIn}>登录</button><button onClick={()=>setIsLogIn(false)}>注册</button><button onClick={back}>官网</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn