import {Avatar, Button, Divider, Flex, Tabs, Tag} from "antd";
import {EditOutlined, GiftOutlined, HeartOutlined, LikeOutlined, UserAddOutlined} from "@ant-design/icons";
import ChatBox from "../components/ChatBox";
import UserList from "../components/UserList";

export default function Video() {
    const title = '直播间的title';
    const tags = ['purple', 'magenta', 'red', 'volcano'];

    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'column',width:'90%',padding:'0 30px'}}>
                <div style={{display:'flex',justifyContent:'space-between',width: '100%',alignItems:'end'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width: '100%'}}>
                        <h2 style={{marginLeft:'2%'}}>{title}</h2>
                        <Flex gap="4px 4px" wrap style={{marginLeft:'2%'}}>
                            {tags.map(tag => (
                                <Tag color="purple" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </Flex>
                    </div>
                </div>
                <Divider style={{ margin: '15px 0' }}/>
                <div style={{width:'90%',background:'#000',paddingBottom:'50%',marginLeft:'5%'}}>这是视频</div>

            </div>
        </div>
    );
}