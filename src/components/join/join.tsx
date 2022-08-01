import React from 'react'
import "./join.scss"
import Petal from '../petal/petal';
export default function Join() {

    function handleJoin() {
        alert("请加 QQ 群 763615354 咨询");
    }
  return (
    <div>
        <Petal />
        <div className="join-web">
          <div className="background-img">
            <img
              src="https://static.muxixyz.com/index_site/join2.png"
              className="background-star"
            />
          </div>

          <div className="background-button">
            <img
              src="https://static.muxixyz.com/index_site/join_button.png"
              className="background-button-inner"
              onClick={()=>handleJoin()}
            />
          </div>
        </div>
      </div>
  )
}
