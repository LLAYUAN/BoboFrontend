import React, { useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';
import {LIVEVIDEOPREFIX} from "../service/common"
import {fetchCameraDevices, startCamera, startDesktop, record, stop} from "../service/livevideo"

const RTMP = `rtmp://10.180.138.227:1935`;
const HTTP = `http://10.180.138.227:8000`;
const PATH = `C:/Users`;

const LiveDemo = ({ roomId }) => {

    const videoRef = useRef(null);
    const [flvPlayer, setFlvPlayer] = useState(null);
    const [seekPoint, setSeekPoint] = useState('');
    const [cameraDevices, setCameraDevices] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');

    useEffect(() => {
        fetchCameraDevices().then(result => {
            console.log(result);

            if (result.status === 200) {
                setCameraDevices(result.data);
                if (result.data.length > 0) {
                    setSelectedCamera(result.data[0]);
                }
            } else {
                alert(`Failed to fetch camera devices: ${result.message}`);
            }
        });

    }, []);

    const initializePlayer = (url) => {
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

    const handleStartCameraStream = async (localFilePath) => {
        handleDestroy();

        let data = {
            rtmpUrl: `${RTMP}/live/camera${roomId}`,
            cameraDevice: selectedCamera,
            roomId: roomId,
            localFilePath: localFilePath
        };

        startCamera(data).then(result => {
            console.log(result);

            if (result.status === 200) {
                const player = initializePlayer(`${HTTP}/live/camera${roomId}.flv`);
                // if (player) {
                //     player.play();
                // }
            } else {
                alert(`Failed to start camera stream: ${result.message}`);
            }
        });

    };

    const handleStartDesktopStream = async (localFilePath) => {
        handleDestroy();
        
        let data = {
            rtmpUrl: `${RTMP}/live/desktop${roomId}`,
            roomId: roomId,
            localFilePath: localFilePath
        };
        
        startDesktop(data).then(result => {
            if (result.status === 200) {
                const player = initializePlayer(`${HTTP}/live/desktop${roomId}.flv`);
                // if (player) {
                //     player.play();
                // }
            } else {
                alert(`Failed to start desktop stream: ${result.message}`);
            }
        });

    };

    const handleStartCameraRecord = async (localFilePath) => {
        
        let data = {
            rtmpUrl: `${RTMP}/live/camera${roomId}`,
            localFilePath: localFilePath
        };
        record(data);
    };

    const handleStartDesktopRecord = async (localFilePath) => {

        let data = {
            rtmpUrl: `${RTMP}/live/desktop${roomId}`,
            localFilePath: localFilePath
        };

        record(data);
    };

    const handleStopStream = async () => {
        let data = {roomId: roomId};

        stop(data).then(result => {
            if (result.status === 200) {
                handleDestroy();
            } else {
                alert(`Failed to stop stream: ${result.message}`);
            }
        });

    };

    return (
        <div className="mainContainer">
            <video ref={videoRef} className="centeredVideo" controls autoPlay width="1024" height="576">
                Your browser is too old which doesn't support HTML5 video.
            </video>
            <br />
            <div className="controls">
                <button onClick={handleStart}>开始</button>
                <button onClick={handlePause}>暂停</button>
                <button onClick={handleDestroy}>销毁</button>
                <br />
                <input
                    type="number"
                    placeholder="Seek Time"
                    value={seekPoint}
                    onChange={(e) => setSeekPoint(e.target.value)}
                />
                <button onClick={handleSeekTo}>跳转</button>
            </div>
            <br />
            <div className="streamControls">
                <select value={selectedCamera} onChange={(e) => setSelectedCamera(e.target.value)}>
                    {cameraDevices && cameraDevices.length > 0 ? (
                        cameraDevices.map((device, index) => (
                            <option key={index} value={device}>
                                {device}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            没有可用的摄像头
                        </option>
                    )}
                </select>

                <button onClick={() => handleStartCameraStream('')}>开始摄像头直播</button>
                <button onClick={() => handleStartDesktopStream('')}>开始桌面直播</button>
                <button onClick={handleStopStream}>结束直播</button>
                <button
                    onClick={() => handleStartCameraRecord(`${PATH}/77043/Desktop/video/camera${roomId}.mp4`)}>开始摄像头录制
                </button>
                <button
                    onClick={() => handleStartDesktopRecord(`${PATH}/77043/Desktop/video/desktop${roomId}.mp4`)}>开始桌面录制
                </button>
            </div>
        </div>
    );

};

export default LiveDemo;
