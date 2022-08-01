import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.scss';
import Header from './components/header/header';
import Banner from './components/banner/banner';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Header />
      <Banner />
      <div className="beian product">
          <a href="http://www.beian.miit.gov.cn/">鄂ICP备19024133号</a>
        </div>
    </React.StrictMode>
  )