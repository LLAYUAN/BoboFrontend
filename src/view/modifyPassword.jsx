import { Flex, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ChangePasswordForm from "../components/ModifyPasswordForm"; // Assume this is the form component you will use
import "../css/login.css";
import { modifyPassword } from "../service/user"; // Assume this is the service function for changing password

export default function ModifyPassword() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('email'); // Retrieve the user's email from localStorage or any other method you use

    const handleChangePassword = async (values) => {
        console.log(values.oldPassword, values.newPassword, values.confirmNewPassword);
        if (values.newPassword !== values.confirmNewPassword) {
            notification.error({
                message: '修改密码失败',
                description: '两次输入新密码不一致'
            });
            return;
        }
        else if(values.oldPassword === values.newPassword){
            //处理新密码和老密码相同的情况
            notification.error({
                message: '修改密码失败',
                description: '新密码和老密码相同'
            });
        }else {
            const response = await modifyPassword(values.oldPassword, values.newPassword);
            console.log(response);
            if (response.code === 200) {
                notification.success({
                    message: '成功',
                    description: '密码修改成功',
                    placement: 'topRight'
                });
                localStorage.removeItem('token');
                localStorage.removeItem('tokenHead');
                localStorage.removeItem('userID');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                navigate("/login");
            } else {
                notification.error({
                    message: '旧密码错误',
                    description: response.message,
                    placement: 'topRight'
                });
            }
        }
    }

    const backgroundStyle = {
        backgroundColor: '#f0f0f0',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // 让背景充满整个视窗
    };

    return (
        <Flex style={backgroundStyle} justify='center' align='center'>
            <Flex justify='space-evenly' align='center' className="loginFormbg" vertical>
                <h2>修改密码</h2>
                <ChangePasswordForm handleChangePassword={handleChangePassword} email={userEmail} />
            </Flex>
        </Flex>
    )
}
