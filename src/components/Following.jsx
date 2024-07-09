import React, { useState } from 'react';
import {Button, Modal, List, Divider} from 'antd';
import {EyeOutlined, LikeOutlined, UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";
import { nameToWebsite } from '../utils/utils';
import {useNavigate} from "react-router-dom";

const FollowingList = ({ following }) => {
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
        //跳转到用户详情页
        navigate(`/visitprofile/${user.userID}`);
        console.log(user);
    }

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <LikeOutlined style={{fontSize: '20px'}}/>
                    <h2 style={{paddingLeft:'4px'}}>关注</h2>
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
                            avatar={<span className="anticon anticon-user"/>}
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
                            <Button icon={<UserDeleteOutlined/>} onClick={handleDelete(user)}/>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

// // Example usage
// const following = [
//     { name: 'Jared Palmer', username: 'jaredpalmer' },
//     { name: 'Olivia Davis', username: 'olivia' },
//     // Add more users here
// ];


const Following = ({following}) => <FollowingList following={following} />;

export default Following;
