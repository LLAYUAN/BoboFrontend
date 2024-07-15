import { Avatar, Button, Divider, Flex, Tag } from "antd";
import { GiftOutlined, HeartOutlined, LikeOutlined } from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import { useParams } from "react-router-dom";
import UserBox from "../components/UserBox";
import VideoShow from "../components/VideoShow";
import { useState, useEffect } from "react";
import { fetchRoomInfo } from "../service/livevideo";

export default function LiveUser() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [roomInfo, setRoomInfo] = useState({}); // [roomID, userID, userName, userDescription, avatarUrl, roomName, tags]
    const trueTags = ['学习', '娱乐', '其他'];

    const { roomID } = useParams();
    console.log(roomID);

    useEffect(() => {
        fetchRoomInfo(roomID).then(response => {
            console.log(response);

            setRoomInfo(response);
        });
    }, [roomID]);

    useEffect(() => {
        if (roomInfo.roomName) {
            setTitle(roomInfo.roomName);

            const newTags = [];
            if (roomInfo.tags) {
                if (roomInfo.tags[0]) newTags.push(trueTags[0]);
                if (roomInfo.tags[1]) newTags.push(trueTags[1]);
                if (roomInfo.tags[2]) newTags.push(trueTags[2]);
            }
            setTags(newTags);
        }
    }, [roomInfo]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '70%', padding: '0 30px' }}>
                <h2 style={{ marginLeft: '2%' }}>{title}</h2>
                <Flex gap="4px 4px" wrap style={{ marginLeft: '2%' }}>
                    {tags.map(tag => (
                        <Tag color="purple" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </Flex>
                <Divider style={{ margin: '15px 0' }} />
                <div style={{ width: '90%', marginLeft: '5%' }}>
                    <VideoShow
                        roomId={roomID}
                        style={{ height: '80%' }}
                    />
                </div>
                <div style={{ display: 'flex', padding: '50px 50px' }}>
                    <Button icon={<GiftOutlined />} style={{ marginLeft: '80%' }} size="large"></Button>
                    <Button icon={<LikeOutlined />} style={{ marginLeft: '2%' }} size="large"></Button>
                    <Button icon={<HeartOutlined />} style={{ marginLeft: '2%' }} size="large"></Button>
                </div>
            </div>
            <div style={{ width: '30%', padding: '0 10px' }}>
                {roomInfo.userID && (
                    <UserBox
                        ownerUserID={roomInfo.userID}
                        ownerNickName={roomInfo.userName}
                        ownerSelfIntro={roomInfo.userDescription}
                        ownerAvatarUrl={roomInfo.avatarUrl}
                    />
                )}
                <ChatBox roomID={roomID} />
            </div>
        </div>
    );
}
