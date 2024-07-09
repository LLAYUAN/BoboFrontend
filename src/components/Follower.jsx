import React, { useState } from 'react';
import {Button, Modal, List, Divider} from 'antd';
import {EyeOutlined, HeartOutlined, LikeOutlined, UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";
import { nameToWebsite } from '../utils/utils';
import {useNavigate} from "react-router-dom";

const FollowerList = ({ follower }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
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
    function handleDelete(user) {
        console.log(user);
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
                                {user.introduction}
                            </div>}
                        />
                        <Button icon={<UserDeleteOutlined/>} onClick={handleDelete(user)}/>
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
                            <Button icon={<UserDeleteOutlined />} onClick={handleDelete(user)}/>
                        </List.Item>
                    )}
                />
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
