import React from 'react';
import { useState, useEffect } from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import { Row, Col, Divider, Pagination, Carousel } from 'antd';
import { rank, recommend } from '../service/recommend';


export default function Home() {
    const [videoData, SetVideoData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const currentData = videoData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const [hotVideoData, SetHotVideoData] = useState([]);

    useEffect(() => {
        const initVideoData = async () => {
            let res = await recommend();
            console.log(res);
            SetVideoData(res);
            SetHotVideoData(await rank(-1));
        }
        initVideoData();
    }, []);
    return (
        <div style={{ padding: '0 30px' }}>
            <div style={{ padding: '0 30px' }}>
                {/* <Autoplay hotVideoData={hotVideoData} /> */}
                <Carousel autoplay>
                    {hotVideoData.map((video) => (
                        <div style={{
                            width: 320,
                            margin: '20px 20px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img
                                style={{ width: '640px', height: '320px' }}
                                alt={video.roomName}
                                src={video.coverUrl}
                                href={`/liveUser/${video.id}`}
                            />
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
