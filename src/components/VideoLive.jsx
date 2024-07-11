import React, { useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';

const LiveDemo = ({ roomId }) => {
    const videoRef = useRef(null);
    const [flvPlayer, setFlvPlayer] = useState(null);
    const [seekPoint, setSeekPoint] = useState('');
    const [cameraDevices, setCameraDevices] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');
    const [currentStream, setCurrentStream] = useState(null);

    useEffect(() => {
        const fetchCameraDevices = async () => {
            const response = await fetch('http://localhost:8081/api/camera-devices');
            const devices = await response.json();
            console.log(devices);
            setCameraDevices(devices.data);
            if (devices.data.length > 0) {
                setSelectedCamera(devices.data[0]);
            }
        };
        fetchCameraDevices();
    }, []);

    const initializePlayer = (url) => {
        console.log(url);
        if (flvJs.isSupported()) {
            const playerInstance = flvJs.createPlayer(
                {
                    type: 'flv',
                    url: url,
                },
                {
                    enableWorker: false,
                    enableStashBuffer: false,
                    reuseRedirectedURL: true,
                    autoCleanupSourceBuffer: true,
                }
            );
            playerInstance.attachMediaElement(videoRef.current);
            playerInstance.load();
            setFlvPlayer(playerInstance);
            return playerInstance;
        }
        return null;
    };
    const handleStart = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleSeekTo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = parseFloat(seekPoint);
        }
    };


    const handleDestroy = () => {
        if (flvPlayer) {
            flvPlayer.pause();
            flvPlayer.unload();
            flvPlayer.detachMediaElement();
            flvPlayer.destroy();
            setFlvPlayer(null);
        }
    };

    const handleStartCameraStream = async () => {
        handleDestroy();  // 先销毁当前流
        const response = await fetch('http://localhost:8081/api/camera-live', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rtmpUrl: `rtmp://10.180.138.227:1935/live/camera${roomId}`,
                cameraDevice: selectedCamera
            }),
        });

        if (response.status === 200) {
            const player = initializePlayer(`http://10.180.138.227:8000/live/camera${roomId}.flv`);
            if (player) {
                player.play();
                setCurrentStream('camera');
            }
        } else {
            const errorData = await response.json();
            alert(`Failed to start camera stream: ${errorData.error}`);
        }
    };

    const handleStartDesktopStream = async () => {
        handleDestroy();  // 先销毁当前流
        const response = await fetch('http://localhost:8081/api/desktop-live', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rtmpUrl: `rtmp://10.180.138.227:1935/live/desktop${roomId}`,
            }),
        });

        if (response.status === 200) {
            const player = initializePlayer(`http://10.180.138.227:8000/live/desktop${roomId}.flv`);
            if (player) {
                player.play();
                setCurrentStream('desktop');
            }
        } else {
            const errorData = await response.json();
            alert(`Failed to start desktop stream: ${errorData.error}`);
        }
    };

    return (
        <div className="mainContainer">
            <video
                ref={videoRef}
                className="centeredVideo"
                controls
                autoPlay
                width="1024"
                height="576"
            >
                Your browser is too old which doesn't support HTML5 video.
            </video>
            <br />
            <div className="controls">
                <button onClick={handleStart}>开始</button>
                <button onClick={handlePause}>暂停</button>
                <button onClick={handleDestroy}>停止</button>
                <input
                    style={{ width: '100px' }}
                    type="text"
                    name="seekpoint"
                    value={seekPoint}
                    onChange={(e) => setSeekPoint(e.target.value)}
                />
                <button onClick={handleSeekTo}>跳转</button>
                <br />
                <button onClick={handleStartCameraStream}>开始摄像头直播</button>
                <button onClick={handleStartDesktopStream}>开始桌面直播</button>
            </div>
        </div>
    );
};

export default LiveDemo;
