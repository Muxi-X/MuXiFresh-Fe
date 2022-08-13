import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.scss';
import Header from './components/header/header';
import Groups from './components/groups/Group';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Header />
      <Groups />
      <div className="beian product">
          <a href="http://www.beian.miit.gov.cn/">鄂ICP备19024133号</a>
        </div>
    </React.StrictMode>
  )