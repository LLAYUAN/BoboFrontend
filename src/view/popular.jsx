import React from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import {Row, Col, Divider} from 'antd';
import PopularCard from "../components/PopularCard";


const videoData = [
    { title: 'React', author: 'Facebook',rank:1,cover:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' },
    { title: 'Vue', author: 'Evan You',rank:2 ,cover:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
    { title: 'Angular', author: 'Google',rank:3,cover:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
    { title: 'Angular', author: 'Google',rank:4,cover:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'},
    { title: 'Angular', author: 'Google',rank:5,cover:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' },
    { title: 'Angular', author: 'Google',rank:5,cover:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' },
    // 添加更多数据
];
export default function Popular() {
    return (
        <div style={{padding:'30px 30px'}}>
            <Row justify="space-evenly" gutter={[16, 50]}>
                {videoData.map((video, index) => (
                    <Col >
                        <PopularCard title={video.title} author={video.author} rank={video.rank} cover={video.cover}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}