import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, DatePicker, notification} from 'antd';
import { UserOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { updateUserInfo } from '../service/user';

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
        setAvatarUrl(user.avatarUrl || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
    };

    const onFinish = async (values) => {
        if (values.user.birthday) {
            values.user.birthday = values.user.birthday.format('YYYY-MM-DD');
        }
        console.log('Received values:', values);
        let userInfoDTO = {
            nickname: values.user.name,
            email: values.user.email,
            birthday: values.user.birthday,
            introduction: values.user.introduction,
            avatarUrl: avatarUrl,
        }
        let res = await updateUserInfo(userInfoDTO);
        if(res.code === 200) {
            notification.success({
                message: '成功',
                description: '修改成功',
                placement: 'topRight'
            });
            localStorage.setItem('nickname', values.user.name);
        }
        else {
            notification.error({
                message: '失败',
                description: '修改失败',
                placement: 'topRight'
            });
        }
        console.log(res);
    };

    useEffect(() => {
        if (user.birthday) {
            const formattedBirthday = dayjs(user.birthday, 'YYYY-MM-DD');
            form.setFieldsValue({
                user: {
                    name: user.nickname || '',
                    email: user.email || '',
                    birthday: formattedBirthday, // 使用 dayjs 格式化日期
                    introduction: user.introduction || '',
                }
            });
        } else {
            form.setFieldsValue({
                user: {
                    name: user.nickname || '',
                    email: user.email || '',
                    introduction: user.introduction || '',
                }
            });
        }
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
                            required: true,
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
                >
                    <DatePicker style={{ width: '100%' }} />
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
