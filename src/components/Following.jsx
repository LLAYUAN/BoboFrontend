import React, { useState } from 'react';
import { Button, Modal, List, notification } from 'antd';
import { EyeOutlined, HeartOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { nameToWebsite } from '../utils/utils';

const FollowingList = ({ following, onUnfollow }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [followModalVisible, setFollowModalVisible] = useState(false); // State to control modal visibility
    const [deleteUser, setDeleteUser] = useState({}); // State to store user details
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (user) => {
        setDeleteUser(user);
        setFollowModalVisible(true);
    }

    const confirmUnFollow = async () => {
        setFollowModalVisible(false);
        try {
            await onUnfollow(deleteUser.userID); // Call the handler passed as prop
            notification.success({
                message: 'Success',
                description: 'Unfollowed successfully',
                placement: 'topRight'
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Unfollow failed',
                placement: 'topRight'
            });
        }
    }

    const handleDetail = (user) => {
        navigate(`/visitprofile/${user.userID}`);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <HeartOutlined style={{ fontSize: '20px' }} />
                    <h2 style={{ paddingLeft: '4px' }}>关注</h2>
                </div>
                <Button icon={<EyeOutlined />} type="link" onClick={showModal}>
                    View All
                </Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={following.slice(0, 2)} // Show only first 2 users initially
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<span className="anticon anticon-user" />}
                            title={<a onClick={() => handleDetail(user)}>{user.nickname}</a>}
                            description={
                                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}>
                                    {nameToWebsite(user.nickname)}
                                </div>
                            }
                        />
                        <Button icon={<UserDeleteOutlined />} onClick={() => handleDelete(user)} />
                    </List.Item>
                )}
            />

            <Modal
                title="关注"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={following}
                    renderItem={(user) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<span className="anticon anticon-user" />}
                                title={<a onClick={() => handleDetail(user)}>{user.nickname}</a>}
                                description={
                                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}>
                                        {nameToWebsite(user.nickname)}
                                    </div>
                                }
                            />
                            <Button icon={<UserDeleteOutlined />} onClick={() => handleDelete(user)} />
                        </List.Item>
                    )}
                />
            </Modal>

            <Modal
                title="取消关注"
                visible={followModalVisible}
                onOk={confirmUnFollow}
                onCancel={() => setFollowModalVisible(false)}
                okText="确认"
                cancelText="取消"
            >
                <p>确认要取消关注吗？</p>
            </Modal>
        </div>
    );
};

export default FollowingList;
