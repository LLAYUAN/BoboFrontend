// import React, { useState, useRef, useEffect } from 'react';
// import { stop, start } from "../service/livevideo";
//
// const LiveStreaming = ({ roomId,tags,status }) => {
//     const serverUrl = `wss://123.60.73.77:8089/?roomId=${roomId}`;
//     const localVideoRef = useRef(null);
//     const [currentStream, setCurrentStream] = useState(null);
//     const [signalingSocket, setSignalingSocket] = useState(null);
//     const [mediaRecorder, setMediaRecorder] = useState(null);
//     const HTTP = `https://123.60.73.77:8443`;
//     const [isStreaming, setIsStreaming] = useState(status === true);
//
//     const startFFmpeg = (stream) => {
//         //debug
//         console.log(stream);
//
//         const socket = new WebSocket(serverUrl);
//         setSignalingSocket(socket);
//
//         //debug
//         console.log("signalingSocket",socket);
//
//         const recorder = new MediaRecorder(stream);
//
//         recorder.ondataavailable = (event) => {
//             if (event.data.size > 0) {
//                 console.log("send data");
//
//                 socket.send(event.data);
//             }
//         };
//
//         recorder.start(1000); // 每秒发送一次数据
//         setMediaRecorder(recorder);
//     };
//
//     const stopCurrentStream = () => {
//         if (currentStream) {
//             currentStream.getTracks().forEach(track => track.stop());
//             setCurrentStream(null);
//         }
//         if (localVideoRef.current) {
//             localVideoRef.current.srcObject = null;
//         }
//         if (signalingSocket) {
//             signalingSocket.close();
//             setSignalingSocket(null);
//         }
//         if (mediaRecorder) {
//             mediaRecorder.stop();
//             setMediaRecorder(null);
//         }
//         // 清理流 URL
//         localStorage.removeItem('currentUrl');
//     };
//
//     const displayStream = (stream) => {
//         setCurrentStream(stream);
//         if (localVideoRef.current) {
//             localVideoRef.current.srcObject = stream;
//         }
//     };
//
//     const handleStartCameraStream = async () => {
//         stopCurrentStream(); // 停止当前流
//
//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true
//         });
//
//         displayStream(stream); // 显示新流
//         startFFmpeg(stream); // 启动 FFmpeg
//
//         if(isStreaming === false) {
//             localStorage.setItem('isStreaming', true);
//             console.log("set isStreaming to true");
//         }
//         start({ roomId,tags,isStreaming}); // 开始直播
//         setIsStreaming(true);
//         localStorage.setItem('currentUrl', `${HTTP}/live/${roomId}.flv`);
//     };
//
//     const handleStartDesktopStream = async () => {
//         stopCurrentStream(); // 停止当前流
//
//         const stream = await navigator.mediaDevices.getDisplayMedia({
//             video: true,
//             audio: false
//         });
//
//         displayStream(stream); // 显示新流
//         startFFmpeg(stream); // 启动 FFmpeg
//         if(isStreaming === false) {
//             localStorage.setItem('isStreaming', true);
//             console.log("set isStreaming to true");
//         }
//         start({ roomId,tags,isStreaming }); // 开始直播
//         setIsStreaming(true);
//         localStorage.setItem('currentUrl', `${HTTP}/live/${roomId}.flv`);
//     };
//
//     const handleStopStream = () => {
//         if(isStreaming === true) {
//             localStorage.setItem('isStreaming', false);
//             console.log("set isStreaming to false");
//         }
//         const roomIdString = String(roomId);
//         console.log(roomId, roomIdString);
//         stop({ roomId : roomIdString,isStreaming }).then(result => {
//             if (result.status === 200) {
//                 stopCurrentStream(); // 停止流
//             } else {
//                 alert(`Failed to stop stream: ${result.message}`);
//             }
//         });
//         setIsStreaming(false);
//     };
//
//     return (
//         <div className="mainContainer">
//             <video ref={localVideoRef} autoPlay width="1024" height="576" />
//             <br />
//             <div className="streamControls">
//                 <button onClick={handleStartCameraStream}>开始摄像头直播</button>
//                 <button onClick={handleStartDesktopStream}>开始桌面直播</button>
//                 <button
//                     onClick={handleStopStream}
//                     disabled={!isStreaming}
//                 >
//                     结束直播
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default LiveStreaming;
import React, { useState, useRef, useEffect } from 'react';
import { stop, start } from "../service/livevideo";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

const LiveStreaming = ({ roomId, tags, status }) => {
    const serverUrl = `wss://123.60.73.77:8089/?roomId=${roomId}`;
    const localVideoRef = useRef(null);
    const [currentStream, setCurrentStream] = useState(null);
    const [signalingSocket, setSignalingSocket] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordingChunks, setRecordingChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const HTTP = `https://123.60.73.77:8443`;
    const [isStreaming, setIsStreaming] = useState(status === true);

    useEffect(() => {
        const loadFFmpeg = async () => {
            if (!ffmpeg.isLoaded()) {
                await ffmpeg.load();
            }
        };
        loadFFmpeg();
    }, []);

    const startFFmpeg = (stream) => {
        const socket = new WebSocket(serverUrl);
        setSignalingSocket(socket);

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                if (isRecording) {
                    setRecordingChunks(prev => [...prev, event.data]);
                }
                socket.send(event.data);
            }
        };

        recorder.start(1000); // 每秒发送一次数据
        setMediaRecorder(recorder);
    };

    const stopCurrentStream = () => {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            setCurrentStream(null);
        }
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }
        if (signalingSocket) {
            signalingSocket.close();
            setSignalingSocket(null);
        }
        if (mediaRecorder) {
            mediaRecorder.stop();
            setMediaRecorder(null);
        }
        // 清理流 URL
        localStorage.removeItem('currentUrl');
    };

    const displayStream = (stream) => {
        setCurrentStream(stream);
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }
    };

    const handleStartCameraStream = async () => {
        stopCurrentStream(); // 停止当前流

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        displayStream(stream); // 显示新流
        startFFmpeg(stream); // 启动 FFmpeg

        if (isStreaming === false) {
            localStorage.setItem('isStreaming', true);
            console.log("set isStreaming to true");
        }
        start({ roomId, tags, isStreaming }); // 开始直播
        setIsStreaming(true);
        localStorage.setItem('currentUrl', `${HTTP}/live/${roomId}.flv`);
    };

    const handleStartDesktopStream = async () => {
        stopCurrentStream(); // 停止当前流

        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        });

        displayStream(stream); // 显示新流
        startFFmpeg(stream); // 启动 FFmpeg

        if (isStreaming === false) {
            localStorage.setItem('isStreaming', true);
            console.log("set isStreaming to true");
        }
        start({ roomId, tags, isStreaming }); // 开始直播
        setIsStreaming(true);
        localStorage.setItem('currentUrl', `${HTTP}/live/${roomId}.flv`);
    };

    const handleStopStream = () => {
        if (isStreaming === true) {
            localStorage.setItem('isStreaming', false);
            console.log("set isStreaming to false");
        }
        const roomIdString = String(roomId);
        console.log(roomId, roomIdString);
        stop({ roomId: roomIdString, isStreaming }).then(result => {
            if (result.status === 200) {
                stopCurrentStream(); // 停止流
            } else {
                alert(`Failed to stop stream: ${result.message}`);
            }
        });
        setIsStreaming(false);
    };

    const handleStartRecording = () => {
        setRecordingChunks([]);
        setIsRecording(true);
        if (mediaRecorder) {
            mediaRecorder.start(1000);
        }
    };

    const handleStopRecording = async () => {
        setIsRecording(false);
        if (mediaRecorder) {
            mediaRecorder.stop();
        }

        // 创建 Blob 对象
        const blob = new Blob(recordingChunks, { type: 'video/webm' });
        const webmUrl = URL.createObjectURL(blob);

        // 使用 ffmpeg.js 进行转换
        await ffmpeg.load();
        ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(webmUrl));
        await ffmpeg.run('-i', 'recording.webm', 'output.mp4');
        const data = ffmpeg.FS('readFile', 'output.mp4');

        // 生成 mp4 文件的 Blob 并创建下载链接
        const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
        const mp4Url = URL.createObjectURL(mp4Blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = mp4Url;
        a.download = `recording_${roomId}.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(mp4Url);
    };

    return (
        <div className="mainContainer">
            <video ref={localVideoRef} autoPlay width="1024" height="576" />
            <br />
            <div className="streamControls">
                <button onClick={handleStartCameraStream}>开始摄像头直播</button>
                <button onClick={handleStartDesktopStream}>开始桌面直播</button>
                <button
                    onClick={handleStopStream}
                    disabled={!isStreaming}
                >
                    结束直播
                </button>
                <button onClick={handleStartRecording} disabled={isRecording || !currentStream}>
                    开始录制
                </button>
                <button onClick={handleStopRecording} disabled={!isRecording}>
                    停止录制并保存
                </button>
            </div>
        </div>
    );
};

export default LiveStreaming;
