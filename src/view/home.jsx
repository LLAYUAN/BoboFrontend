import React from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import {Row, Col, Divider} from 'antd';


const videoData = [
    { title: 'React', author: 'Facebook' },
    { title: 'Vue', author: 'Evan You' },
    { title: 'Angular', author: 'Google' },
    { title: 'Angular', author: 'Google' },
    { title: 'Angular', author: 'Google' },
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
                        <VideoCard title={video.title} author={video.author} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}