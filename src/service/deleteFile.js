import {RECORDVIDEO_PREFIX} from "./common";
import {getJson} from './common'

export async function deleteFile(fileName) {
    const url = `${RECORDVIDEO_PREFIX}/deleteFile?fileName=${fileName}`;
    let isDeleteSuccess = getJson(url);
    return isDeleteSuccess;
}