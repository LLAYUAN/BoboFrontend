import LoginForm from "../components/LoginForm";
import {Flex, notification} from 'antd';
import {useNavigate} from "react-router-dom";
import {login} from "../service/login";

export default function LoginPage({setIsLogin}) {
    const navigate = useNavigate();

    const handleLogin = async(values) => {
        console.log(values.email, values.password);
        const response = await login(values.email, values.password);
        console.log(response);
        if (response.code === 200) {
            notification.success({
                message: '成功',
                description: '登录成功',
                placement: 'topRight'
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('tokenHead', response.data.tokenHead);
            localStorage.setItem('userID', response.data.userInfo.userID);
            localStorage.setItem("nickname", response.data.userInfo.nickname);
            localStorage.setItem("email", response.data.userInfo.email);
            navigate("/home");
        }
        else{
            notification.error({
                message: '邮箱或密码错误',
                description: response.message,
                placement: 'topRight'
            });
        }
    }

    const backgroundStyle = {
        // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)), url(${bgImage})`,
        // backgroundSize: 'cover',
        backgroundColor: '#f0f0f0',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // 让背景充满整个视窗
    };
    return (
        <Flex style={backgroundStyle} justify='center' align='center'>
            <Flex justify='space-evenly' align='center' vertical className="loginFormbg">
                    <h2>BOBOTVaaaaaaaa</h2>
                <LoginForm handleLogin={handleLogin}/>
            </Flex>
        </Flex>
    )
}