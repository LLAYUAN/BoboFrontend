import {RECORDVIDEO_PREFIX} from './common'
import {getJson, post} from './common'

//如果userID为0就说明是他自己的空间或者回放视频
export async function getUsersRecordVideos(userID) {
    const url = `${RECORDVIDEO_PREFIX}/getUsersRecordVideos?userID=${userID}`;
    let videoInfoList = getJson(url);
    return videoInfoList;
}

export async function saveRecordVideo(recordVideoInfo) {
    const url = `${RECORDVIDEO_PREFIX}/saveRecordVideo`;
    let isSaveSuccess = post(url, recordVideoInfo);
    return isSaveSuccess;
}

export async function getPlayingRecordVideo(videoID) {
    const url = `${RECORDVIDEO_PREFIX}/getPlayingRecordVideo?videoID=${videoID}`;
    let playingRecordVideoInfo =  getJson(url);
    return playingRecordVideoInfo;
}