import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, ConfigProvider, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Context = React.createContext({
    name: 'Default',
});

export default function ModifyPasswordForm({ handleChangePassword, email }) {
    const navigate = useNavigate();

    const onFinish = (values) => {
        handleChangePassword(values);
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
                name="modify_password"
                className="login-form"
                initialValues={{
                    email: email,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="Email"
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Old Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Old Password"
                    />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your New Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="New Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmNewPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your New Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm New Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="default" htmlType="submit" className="login-form-button">
                        修改密码
                    </Button>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}
