import React, { useState } from 'react';
import { Avatar, Button, Modal,notification } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import {follow,unfollow} from '../service/user';

export default function UserBox({userID,nickname,description}) {
    const [isFollowed, setIsFollowed] = useState(false); // State to track if user is followed
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    const user = {
        nickname: '用户名',
        selfIntro: '用户简介',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    };

    // Function to handle follow/unfollow
    const handleFollow = async() => {
        setIsFollowed(true); // Update state to indicate user is followed
        let res = await follow(2); // Call API to follow user
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
        let res = await unfollow(2); // Call API to unfollow user
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

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', padding: '10px 10px', alignItems: 'center' }}>
                <Avatar size={64} src={user.avatar} />
                <div style={{ marginLeft: '10px' }}>
                    <h3>{user.nickname}</h3>
                    <p>{user.selfIntro}</p>
                </div>
            </div>
            {isFollowed ? (
                <Button size="large" onClick={showUnfollowModal} style={{ marginRight: '5%' }}>
                    已关注
                </Button>
            ) : (
                <Button icon={<UserAddOutlined />} size="large" onClick={handleFollow} style={{ marginRight: '5%' }}>
                    关注
                </Button>
            )}

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
