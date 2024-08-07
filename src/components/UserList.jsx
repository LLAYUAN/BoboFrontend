import React, { useEffect, useState } from 'react';
import { List, Avatar, Button } from 'antd';
import { fetchActiveUsers, userExit } from '../service/livevideo';

const UserList = ({ roomId }) => {
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = () => {
            fetchActiveUsers(roomId).then(response => {
                if (response.status === 200) {
                    setActiveUsers(response.data);
                } else {
                    console.error(`Failed to fetch active users: ${response.message}`);
                }
            });
        };

        fetchUsers(); // Initial fetch

        const interval = setInterval(fetchUsers, 10000); // Fetch every 10 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [roomId]);

    const handleDelete = (userId) => {
        console.log(`Deleted user with userId: ${userId}`);
        // 实现删除功能
        userExit({ userId, roomId }).then(response => {
            if (response.status === 200) {
                console.log('User removed successfully');
                // Update activeUsers state after successful removal
                setActiveUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
            } else {
                console.log(`Failed to remove user: ${response.message}`);
            }
        });
    };

    return (
        <List
            style={{ height: '100%', padding: '0 10px' }}
            itemLayout="horizontal"
            dataSource={activeUsers}
            renderItem={item => (
                <List.Item
                    actions={[<Button type="primary" onClick={() => handleDelete(item.userId)}>移除</Button>]}
                >
                    <List.Item.Meta
                        avatar={<Avatar>{item.userId.charAt(0)}</Avatar>}
                        title={item.nickname}
                        // description={`Room: ${item.roomId}, Entered at: ${item.enterTime}`}
                    />
                </List.Item>
            )}
        />
    );
};

export default UserList;
