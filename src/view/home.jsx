import React from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import {Row, Col, Divider} from 'antd';


const videoData = [
    { roomID:1,title: 'React', author: 'Facebook' },
    { roomID:2,title: 'Vue', author: 'Evan You' },
    { roomID:3,title: 'Angular', author: 'Google' },
    { roomID:4,title: 'Angular', author: 'Google' },
    { roomID:5,title: 'Angular', author: 'Google' },
    // 添加更多数据
];
export default function Home() {
    return (
        <div style={{padding:'0 30px'}}>
            <div style={{padding:'0 30px'}}>
                <Autoplay />
            </div>
            <Divider orientation="center" style={{paddingBottom:'20px'}}> Recommend for you </Divider>
            <Row justify="space-between" gutter={[16, 16]}>
                {videoData.map((video, index) => (
                    <Col >
                        <VideoCard roomID={video.roomID} title={video.title} author={video.author} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}