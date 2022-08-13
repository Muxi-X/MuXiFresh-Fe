import React,{useState,useEffect} from 'react';
import './banner.scss';
import config from './const.js';

interface childProps{
    count:number;
    update:Function;
    icon:string;
    choose:Function;
    current:number;
}

const BannerController:React.FC<childProps>=(props)=>{
    //解构赋值，父子组件通信传值
    const {count,update,icon,choose}=props;

    const [current,setCurrent]=useState(props.current);
    const [items,setItems]=useState(null);
    //const [flag,setFlag]=useState('left');

    useEffect(()=>{
      var items = [];
        config.forEach(e=>{
            items.push(e.product);
        });
        //原代码this.setState({ items })  对hooks——访问useEffect里面的变量需要用到useState
         setItems(items);
    },[]);
    
    const switchLeft = ()=>{
        update(-1);
    }
    const switchRight = ()=>{
        update(1);
    }
    const chooseProduct = i => {
        choose(i);
    }
    
    var class1 = "products-item products-center";
    var class2 = "products-item";

    return (
        <div className="products-bottom">
        <div className="products-controller">
          <div className="controller-btn btn-left" onClick={switchLeft} />
          <div className="products-cnt-text">
            <div className="products-camera-bgr">
              <div className="products-camera-bgr-inner"> </div>
              <div className="products-camera-bgr-inner2" />
            </div>
            <div
              className="text"
              style={{
                transitionDuration: ".8s",
                width: 184 * count + "px",
                left: 368 - props.current * 184 + "px"
              }}
            > 
              {items?.map((item:string, i:number) => (
                <div key={i}
                  className={`${props.current === i ? class1 : class2}`}
                  onClick={chooseProduct.bind(this, i)}  //this.chooseProduct.bind(this, i)原来的
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="controller-btn btn-right" onClick={switchRight} />
        </div>

        <div className="products-camera-containner">
          <div className="products-camera"> </div>
          <div
            className="prodcuts-icon"
            style={{ backgroundImage: `url(${icon})` }}
          />
        </div>
      </div>
    )
}
export default BannerController;