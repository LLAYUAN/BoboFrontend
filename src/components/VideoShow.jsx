import React, { useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';
import {userEnter, userExit} from "../service/livevideo";

const HTTP = `https://123.60.73.77:8000`;

const VideoShow = ({ roomId }) => {
    const videoRef = useRef(null);
    const [flvPlayer, setFlvPlayer] = useState(null);
    const [currentStream, setCurrentStream] = useState(null);

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

    const handleDestroy = () => {
        if (flvPlayer) {
            flvPlayer.pause();
            flvPlayer.unload();
            flvPlayer.detachMediaElement();
            flvPlayer.destroy();
            setFlvPlayer(null);
        }
    };

    const showCameraStream = () => {
        handleDestroy();
        const player = initializePlayer(`${HTTP}/live/${roomId}.flv`);
        if (player) {
            player.play();
            setCurrentStream('camera');
        }
    };


    const showDesktopStream = () => {
        handleDestroy();
        const player = initializePlayer(`${HTTP}/live/${roomId}.flv`);
        if (player) {
            player.play();
            setCurrentStream('desktop');
        }
    };

    useEffect(() => {
        showDesktopStream();

        const data = {
            userId: localStorage.getItem('userID'),
            roomId: roomId,
            nickname: localStorage.getItem('nickname'),
        };

        const handleUserEnter = async () => {
            await userEnter(data);
        };

        handleUserEnter();

        const handleUserExit = async () => {
            await userExit(data);
        };

        window.addEventListener('beforeunload', handleUserExit);

        return () => {
            handleUserExit();
            window.removeEventListener('beforeunload', handleUserExit);
        };
    }, [roomId]);



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
                {/* <button onClick={showDesktopStream}>观看桌面直播</button> */}
            </div>
        </div>
    );
};

export default VideoShow;
