import React, {useEffect, useState} from "react";
import {Button, Modal, List, Divider, Avatar, Image, Pagination} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    DeleteOutlined, EyeOutlined,
    LikeOutlined, UploadOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {getUsersRecordVideos,getPlayingRecordVideo, deleteRecordVideoByRecordVideoID} from '../service/recordVideo';
import useUploadVideoModal from "../hooks/useUploadVideoModal";
import VideoEditModal from "./VideoEditModal";
import {transUrltoFileName} from "../utils/utils";
import {deleteFile} from '../service/deleteFile';



const MyVideoList = ({ identity, ownerID }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    //用于在videoEditModal操作后重新渲染profile页面(true/false都没关系,主要是状态要改变)
    const [updateVideoList, setUpdateVideoList] = useState(false);
    const [isDeleteVideoModalVisible, setIsDeleteVideoModalVisible] = useState(false);
    const [videoIDtoDelete, setVideoIDtoDelete] = useState(0);
    const [videoNametoDelete, setVideoNametoDelete] = useState('');
    const [imageUrltoDelete, setImageUrltoDelete] = useState('');
    const [myVideo, setMyVideo] = useState([]);
    const [paginatedVideoList, setPaginatedVideoList] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
    const handleChangeState = () => {
        setUpdateVideoList(!updateVideoList);
    };
    const navigate = useNavigate();

    const loadVideoList = async () => {
        const data = await getUsersRecordVideos(ownerID);
        console.log("getUsersRecordVideos:");
        console.log(data);
        await setMyVideo(data);
    }

    useEffect(() => {
        loadVideoList();
    }, [updateVideoList]);

    useEffect(() => {
        const tmp_paginatedVideoList = myVideo.slice(0, 6);
        setPaginatedVideoList(tmp_paginatedVideoList);
    }, [myVideo]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePageChange = (page, pageSize) => {
        console.log("handlePageChange", page);
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const tmp_paginatedVideoList = myVideo.slice(startIndex, endIndex);
        setPaginatedVideoList(tmp_paginatedVideoList);
        setPagination({ current: page, pageSize });
    };

    //delete
    const handleDelete = (video) => {
        console.log(video);
        setVideoIDtoDelete(video.videoID);
        setVideoNametoDelete(video.videoName);
        setImageUrltoDelete(video.imageUrl);
        setIsDeleteVideoModalVisible(true);
    }

    const confirmDelete = async () => {
        console.log("confirmDelete",videoIDtoDelete, imageUrltoDelete);
        //先删除数据库
        await deleteRecordVideoByRecordVideoID(videoIDtoDelete);
        //再删除资源
        const videoAllInfotoDelete = await getPlayingRecordVideo(videoIDtoDelete);
        const videoUrltoDelete = videoAllInfotoDelete.videoUrl;
        const videoFileNametoDelete = transUrltoFileName(videoUrltoDelete);
        const imageFileNametoDelete = transUrltoFileName(imageUrltoDelete);
        if (deleteFile(videoFileNametoDelete)) {
            console.log("删除video资源成功")
        } else {
            console.log("删除video资源失败")
        }
        if (deleteFile(imageFileNametoDelete)) {
            console.log("删除image资源成功")
        } else {
            console.log("删除image资源失败")
        }
        setVideoNametoDelete('');
        setVideoIDtoDelete(0);
        setImageUrltoDelete('');
        setIsDeleteVideoModalVisible(false);
        handleChangeState();
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
                    dataSource={paginatedVideoList}
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
                <Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={myVideo.length}
                    onChange={handlePageChange}
                    style={{ marginTop: 16 }}
                />
            </Modal>

            <VideoEditModal isVisible={isUploadModalVisible} onOk={handleUploadOk} onCancel={handleUploadCancel} changeState={handleChangeState}/>

            <Modal
                title="删除视频"
                visible={isDeleteVideoModalVisible}
                onOk={confirmDelete}
                onCancel={() => setIsDeleteVideoModalVisible(false)}
                okText="确认"
                cancelText="取消"
            >
                <p>确定要删除视频“{videoNametoDelete}”吗？</p>
            </Modal>
        </div>
    );
};

const MyVideo = ({identity, userID}) => <MyVideoList identity={identity} ownerID={userID}/>;

export default MyVideo
