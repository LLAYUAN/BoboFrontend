import React, { useState } from 'react';
import {Button, Modal, List, Divider} from 'antd';
import {EyeOutlined, LikeOutlined, UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";



const FollowingList = ({ following }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                    <LikeOutlined style={{fontSize: '20px'}}/>
                    <h2 style={{paddingLeft:'4px'}}>Following</h2>
                </div>
                <Button icon={<EyeOutlined />} type="link" onClick={showModal}>
                    查看全部
                </Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={following.slice(0, 2)} // Show only first 2 users initially
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<span className="anticon anticon-user" />}
                            title={user.name}
                            description={`@${user.username}`}
                        />
                        <Button icon={<UserDeleteOutlined />} onClick={handleDelete(user)}/>
                    </List.Item>
                )}
            />

            <Modal
                title="Following"
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
                                title={user.name}
                                description={`@${user.username}`}
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
const following = [
    { name: 'Jared Palmer', username: 'jaredpalmer' },
    { name: 'Olivia Davis', username: 'olivia' },
    // Add more users here
];

const Following = () => <FollowingList following={following} />;

export default Following;
