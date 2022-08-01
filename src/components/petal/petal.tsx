import React from 'react'
import "./petal.scss"

export default function Petal() {
  return (
    <div className = "fallingLeaves">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                <span style = {{position:"relative",left:"8"}}></span>
                <span style = {{position:"relative",left:"35%",top:"15%"}}></span>
                <span  style = {{position:"relative",left:"25%",top:"5%"}}></span>
                <span style = {{position:"relative",left:"40%",top:"15%"}}></span>
                <span  style = {{position:"relative",left:"30%",top:"5%"}}></span>
                <span  style = {{position:"relative",left:"45%",top:"10%"}}></span>
                <span style = {{position:"relative",left:"65%",top:"10%"}}></span>
                <span style = {{position:"relative",left:"55%",top:"15%"}}></span>
                </div>
  )
}
