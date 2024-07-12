import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatBox from '../ChatBox';
import ChatService from '../../service/chat';

jest.mock('../../service/chat');

describe('ChatBox 组件', () => {
    const roomID = 'test-room';
    const username = 'test-user';
    const token = 'test-token';
    let mockChatServiceInstance;

    beforeEach(() => {
        localStorage.setItem('nickname', username);
        localStorage.setItem('token', token);

        // 模拟 ChatService 的实例方法和静态方法
        mockChatServiceInstance = {
            connect: jest.fn(),
            sendMessage: jest.fn(),
            onMessageReceived: jest.fn(),
            disconnect: jest.fn(),
        };

        // 模拟 ChatService 的构造函数
        ChatService.mockImplementation(() => mockChatServiceInstance);


        ChatService.getHistoryMessages = jest.fn().mockResolvedValue([
            {
                id: '668f8b96e41f7873f77e689a',
                type: 'JOIN',
                content: '用户97 joined',
                sender: '用户97',
                roomID: 1,
                userID: null,
                timestamp: '2024-07-11T07:36:54.367Z'
            },
            {
                id: '668f8b96e41f7873f77e689b',
                type: 'CHAT',
                content: 'message1',
                sender: 'test1',
                roomID: 1,
                userID: null,
                timestamp: '2024-07-11T07:37:06.395Z'
            },
            {
                id: '668f8b96e41f7873f77e689c',
                type: 'CHAT',
                content: 'message2',
                sender: 'test2',
                roomID: 1,
                userID: null,
                timestamp: '2024-07-11T07:38:06.395Z'
            }
        ]);
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('渲染聊天框', () => {
        render(<ChatBox roomID={roomID}/>);
        expect(screen.getByText(/发 送/)).toBeInTheDocument();
    });

    test('点击按钮加载历史消息', async () => {
        render(<ChatBox roomID={roomID}/>);

        const loadMoreButton = screen.getByText(/加载历史消息/);
        fireEvent.click(loadMoreButton);

        // 增加日志以调试
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 等待消息加载
            console.log('Loading messages finished'); // 日志输出
        });

        await screen.findByText('message1');
        await screen.findByText('message2');
    });

    test('点击按钮发送消息', () => {
        const mockChatServiceInstance = new ChatService(roomID, jest.fn(), jest.fn());
        mockChatServiceInstance.sendMessage = jest.fn();

        render(<ChatBox roomID={roomID}/>);

        const input = screen.getByRole('textbox');
        const sendButton = screen.getByText(/发 送/);

        fireEvent.change(input, {target: {value: 'Hello, World!'}});
        fireEvent.click(sendButton);

        expect(mockChatServiceInstance.sendMessage).toHaveBeenCalledWith(username, 'Hello, World!');
        expect(input.value).toBe('');
    });
});