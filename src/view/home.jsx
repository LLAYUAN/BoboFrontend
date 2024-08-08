import React from 'react';
import { useState, useEffect } from 'react';
import VideoCard from "../components/VideoCard";
import { Row, Col, Divider, Pagination, Carousel, Space } from 'antd';
import { rank, recommend } from '../service/recommend';

export default function Home() {
    const [videoData, setVideoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
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
            <div style={{ padding: '0 30px',backgroundColor: '#f0f0f0' } }>
                <Carousel autoplay>
                    {hotVideoData.map((video) => (
                        <div key={video.id}>
                            <Space align='start' style={{ display: 'flex', justifyContent: 'center'}}>
                                <a href={`/liveUser/${video.id}`}>
                                    <img
                                        style={{ width: '480px', height: '270px', objectFit: 'cover' }}
                                        alt={video.roomName}
                                        src={video.coverUrl}
                                    />
                                </a>
                            </Space>
                        </div>
                    ))}
                </Carousel>
            </div>
            <Divider
                orientation="center"
                style={{ paddingBottom: '20px', color: 'black', borderColor: 'black' }}
                dashed={false}
            >
                Recommend for you
            </Divider>

            <Row justify="center" gutter={[16, 16]}>
                {currentData.map((video, index) => (
                    <Col key={index}>
                        <VideoCard video={video} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
