//权限管理页面添加管理员
import React, {useState} from "react";
import './index.less';
import {putData} from "../../interface/fetch";

export default function AddAdmin(props: any) {

    const {hide} = props;

    function confirmadd() {
        putData(`/auth/authorize/${value}/2`, {}, "PUT")
            .then(() => {
                    props.setHide()
                }
            )
    }

    const [value, setValue] = useState('');

    const onChange = (value: any) => {
        setValue(value.target.value)
    }


    return (
        <div>
            {hide ?
                <div className="add_background">
                    <div className="add_admin">
                        <div className="add_title">添加管理员</div>
                        <div className="add_box">
                            <input className="add_type" placeholder="请输入邮箱" onChange={onChange}></input>
                            <div>
                                <button className="add_button" onClick={() => {
                                    confirmadd();
                                }}>确认
                                </button>
                                <button className="add_button" onClick={() => {
                                    props.setHide()
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
