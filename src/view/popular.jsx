import React from 'react';
import { useState, useEffect } from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import { Row, Col, Pagination } from 'antd';
import PopularCard from "../components/PopularCard";
import { getCount, rank } from '../service/recommend';

export default function Popular() {
    const [videoData, SetVideoData] = useState([]);

    const [count, SetCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18;

    const onChangePage = async (page) => {
        setCurrentPage(page);
        SetVideoData(await rank('-1', page, pageSize));
    };

    useEffect(() => {
        const initVideoData = async () => {
            SetVideoData(await rank('-1', currentPage, pageSize));
            SetCount(await getCount());
        }
        initVideoData();
    }, []);

    return (
        <div style={{ marginLeft: '70px', padding: '10px 20px', width: 'calc(100% - 220px)' }}>
            <Row justify="start" gutter={[16, 16]}>
                {videoData.map((video, index) => (
                    <Col key={index}>
                        <VideoCard video={video} />
                    </Col>
                ))}
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={count}
                    onChange={onChangePage}
                />
            </div>
        </div>
    );
}