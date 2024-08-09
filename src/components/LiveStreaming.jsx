import React, { useState, useRef, useEffect } from 'react';
import { stop, start } from "../service/livevideo";

const LiveStreaming = ({ roomId,tags,status }) => {
    const serverUrl = `wss://123.60.73.77:8089/?roomId=${roomId}`;
    const localVideoRef = useRef(null);
    const [currentStream, setCurrentStream] = useState(null);
    const [signalingSocket, setSignalingSocket] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const HTTP = `https://123.60.73.77:8443`;
    const [isStreaming, setIsStreaming] = useState(status === true);

    const startFFmpeg = (stream) => {
        //debug
        console.log(stream);

        const socket = new WebSocket(serverUrl);
        setSignalingSocket(socket);

        //debug
        console.log("signalingSocket",socket);

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                console.log("send data");

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

        if(isStreaming === false) {
            localStorage.setItem('isStreaming', true);
            console.log("set isStreaming to true");
        }
        start({ roomId,tags,isStreaming}); // 开始直播
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
        if(isStreaming === false) {
            localStorage.setItem('isStreaming', true);
            console.log("set isStreaming to true");
        }
        start({ roomId,tags,isStreaming }); // 开始直播
        setIsStreaming(true);
        localStorage.setItem('currentUrl', `${HTTP}/live/${roomId}.flv`);
    };

    const handleStopStream = () => {
        if(isStreaming === true) {
            localStorage.setItem('isStreaming', false);
            console.log("set isStreaming to false");
        }
        const roomIdString = String(roomId);
        console.log(roomId, roomIdString);
        stop({ roomId : roomIdString,isStreaming }).then(result => {
            if (result.status === 200) {
                stopCurrentStream(); // 停止流
            } else {
                alert(`Failed to stop stream: ${result.message}`);
            }
        });
        setIsStreaming(false);
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
            </div>
        </div>
    );
};

export default LiveStreaming;
