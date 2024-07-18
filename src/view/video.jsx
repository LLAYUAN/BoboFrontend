import {Avatar, Button, Divider, Flex, Tabs, Tag} from "antd";
import {EditOutlined, GiftOutlined, HeartOutlined, LikeOutlined, UserAddOutlined} from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import UserList from "../components/UserList";
import UserBox from "../components/UserBox";
import VideoList from "../components/VideoList";
import React , { useState, useEffect }from "react";
import ReactPlayer from 'react-player';
import {useParams} from "react-router-dom";
import {getPlayingRecordVideo} from "../service/recordVideo"

export default function Video() {
    const [isLoading, setIsLoading] = useState(true);
    const [videoPlaying, setVideoPlaying] = useState({});
    const {videoID} = useParams();
    const playingVideoID = parseInt(videoID, 10);
    const loadPlayingVideo = async () => {
        setIsLoading(true);
        const data = await getPlayingRecordVideo(playingVideoID);
        console.log("在播放视频界面getPlayingRecordVideo:");
        console.log(data);
        await setVideoPlaying(data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPlayingVideo();
    }, [videoID]);
    

    useEffect(() => {
        console.log("修改videoPlaying:",videoPlaying);
    }, [videoPlaying]);

    if (isLoading) return <text>Loading...</text>
    return (
        <div style={{display: 'flex'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '70%', padding: '0 30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'end'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <h2 style={{marginLeft: '2%'}}>{videoPlaying.videoName}</h2>
                            <text style={{color: 'gray' , marginLeft: '2%'}}>{videoPlaying.videoIntro}</text>
                    </div>
                </div>
                <Divider style={{margin: '15px 0'}}/>
                
                <div style={{
                    paddingBottom: '56.25%', // 调整为16:9的宽高比
                    position: 'relative' // 设置为相对定位，以便子元素可以绝对定位
                }}>
                    <video
                        src={videoPlaying.videoUrl}
                        className="customReactPlayer"
                        controls
                        style={{
                            position: 'absolute', // 绝对定位以填满父元素
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </div>

            </div>

            <div style={{width: '30%', padding: '0 10px'}}>
                <UserBox ownerUserID={videoPlaying.ownerUserID} ownerNickName={videoPlaying.ownerName} ownerSelfIntro={videoPlaying.ownerIntro} ownerAvatarUrl={videoPlaying.ownerAvatarUrl}/>
                <VideoList ownerUserID={videoPlaying.ownerUserID}/>
            </div>
        </div>
    );
}