import ProfileVisit from "../components/ProfileVisit";
import MyVideo from "../components/MyVideo";
import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { visitInfo } from "../service/user";

export default function VisitProfile() {
    const [user, setUser] = useState({});
    const { userID } = useParams();
    const navigate = useNavigate();

    const initialUser = async () => {
        try {
            let response = await visitInfo(userID);
            console.log(response);
            if (response.code !== 200) {
                navigate('/profile');
                return;
            }
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error as needed
        }
    }

    useEffect(() => {
        initialUser();
    }, []);

    if (!user || Object.keys(user).length === 0) {
        return <div>加载中...</div>;
    }

    return (
        <div style={{ padding: '20px 30px' }}>
            <div style={{ display: 'flex', padding: '0 30px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Card style={{ width: '40%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <ProfileVisit userID={userID} user={user} />
                </Card>
                <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Card style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                        <MyVideo userID={userID} />
                    </Card>
                    {/* 返回按钮 */}
                    <div style={{ marginTop: '20px', alignSelf: 'flex-end' }}>
                        <Button onClick={() => navigate('/profile')} type="primary">返回</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
