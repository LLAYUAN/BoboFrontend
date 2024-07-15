import {Button, Image, Input, List} from "antd";
import React, {useState, useEffect} from "react";
import VideoCard from "./VideoCard";
import { useNavigate } from 'react-router-dom';
import {DeleteOutlined} from "@ant-design/icons";
import {getUsersRecordVideos} from '../service/recordVideo';

export default function VideoList({ownerUserID}) {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const loadVideoList = async () => {
        const data = await getUsersRecordVideos(ownerUserID);
        console.log("getUsersRecordVideos:");
        console.log(data);
        setVideos(data);
    }

    useEffect(() => {
        loadVideoList();
    }, []);
    
    const handleClickVideo = (videoID) => {
        console.log("ClickVideo,videoID:",videoID);
        navigate(`/video/${videoID}`);
    }


    return (
        <div style={{ maxHeight:'600px',height: '75%',maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
            视频列表
            <List
                itemLayout="horizontal"
                dataSource={videos}
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
                    </List.Item>
                )}
            />
        </div>
    );
}