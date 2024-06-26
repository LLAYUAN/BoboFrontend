import React, {useState} from 'react';
import {Avatar, Button, Form, Input, InputNumber} from 'antd';
import {UserOutlined} from "@ant-design/icons";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};

export default function Home() {
    const [avatarUrl, setAvatarUrl] = useState('https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png');

    const handleAvatarClick = () => {
        // 这里可以根据需要设置新的头像URL
        setAvatarUrl('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
    };
    return (
        <div>
            <div style={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                <UserOutlined style={{fontSize: '20px'}}/>
                <h2 style={{paddingLeft:'10px'}}>Profile</h2>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px'}}>
                <Avatar src={avatarUrl} onClick={handleAvatarClick} size={64} icon={<UserOutlined/>}
                        style={{cursor: 'pointer'}}/>
            </div>
            <Form
                {...layout}
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
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name={['user', 'age']}
                    label="Age"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 99,
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item name={['user', 'website']} label="Website">
                    <Input/>
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}