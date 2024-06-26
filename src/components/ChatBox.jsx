import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('User'); // 可以根据实际情况设置默认用户名

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, user: username }]);
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
                                avatar={<Avatar>{item.user.charAt(0)}</Avatar>}
                                title={item.user}
                                description={item.text}
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
                    onPressEnter={handleSend}
                />
                <Button type="primary" onClick={handleSend}>Send</Button>
            </Input.Group>
        </div>
    );
};

export default ChatBox;
