import React, { useState, useRef, useEffect } from 'react';
import { stop, start } from "../service/livevideo";

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

    const startFFmpeg = (stream) => {
        const socket = new WebSocket(serverUrl);
        setSignalingSocket(socket);

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                setRecordingChunks(prev => [...prev, event.data]);
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
        // setRecordingChunks([]);
        setIsRecording(true);
        // if (mediaRecorder) {
        //     mediaRecorder.start(1000); // 每秒记录一次数据
        // }
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        // if (mediaRecorder) {
        //     mediaRecorder.stop();
        // }

        // 创建 Blob 对象
        const blob = new Blob(recordingChunks, { type: 'video/webm' });
        console.log(recordingChunks);
        const webmUrl = URL.createObjectURL(blob);

        // 创建下载链接
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = webmUrl;
        a.download = `recording_${roomId}.webm`; // 先保存为 WebM 格式
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(webmUrl);
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
