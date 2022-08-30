//审阅界面添加分组，暂时没用
import React from "react";
import './index.less';

export default function AddGroup(props: any) {

    const {hide} = props;

    function setHide() {
        props.setHide()
    }

    return (
        <div>
            {hide ?
                <div className="add2_background">
                    <div className="add2_admin">
                        <div className="add2_title">新建分组</div>
                        <div className="add2_box">
                            <div className="add2_box1">
                                名称：
                                <input className="add2_type" placeholder="请输入分组名称"></input>
                            </div>
                            <div className="add2_box1">
                                隶属：
                                <select name="group" id="" className="add2_select">
                                    <option selected hidden disabled value="">请选择分组</option>
                                    <option value="project">产品组</option>
                                    <option value="design">设计组</option>
                                    <option value="frontend">前端组</option>
                                    <option value="backend">后端组</option>
                                    <option value="android">安卓组</option>
                                </select>
                            </div>
                            <div>
                                <button className="add2_button">确认</button>
                                <button className="add2_button" onClick={() => {
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
