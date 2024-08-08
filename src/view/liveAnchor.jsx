// import {Avatar, Button, Divider, Flex, Tabs, Tag} from "antd";
// import {EditOutlined, GiftOutlined, HeartOutlined, LikeOutlined, UserAddOutlined} from "@ant-design/icons";
// import ChatBox from "../components/ChatBox";
// import UserList from "../components/UserList";
// import {useParams} from "react-router-dom";
// import VideoLive from "../components/VideoLive"
// import React,{useEffect, useState} from "react";
// import {fetchRoomInfo} from "../service/livevideo"
// import LiveStreaming from "../components/LiveStreaming"
//
// export default function LiveAnchor() {
//     const onChange = (key) => {
//         console.log(key);
//     };
//
//     const [title, setTitle] = useState('');
//     const [deliveredTags, setDeliveredTags] = useState([]);
//     const [tags, setTags] = useState([]);
//     const [isStreaming, setIsStreaming] = useState(JSON.parse(localStorage.getItem('isStreaming')));
//     const trueTags = ['学习', '娱乐', '其他'];
//
//     const { roomID } = useParams();
//     console.log(roomID);
//
//     useEffect(() => {
//         console.log("fetchRoomInfo start");
//         fetchRoomInfo(roomID).then(response => {
//             console.log(response);
//
//             const roomInfo = response;
//             console.log(roomInfo);
//             setTitle(roomInfo.roomName);
//
//             const newTags = [];
//             if (roomInfo.tags) {
//                 if (roomInfo.tags[0]) {
//                     newTags.push(trueTags[0]);
//                 }
//                 if (roomInfo.tags[1]) newTags.push(trueTags[1]);
//                 if (roomInfo.tags[2]) newTags.push(trueTags[2]);
//             }
//             setTags(newTags);
//             setDeliveredTags(roomInfo.tags);
//             console.log(newTags);
//             console.log(deliveredTags);
//         });
//         console.log("isStreaming",isStreaming);
//     }, []);
//
//
//     const items = [
//         {
//             key: '1',
//             label: '聊天室',
//             children:<ChatBox roomID={roomID}/>
//         },
//         {
//             key: '2',
//             label: '用户列表',
//             children: <UserList roomId = {roomID}/>
//         }
//     ];
//
//     return (
//         <div style={{display:'flex'}}>
//             <div style={{display:'flex',flexDirection:'column',width:'70%',padding:'0 30px'}}>
//                 <div style={{display:'flex',justifyContent:'space-between',width: '100%',alignItems:'end'}}>
//                     <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width: '100%'}}>
//                         <h2 style={{marginLeft:'2%'}}>{title}</h2>
//                         <Flex gap="4px 4px" wrap style={{marginLeft:'2%'}}>
//                             {tags.map(tag => (
//                                 <Tag color="purple" key={tag}>
//                                     {tag}
//                                 </Tag>
//                             ))}
//                         </Flex>
//                     </div>
//                     {/*<Button icon={<EditOutlined />} style={{marginRight:'3%'}} size="large"></Button>*/}
//                 </div>
//                 <Divider style={{ margin: '15px 0' }}/>
//                 <div style={{width: '90%', marginLeft: '5%'}}>
//                     {/*<VideoLive*/}
//                     {/*    roomId = {roomID}*/}
//                     {/*    style={{height:'80%'}}*/}
//                     {/*/>*/}
//
//                     <LiveStreaming
//                         roomId = {roomID}
//                         tags = {deliveredTags}
//                         status = {isStreaming}
//                         status = {true}
//                         style={{height:'80%'}}
//                     />
//                 </div>
//
//                 <div style={{display: 'flex', padding: '10px 10px'}}>
//                     <Button icon={<GiftOutlined />} style={{marginLeft:'80%'}} size="large"></Button>
//                     <Button icon={<LikeOutlined />} style={{marginLeft:'2%'}} size="large"></Button>
//                     <Button icon={<HeartOutlined />} style={{marginLeft:'2%'}} size="large"></Button>
//                 </div>
//             </div>
//             <div style={{width: '30%', padding: '0 10px'}}>
//                 <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
//             </div>
//         </div>
//     );
// }

//debug
export default function LiveAnchor() {
    return (
        <div>
            LiveAnchor
        </div>
    );
}