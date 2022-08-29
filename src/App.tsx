import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import J_layout from './components/J_layout'
import router from './router'


function App() {
  return useRoutes(router);
}

export default App
