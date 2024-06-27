import LoginForm from "../components/LoginForm";
import {Flex, notification} from 'antd';
import bgImage from '../img/bg.jpg';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
// import {register} from "../service/login";
// import {setCookie} from "../service/cookie";
import RigisterForm from "../components/RegisterForm";

export default function RegisterPage({setIsLogin}) {
    const navigate = useNavigate();
    const handleRegister = (values) => {
        // if (values.password !== values.confirm) {
        //     notification.error({
        //         message: '注册失败',
        //         description: '两次输入密码不一致'
        //     });
        //     return;
        // }
        //
        // register(values.username, values.password, values.email).then(data => {
        //     if (data === "exist") {
        //         notification.error({
        //             message: '注册失败',
        //             description: '用户名已存在'
        //         });
        //         return;
        //     }
        //     if (data === "success") {
        //         notification.success({
        //             message: '注册成功',
        //             description: '请登录'
        //         });
        //         navigate("/login");
        //         return;
        //     }
        // });
    }

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // 让背景充满整个视窗
    };
    return (
        <Flex style={backgroundStyle} justify='center' align='center'>
            <Flex justify='space-evenly' align='center' className="w-96 h-96 bg-white rounded-lg" vertical>
                <p className="text-2xl">直播平台</p>
                <RigisterForm handleLogin={handleRegister}/>
            </Flex>
        </Flex>
    )
}