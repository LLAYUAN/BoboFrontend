import React from 'react';
import { useState, useEffect } from 'react';
import { rank } from '../service/recommend';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import { Row, Col, Divider, Pagination } from 'antd';
import CategorySelect from "../components/CategorySelect";


export default function Category() {
    const [selectedKey, setSelectedKey] = useState('-1');
    const [videoData, SetVideoData] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const currentData = videoData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };


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
                <Row justify="start" gutter={[16, 16]}>
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
        </div>
    );
}