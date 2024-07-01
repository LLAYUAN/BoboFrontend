import React, { useState,useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import BASEURL from '../service/chat';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('User'); // 可以根据实际情况设置默认用户名

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const sock = new SockJS(`${BASEURL}/chat`);
        const stompClient = Stomp.over(sock);
        stompClient.connect({}, () => {
            onConnected(stompClient);
        }, onError);
        setStompClient(stompClient);
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const onConnected = (client) => {
        console.log('Connected to WebSocket');
        if (client) {
            const subscription = client.subscribe('/topic/public', onMessageReceived);
            console.log('Subscription:', subscription);
            // 可以在用户连接后发送一条欢迎消息
            client.send('/app/chat.addUser', {}, JSON.stringify({
                sender: username,
                type: 'JOIN'
            }));
        } else {
            console.error('stompClient is null on connection');
        }
    };


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
        if (stompClient && inputValue) {
            const chatMessage = {
                sender: username,
                content: inputValue,
                type: 'CHAT'
            };
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
            setInputValue('');
        }

    };


    return (
        <div style={{ maxHeight:'600px',height: '75%',maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
            <div style={{ maxHeight:'500px',height: '85%', overflowY: 'auto', marginBottom: '20px', border: '1px solid #f0f0f0', borderRadius: '4px', padding: '10px' }}>
                <List
                    size="small"
                    dataSource={messages}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar>{item.sender.charAt(0)}</Avatar>}
                                title={item.sender}
                                description={item.content}
                            />
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
