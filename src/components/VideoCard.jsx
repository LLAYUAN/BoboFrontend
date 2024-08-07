import React from 'react';
import { Avatar, Card } from 'antd';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
export default function VideoCard({ video }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/liveUser/${video.id}`);
    }
    return (
        <Card
            hoverable
            style={{
                width: "384px",
            }}
            cover={
                <img
                    alt="example"
                    src={video.coverUrl}
                    width={'384px'}
                    height={'216px'}
                />
            }
            onClick={handleClick}
        >
            <Meta
                avatar={<Avatar src={video.avatarUrl} />}
                title={video.roomName}
                description={video.userName}
            />
            <div key="hotIndex" style={{ padding: "15px 20px" }}>热度: {video.hotIndex}</div>
        </Card>
    )
}
