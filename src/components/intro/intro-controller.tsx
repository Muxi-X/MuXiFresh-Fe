import React,{useState} from 'react';
import './intro.scss';
import info from './info';

interface childProps{
    current:number;
    select:Function;
}

const Introgroup:React.FC<childProps> = (props)=>{
    const information = info;
    const [current,setCurrent]=useState(props.current);

    const selectTag = e => {
        props.select(e);
        setCurrent(e);
    }

    return (
        <div className = "intro-controller">
            <div className = "controller-containner">
                <ul className =  "intro-tags">
                {information.map((item,index)=>{
                    return(<li key={index}>
                        <a  className ={`${current == index ? 'onTag':'notOnTag'}`}   onClick={selectTag.bind(this,index)}>{item.tag}组</a>
                    </li>)
                    
                })}
                </ul>
            </div>
          </div>
    )
}
export default Introgroup;