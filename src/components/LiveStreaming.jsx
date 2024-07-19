import React, { useState, useRef, useEffect } from 'react';
import { stop, start } from "../service/livevideo";

const LiveStreaming = ({ roomId }) => {
    const serverUrl = `ws://localhost:8089`;
    const localVideoRef = useRef(null);
    const [currentStream, setCurrentStream] = useState(null);
    const [currentPeer, setCurrentPeer] = useState(null);
    const [signalingSocket, setSignalingSocket] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleStartCameraStream = async () => {
        stopCurrentStream(); // 停止当前流

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        console.log(stream);
        displayStream(stream); // 显示新流

        let data = { roomId: roomId };
        start(data);
    };

    const handleStartDesktopStream = async () => {
        stopCurrentStream(); // 停止当前流

        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        });

        console.log(stream);
        displayStream(stream); // 显示新流

        let data = { roomId: roomId };
        start(data);
    };

    const stopCurrentStream = () => {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            setCurrentStream(null);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = null;
            }
        }
        if (currentPeer) {
            currentPeer.close();
            setCurrentPeer(null);
        }
        if (signalingSocket) {
            signalingSocket.close();
            setSignalingSocket(null);
        }
        if (mediaRecorder) {
            mediaRecorder.stop();
            setMediaRecorder(null);
        }
        setRecordedChunks([]);
    };

    const displayStream = (stream) => {
        setCurrentStream(stream);
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }
        handlePeer(stream);
    };

    const handleStopStream = () => {
        let data = { roomId: roomId };

        stop(data).then(result => {
            if (result.status === 200) {
                stopCurrentStream();
            } else {
                alert(`Failed to stop stream: ${result.message}`);
            }
        });
    };

    const handlePeer = (stream) => {
        const peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

        const signalingSocket = new WebSocket(serverUrl);
        setSignalingSocket(signalingSocket);

        signalingSocket.onopen = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            signalingSocket.send(JSON.stringify({ type: 'offer', sdp: offer.sdp, roomId }));

            console.log(`Signaling server send offer for roomId: ${roomId}`);
        };

        signalingSocket.onmessage = async (message) => {
            const { type, sdp, candidate } = JSON.parse(message.data);
            if (type === 'answer') {
                const desc = new RTCSessionDescription({ type: 'answer', sdp });
                await peerConnection.setRemoteDescription(desc);
            } else if (type === 'candidate') {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
                    .then(() => {
                        console.log("候选者已添加");
                    })
                    .catch((error) => {
                        console.error("添加候选者失败:", error);
                    });
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                signalingSocket.send(JSON.stringify({ type: 'candidate', candidate: event.candidate, roomId }));
            } else {
                console.log("所有候选者已被发送");
            }
        };

        peerConnection.ontrack = (event) => {
            console.log(`Received remote stream: ${event.streams[0]}`);
        };

        setCurrentPeer(peerConnection);
    };

    const handleStartRecord = () => {
        if (!currentStream) {
            alert("当前没有正在直播的流");
            return;
        }

        const recorder = new MediaRecorder(currentStream);
        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                setRecordedChunks(prev => [...prev, event.data]);
            }
        };

        recorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'recording.webm';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        };

        recorder.start();
        setMediaRecorder(recorder);
    };

    return (
        <div className="mainContainer">
            <video ref={localVideoRef} autoPlay width="1024" height="576" />
            <br />
            <div className="streamControls">
                <button onClick={handleStartCameraStream}>开始摄像头直播</button>
                <button onClick={handleStartDesktopStream}>开始桌面直播</button>
                <button onClick={handleStopStream}>结束直播</button>
                <button onClick={handleStartRecord}>开始录制</button>
            </div>
        </div>
    );
};

export default LiveStreaming;
