import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LiveAnchor from '../LiveAnchor';
import { useParams } from 'react-router-dom';
import { fetchRoomInfo } from '../../service/livevideo';

// Mock 依赖
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

jest.mock('../../service/livevideo', () => ({
    fetchRoomInfo: jest.fn(),
}));

jest.mock('../../components/ChatBox', () => () => <div>聊天室组件</div>);
jest.mock('../../components/UserList', () => () => <div>用户列表组件</div>);
jest.mock('../../components/VideoLive', () => () => <div>视频直播组件</div>);

describe('LiveAnchor 组件', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ roomID: '123' });
    });

    test('正确渲染 LiveAnchor 组件', async () => {
        // Mock fetchRoomInfo 函数
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            roomName: '测试房间',
            tags: [true, false, true],
        });

        render(<LiveAnchor />);

        // 检查 roomID 是否被正确记录（调试用）
        expect(useParams().roomID).toBe('123');

        // 检查标题是否正确渲染
        await waitFor(() => expect(screen.getByText('测试房间')).toBeInTheDocument());

        // 检查标签是否正确渲染
        await waitFor(() => {
            expect(screen.getByText('学习')).toBeInTheDocument();
            expect(screen.queryByText('娱乐')).not.toBeInTheDocument();
            expect(screen.getByText('其他')).toBeInTheDocument();
        });

        // 检查 mock 组件是否被正确渲染
        await waitFor(() => {
            expect(screen.getByText(/聊天室组件/)).toBeInTheDocument();
            expect(screen.getByText(/用户列表/)).toBeInTheDocument();
            expect(screen.getByText(/视频直播/)).toBeInTheDocument();
        });
    });

    test('正确处理空的 roomInfo', async () => {
        // Mock fetchRoomInfo 函数返回空 roomInfo
        fetchRoomInfo.mockResolvedValue({});

        render(<LiveAnchor />);

        // 检查标题是否没有被渲染
        await waitFor(() => expect(screen.queryByText('测试房间')).not.toBeInTheDocument());

        // 检查标签是否没有被渲染
        await waitFor(() => {
            expect(screen.queryByText('学习')).not.toBeInTheDocument();
            expect(screen.queryByText('娱乐')).not.toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });

    test('正确处理部分标签的 roomInfo', async () => {
        // Mock fetchRoomInfo 函数返回部分标签的 roomInfo
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            roomName: '测试房间',
            tags: [true, true, false],
        });

        render(<LiveAnchor />);

        // 检查标题是否正确渲染
        await waitFor(() => expect(screen.getByText('测试房间')).toBeInTheDocument());

        // 检查标签是否正确渲染
        await waitFor(() => {
            expect(screen.getByText('学习')).toBeInTheDocument();
            expect(screen.getByText('娱乐')).toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });

    test('正确处理标签为 undefined 的 roomInfo', async () => {
        // Mock fetchRoomInfo 函数返回标签为 undefined 的 roomInfo
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            roomName: '测试房间',
            tags: undefined,
        });

        render(<LiveAnchor />);

        // 检查标题是否正确渲染
        await waitFor(() => expect(screen.getByText('测试房间')).toBeInTheDocument());

        // 检查标签是否没有被渲染
        await waitFor(() => {
            expect(screen.queryByText('学习')).not.toBeInTheDocument();
            expect(screen.queryByText('娱乐')).not.toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });

});
