import React from 'react';
import { Carousel } from 'antd';
import VideoCard from './VideoCard';
const contentStyle = {
    height: '320px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Autoplay = (hotVideoData) => (
    <Carousel autoplay>
        {hotVideoData.map((video, index) => (
            <div>
                {/* <VideoCard video={video} /> */}
            </div>
        ))}
        {/* <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div> */}
    </Carousel>
);
export default Autoplay;