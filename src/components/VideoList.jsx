import {Button, Image, Input, List} from "antd";
import React from "react";
import VideoCard from "./VideoCard";
import {DeleteOutlined} from "@ant-design/icons";

export default function VideoList() {

    //todo:从后端获取视频列表
    const videos = [
        { name: 'Jared Palmer', username: 'jaredpalmer',imageUrl:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
        { name: 'Olivia Davis', username: 'olivia' },
        // Add more users here
    ];


    return (
        <div style={{ maxHeight:'600px',height: '75%',maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
            视频列表
            <List
                itemLayout="horizontal"
                dataSource={videos}
                renderItem={(video) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image src={video.imageUrl} width={160} height={90} style={{borderRadius: '10px'}}/>}
                            title={video.name}
                            description={`@${video.username}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}