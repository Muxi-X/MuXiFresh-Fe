//审阅页面展示信息
import React, {useState} from "react";
import './index.less';
import {postData, putData} from "../../interface/fetch";
import MoveGroup from "../A_MoveGroup";
import {Link} from "react-router-dom";
import ConfirmAdmit from "../A_confirmAdmit";
import ConfirmDelete from "../A_confirmDelete"


export default function A_listInfo(props: any) {

    const name = props.name;
    const grade = props.grade;
    const college = props.college;
    let group = props.group;
    const email = props.email;
    let status = '0'

    const [hide, setHide] = useState(false);
    const close = () => {
        setHide(false)
    }
    const [hide2, setHide2] = useState(false);
    const close2 = () => {
        setHide2(false)
    }
    const [hide1, setHide1] = useState(false);
    const close1 = () => {
        setHide1(false)
    }


    if (props.group % 10 == 1) status = '1'
    else if (props.group % 10 == 2) status = '2'


    if (props.group > 10 && props.group < 20) group = "设计组"
    else if (props.group > 20 && props.group < 30) group = "产品组"
    else if (props.group > 30 && props.group < 40) group = "安卓组"
    else if (props.group > 40 && props.group < 50) group = "前端组"
    else if (props.group > 50 && props.group < 60) group = "后端组"

    return (
        <div className="info_inf">
            <div className="info_info" style={{width: '1.48rem'}}>{name}</div>
            <div className="info_info" style={{width: '1.44rem'}}>{grade}</div>
            <div className="info_info" style={{width: '1.88rem'}}>{college}</div>
            <div className="info_info" style={{width: '1.44rem'}}>{group}</div>
            <div className="info_info" style={{width: '1.48rem'}}>
                <Link to={`form/${email}`}>点击查看</Link>
            </div>
            <div className="info_info" style={{width: '1.44rem'}}>
                <Link to={`work/${email}`}>批阅</Link>
            </div>
            <div className="info_info" style={{width: '3rem'}}>
                <div className="info_operate" onClick={() => setHide(true)}>移动分组</div>
                <div className="info_vertical"></div>
                {status == '0' ? '' : <div>
                    <div className="info_operate" onClick={() => setHide1(true)}>录取
                    </div>
                    <div className="info_vertical"></div>
                </div>}
                <div className="info_operate" style={{color: '#FF471A'}} onClick={() => setHide2(true)}>删除
                </div>
            </div>
            <MoveGroup hide={hide} setHide={close} email={email} move={props.move}/>
            <ConfirmAdmit hide={hide1} setHide={close1} email={email} move={props.move} status={status}/>
            <ConfirmDelete hide={hide2} setHide={close2} email={email} move={props.move}/>
        </div>
    )
}

