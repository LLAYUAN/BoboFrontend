import {RECORDVIDEO_PREFIX} from "./common";
import axios from 'axios';
export async function uploadFile(formData) {
    console.log("调用uploadFile");
    const url = `${RECORDVIDEO_PREFIX}/uploadFile`;
    let token = `${localStorage.getItem('tokenHead')}${localStorage.getItem('token')}`;
    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 必须设置请求头
            'Authorization': token
        },
        withCredentials: true,
    });
    return response;
}