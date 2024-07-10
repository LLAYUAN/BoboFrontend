import ProfileVisit from "../components/ProfileVisit";
import {useState,useEffect} from "react";
import {Button, Card, notification} from "antd";
import MyVideo from "../components/MyVideo";
import {useParams,useNavigate} from "react-router-dom";
import {visitInfo} from "../service/user";

export default function VisitProfile() {
    const [user, setUser] = useState({});
    const {userID}=useParams();
    const navigate = useNavigate();
    console.log(userID);

    const initialUser = async () => {
        let allUser = await visitInfo(userID);
        console.log(allUser);
        if(allUser.code !== 200){
            navigate('/profile');
            return;
        }
        console.log(allUser.data);
        const myuser = allUser.data;
        console.log(myuser);
        setUser(myuser);
        // setFollowers(followers);
        // setFollowing(following);
        console.log(user);
        // console.log(followers);
        // console.log(following);
    }

    useEffect(() => {
        initialUser();
    }, []);

// 确保在渲染 ProfileVisit 前，user 已完全填充
    if (!user || Object.keys(user).length === 0) {
        return <div>加载中...</div>;
    }

    return (
        <div style={{padding: '20px 30px'}}>
            <div style={{display: 'flex', padding: '0 30px', justifyContent: 'space-evenly'}}>
                <Card style={{width: '40%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                    <ProfileVisit userID={userID} user={user}/>
                </Card>
                <div style={{width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Card style={{boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                        <MyVideo userID={userID}/>
                    </Card>
                </div>
            </div>
        </div>
    );
}