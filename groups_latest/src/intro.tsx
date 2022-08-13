import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.scss';
import Header from './components/header/header';
import Card from './components/intro/intro_card';
import Intro from './components/intro/intro';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Header />
      <Intro />
      <div className="beian intro">
          <a href="http://www.beian.miit.gov.cn/">鄂ICP备19024133号</a>
        </div>
    </React.StrictMode>
  )