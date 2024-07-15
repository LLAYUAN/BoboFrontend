import {USERPREFIX,getJson,post,RECORDVIDEO_PREFIX } from "./common";
import axios from 'axios';

// 获取个人主页的所有信息
export async function personalProfile() {
    let url = `${USERPREFIX}/personalProfile`;
    return getJson(url);
}

// 只获取个人信息
export async function getUserInfo() {
    let url = `${USERPREFIX}/getUserInfo`;
    return getJson(url);
}

// 只更改个人信息
export async function updateUserInfo(data) {
    let url = `${USERPREFIX}/updateUserInfo`;
    return post(url, data);
}

export async function follow(followeeID) {
    let url = `${USERPREFIX}/follow`;
    return post(url, {followeeID});
}

export async function unfollow(followeeID) {
    let url = `${USERPREFIX}/unfollow`;
    return post(url, {followeeID});
}

export async function visitInfo(userID) {
    let url = `${USERPREFIX}/visitInfo`;
    return post(url, {userID});

}

export async function createRoom(data) {
    let url = `${USERPREFIX}/createRoom`;
    return post(url, data);
}

export async function getRoomInfo() {
    let url = `${USERPREFIX}/getRoomInfo`;
    return getJson(url);
}

export async function modifyPassword(oldPassword, newPassword) {
    let url = `${USERPREFIX}/modifyPassword`;
    return post(url, {oldPassword, newPassword});
}

export async function userCheckIsFan(followeeID) {
    let url = `${USERPREFIX}/checkIsFan?followeeID=${followeeID}`;
    return getJson(url);
}

export async function uploadFile(formData,setProgress,cancelTokenSource) {
    console.log("调用uploadFile");
    const url = `${RECORDVIDEO_PREFIX}/uploadFile`;
    console.log("url",url);
    let token = `${localStorage.getItem('tokenHead')}${localStorage.getItem('token')}`;
    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 必须设置请求头
            'Authorization': token
        },
        withCredentials: true,
        // cancelToken: cancelTokenSource.token,
        // onUploadProgress: (event) => {
        //     if (event.lengthComputable) {
        //         const percentComplete = Math.round((event.loaded / event.total) * 100);
        //         setProgress(percentComplete);
        //     }
        // },
    });
    //有时候会卡在90%多，所以在执行完post之后强行设为100%
    // await setProgress(100);
    return response;
}