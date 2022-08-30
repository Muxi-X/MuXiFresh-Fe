//审阅页面内部分组
import React, {useState} from "react";
import './index.less';
// import add_group from '/src/images/addgroup.png'
// import AddGroup from "../A_AddGroup";

export default function Group(props: any) {

    const [isFold, setFold] = useState("product");
    const [isLight, setLight] = useState("21");
    // const [hide, setHide] = useState(false);
    //
    // const close = () => {
    //     setHide(false)
    // }

    const setGroup = (e: string) => {
        props.setGroup(e)
    }

    return (
        <div>
            <div className="year">2022秋招</div>

            <div className="Group_box">
                <div className={isFold == "product" ? "group_active" : "groups"}>
                    <div className="group" onClick={() => setFold("product")}>产品组</div>
                    <div className={isLight == "21" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("21")
                        setLight("21")
                    }}>已报名
                    </div>
                    <div className={isLight == "22" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("22")
                        setLight("22")
                    }}>初试过
                    </div>
                    <div className={isLight == "23" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("23")
                        setLight("23")
                    }}>面试过
                    </div>
                </div>
                <div className={isFold == "android" ? "group_active" : "groups"}>
                    <div className="group" onClick={() => setFold("android")}>安卓组</div>
                    <div className={isLight == "31" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("31")
                        setLight("31")
                    }}>已报名
                    </div>
                    <div className={isLight == "32" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("32")
                        setLight("32")
                    }}>初试过
                    </div>
                    <div className={isLight == "33" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("33")
                        setLight("33")
                    }}>面试过
                    </div>
                </div>
                <div className={isFold == "design" ? "group_active" : "groups"}>
                    <div className="group" onClick={() => setFold("design")}>设计组</div>
                    <div className={isLight == "11" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("11")
                        setLight("11")
                    }}>已报名
                    </div>
                    <div className={isLight == "12" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("12")
                        setLight("12")
                    }}>初试过
                    </div>
                    <div className={isLight == "13" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("13")
                        setLight("13")
                    }}>面试过
                    </div>
                </div>
                <div className={isFold == "frontend" ? "group_active" : "groups"}>
                    <div className="group" onClick={() => setFold("frontend")}>前端组</div>
                    <div className={isLight == "41" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("41")
                        setLight("41")
                    }}>已报名
                    </div>
                    <div className={isLight == "42" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("42")
                        setLight("42")
                    }}>初试过
                    </div>
                    <div className={isLight == "43" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("43")
                        setLight("43")
                    }}>面试过
                    </div>
                </div>
                <div className={isFold == "backend" ? "group_active" : "groups"}>
                    <div className="group" onClick={() => setFold("backend")}>后端组</div>
                    <div className={isLight == "51" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("51")
                        setLight("51")
                    }}>已报名
                    </div>
                    <div className={isLight == "52" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("52")
                        setLight("52")
                    }}>初试过
                    </div>
                    <div className={isLight == "53" ? "group_status" : "group_statu"} onClick={() => {
                        setGroup("53")
                        setLight("53")
                    }}>面试过
                    </div>
                </div>
                {/*<div className="group_add" onClick={() => setHide(true)}>*/}
                {/*    <img src={add_group} alt="add"/>*/}
                {/*    新建分组*/}
                {/*</div>*/}
                {/*<AddGroup hide={hide} setHide={close}/>*/}
            </div>
        </div>
    )
}

