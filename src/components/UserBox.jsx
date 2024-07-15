import React, { useState, useEffect } from 'react';
import { Avatar, Button, Modal,notification } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import {follow,unfollow, userCheckIsFan} from '../service/user';
import { useNavigate } from 'react-router-dom';

export default function UserBox({ownerUserID,ownerNickName,ownerSelfIntro,ownerAvatarUrl}) {
    const [isFollowed, setIsFollowed] = useState(false); // State to track if user is followed
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true); // 添加加载状态
    const navigate = useNavigate();
    console.log("ownerUserID",ownerUserID);
    // const user = {
    //     nickname: '用户名',
    //     selfIntro: '用户简介',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    // };
    // const checkIsAuth = async () => {
    //     const authUserID_String = await localStorage.getItem('userID');
    //     const authUserID = parseInt(authUserID_String);
    //     console.log("本地找authUserID:",authUserID)
    //     if (authUserID === ownerUserID) {
    //         console.log("是本人");
    //         setIsAuth(true);
    //     }
    // }
    const checkIsAuth = async () => {
        const authUserID_String = localStorage.getItem('userID');
        const authUserID = parseInt(authUserID_String);
        console.log("本地找authUserID:",authUserID);
        console.log("ownerUserID", ownerUserID);
        console.log("ownerNickName", ownerNickName);
        if (authUserID === ownerUserID) {
            console.log("是本人");
            await setIsAuth(true);
        } else {
            console.log("不是本人");
        }
    }

    const checkIsFan = async () => {
        const response = await userCheckIsFan(ownerUserID);
        console.log("response",response.data);
        setLoading(false); // 检查完毕后设置loading为false
        await setIsFollowed(response.data);
    }
    
    useEffect(() => {
        checkIsAuth();
        checkIsFan();
    }, []);

    // Function to handle follow/unfollow
    const handleFollow = async () => {
        setIsFollowed(true); // Update state to indicate user is followed
        let res = await follow(ownerUserID); // Call API to follow user
        if (res.code !== 200) {
            notification.error({
                message: '失败',
                description: '关注失败',
                placement: 'topRight'
            });
        }
    };

    // Function to handle unfollow confirmation
    const confirmUnfollow = async () => {
        setIsFollowed(false); // Update state to indicate user is unfollowed
        setModalVisible(false); // Hide the modal
        let res = await unfollow(ownerUserID); // Call API to unfollow user
        if (res.code !== 200) {
            notification.error({
                message: '失败',
                description: '关注失败',
                placement: 'topRight'
            });
        }
    };

    // Function to show modal for unfollow confirmation
    const showUnfollowModal = () => {
        setModalVisible(true);
    };

    const renderFollowButton = () => {
        if (isAuth) {
            return null; // 如果是本人，则不显示任何按钮
        }
        return isFollowed ? (
            <Button size="large" onClick={showUnfollowModal} style={{ marginRight: '5%' }}>
                已关注
            </Button>
        ) : (
            <Button icon={<UserAddOutlined />} size="large" onClick={handleFollow} style={{ marginRight: '5%' }}>
                关注
            </Button>
        );
    };
    
    const handleAvatarClick = () => {
        if (isAuth) {
            navigate('/profile');
        } else {
            navigate(`/visitprofile/${ownerUserID}`);
        }
    }

    if (loading) {
        return <div>Loading...</div>; // 当loading为true时，显示加载提示
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', padding: '10px 10px', alignItems: 'center' }}>
                <Avatar size={64} src={ownerAvatarUrl} style={{cursor:'pointer'}} onClick={handleAvatarClick}/>
                <div style={{ marginLeft: '10px' }}>
                    <h3>{ownerNickName}</h3>
                    <p>{ownerSelfIntro}</p>
                </div>
            </div>
            {
                renderFollowButton()
            }

            {/* Unfollow confirmation modal */}
            <Modal
                title="取消关注"
                visible={modalVisible}
                onOk={confirmUnfollow}
                onCancel={() => setModalVisible(false)}
                okText="确认"
                cancelText="取消"
            >
                <p>确定要取消关注吗？</p>
            </Modal>
        </div>
    );
}
