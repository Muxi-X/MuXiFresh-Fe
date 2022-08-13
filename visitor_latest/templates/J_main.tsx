import React from 'react'
import ReactDOM from 'react-dom/client'
import Join from '../src/Components/Join/Join'/*  '../src/Components/Join/Join' */
import Header from '../src/Components/Header'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Join />
  </React.StrictMode>
)
