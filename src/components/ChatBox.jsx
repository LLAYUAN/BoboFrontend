import React, {useState, useEffect, useRef} from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatService from '../service/chat';
import moment from 'moment';

const ChatBox = ({ roomID }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('User'); // 可以根据实际情况设置默认用户名
    const [chatService, setChatService] = useState(null);
    const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5MCIsImNyZWF0ZWQiOjE3MTk5ODc2NjE0MDgsImV4cCI6MTcyMDU5MjQ2MX0.HyKdhLP0koBNioyG3CJZ9cn7tyWPulTifnBNmy3EuChjMB4B0Xmvb971E5DK5I65xHlFe2AWj5KoTEP6EUtL9Q';

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

    const onMessageReceived = (payload) => {
        console.log(payload);
        const message = JSON.parse(payload.body);
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const onError = (err) => {
        console.error(err);
    };

    const sendMessage = () => {
        if (chatService && inputValue) {
            chatService.sendMessage(username, inputValue);
            setInputValue('');
        }
    };

    //保证列表显示最底部
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div style={{ maxHeight:'600px',height: '75%',maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
            <div ref={listRef} style={{ maxHeight:'500px',height: '85%', overflowY: 'auto', marginBottom: '20px', border: '1px solid #f0f0f0', borderRadius: '4px', padding: '10px' }}>
                <List
                    size="small"
                    dataSource={messages}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                // avatar={<Avatar>{item.sender.charAt(0)}</Avatar>}
                                title={item.sender}
                                description={item.content}
                            />
                            <div style={{ marginLeft: 'auto', color: 'gray', fontSize: 'smaller' }}>
                                {moment(item.timestamp).format('HH:mm:ss')}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            <Input.Group compact>
                <Input
                    style={{ width: 'calc(100% - 70px)' }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={sendMessage}
                />
                <Button type="primary" onClick={sendMessage}>Send</Button>
            </Input.Group>
        </div>
    );
};

export default ChatBox;
