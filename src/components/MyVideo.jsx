import React, { useState } from 'react';
import {Button, Modal, List, Divider, Avatar, Image} from 'antd';
import {
    DeleteOutlined, EyeOutlined,
    LikeOutlined, UploadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import useUploadVideoModal from "../hooks/useUploadVideoModal";
import VideoEditModal from "./VideoEditModal";



const MyVideoList = ({ identity, myVideo }) => {
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
    function handleDelete(video) {
        console.log(video);
    }

    const { isModalVisible: isUploadModalVisible, showModal: showUploadModal, handleOk: handleUploadOk, handleCancel: handleUploadCancel } = useUploadVideoModal();


    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <VideoCameraOutlined style={{fontSize: '20px'}}/>
                    <h2 style={{paddingLeft:'10px'}}>My Videos</h2>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Button icon={<UploadOutlined />} type="link" onClick={showUploadModal}>
                        上传视频
                    </Button>

                    <Button icon={<EyeOutlined />} type="link" onClick={showModal}>
                        查看全部
                    </Button>
                </div>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={myVideo.slice(0, 2)} // Show only first 2 users initially
                renderItem={(video) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={video.imageUrl} width={160} height={90} style={{borderRadius: '10px'}}/>}
                            title={video.name}
                            description={`@${video.username}`}
                        />
                        {identity==='up'&&<Button icon={<DeleteOutlined  />} onClick={handleDelete(video)}/>}
                    </List.Item>
                )}
            />

            <Modal
                title="My videos"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={myVideo}
                    renderItem={(video) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image src={video.imageUrl} width={160} height={90} style={{borderRadius: '10px'}}/>}
                                title={video.name}
                                description={`@${video.username}`}
                            />
                            {identity==='up'&&<Button icon={<DeleteOutlined  />} onClick={handleDelete(video)}/>}
                        </List.Item>
                    )}
                />
            </Modal>

            <VideoEditModal isVisible={isUploadModalVisible} onOk={handleUploadOk} onCancel={handleUploadCancel} />
        </div>
    );
};

// Example usage
const myVideo = [
    { name: 'Jared Palmer', username: 'jaredpalmer',imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
    { name: 'Olivia Davis', username: 'olivia' },
    // Add more users here
];

const MyVideo = ({identity}) => <MyVideoList identity={identity} myVideo={myVideo} />;

export default MyVideo
