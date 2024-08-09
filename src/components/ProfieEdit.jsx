import React, { useState, useEffect } from 'react';
import { Avatar, Button, Form, Input, DatePicker, Upload, notification } from 'antd';
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
// import { uploadFile } from '../service/uploadFile'; // 引入上传文件的服务
import { updateUserInfo,uploadFile } from '../service/user'; // Assuming uploadFile is moved to user service for consistency

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
    const [avatarFile, setAvatarFile] = useState(null); // Store avatar file
    const [form] = Form.useForm();

    const handleAvatarClick = () => {
        setAvatarUrl(user.avatarUrl || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
    };

    const beforeAvatarUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => setAvatarUrl(e.target.result); // Preview avatar
        reader.readAsDataURL(file);
        setAvatarFile(file); // Store avatar file
        return false; // Prevent default upload behavior
    };

    const handleAvatarUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await uploadFile(formData);
            const newAvatarUrl = response.data;
            setAvatarUrl(newAvatarUrl); // Set uploaded avatar URL
            console.log('Avatar URL:', newAvatarUrl);
            // notification.success({
            //     message: 'Upload Successful',
            //     description: 'Avatar uploaded successfully.',
            // });
            return newAvatarUrl; // Return new avatar URL
        } catch (error) {
            notification.error({
                message: 'Upload Failed',
                description: 'Avatar upload failed.',
            });
            throw error; // Throw error for external handling
        }
    };

    const onFinish = async (values) => {
        if (values.user.birthday) {
            values.user.birthday = values.user.birthday.format('YYYY-MM-DD');
        }
        console.log('Received values:', values);
        let newAvatarUrl = avatarUrl; // Retain current avatar URL
        if (avatarFile) {
            newAvatarUrl = await handleAvatarUpload(avatarFile); // Update avatar URL
        }
        let userInfoDTO = {
            nickname: values.user.name,
            email: values.user.email,
            birthday: values.user.birthday,
            introduction: values.user.introduction,
            avatarUrl: newAvatarUrl,
        };
        let res = await updateUserInfo(userInfoDTO);
        if (res.code === 200) {
            notification.success({
                message: '成功',
                description: '修改成功',
                placement: 'topRight'
            });
            localStorage.setItem('nickname', values.user.name);
        } else {
            notification.error({
                message: '失败',
                // 失败显示后端返回的错误信息
                description: res.message,
                placement: 'topRight'
            });
        }
        console.log(res);
    };

    useEffect(() => {
        setAvatarUrl(user.avatarUrl || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png');
        if (user.birthday) {
            const formattedBirthday = dayjs(user.birthday, 'YYYY-MM-DD');
            form.setFieldsValue({
                user: {
                    name: user.nickname || '',
                    email: user.email || '',
                    birthday: formattedBirthday, // Use dayjs to format date
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px',marginLeft:20 }}>
                <Avatar src={avatarUrl} size={64} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                <Upload
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={beforeAvatarUpload}
                    style={{ marginLeft: '10px' }}
                >
                    <Button
                        icon={<UploadOutlined />}
                        style={{marginLeft:20}}
                    >上传头像</Button>
                </Upload>
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
                    label="昵称"
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
                    label="邮箱"
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
                    label="生日"
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="简介">
                    <Input.TextArea />
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
