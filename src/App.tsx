import { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import { getJson } from './interface/fetch'
import J_layout from './components/J_layout'
import router from './router'


function App() {
  const navigate=useNavigate()

  useEffect(()=>{
      const token = localStorage.getItem('token')
      if(!token){
          navigate('/login')
      }
  },[])

  return useRoutes(router);
}

export default App
