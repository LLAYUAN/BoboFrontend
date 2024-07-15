import {RECORDVIDEO_PREFIX} from "./common";
import axios from 'axios';
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
        cancelToken: cancelTokenSource.token,
        onUploadProgress: (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setProgress(percentComplete);
            }
        },
    });
    //有时候会卡在90%多，所以在执行完post之后强行设为100%
    await setProgress(100);
    return response;
}