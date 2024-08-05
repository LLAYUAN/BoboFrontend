import { Avatar, Button, Divider, Flex, Tag } from "antd";
import { GiftOutlined, HeartOutlined, LikeOutlined } from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import { useParams, useNavigate, useBeforeUnload } from "react-router-dom";
import UserBox from "../components/UserBox";
import VideoShow from "../components/VideoShow";

import {useState, useEffect, useRef} from "react";
import { fetchRoomInfo, userEnter, userExit, postAddHistory, postAddRoomHot } from "../service/livevideo";


export default function LiveUser() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});
    const [entered, setEntered] = useState(false); // 状态用于管理用户是否已经进入页面
    const [likeCount, setLikeCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [consumptionCount, setConsumptionCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);
    const [followStatus, setFollowStatus] = useState(0);
    const [startTime, setStartTime] = useState(() => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // 时区偏移的毫秒数
        const localISOTime = new Date(now - offset).toISOString().slice(0, 19); // 去掉毫秒部分
        return localISOTime;
    }); // 记录用户进入页面的时间

    const trueTags = ['学习', '娱乐', '其他'];

    const { roomID } = useParams();
    const navigate = useNavigate();
    console.log(roomID);

    //自动获取房间信息
    useEffect(() => {
        fetchRoomInfo(roomID).then(response => {
            console.log(response);
            setRoomInfo(response);
        });
    }, [roomID]);

    //根据房间信息获取Tags
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

    //进入退出房间的处理
    //这里需要加上升哥的处理逻辑，进入发一次，退出发一次
    const userId = localStorage.getItem('userID');
    const nickname = localStorage.getItem('nickname');

    const data = {
        userId: userId,
        roomId: roomID,
        nickname: nickname,
    };

  
    useEffect(() => {
        console.log('user enter');
        userEnter(data);

        // const now = new Date().toISOString().split('.')[0]; // ISO 8601格式，只保留到秒
        // console.log(now);
        // setStartTime(now);

        // console.log(Date.now());
        setEntered(true);

        homeViewCountChange();

        const handleUserExit = () => {
            userExit(data);
            console.log('user exit');
            setEntered(false);
            const now = new Date();
            const watchDuration =  Math.floor((now - new Date(startTime)) / 1000); // 计算观看时长，以秒为单位
            if(watchDuration !== 0) {
                singleAddHistory(watchDuration);
                homeSumViewTimeChange(watchDuration);
            }
        };

        const handleBeforeUnload = (event) => {
            handleUserExit();
            const message = 'Are you sure you want to leave?';
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUserExit);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('unload', handleUserExit);
            handleUserExit(); // Ensure userExit is called on component unmount
        };
    }, [roomID]); // 仅在roomID变化时执行effect

    useBeforeUnload((event) => {
        const handleUserExit = () => {
            userExit(data);
            console.log('user exit');
        };
        handleUserExit();
        const message = 'Are you sure you want to leave?';
        event.returnValue = message;
        return message;
    });

    function singleAddHistory(watchDuration){
        //给个人用户历史浏览记录改一下

        console.log(watchDuration);
        console.log(startTime);
        let body = {
            roomId: roomID,
            likeCount: likeCount,
            shareCount: shareCount,
            consumptionCount: consumptionCount,
            messageCount: messageCount,
            followStatus: followStatus,
            startTime: startTime,
            watchDuration: watchDuration
        }
        postAddHistory(body);
    }

    //点击按钮房间热度的数据改变
    function homeViewCountChange() {
        let body = {
            roomId: roomID,
            viewCount: 1,
            likeCount: 0,
            shareCount: 0,
            consumptionCount: 0,
            messageCount: 0,
            newFollowerCount: 0,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeMessageCountChange() {
        let body = {
            roomId: roomID,
            viewCount: 0,
            likeCount: 0,
            shareCount: 0,
            consumptionCount: 0,
            messageCount: 1,
            newFollowerCount: 0,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeLikeCountChange() {
        let body = {
            roomId: roomID,
            viewCount: 0,
            likeCount: 1,
            shareCount: 0,
            consumptionCount: 0,
            messageCount: 0,
            newFollowerCount: 0,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeShareCountChange() {
        let body = {
            roomId: roomID,
            viewCount: 0,
            likeCount: 0,
            shareCount: 1,
            consumptionCount: 0,
            messageCount: 0,
            newFollowerCount: 0,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeConsumptionCountChange() {
        console.log('consumption')
        let body = {
            roomId: roomID,
            viewCount: 0,
            likeCount: 0,
            shareCount: 0,
            consumptionCount: 1,
            messageCount: 0,
            newFollowerCount: 0,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeNewFollowerCountAdd() {
        let body = {
            roomId: roomID,
            viewCount: 0,
            likeCount: 0,
            shareCount: 0,
            consumptionCount: 0,
            messageCount: 0,
            newFollowerCount: 1,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeNewFollowerCountMinus() {
        let body;
        body = {
            roomId: roomID,
            viewCount: 0,
            likeCount: 0,
            shareCount: 0,
            consumptionCount: 0,
            messageCount: 0,
            newFollowerCount: -1,
            sumViewTime: 0
        }
        postAddRoomHot(body);
    }

    function homeSumViewTimeChange(watchDuration) {
        console.log(startTime);
        let body = {
            roomId: roomID,
            viewCount: -1,
            likeCount: 0,
            shareCount: 0,
            consumptionCount: 0,
            messageCount: 0,
            newFollowerCount: 0,
            sumViewTime: watchDuration
        }
        postAddRoomHot(body);
    }

    //按钮的处理函数
    function pushMessageButton(){
        homeMessageCountChange();
        setMessageCount(messageCount + 1);
    }

    function pushLikeButton(){
        homeLikeCountChange();
        setLikeCount(likeCount + 1);
    }

    function pushShareButton(){
        homeShareCountChange();
        setShareCount(shareCount + 1);
    }

    function pushConsumptionButton(){
        homeConsumptionCountChange();
        setConsumptionCount(consumptionCount + 1);
    }

    function pushFollowButton(){
        homeNewFollowerCountAdd();
        setFollowStatus(1);
    }

    function pushUnFollowButton(){
        homeNewFollowerCountMinus();
        setFollowStatus(0);
    }

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
                    <Button icon={<GiftOutlined />} style={{ marginLeft: '80%' }} size="large" onClick={pushConsumptionButton}></Button>
                    <Button icon={<LikeOutlined />} style={{ marginLeft: '2%' }} size="large" onClick={pushLikeButton}></Button>
                    <Button icon={<HeartOutlined />} style={{ marginLeft: '2%' }} size="large" onClick={pushShareButton}></Button>
                </div>
            </div>
            <div style={{ width: '30%', padding: '0 10px' }}>
                {roomInfo.userID && (
                    <UserBox
                        ownerUserID={roomInfo.userID}
                        ownerNickName={roomInfo.userName}
                        ownerSelfIntro={roomInfo.userDescription}
                        ownerAvatarUrl={roomInfo.avatarUrl}
                        userFollow={pushFollowButton}
                        userUnfollow={pushUnFollowButton}
                    />
                )}
                <ChatBox roomID={roomID} />
            </div>
        </div>
    );
}
