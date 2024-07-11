import {Button, Image, Input, List} from "antd";
import React from "react";
import VideoCard from "./VideoCard";
import { useNavigate } from 'react-router-dom';
import {DeleteOutlined} from "@ant-design/icons";

export default function VideoList() {
    const navigate = useNavigate();
    //todo:从后端获取视频列表
    const videos = [
        { videoID: 0,videoName: 'Video0', ownerName: 'owner0',imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',videoIntro:'简介1'},
        { videoID: 1,videoName: 'Video1', ownerName: 'owner0',imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',videoIntro:'简介2'},
        { videoID: 2,videoName: 'Video2', ownerName: 'owner0',imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',videoIntro:'简介3'},
        { videoID: 3,videoName: 'Video3', ownerName: 'owner0',imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',videoIntro:'简介4'},
        // Add more users here
    ];

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