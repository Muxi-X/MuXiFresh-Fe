import { Navigate } from "react-router-dom";
import First from "../components/first/first";
import JoinUs from "../pages/join-us";

const routes = [
    {
        path:"",
        element:<First/>
    },
    {
        path:"/intro",
        element:
    },
    {
        path:"/product",
        element:
    },
    {
        path:"/member",
        element:
    },
    {
        path:"/join",
        element:<JoinUs/>
    },
    {
        path:"/",
        element:<Navigate to=""/>
    }
]

export default routes