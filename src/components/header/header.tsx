import React,{useState,useEffect} from 'react';
import './header.scss';

interface nav_header{
    name:string;
    style:string;
    route:string;
}

const Header:React.FC = ()=> {
    const origin_header:nav_header[]=[{
        name: '组别介绍',
        style: 'header-primary',
        route: '/intro'
    },
    {
        name: '产品展示',
        style: 'header-primary',
        route: '/product'
    },{
        name: '木犀团队',
        style: 'header-center',
        route:'/'
    },{
        name: '成员介绍',
        style: 'header-primary',
        route: '/member'
    },{
        name: '加入我们',
        style: 'header-primary',
        route: '/join'
    }];
    
    const [header,setHeader]=useState(origin_header);
    
    useEffect(()=>{
        var route = window.location.pathname;
        var active = header.find(item =>{
			return item.route === route;
		});
        //对象可能为“未定义”报错————这里取消了严格模式
        if(active.style === 'header-primary'){
			active.style = ' header-active'
		}
    },[])

    return (
        <header>
            <div className="header-wrap">
                { header.map( (item ,i)=> (
                    <div className={item.style} key={i}><a className ={` header-word  ${i===2?"team-name":""}` } href={item.route === "/"?null:item.route}>{item.name}</a></div>
                )) }
            </div>
        </header>
    );
}

export default Header;