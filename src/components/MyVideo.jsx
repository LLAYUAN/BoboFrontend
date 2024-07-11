import React, {useEffect, useState} from "react";
import {Button, Modal, List, Divider, Avatar, Image} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    DeleteOutlined, EyeOutlined,
    LikeOutlined, UploadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {getUsersRecordVideos} from '../service/recordVideo';
import useUploadVideoModal from "../hooks/useUploadVideoModal";
import VideoEditModal from "./VideoEditModal";



const MyVideoList = ({ identity, ownerID }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    //用于在videoEditModal操作后重新渲染profile页面(true/false都没关系,主要是状态要改变)
    const [updateVideoList, setUpdateVideoList] = useState(false);
    const [myVideo, setMyVideo] = useState([]);
    const handleChangeState = () => {
        setUpdateVideoList(!updateVideoList);
    };
    const navigate = useNavigate();

    const loadVideoList = async () => {
        const data = await getUsersRecordVideos(ownerID);
        console.log("getUsersRecordVideos:");
        console.log(data);
        setMyVideo(data);
    }

    useEffect(() => {
        loadVideoList();
    }, [updateVideoList]);

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
                dataSource={myVideo.slice(0, 2)} // Show only first 2 users initially
                renderItem={(video) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={video.imageUrl} width={160} height={90} style={{borderRadius: '10px',cursor:'pointer'}} preview={false} onClick={() => handleClickVideo(video.videoID)}/>}
                            title={video.videoName}
                            description={
                                <>
                                    {`@${video.ownerName}`}
                                    <br/>
                                    {video.videoIntro}
                                </>
                            }
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
                                description={
                                    <>
                                        {`@${video.ownerName}`}
                                        <br/>
                                        {video.videoIntro}
                                    </>
                                }
                            />
                            {identity==='up'&&<Button icon={<DeleteOutlined  />} onClick={() => handleDelete(video)}/>}
                        </List.Item>
                    )}
                />
            </Modal>

            <VideoEditModal isVisible={isUploadModalVisible} onOk={handleUploadOk} onCancel={handleUploadCancel} changeState={handleChangeState}/>
        </div>
    );
};

const MyVideo = ({identity, userID}) => <MyVideoList identity={identity} ownerID={userID}/>;

export default MyVideo
