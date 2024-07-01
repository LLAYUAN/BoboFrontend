import {Avatar, Button, Divider, Flex, Tag} from "antd";
import {GiftOutlined, HeartOutlined, LikeOutlined, UserAddOutlined} from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import {useParams} from "react-router-dom";

export default function LiveUser() {
    const title = '直播间的title';
    const tags = ['purple', 'magenta', 'red', 'volcano'];

    const {roomID}=useParams();
    console.log(roomID);

    return (
        <div style={{display:'flex'}}>
            <div style={{display:'flex',flexDirection:'column',width:'70%',padding:'0 30px'}}>
                <h2 style={{marginLeft:'2%'}}>{title}</h2>
                <Flex gap="4px 4px" wrap style={{marginLeft:'2%'}}>
                    {tags.map(tag => (
                        <Tag color="purple" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </Flex>
                <Divider style={{ margin: '15px 0' }}/>
                <div style={{width:'90%',background:'#000',paddingBottom:'50%',marginLeft:'5%'}}>这是视频</div>
                <div style={{display:'flex',padding:'10px 10px'}}>
                    <Button icon={<GiftOutlined />} style={{marginLeft:'80%'}} size="large"></Button>
                    <Button icon={<LikeOutlined />} style={{marginLeft:'2%'}} size="large"></Button>
                    <Button icon={<HeartOutlined />} style={{marginLeft:'2%'}} size="large"></Button>
                </div>
            </div>
            <div style={{width: '30%', padding: '0 10px'}}>
                <div style={{display:'flex',justifyContent:'space-between',width: '100%',alignItems:'center'}}>
                    <div style={{display:'flex',padding:'10px 10px',alignItems:'center'}}>
                        <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <div style={{marginLeft:'10px'}}>
                            <h3>用户名</h3>
                            <p>用户简介</p>
                        </div>
                    </div>
                    <Button icon={<UserAddOutlined />} size="large" style={{marginRight:'5%'}}>关注</Button>
                </div>
                <ChatBox />
            </div>
        </div>
    );
}