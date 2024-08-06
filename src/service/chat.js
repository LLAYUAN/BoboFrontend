import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getJson } from './common';  // 假设 common.js 文件在同一目录

const BASEURL = `http://${process.env.REACT_APP_hostIP}:9999/message`;

class ChatService {
    constructor(roomID, onMessageReceived, onError) {
        this.roomID = roomID;
        this.onMessageReceived = onMessageReceived;
        this.onError = onError;
        this.stompClient = null;
    }

    connect(username, token) {
        const sock = new SockJS(`${BASEURL}/chat?token=${token}`);
        this.stompClient = Stomp.over(sock);

        // 配置心跳机制，outgoing 和 incoming 的时间间隔（以毫秒为单位）
        this.stompClient.heartbeat.outgoing = 20000; // 客户端每20秒发送一次心跳
        this.stompClient.heartbeat.incoming = 20000; // 客户端每20秒期望收到一次心跳

        this.stompClient.connect(
            {},
            (frame) => {
                this.onConnected(username);
            },
            (error) => {
                console.error('Connection error:', error);
                if (this.onError) {
                    this.onError(error);
                }
            }
        );
    }

    onConnected(username) {
        console.log('Connected to WebSocket');
        if (this.stompClient) {
            this.stompClient.subscribe(`/topic/public/${this.roomID}`, this.onMessageReceived);
            this.stompClient.send(`/app/chat.addUser`, {}, JSON.stringify({
                roomID: this.roomID,
                sender: username,
                type: 'JOIN',
                timestamp: new Date(),
            }));
        } else {
            console.error('stompClient is null on connection');
        }
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
    }

    sendMessage(username, content) {
        if (this.stompClient && content) {
            const chatMessage = {
                roomID: this.roomID,
                sender: username,
                content: content,
                type: 'CHAT',
                timestamp: new Date(),
            };
            this.stompClient.send(`/app/chat.sendMessage`, {}, JSON.stringify(chatMessage));
        }
    }

    static async getHistoryMessages(roomID, timestamp) {
        const url = `${BASEURL}/history/${roomID}?timestamp=${timestamp}`;
        return await getJson(url);  // 使用 getJson 方法获取历史消息
    }
}

export default ChatService;
