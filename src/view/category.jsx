import React from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import {Row, Col, Divider} from 'antd';
import CategorySelect from "../components/CategorySelect";


const videoData = [
    { roomID:1,title: 'React', author: 'Facebook' },
    { roomID:1,title: 'Vue', author: 'Evan You' },
    { roomID:1,title: 'Angular', author: 'Google' },
    { roomID:1,title: 'Angular', author: 'Google' },
    { roomID:1,title: 'Angular', author: 'Google' },
    // 添加更多数据
];
export default function Category() {
    return (
        <div style={{ display: 'flex' }}>
            {/* 左侧固定的 CategorySelect */}
            <div style={{ position: 'fixed', width: '200px', height: '100vh', overflowY: 'auto' }}>
                <CategorySelect />
            </div>

            {/* 右侧可以滑动的部分 */}
            <div style={{ marginLeft: '220px', padding: '10px 10px', width: 'calc(100% - 220px)' }}>
                <Row justify="space-between" gutter={[10, 30]}>
                    {videoData.map((video, index) => (
                        <Col key={index}>
                            <VideoCard roomID={video.roomID} title={video.title} author={video.author} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}