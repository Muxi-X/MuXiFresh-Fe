// 作为背景的花瓣
import './flower.scss'
import React, { useState } from 'react'

function Flower() {
    return (
        <div className="staticLeaves">
            <span style={{ position: 'absolute', left: '15%', top: '15%', opacity: '1' }}></span>
            <span style={{ position: 'absolute', left: '20%', top: '10%', backgroundSize: '50%' }}></span>
            <span style={{ position: 'absolute', left: '15%', top: '15%', opacity: '1' }}></span>
            <span style={{ position: 'absolute', left: '18%', top: '35%', backgroundSize: '30%', }}></span>
            <span style={{ position: 'absolute', left: '35%', top: '25%', backgroundSize: '50%', }}></span>
            <span style={{ position: 'absolute', left: '17%', top: '65%', backgroundSize: '65%', }}></span>
            <span style={{ position: 'absolute', left: '45%', top: '17%', backgroundSize: '71%', }}></span>
            <span style={{ position: 'absolute', left: '32%', top: '38%', backgroundSize: '50%', }}></span>
            <span style={{ position: 'absolute', left: '27%', top: '45%', backgroundSize: '65%', }}></span>
            <span style={{ position: 'absolute', left: '67%', top: '27%', backgroundSize: '44%', }}></span>
            <span style={{ position: 'absolute', left: '85%', top: '17%', backgroundSize: '50%', }}></span>
            <span style={{ position: 'absolute', left: '37%', top: '63%', backgroundSize: '100%', opacity: '1' }}></span>
            <span style={{ position: 'absolute', left: '61%', top: '25%', backgroundSize: '72%', }}></span>
            <span style={{ position: 'absolute', left: '51%', top: '61%', backgroundSize: '30%', }}></span>
            <span style={{ position: 'absolute', left: '43%', top: '41%', backgroundSize: '61%', }}></span>
            <span style={{ position: 'absolute', left: '57%', top: '63%', backgroundSize: '78%', }}></span>
            <span style={{ position: 'absolute', left: '77%', top: '9%', backgroundSize: '40%', }}></span>
            <span style={{ position: 'absolute', left: '72%', top: '12%', backgroundSize: '61%', }}></span>
            <span style={{ position: 'absolute', left: '80%', top: '73%', backgroundSize: '78%', }}></span>
        </div >
    )
}
export default Flower