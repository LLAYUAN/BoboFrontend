import React from 'react';
import { List, Avatar, Button } from 'antd';
import {useEffect,useState} from 'react'

// 示例用户数据
const users = [
    {
        key: '1',
        user: 'John Brown',
        text: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        user: 'Jim Green',
        text: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        user: 'Joe Black',
        text: 'Sidney No. 1 Lake Park',
    },
];

const UserList = ({ roomId }) => {

    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const fetchActiveUsers = async () => {
            const response = await fetch(`http://localhost:8081/api/active-users/${roomId}`);
            const users = await response.json();
            setActiveUsers(users);
        };

        fetchActiveUsers();
    }, [roomId]);

    const handleDelete = (key) => {
        console.log(`Deleted user with key: ${key}`);
        // 实现删除功能
    };

    return (
        <List
            style={{ height: '100%',padding:'0 10px' }}
            itemLayout="horizontal"
            dataSource={users}
            renderItem={item => (
                <List.Item
                    actions={[<Button type="primary" onClick={() => handleDelete(item.key)}>移除</Button>]}
                >
                    <List.Item.Meta
                        avatar={<Avatar>{item.user.charAt(0)}</Avatar>}
                        title={item.user}
                        description={item.text}
                    />
                </List.Item>
            )}
        />
    );
};

export default UserList;
