import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
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
                width: 300,
            }}
            cover={
                <img
                    alt="example"
                    src={video.coverUrl}
                />
            }
            onClick={handleClick}
        // actions={[
        //     <SettingOutlined key="setting" />,
        //     <EditOutlined key="edit" />,
        //     <EllipsisOutlined key="ellipsis" />,
        // ]}
        >
            <Meta
                avatar={<Avatar src={video.avatarUrl} />}
                title={video.roomName}
                description={video.userName}
            />
            <span key="hotIndex">热度: {video.hotIndex}</span>
        </Card>
    )
}
