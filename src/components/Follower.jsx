import React, { useState } from 'react';
import {Button, Modal, List, Divider} from 'antd';
import {EyeOutlined, HeartOutlined, LikeOutlined, UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";
import { nameToWebsite } from '../utils/utils';



const FollowerList = ({ follower }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(follower);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //delete
    function handleDelete(user) {
        console.log(user);
    }

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <HeartOutlined  style={{fontSize: '20px'}}/>
                    <h2 style={{paddingLeft:'4px'}}>Follower</h2>
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
                            title={user.nickname}
                            // description={`@${user.username}`}
                            description = {nameToWebsite(user.nickname)}
                        />
                        <Button icon={<UserDeleteOutlined />} onClick={handleDelete(user)}/>
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
                                title={user.nickname}
                                description={nameToWebsite(user.nickname)}
                            />
                            <Button icon={<UserDeleteOutlined />} onClick={handleDelete(user)}/>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

// // Example usage
// const follower = [
//     { name: 'Jared Palmer', username: 'jaredpalmer' },
//     { name: 'Olivia Davis', username: 'olivia' },
//     // Add more users here
// ];

const Follower = ({follower}) => <FollowerList follower={follower} />;

export default Follower;
