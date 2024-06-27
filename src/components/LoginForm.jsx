import React, {useMemo} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, ConfigProvider, notification} from 'antd';
import {useNavigate} from "react-router-dom";
import "../css/login.css";

const Context = React.createContext({
    name: 'Default',
});

export default function LoginForm({handleLogin}) {
    const navigate = useNavigate();
    const onFinish = (values) => {
        handleLogin(values);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Form: {
                        labelColor: 'rgba(0, 0, 0, 0.6)',
                        labelFontSize: '18px',
                    },
                    Input: {
                        inputFontSize: '16px',
                    },
                    Button: {
                        defaultBorderColor: '#0958d9',
                        defaultColor: '#0958d9',
                        defaultHoverBg: '#0958d9',
                        defaultHoverColor: '#ffffff',
                        defaultActiveBg: '#0958d9',
                        defaultActiveColor: '#ffffff',

                    },
                },
            }}>
            <Form
                name="normal_login"
                style={{width: '300px', margin: '0 auto',display:'flex',flexDirection:'column',justifyContent:'space-between'}}
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item >
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="default" htmlType="Login" className="login-form-button">
                        登 入
                    </Button>
                    Or <a href="" onClick={() => navigate('/register')} >register now!</a>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}

