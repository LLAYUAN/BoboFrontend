import ProfileVisit from "../components/ProfileVisit";
import {Button, Card, notification} from "antd";
import MyVideo from "../components/MyVideo";
import {useParams} from "react-router-dom";

export default function VisitProfile() {
    const {userID}=useParams();
    console.log("VisitProfile userID:",userID);

    return (
        <div style={{padding: '20px 30px'}}>
            <div style={{display: 'flex', padding: '0 30px', justifyContent: 'space-evenly'}}>
                <Card style={{width: '40%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                    <ProfileVisit userID={userID}/>
                </Card>
                <div style={{width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Card style={{boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'}}>
                        <MyVideo identity="noup" userID={userID}/>
                    </Card>
                </div>
            </div>
        </div>
    );
}