import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input, DatePicker, notification} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {personalProfile} from "../service/user";
import {useNavigate} from "react-router-dom";

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

export default function ProfileVisit({userID}) {
    const [avatarUrl, setAvatarUrl] = useState('https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png');
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const initUser = async () => {
        //todo：根据userID获取用户信息

        // let info = await personalProfile();
        // if(info.code !== 200){
        //     navigate('/login');
        //     return;
        // }
        // setUser(info.data);
        setUser({
            nickname: 'User',
            email: '',
            birthday: moment().format('1999-1-1'),
            introduction: 'This is a',
            following: 0,
            follower: 0,
        });
        console.log(user);
    }

    useEffect(() => {
        initUser();
    },[userID]);

    const handleAvatarClick = () => {
        // todo:这里可以根据需要设置新的头像URL
        setAvatarUrl('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
    };

    const handleFollow = () => {
       // todo:关注用户
        notification.success({
            message: '关注成功',
            description: '成功关注该用户',
        });
    }

    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                <UserOutlined style={{fontSize: '20px'}}/>
                <h2 style={{paddingLeft: '10px'}}>个人信息</h2>
            </div>
            <div style={{
                display: 'flex',
                width: '90%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '20px'
            }}>
                <Avatar src={avatarUrl} onClick={handleAvatarClick} size={64} icon={<UserOutlined/>}
                        style={{cursor: 'pointer'}}/>
                <div style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingTop: '10px'
                }}>
                    <p>关注：{user.following}</p>
                    <p>粉丝：{user.follower}</p>
                </div>
            </div>
            <Form
                {...layout}
                name="nest-messages"
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['user', 'nickname']}
                    label="Name"
                >
                    <Input defaultValue={user.nickname} readOnly/>
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
                    <Input defaultValue={user.email} readOnly/>
                </Form.Item>
                <Form.Item
                    name={['user', 'birthday']}
                    label="Birthday"
                >
                    <Input defaultValue={user.birthday} readOnly/>
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea defaultValue={user.introduction} readOnly/>
                </Form.Item>
            </Form>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button type="primary" onClick={handleFollow}>关注</Button>
            </div>
        </div>
    );
}
