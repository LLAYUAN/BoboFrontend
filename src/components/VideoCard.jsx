import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import {useNavigate} from "react-router-dom";
const { Meta } = Card;
export default function VideoCard ({roomID,title,author}) {
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate(`/liveUser/${roomID}`);
    }
    return(
        <Card
            hoverable
            style={{
                width: 300,
            }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={title}
                description={author}
            />
        </Card>
    )
}
