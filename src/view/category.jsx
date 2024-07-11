import React from 'react';
import { useState, useEffect } from 'react';
import { rank } from '../service/recommend';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import { Row, Col, Divider } from 'antd';
import CategorySelect from "../components/CategorySelect";


export default function Category() {
    const [selectedKey, setSelectedKey] = useState('0');
    const [videoData, SetVideoData] = useState([]);

    useEffect(() => {
        const initVideoData = async () => {
            SetVideoData(await rank(selectedKey));
        }
        initVideoData();
    }, [selectedKey]);

    return (
        <div style={{ display: 'flex' }}>
            {/* 左侧固定的 CategorySelect */}
            <div style={{ position: 'fixed', width: '200px', height: '100vh', overflowY: 'auto' }}>
                <CategorySelect selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
            </div>

            {/* 右侧可以滑动的部分 */}
            <div style={{ marginLeft: '220px', padding: '10px 10px', width: 'calc(100% - 220px)' }}>
                <Row justify="space-between" gutter={[10, 30]}>
                    {videoData.map((video, index) => (
                        <Col key={index}>
                            <VideoCard video={video} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}