//审阅页面移动分组弹窗
import React, {useState} from "react";
import './index.less';
import {postData} from "../../interface/fetch";

export default function MoveGroup(props: any) {

    const {hide} = props;
    const email = props.email;

    function setHide() {
        props.setHide()
    }

    const [group, setGroup] = useState("")
    const Group = (e: { target: { value: any; }; }) => {
        setGroup(e.target.value)
    }

    const movegroup = () => {
        postData('/form/movegroup', {"group": group, "email": email}, 'POST')
            .then(() => {
                props.move()
            })
    }

    return (
        <div>
            {hide ?
                <div className="move_background">
                    <div className="move_admin">
                        <div className="move_title">请选择分组</div>
                        <div className="move_box">
                            <div className="move_box1">
                                <select name="group" id="" className="move_select" onChange={Group}>
                                    <option selected hidden disabled value="">请选择分组</option>
                                    <option value="产品组">产品组</option>
                                    <option value="设计组">设计组</option>
                                    <option value="前端组">前端组</option>
                                    <option value="后端组">后端组</option>
                                    <option value="安卓组">安卓组</option>
                                </select>
                            </div>
                            <div>
                                <button className="move_button" onClick={() => {
                                    setHide();
                                    movegroup()
                                }}>确认
                                </button>
                                <button className="move_button" onClick={() => {
                                    setHide();
                                }}>返回
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    )
}
