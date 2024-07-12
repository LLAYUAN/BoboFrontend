import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Button, Image, Menu, Divider, Dropdown, Modal} from 'antd';
import {useNavigate} from "react-router-dom";
import LiveEditModal from "./LiveEditModal";
import useLiveEditModal from "../hooks/useLiveEditModal";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import logo from '../img/logo.webp';
const { Search } = Input;

const items = [
    {
        label: 'Home',
        key: 'home',
    },
    {
        label: 'Popular',
        key: 'popular',
    },
    {
        label: 'Category',
        key: 'category',
    },
];

const dropitems = [
    {
        key: 'profile',
        label: '个人空间',
    },
    {
        key: 'changePassword',
        label: '修改密码',
    },
    {
        key: 'logout',
        label: '退出登录',
    },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Nav = () => {
    const { isModalVisible, showModal, handleOk, handleCancel } = useLiveEditModal();
    const navigate = useNavigate();
    const [current, setCurrent] = useState('home');
    const [logoutModalVisible, setLogoutModalVisible] = useState(false); // State for logout confirmation modal

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate('/' + e.key);
    };

    const handleMenuClick = (e) => {
        console.log('click', e);
        setCurrent('');
        if(e.key === 'profile'){
            navigate('/profile');
        }else if(e.key === 'changePassword'){
            //todo:处理修改
            navigate('/modifyPassword');
        }else if(e.key === 'logout'){
            setLogoutModalVisible(true); // Show logout confirmation modal
        }
    }

    const handleLogoutConfirm = () => {
        //todo:处理退出登录
        // 将token，userID，username从localStorage中删除
        localStorage.removeItem('token');
        localStorage.removeItem('tokenHead');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/login');
        setLogoutModalVisible(false); // Hide logout confirmation modal
    }

    const handleLogoutCancel = () => {
        setLogoutModalVisible(false); // Hide logout confirmation modal
    }

    return(
        <div style={{position: 'fixed',top: '0',left: '0', width: '100%',zIndex:'1000',backgroundColor:'#fff',boxShadow:'0 2px 5px rgba(0, 0, 0, 0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between',alignItems:'center',padding: '0 30px',height:'60px'}}>
                <div style={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
                    <Image src={logo} height={50} style={{ borderRadius: '10%' }}/>
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{marginLeft:'20px'}} />
                </div>

                <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    <Button style={{marginLeft:'20px'}} onClick={showModal}>我要直播</Button>

                    <Dropdown menu={{ items: dropitems,onClick: handleMenuClick, }} placement="bottomRight" arrow>
                        <Button type="primary" shape="circle" icon={<UserOutlined  />} style={{marginLeft:'20px'}}/>
                    </Dropdown>
                </div>
            </div>
            <LiveEditModal
                isVisible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
            <Modal
                title="确认退出"
                visible={logoutModalVisible}
                onOk={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
                okText="确认"
                cancelText="取消"
            >
                <p>你确定要退出登录吗？</p>
            </Modal>
        </div>
    );
};
export default Nav;

