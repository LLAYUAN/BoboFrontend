import React, { useState } from 'react';
import {Button, Modal, List, Divider, notification} from 'antd';
import {EyeOutlined, HeartOutlined, LikeOutlined, UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";
import { nameToWebsite } from '../utils/utils';
import {useNavigate} from "react-router-dom";
import {unfollow} from "../service/user";

const FollowerList = ({ follower }) => {
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

    //todo:delete
    const handleDelete = (user) =>{
        setDeleteUser(user);
        console.log(deleteUser);
        setFollowModalVisible(true);
    }

    const confirmUnFollow = async () => {
        setFollowModalVisible(false);
        let res = await unfollow(deleteUser.userID); // Call API to unfollow user
        if (res.code !== 200) {
            notification.error({
                message: '失败',
                description: '关注失败',
                placement: 'topRight'
            });
        }
        console.log(deleteUser);
    }

    //detail
    function handleDetail(user) {
        navigate(`/visitprofile/${user.userID}`);
        console.log(user);
    }

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <HeartOutlined  style={{fontSize: '20px'}}/>
                    <h2 style={{paddingLeft:'4px'}}>粉丝</h2>
                </div>
                <Button icon={<EyeOutlined />} type="link" onClick={showModal}>
                    查看全部
                </Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={follower.slice(0, 2)} // Show only first 2 users initially
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<span className="anticon anticon-user" />}
                            title={<a onClick={() => handleDetail(user)}>
                                {user.nickname}
                            </a>}
                            description ={<div
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '90%' // 根据需要设置最大宽度，或者可以设置具体数值
                                }}

                            >
                                {nameToWebsite(user.nickname)}
                            </div>}
                        />
                        {/*<Button icon={<UserDeleteOutlined />} onClick={() => handleDelete(user)}/>*/}
                    </List.Item>
                )}
            />

            <Modal
                title="Follower"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={follower}
                    renderItem={(user) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<span className="anticon anticon-user" />}
                                title={<a onClick={() => handleDetail(user)}>
                                    {user.nickname}
                                </a>}
                                description={<div
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '90%' // 根据需要设置最大宽度，或者可以设置具体数值
                                    }}
                                >
                                    {user.introduction}
                                </div>}
                            />
                            {/*<Button icon={<UserDeleteOutlined />} onClick={() => handleDelete(user)}/>*/}
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
                <p>确定要取消关注吗？</p>
            </Modal>
        </div>
    );
};
// Example usage
// const follower = [
//     { name: 'Jared Palmer', username: 'jaredpalmer' },
//     { name: 'Olivia Davis', username: 'olivia' },
//     // Add more users here
// ];

const Follower = ({follower}) => <FollowerList follower={follower} />;

export default Follower;
