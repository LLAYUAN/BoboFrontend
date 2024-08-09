import React from 'react';
import {LockOutlined, UserOutlined,MailOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, ConfigProvider, notification} from 'antd';
import {useNavigate} from "react-router-dom";
import "../css/login.css";

const Context = React.createContext({
    name: 'Default',
});

export default function RegisterForm({handleLogin}) {
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
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="Email"
                    />
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
                <Form.Item
                    name="confirm"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="default" htmlType="Login" className="login-form-button">
                        注 册
                    </Button>
                    Or <a href="" onClick={() => navigate('/login')}>立即登录!</a>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}

