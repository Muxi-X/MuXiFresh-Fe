import React, { useEffect, useState }from "react";
import './index.less';
import muxi from  '/src/images/muxi-logo.png' 
import {getJson} from '../../interface/fetch';


const A_comment = () => {

//     const [comments,setComments] = useState([]);
//     const [Content,setContent] = useState('')
//     const [Publisher,setPublisher] = useState('')

//     useEffect(() => {
//         getJson('/homework/comment')
//         .then (data => {
//             console.log(data.data);
//             setComments(data.data.comments);
//             setPublisher(data.data.comment[0].Publisher);
//             setContent(data.data.comment[0].Content);
//         })
//     })



  return (
<div className="bottom">
    <div className='module'>
    <div className="moduletitle">评语</div>
    <div className="box_table">
        <div className="t">评论：</div>
            <textarea className="m" placeholder="请输入内容"></textarea>
        </div>
        <div className="button">
            <button>发表评论</button>
        </div>
    </div>
    <div className="pinglunqu">
            <div className="box2">
            <img className='image' src={muxi} alt="muxi" ></img>
            <div className="text">
                <div className='user'>
                    <div className='mingzi'>名字</div>
                   {/*  <div className='zubie'>21产品组</div> */}
                </div>
                <div className='comment'>想法挺好的报销手机费获得积分的回调函数购房款关于的好处大幅度反对恢复和地方都是官方的花费的时间法海哈哈镜规划分局恢复共和国海军得分回复法国合法合规非官方苟富贵</div>
           </div>
           </div>
    </div>
       
</div>
  )
};

export default A_comment;