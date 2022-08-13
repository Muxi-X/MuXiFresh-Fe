import React from 'react';
import './petal.scss';

const Petal:React.FC = ()=> {
    return(
            
        <div className = "fallingLeaves">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <span style = {{position:'relative',left:'80%'}}></span>
        <span style = {{position:'relative',left:'35%',top:'15%'}}></span>
        <span  style = {{position:'relative',left:'25%',top:'5%'}}></span>
        <span style = {{position:'relative',left:'40%',top:'15%'}}></span>
        <span  style = {{position:'relative',left:'30%',top:'5%'}}></span>
        <span  style = {{position:'relative',left:'45%',top:'10%'}}></span>
        <span style = {{position:'relative',left:'65%',top:'10%'}}></span>
        <span style = {{position:'relative',left:'55%',top:'15%'}}></span>
        </div>
       

)
}
export default Petal;