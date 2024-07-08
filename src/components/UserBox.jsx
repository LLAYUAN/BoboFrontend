import {Avatar, Button} from "antd";
import {UserAddOutlined} from "@ant-design/icons";

export default function UserBox() {
    //todo:从后端获取用户信息
    const user = {
        nickname: '用户名',
        selfIntro: '用户简介',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <div style={{display: 'flex', padding: '10px 10px', alignItems: 'center'}}>
                <Avatar size={64} src={user.avatar}/>
                <div style={{marginLeft: '10px'}}>
                    <h3>{user.nickname}</h3>
                    <p>{user.selfIntro}</p>
                </div>
            </div>
            <Button icon={<UserAddOutlined/>} size="large" style={{marginRight: '5%'}}>关注</Button>
        </div>
    );
}