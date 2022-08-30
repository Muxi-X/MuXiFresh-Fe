//审阅页面
import React, {useState} from "react";
import './index.less';
import Group from "../A_Group";
import ManageLists from "../A_ManageLists";

export default function A_audit() {

    const [group, setGroup] = useState("21")

    return (
        <div className="audit_box">
            <Group setGroup={setGroup}/>
            <ManageLists group={group}></ManageLists>
        </div>
    )
}