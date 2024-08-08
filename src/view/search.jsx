import React, {useEffect, useState} from 'react';
import VideoCard from "../components/VideoCard";
import Autoplay from "../components/Autoplay";
import {Row, Col, Divider} from 'antd';
import {useLocation, useParams} from "react-router-dom";
import {search} from "../service/search";


export default function Search() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const value = query.get('query');
    console.log(value);

    const[videoData, setVideoData] = useState([]);

    const initVideoData = async () => {
        console.log('initVideoData');
        let res = await search(value);
        console.log(res);
        setVideoData(res);
    }

    useEffect(() => {
        initVideoData();
    }, [value]);
    
    return (
        <div style={{padding:'0 30px'}}>
            <Divider orientation="center" style={{paddingBottom:'20px'}}> 搜索结果 </Divider>
            <Row justify="space-evenly" gutter={[16, 16]}>
                {videoData.map((video, index) => (
                    <Col >
                        <VideoCard video={video} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}