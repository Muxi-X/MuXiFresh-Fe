//审阅页面表头
import React, {useEffect, useState} from "react";
import './index.less';
import A_listInfo from "../A_ListInfo";
import {postData} from "../../interface/fetch";

const ManageLists = (props: any) => {

    const [data, setData] = useState([{
        "name": "",
        "email": "",
        "college": "",
        "grade": "",
        "group": props.group,
    }])

    const [ifmove, setIfmove] = useState(0)
    const move = () => {
        setIfmove(ifmove + 1)
    }

    useEffect(() => {
        postData(`/form/search`, {"group": props.group}, "POST")
            .then((res) => {
                setData(res.data)
            })
    }, [props.group, ifmove])


    return (
        <div>
            <div className="lists_header">
                <div className="lists_headers" style={{width: '1.4rem'}}>姓名</div>
                <div className="lists_headers" style={{width: '1.36rem'}}>年级</div>
                <div className="lists_headers" style={{width: '1.58rem'}}>学院</div>
                <div className="lists_headers" style={{width: '1.36rem'}}>组别</div>
                <div className="lists_headers" style={{width: '1.4rem'}}>报名表</div>
                <div className="lists_headers" style={{width: '1.36rem'}}>作业</div>
                <div className="lists_headers" style={{width: '3rem'}}>操作</div>
            </div>
            <div className="manage_info">
                {data.map((data) => {
                    return <div>
                        <A_listInfo email={data.email} name={data.name} grade={data.grade} college={data.college}
                                    group={props.group} move={move}/>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default ManageLists