import React, { useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';
import {userEnter, userExit} from "../service/livevideo"

const HTTP = `http://192.168.0.241:8000`;

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
        const player = initializePlayer(`${HTTP}/live/camera${roomId}.flv`);
        if (player) {
            player.play();
            setCurrentStream('camera');
        }
    };

    const showDesktopStream = async () => {
        const player = initializePlayer(`${HTTP}/live/desktop${roomId}.flv`);
        if (player) {
            player.play();
            setCurrentStream('desktop');
        }
    };

    

    const userId = localStorage.getItem('userID')

     useEffect(() => {
        // showCameraStream();
        showDesktopStream();
         let data1 = {
            userId: userId,
            roomId: roomId,
        };

         let data2  = { userId: userId };
        userEnter(data1);

        window.addEventListener('beforeunload', userExit);

        return () => {
            userExit(data2);
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
