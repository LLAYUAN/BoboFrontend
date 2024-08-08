import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Divider, FloatButton,Space } from 'antd';

import ChatService from '../service/chat';
import moment from 'moment';
import {VerticalAlignBottomOutlined} from "@ant-design/icons";
import {postAddRoomHot} from "../service/livevideo";

const ChatBox = ({ roomID }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const username = localStorage.getItem('nickname');
    const [chatService, setChatService] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const token = localStorage.getItem('token');
    const [showBackToBottom, setShowBackToBottom] = useState(false);

    const timestampRef = useRef(new Date().toISOString());

    useEffect(() => {
        const service = new ChatService(roomID, onMessageReceived, onError);
        service.connect(username, token);
        setChatService(service);
        return () => {
            if (service) {
                service.disconnect();
            }
        };
    }, [roomID, token]);

    const fetchHistoryMessages = async () => {
        try {
            const historyMessages = await ChatService.getHistoryMessages(roomID, timestampRef.current);
            console.log('historyMessages:', historyMessages);
            historyMessages.reverse();
            if (historyMessages.length > 0) {
                timestampRef.current = historyMessages[0].timestamp;
            }
            setMessages((prevMessages) => [...historyMessages, ...prevMessages]);
            if (historyMessages.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.log('Error fetching history messages:', error);
        }
    };

    const onMessageReceived = (payload) => {
        const messages = JSON.parse(payload.body); // 假设 payload.body 是一个 JSON 数组
        console.log('onMessageReceived:', messages);
        setMessages((prevMessages) => [...prevMessages, ...messages]);
    };


    const onError = (err) => {
        console.error(err);
    };

    function messageCountChange() {
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

    const sendMessage = () => {
        if (chatService && inputValue) {
            chatService.sendMessage(username, inputValue);
            setInputValue('');
            messageCountChange();
        }
    };

    const loadMore = () => {
        fetchHistoryMessages();
    };

    const listRef = useRef(null);
    const [changetype, setChangetype] = useState(false);

    const pushListBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    const handleScroll = () => {
        if (listRef.current.scrollTop < listRef.current.scrollHeight-2000){
            setShowBackToBottom(true);
        } else {
            setShowBackToBottom(false);
        }
    };

    useEffect(() => {
       // console.log('messages changed', changetype);
        if (changetype === false) {
            pushListBottom();
        }
    }, [messages, changetype]);

    return (
        <div style={{
            height: '70vh',
            maxWidth: '95%',
            margin: '0 auto',
            padding: '10px',
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            position: 'relative'
        }}>
            <div ref={listRef}
                 style={{
                     height: '86%',
                     overflowY: 'auto',
                     marginBottom: '20px',
                     border: '1px solid #f0f0f0',
                     borderRadius: '4px',
                     padding: '10px',
                     display: 'flex',
                     flexDirection: 'column'
                 }}
                 onScroll={handleScroll}
            >
                {hasMore && <Button onClick={() => { setChangetype(true); loadMore(); }} style={{ marginBottom: '10px' }} >加载历史消息</Button>}
                {!hasMore && <Divider style={{ marginBottom: '10px', textAlign: 'center' }}>暂无更多历史记录</Divider>}
                <List
                    size="small"
                    dataSource={messages}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.sender}
                                description={item.content}
                            />
                            <div style={{ marginLeft: 'auto', color: 'gray', fontSize: 'smaller' }}>
                                {moment(item.timestamp).format('MM-DD HH:mm:ss')}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            <Space.Compact>
                <Input
                    style={{ width: 'calc(100% - 70px)' }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={() => { setChangetype(false); sendMessage(); }}
                />
                <Button type="primary" onClick={() => { setChangetype(false); sendMessage(); }}>发送</Button>
            </Space.Compact>
            {showBackToBottom && (
                <Button
                    type="primary"
                    onClick={pushListBottom}
                    style={{ left:'85%', bottom: '18%',borderRadius: '50%'}}
                    icon={<VerticalAlignBottomOutlined />}
                >
                </Button>
            )}
        </div>
    );
};

export default ChatBox;
