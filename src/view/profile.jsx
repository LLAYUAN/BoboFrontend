import ProfieEdit from "../components/ProfieEdit";
import Following from "../components/Following";
import Follower from "../components/Follower";
import {Button, Card, notification} from "antd";
import MyVideo from "../components/MyVideo";
import {PlaySquareOutlined} from "@ant-design/icons";
import LiveEditModal from "../components/LiveEditModal";
import {useState,useEffect} from "react";
import useLiveEditModal from "../hooks/useLiveEditModal";
import {getUserInfo,personalProfile} from "../service/user";
import {useNavigate} from "react-router-dom";
// import moment from "moment";

export default function Profile() {
    const { isModalVisible, showModal, handleOk, handleCancel } = useLiveEditModal();
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const navigate = useNavigate();

    const initialUser = async () => {
        let allUser = await personalProfile();
        console.log(allUser);
        if(allUser.code !== 200){
            // navigate('/login');
            return;
        }
        const { user, followers, following } = allUser.data;

        setUser(user);
        setFollowers(followers);
        setFollowing(following);
        console.log(user);
        // console.log(followers);
        // console.log(following);
    }

    useEffect(() => {
        initialUser();
    }, []);

    return (
        <div style={{padding: '20px 30px'}}>
            <div style={{display: 'flex', padding: '0 30px', justifyContent: 'space-evenly'}}>
                <Card style={{width: '40%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                    <ProfieEdit user={user}/>
                </Card>
                <div style={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Card style={{height: '48%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                        <Following following={following}/>
                    </Card>
                    <Card style={{height: '48%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                        <Follower follower={followers}/>
                    </Card>
                </div>
            </div>
            <div style={{display: 'flex', padding: '30px 30px', justifyContent: 'space-evenly'}}>
                <div style={{width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Card style={{boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                        <MyVideo identity='up' userID={0}/>
                    </Card>
                </div>
                    <Card style={{width:'30%',boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                        <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between', alignItems: 'center'}}>
                            <PlaySquareOutlined style={{fontSize: '50px',paddingTop:'50px'}}/>
                            <h2>创建直播</h2>
                            <Button type="primary" size="large" style={{marginTop:'50px'}} onClick={showModal}>现在开始</Button>
                        </div>
                    </Card>
            </div>
            <LiveEditModal
                isVisible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div>
    );
}