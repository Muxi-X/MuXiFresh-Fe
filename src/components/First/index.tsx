import React, { useState } from 'react'
import LogIn from '../LogIn'
import Register from '../Register'

const First = () => {

    const [isLogIn,setIsLogIn] = useState(true)

  return (
    <div>
        {isLogIn?<LogIn setIsLogIn={setIsLogIn} />:""}
        {isLogIn?"":<Register setIsLogIn={setIsLogIn}/>}
    </div>
  )
}

export default First
