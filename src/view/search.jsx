import React from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import {Row, Col, Divider} from 'antd';
import {useLocation, useParams} from "react-router-dom";


const videoData = [
    { title: 'React', author: 'Facebook' },
    { title: 'Vue', author: 'Evan You' },
    { title: 'Angular', author: 'Google' },
    { title: 'Angular', author: 'Google' },
    { title: 'Angular', author: 'Google' },
    // 添加更多数据
];


export default function Search() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const value = query.get('query');
    console.log(value);
    
    return (
        <div style={{padding:'0 30px'}}>
            <Divider orientation="center" style={{paddingBottom:'20px'}}> 搜索结果 </Divider>
            <Row justify="space-between" gutter={[16, 16]}>
                {videoData.map((video, index) => (
                    <Col >
                        <VideoCard video={video} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}