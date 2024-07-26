import React from 'react';
import { useState, useEffect } from 'react';
import VideoCard from "../components/VideoCard";
import { Row, Col, Divider, Pagination, Carousel } from 'antd';
import { rank, recommend } from '../service/recommend';

export default function Home() {
    const [videoData, setVideoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const currentData = videoData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const [hotVideoData, setHotVideoData] = useState([]);

    useEffect(() => {
        const initVideoData = async () => {
            let res = await recommend();
            console.log(res);
            setVideoData(res.recommendRoomList);
            setHotVideoData(res.popularityRoomList);
        }
        initVideoData();
    }, []);

    return (
        <div style={{ padding: '0 30px' }}>
            <div style={{ padding: '0 30px' }}>
                <Carousel autoplay>
                    {hotVideoData.map((video) => (
                        <div key={video.id} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '320px' // 设置一个合适的高度
                        }}>
                            <a href={`/liveUser/${video.id}`}>
                                <img
                                    style={{ width: '640px', height: '320px', objectFit: 'cover' }}
                                    alt={video.roomName}
                                    src={video.coverUrl}
                                />
                            </a>
                        </div>
                    ))}
                </Carousel>
            </div>
            <Divider orientation="center" style={{ paddingBottom: '20px' }}> Recommend for you </Divider>
            <Row justify="center" gutter={[16, 16]}>
                {currentData.map((video, index) => (
                    <Col key={index}>
                        <VideoCard video={video} />
                    </Col>
                ))}
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={videoData.length}
                    onChange={onChangePage}
                />
            </div>
        </div>
    );
}
