import React, { useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';

const HTTP = `http://10.180.138.227:8000`;

const VideoShow = ({ roomId }) => {
    const videoRef = useRef(null);
    const [flvPlayer, setFlvPlayer] = useState(null);
    const [currentStream, setCurrentStream] = useState(null);

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

    const showCameraStream = async () => {
        handleDestroy();
        const player = initializePlayer(`${HTTP}/live/${roomId}.flv`);
        if (player) {
            setCurrentStream('camera');
        }
    };

    const showDesktopStream = async () => {
        handleDestroy();
        const player = initializePlayer(`${HTTP}/live/${roomId}.flv`);
        if (player) {
            setCurrentStream('desktop');
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
            <div className="streamSelector">
                <button onClick={showCameraStream}>观看直播</button>
                {/*<button onClick={showDesktopStream}>观看桌面直播</button>*/}
            </div>
        </div>
    );
};

export default VideoShow;
