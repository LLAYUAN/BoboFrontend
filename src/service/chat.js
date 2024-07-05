import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const BASEURL = 'http://localhost:9999/message';

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
}

export default ChatService;
