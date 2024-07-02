import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const BASEURL = 'http://localhost:8083';

class ChatService {
    constructor(roomID, onMessageReceived, onError) {
        this.roomID = roomID;
        this.onMessageReceived = onMessageReceived;
        this.onError = onError;
        this.stompClient = null;
    }

    connect(username) {
        const sock = new SockJS(`${BASEURL}/chat`);
        this.stompClient = Stomp.over(sock);
        this.stompClient.connect({}, () => {
            this.onConnected(username);
        }, this.onError);
    }

    onConnected(username) {
        console.log('Connected to WebSocket');
        if (this.stompClient) {
            this.stompClient.subscribe(`/topic/public/${this.roomID}`, this.onMessageReceived);
            this.stompClient.send(`/app/chat.addUser/${this.roomID}`, {}, JSON.stringify({
                sender: username,
                type: 'JOIN',
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
                sender: username,
                content: content,
                type: 'CHAT',
            };
            this.stompClient.send(`/app/chat.sendMessage/${this.roomID}`, {}, JSON.stringify(chatMessage));
        }
    }
}

export default ChatService;