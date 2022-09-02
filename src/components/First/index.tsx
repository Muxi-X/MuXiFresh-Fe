import React, { useState } from 'react'
import LogIn from '../LogIn'
import Register from '../Register'
import './index.less'

const First = () => {

    const [isLogIn,setIsLogIn] = useState(true)

  return (
    <div className='big_first'>
        {isLogIn?<LogIn setIsLogIn={setIsLogIn} />:""}
        {isLogIn?"":<Register setIsLogIn={setIsLogIn}/>}
    </div>
  )
}

export default First