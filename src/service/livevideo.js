import {getJson, LIVEVIDEOPREFIX, post, RECOMMENDPREFIX} from "./common";

export async function getUserId() {
    let url =`${LIVEVIDEOPREFIX}/getUserId`;
    return getJson(url);
}

export async function fetchCameraDevices(){
    let url = `${LIVEVIDEOPREFIX}/camera-devices`;
    return getJson(url);
}

export async function startCamera(data){
    let url = `${LIVEVIDEOPREFIX}/camera-live`;
    
    return post(url, data);
}

export async function startDesktop(data){
    let url = `${LIVEVIDEOPREFIX}/desktop-live`;
    
    return post(url, data);
}

export async function record(data){
    let url = `${LIVEVIDEOPREFIX}/record`;

    return post(url, data);
}

export async function stop(data){
    let url = `${LIVEVIDEOPREFIX}/stop-stream`;

    return post(url, data);
}

export async function start(data){
    let url = `${LIVEVIDEOPREFIX}/start-stream`;

    return post(url, data);
}

export  async function userEnter(data) {
    let url  = `${LIVEVIDEOPREFIX}/user-enter`;
    
    return post(url, data);
}

export  async function userExit(data) {
    let url  = `${LIVEVIDEOPREFIX}/user-exit`;

    return post(url, data);
}

export async function fetchActiveUsers(roomId){
    let url = `${LIVEVIDEOPREFIX}/active-users/${roomId}`;
    
    return getJson(url);
}

export async function fetchRoomInfo (roomId){
    let url = `${RECOMMENDPREFIX}/roomInfo/${roomId}`;
    
    return getJson(url);
}

export async function postAddHistory(body){
    let url = `${RECOMMENDPREFIX}/history/add`;
    console.log("postAddHistory", body);
    
    return post(url, body);
}

export async function postAddRoomHot(body){
    let url = `${RECOMMENDPREFIX}/roomInfo/addRoomHotIndex`;
    console.log("postAddRoomHot", body);
    return post(url, body);
}
