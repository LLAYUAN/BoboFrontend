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
    const pageSize = 12;

    const onChangePage = async (page) => {
        setCurrentPage(page);
        SetVideoData(await rank('-1', page, pageSize));
    };

    useEffect(() => {
        const initVideoData = async () => {
            let offset = (currentPage - 1) * pageSize;
            let video=await rank('-1', currentPage, pageSize);
            for (let i = 0; i < video.length; i++) {
                video[i].rank=offset+i+1;
            }
            SetVideoData(video);
            SetCount(await getCount());
        }
        initVideoData();
    }, []);

    return (
        <div style={{ marginLeft: '70px', padding: '10px 20px', width: 'calc(100% - 220px)' }}>
            <Row justify="space-evenly" gutter={[16, 16]}>
                {videoData.map((video, index) => (
                    <Col key={index}>
                        <PopularCard video={video} />
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