import {Avatar, Button, Divider, Flex, Tag} from "antd";
import {GiftOutlined, HeartOutlined, LikeOutlined, UserAddOutlined} from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import {useParams} from "react-router-dom";
import UserBox from "../components/UserBox";
// import VideoLive from "../components/VideoLive"
import VideoShow from "../components/VideoShow"
import {useState, useEffect} from "react";
import { RECOMMENDPREFIX } from "../service/common"

export default function LiveUser() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);

    const {roomID}=useParams();
    console.log(roomID);

    useEffect(() => {

        fetchRoomInfo().then(response => {
            console.log(response);

            const roomInfo = response.data;
            setTitle(roomInfo.title);
            setTags(roomInfo.tags);
        })
    }
    
    return (
        <div style={{display:'flex'}}>
            <div style={{display:'flex',flexDirection:'column',width:'70%',padding:'0 30px'}}>
                <h2 style={{marginLeft:'2%'}}>{title}</h2>
                <Flex gap="4px 4px" wrap style={{marginLeft:'2%'}}>
                    {tags.map(tag => (
                        <Tag color="purple" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </Flex>
                <Divider style={{ margin: '15px 0' }}/>
                <div style={{width:'90%',marginLeft:'5%'}}>
                    <VideoShow
                        roomId = {roomID}
                        style={{height:'80%'}}
                    />
                </div>
                <div style={{display:'flex',padding:'50px 50px'}}>
                    <Button icon={<GiftOutlined />} style={{marginLeft:'80%'}} size="large" ></Button>
                    <Button icon={<LikeOutlined />} style={{marginLeft:'2%'}} size="large"></Button>
                    <Button icon={<HeartOutlined />} style={{marginLeft:'2%'}} size="large"></Button>
                </div>
            </div>
            <div style={{width: '30%', padding: '0 10px'}}>
                <UserBox />
                <ChatBox roomID={roomID}/>
            </div>
        </div>
    );
}