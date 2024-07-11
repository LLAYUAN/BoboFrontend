import React, { useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';
import {LOGIN_EXPIRED, DUMMY_RESPONSE}from "../service/common"

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
        const player = initializePlayer(`http://10.180.138.227:8000/live/camera${roomId}.flv`);
        if (player) {
            player.play();
            setCurrentStream('camera');
        }
    };

    const showDesktopStream = async () => {
        const player = initializePlayer(`http://10.180.138.227:8000/live/desktop${roomId}.flv`);
        if (player) {
            player.play();
            setCurrentStream('desktop');
        }
    };

    async function getUserId() {
        let token = `${localStorage.getItem('tokenHead')}${localStorage.getItem('token')}`;

        let res = await fetch(`http://localhost:8081/api/getUserId`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": token
            }
        });
        //解析响应的json数据并返回
        if (res.status == 401) {
            return LOGIN_EXPIRED;
        }
        if (res.status !== 200) {
            return DUMMY_RESPONSE;
        }
        return res.json().data;
    }

    const userId = getUserId();

    useEffect(() => {
        showCameraStream();
        // showDesktopStream();

        const userEnter = async () => {
            await fetch('http://localhost:8081/api/user-enter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, roomId: roomId }),
            });
        };

        const userExit = async () => {
            await fetch('http://localhost:8081/api/user-exit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }),
            });
        };

        userEnter();

        window.addEventListener('beforeunload', userExit);

        return () => {
            userExit();
            window.removeEventListener('beforeunload', userExit);
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
        </div>
    );
};

export default VideoShow;
