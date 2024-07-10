import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input,  notification,Modal} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {follow, unfollow} from "../service/user";
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

export default function ProfileVisit({userID,user}) {
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png');
    const [isFollowed, setIsFollowed] = useState(user.isFan); // State to track if user is followed
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    // const handleFollow = () => {
    //    // todo:关注用户
    //
    //     notification.success({
    //         message: '关注成功',
    //         description: '成功关注该用户',
    //     });
    // }
    // Function to handle follow/unfollow
    const handleFollow = async() => {
        setIsFollowed(true); // Update state to indicate user is followed
        let res = await follow(userID); // Call API to follow user
        if (res.code !== 200) {
            notification.error({
                message: '失败',
                description: '关注失败',
                placement: 'topMiddle'
            });
        }
    };

    // Function to handle unfollow confirmation
    const confirmUnfollow = async () => {
        setIsFollowed(false); // Update state to indicate user is unfollowed
        setModalVisible(false); // Hide the modal
        let res = await unfollow(userID); // Call API to unfollow user
        if (res.code !== 200) {
            notification.error({
                message: '失败',
                description: '关注失败',
                placement: 'topMiddle'
            });
        }
    };

    // Function to show modal for unfollow confirmation
    const showUnfollowModal = () => {
        setModalVisible(true);
    };

    useEffect(() => {
        console.log(user.nickname);
        console.log(user.email);
        console.log(user.birthday);
        console.log(user.introduction);
        if(user.avatarUrl){
            setAvatarUrl(user.avatarUrl);
        }
    }, [user]);

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
                <Avatar src={user.avatarUrl} size={64} icon={<UserOutlined/>}
                        style={{cursor: 'pointer'}}/>
                <div style={{
                    display: 'flex',
                    width: '90%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingTop: '10px'
                }}>
                    <p>关注：{user.followerCount}</p>
                    <p>粉丝：{user.followeeCount}</p>
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
                {/*<Button type="primary" onClick={handleFollow}>关注</Button>*/}
                {isFollowed ? (
                    <Button size="large" onClick={showUnfollowModal} style={{ marginRight: '5%' }}>
                        已关注
                    </Button>
                ) : (
                    <Button type="primary" onClick={handleFollow}>关注</Button>
                )}
            </div>
            {/* Unfollow confirmation modal */}
            <Modal
                title="取消关注"
                visible={modalVisible}
                onOk={confirmUnfollow}
                onCancel={() => setModalVisible(false)}
                okText="确认"
                cancelText="取消"
            >
                <p>确定要取消关注吗？</p>
            </Modal>
        </div>
    );
}
