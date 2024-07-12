import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Following from '../Following';
import { unfollow } from '../../service/user';
import { notification } from 'antd';

// Mock 取消关注的 API 调用
jest.mock('../../service/user', () => ({
    unfollow: jest.fn(),
}));

// Mock notification
jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    return {
        ...antd,
        notification: {
            error: jest.fn(),
        },
    };
});

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: jest.fn(),
    };
});

const following = [
    { userID: 1, nickname: 'User1', introduction: '简介 1' },
    { userID: 2, nickname: 'User2', introduction: '简介 2' },
];

describe('FollowingList 组件', () => {
    const mockNavigate = require('react-router-dom').useNavigate;
    const mockUnfollow = require('../../service/user').unfollow;
    const mockNotification = require('antd').notification;

    beforeEach(() => {
        mockNavigate.mockClear();
        mockNavigate.mockReturnValue(jest.fn()); // 确保 navigate 是一个函数
        mockUnfollow.mockClear();
        mockNotification.error.mockClear();
    });

    test('使用初始用户渲染组件', () => {
        render(
            <Router>
                <Following following={following} />
            </Router>
        );

        expect(screen.getByText('User1')).toBeInTheDocument();
        expect(screen.getByText('User2')).toBeInTheDocument();
    });

    test('点击 "查看全部" 按钮时显示模态框', () => {
        render(
            <Router>
                <Following following={following} />
            </Router>
        );

        fireEvent.click(screen.getByText('查看全部'));

        expect(screen.getByText('Following')).toBeInTheDocument();
    });

    test('点击删除按钮时显示确认模态框', () => {
        render(
            <Router>
                <Following following={following} />
            </Router>
        );

        fireEvent.click(screen.getAllByRole('button', { name: /user-delete/i })[0]);

        expect(screen.getByText('取消关注')).toBeInTheDocument();
    });

    test('处理取消关注确认', async () => {
        mockUnfollow.mockResolvedValue({ code: 200 });

        render(
            <Router>
                <Following following={following} />
            </Router>
        );

        fireEvent.click(screen.getAllByRole('button', { name: /user-delete/i })[0]);
        await screen.findByText('取消关注'); // 等待模态框显示
        fireEvent.click(screen.getByRole('button', { name: '确 认' }));

        await waitFor(() => expect(mockUnfollow).toHaveBeenCalledWith(1));
    });

    test('取消关注失败时显示错误通知', async () => {
        mockUnfollow.mockResolvedValue({ code: 500 });

        render(
            <Router>
                <Following following={following} />
            </Router>
        );

        fireEvent.click(screen.getAllByRole('button', { name: /user-delete/i })[0]);
        await screen.findByText('取消关注'); // 等待模态框显示
        fireEvent.click(screen.getByRole('button', { name: '确 认' }));

        await waitFor(() => expect(mockNotification.error).toHaveBeenCalledWith({
            message: '失败',
            description: '关注失败',
            placement: 'topRight',
        }));
    });

    test('点击用户名称时导航到用户资料页', () => {
        const navigate = jest.fn();
        mockNavigate.mockReturnValue(navigate);

        render(
            <Router>
                <Following following={following} />
            </Router>
        );

        fireEvent.click(screen.getByText('User1'));

        expect(navigate).toHaveBeenCalledWith('/visitprofile/1');
    });
});
