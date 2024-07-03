import React, {useState} from 'react';
import {Avatar, Button, Form, Input, notification} from 'antd';
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

const user = {
    following:123,
    follower:456,
    name: 'John Doe',
    email: '1@1',
    age: 32,
    introduction: 'A brief introduction about yourself',
}

export default function ProfileVisit() {
    const [avatarUrl, setAvatarUrl] = useState('https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png');

    const handleAvatarClick = () => {
        // 这里可以根据需要设置新的头像URL
        setAvatarUrl('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
    };

    const handleFollow = () => {
        // 这里可以根据需要设置新的头像URL
        notification.success({
            message: '关注成功',
            description: '成功关注该用户',
        });
    }

    return (
        <div>
            <div style={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                <UserOutlined style={{fontSize: '20px'}}/>
                <h2 style={{paddingLeft:'10px'}}>Profile</h2>
            </div>
            <div style={{display: 'flex', width:'90%',flexDirection:'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px'}}>
                <Avatar src={avatarUrl} onClick={handleAvatarClick} size={64} icon={<UserOutlined/>}
                        style={{cursor: 'pointer'}}/>
                <div style={{display: 'flex', width:'90%',justifyContent: 'space-evenly', alignItems: 'center', paddingTop: '10px'}}>
                    <p>关注：{user.following}</p>
                    <p>粉丝：{user.follower}</p>
                </div>
            </div>
            <Form
                disabled
                {...layout}
                name="nest-messages"
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
                    <Input defaultValue={user.name}/>
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
                    <Input defaultValue={user.email}/>
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
                    <Input defaultValue={user.age}/>
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea defaultValue={user.introduction}/>
                </Form.Item>
            </Form>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Button type="primary" onClick={handleFollow}>关注</Button>
            </div>
        </div>
    );
}