//A_layout J_layout分别是团队成员、新生的基础布局页面（header+导航栏）
import { RouteObject, Navigate } from "react-router-dom";
import Login from "../components/login";
import J_layout from "../components/J_layout";
import A_layout from "../components/A_layout"
import AJ_form from "../components/AJ_form/form";
import AJ_work from "../components/AJ_work";
import AJ_progress from "../components/AJ_progress";
import A_check from "../components/A_check";
import A_publish from "../components/A_publish";
import A_admin from "../components/A_admin";
import Others_form from "../components/Others_form";
import Others_work from "../components/Others_work";

// 注册路由表
const router: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/login" />//默认跳到login
    },
    {//新生 J
        path: "/visitor",
        element: <J_layout />,
        children: [
            { index: true, element: <AJ_form /> },
            { path: "progress", element: <AJ_progress /> },
            { path: "work", element: <AJ_work /> },

        ]
    },
    {//团队成员 A
        path: "/manager",
        element: <A_layout />,
        children: [
            { index: true, element: <AJ_form /> },
            { path: "progress", element: <AJ_progress /> },
            { path: "work", element: <AJ_work /> },
            { path: "check", element: <A_check /> },
            { path: "publish", element: <A_publish /> },
            { path: "admin", element: <A_admin /> },
            { path: "check/form/:email", element: <Others_form /> },//从审阅跳转到查看报名表，携email参数
            { path: "check/work/:email", element: <Others_work /> }//(作业同理)
        ]
    },
    { path: "/login", element: <Login /> },

]
export default router