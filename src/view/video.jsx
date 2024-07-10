import {Avatar, Button, Divider, Flex, Tabs, Tag} from "antd";
import {EditOutlined, GiftOutlined, HeartOutlined, LikeOutlined, UserAddOutlined} from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import UserList from "../components/UserList";
import UserBox from "../components/UserBox";
import VideoList from "../components/VideoList";
import React from "react";
import ReactPlayer from 'react-player';

export default function Video() {
    const title = '直播间的title';
    // const tags = ['purple', 'magenta', 'red', 'volcano'];
    const intro = '直播间的简介';
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
                        <h2 style={{marginLeft: '2%'}}>{title}</h2>
                            <text style={{color: 'gray' , marginLeft: '2%'}}>{intro}</text>
                    </div>
                </div>
                <Divider style={{margin: '15px 0'}}/>
                
                <div style={{
                    paddingBottom: '56.25%', // 调整为16:9的宽高比
                    position: 'relative' // 设置为相对定位，以便子元素可以绝对定位
                }}>
                    <ReactPlayer
                        url={`http://localhost:8080/resources/Screenrecorder-2024-05-15-22-13-05-599.mp4`}
                        className="customReactPlayer"
                        controls={true}
                        style={{
                            position: 'absolute', // 绝对定位以填满父元素
                            top: 0,
                            left: 0,
                        }}
                        width = '100%'
                        height = '100%'
                    />
                </div>

            </div>

            <div style={{width: '30%', padding: '0 10px'}}>
                <UserBox/>
                <VideoList />
            </div>
        </div>
    );
}