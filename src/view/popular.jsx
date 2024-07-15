import React from 'react';
import { useState, useEffect } from 'react';
import { rank } from '../service/recommend';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import { Row, Col, Divider } from 'antd';
import PopularCard from "../components/PopularCard";

export default function Popular() {
    const [videoData, SetVideoData] = useState([]);

    useEffect(() => {
        const initVideoData = async () => {
            SetVideoData(await rank(-1));
        }
        initVideoData();
    }, []);

    return (
        <div style={{ padding: '30px 30px' }}>
            <Row justify="space-evenly" gutter={[16, 50]}>
                {videoData.map((video, index) => (
                    <Col >
                        <PopularCard video={video} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}