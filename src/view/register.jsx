import {Flex, notification} from 'antd';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import RigisterForm from "../components/RegisterForm";
import "../css/login.css";
import {register} from "../service/login";

export default function Register({setIsLogin}) {
    const navigate = useNavigate();

    const handleRegister = async(values) => {
        console.log(values.email, values.password);
        if (values.password !== values.confirm) {
            notification.error({
                message: '注册失败',
                description: '两次输入密码不一致'
            });
            return;
        }

        else {
            const response = await register(values.email, values.password);
            console.log(response);
            if (response.code === 200) {
                notification.success({
                    message: '成功',
                    description: '注册成功',
                    placement: 'topMiddle'
                });
                navigate("/login");
            }
            else{
                notification.error({
                    message: '该用户已存在',
                    description: response.message,
                    placement: 'topMiddle'
                });
            }
        }
    }

    const backgroundStyle = {
        // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url(${bgImage})`,
        backgroundColor: '#f0f0f0',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // 让背景充满整个视窗
    };
    return (
        <Flex style={backgroundStyle} justify='center' align='center'>
            <Flex justify='space-evenly' align='center' className="loginFormbg" vertical>
                <h2>直播平台</h2>
                <RigisterForm handleLogin={handleRegister}/>
            </Flex>
        </Flex>
    )
}