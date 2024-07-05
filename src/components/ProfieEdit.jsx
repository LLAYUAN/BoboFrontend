import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, InputNumber } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export default function ProfileEdit({ user }) {
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png');
    const [form] = Form.useForm();

    const handleAvatarClick = () => {
        // 可根据需要设置新的头像URL
        setAvatarUrl(user.avatarUrl || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        // 在这里可以处理提交逻辑，例如发送到后端或其他操作
    };

    useEffect(() => {
        form.setFieldsValue({
            user: {
                name: user.nickname || '',
                email: user.email || '',
                birthday: user.birthday || '',
                introduction: user.introduction || '',
            }
        });
    }, [user, form]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <UserOutlined style={{ fontSize: '20px' }} />
                <h2 style={{ paddingLeft: '10px' }}>Profile</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px' }}>
                <Avatar src={avatarUrl} onClick={handleAvatarClick} size={64} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
            </div>
            <Form
                {...layout}
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Please input a valid email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'birthday']}
                    label="Birthday"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 99,
                            message: 'Please input a valid age between 0 and 99!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
