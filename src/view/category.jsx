import React from 'react';
import { useState, useEffect } from 'react';
import { getCount, rank } from '../service/recommend';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import { Row, Col, Divider, Pagination } from 'antd';
import CategorySelect from "../components/CategorySelect";


export default function Category() {
    const [selectedKey, setSelectedKey] = useState('-1');
    const [videoData, SetVideoData] = useState([]);

    const [count, SetCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;
    // const currentData = videoData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const onChangePage = async (page) => {
        setCurrentPage(page);
        SetVideoData(await rank(selectedKey, page, pageSize));
    };


    useEffect(() => {
        const initVideoData = async () => {
            SetVideoData(await rank(selectedKey, currentPage, pageSize));
            SetCount(await getCount());
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
        </div>
    );
}