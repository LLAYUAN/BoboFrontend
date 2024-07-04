import React, { useState } from 'react';
import {Button, Modal, List, Divider, Avatar, Image} from 'antd';
import { useNavigate } from 'react-router-dom';
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

    //delete
    const handleDelete = (video) => {
        console.log(video);
    }

    const handleClickVideo = (videoID) => {
        console.log("ClickVideo,videoID:",videoID);
        navigate(`/video/${videoID}`);
    }

    const { isModalVisible: isUploadModalVisible, showModal: showUploadModal, handleOk: handleUploadOk, handleCancel: handleUploadCancel } = useUploadVideoModal();


    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <VideoCameraOutlined style={{fontSize: '20px'}}/>
                    <h2 style={{paddingLeft:'10px'}}>直播回放</h2>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    {identity==='up'&&<Button icon={<UploadOutlined/>} type="link" onClick={showUploadModal}>
                        上传视频
                    </Button>}
                    <Button icon={<EyeOutlined />} type="link" onClick={showModal}>
                        查看全部
                    </Button>
                </div>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={myVideo.slice(0, 4)} // Show only first 2 users initially
                renderItem={(video) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={video.imageUrl} width={160} height={90} style={{borderRadius: '10px',cursor:'pointer'}} preview={false} onClick={() => handleClickVideo(video.videoID)}/>}
                            title={video.videoName}
                            description={`@${video.ownerName}`}
                        />
                        {identity==='up'&&<Button icon={<DeleteOutlined  />} onClick={() => handleDelete(video)}/>}
                    </List.Item>
                )}
            />

            <Modal
                title="直播回放"
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
                                avatar={<Image src={video.imageUrl} width={160} height={90} style={{borderRadius: '10px',cursor:'pointer'}} preview={false} onClick={() => handleClickVideo(video.videoID)}/>}
                                title={video.videoName}
                                description={`@${video.ownerName}`}
                            />
                            {identity==='up'&&<Button icon={<DeleteOutlined  />} onClick={() => handleDelete(video)}/>}
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
    { videoID: 0,videoName: 'Video0', ownerName: 'owner0',ownerUserID: 0,imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', videoAddress:"videoAddress0"},
    { videoID: 1,videoName: 'Video1', ownerName: 'owner0',ownerUserID: 0,imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', videoAddress:"videoAddress1"},
    { videoID: 2,videoName: 'Video2', ownerName: 'owner0',ownerUserID: 0,imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', videoAddress:"videoAddress2"},
    { videoID: 3,videoName: 'Video3', ownerName: 'owner0',ownerUserID: 0,imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png', videoAddress:"videoAddress3"},
    // Add more users here
];

const MyVideo = ({identity}) => <MyVideoList identity={identity} myVideo={myVideo} />;

export default MyVideo
