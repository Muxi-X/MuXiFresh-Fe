import { useState } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'
import First from './components/first/first'
import Header from './components/header/header'
import routes from './routes'
//import "./styles/base.scss"


function App() {
  const element = useRoutes(routes)
  return (
    <div className="App">
        {element}
        
        <Outlet/>
      
      <div className="beian">
          <a href="http://www.beian.miit.gov.cn/">鄂ICP备19024133号</a>
      </div>
    </div>
  )
}

export default App
