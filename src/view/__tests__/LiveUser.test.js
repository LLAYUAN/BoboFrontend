import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import LiveUser from '../LiveUser';
import { useParams } from 'react-router-dom';
import { fetchRoomInfo } from '../../service/livevideo';

// Mock the dependencies
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

jest.mock('../../service/livevideo', () => ({
    fetchRoomInfo: jest.fn(),
}));

jest.mock('../../components/ChatBox', () => () => <div>ChatBox Component</div>);
jest.mock('../../components/UserBox', () => () => <div>UserBox Component</div>);
jest.mock('../../components/VideoShow', () => () => <div>VideoShow Component</div>);

describe('LiveUser Component', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ roomID: '123' });
    });

    test('renders LiveUser component correctly', async () => {
        // Mock the fetchRoomInfo function
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            userID: '456',
            userName: 'Test User',
            userDescription: 'This is a test user.',
            avatarUrl: 'http://example.com/avatar.png',
            roomName: 'Test Room',
            tags: [true, false, true],
        });

        render(<LiveUser />);

        // Check if the roomID is logged (useful for debugging)
        expect(useParams().roomID).toBe('123');

        // Check if the title is rendered correctly after the fetch
        await waitFor(() => expect(screen.getByText('Test Room')).toBeInTheDocument());

        // Check if the tags are rendered correctly
        await waitFor(() => {
            expect(screen.getByText('学习')).toBeInTheDocument();
            expect(screen.getByText('其他')).toBeInTheDocument();
        });

        // Check if the mocked components are rendered
        expect(screen.getByText('ChatBox Component')).toBeInTheDocument();
        expect(screen.getByText('UserBox Component')).toBeInTheDocument();
        expect(screen.getByText('VideoShow Component')).toBeInTheDocument();
    });

    test('handles empty roomInfo correctly', async () => {
        // Mock the fetchRoomInfo function with empty roomInfo
        fetchRoomInfo.mockResolvedValue({});

        render(<LiveUser />);

        // Check if the title is not rendered
        await waitFor(() => expect(screen.queryByText('Test Room')).not.toBeInTheDocument());

        // Check if no tags are rendered
        await waitFor(() => {
            expect(screen.queryByText('学习')).not.toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });

    test('handles partial tags in roomInfo correctly', async () => {
        // Mock the fetchRoomInfo function with partial tags
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            userID: '456',
            userName: 'Test User',
            userDescription: 'This is a test user.',
            avatarUrl: 'http://example.com/avatar.png',
            roomName: 'Test Room',
            tags: [true, true, false],
        });

        render(<LiveUser />);

        // Check if the title is rendered correctly
        await waitFor(() => expect(screen.getByText('Test Room')).toBeInTheDocument());

        // Check if the tags are rendered correctly
        await waitFor(() => {
            expect(screen.getByText('学习')).toBeInTheDocument();
            expect(screen.getByText('娱乐')).toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });

    test('handles undefined tags in roomInfo correctly', async () => {
        // Mock the fetchRoomInfo function with undefined tags
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            userID: '456',
            userName: 'Test User',
            userDescription: 'This is a test user.',
            avatarUrl: 'http://example.com/avatar.png',
            roomName: 'Test Room',
            tags: undefined,
        });

        render(<LiveUser />);

        // Check if the title is rendered correctly
        await waitFor(() => expect(screen.getByText('Test Room')).toBeInTheDocument());

        // Check if no tags are rendered
        await waitFor(() => {
            expect(screen.queryByText('学习')).not.toBeInTheDocument();
            expect(screen.queryByText('娱乐')).not.toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });

    test('handles missing roomName in roomInfo correctly', async () => {
        // Mock the fetchRoomInfo function with missing roomName
        fetchRoomInfo.mockResolvedValue({
            roomID: '123',
            userID: '456',
            userName: 'Test User',
            userDescription: 'This is a test user.',
            avatarUrl: 'http://example.com/avatar.png',
            tags: [true, false, true],
        });

        render(<LiveUser />);

        // Check if the title is not rendered
        await waitFor(() => expect(screen.queryByText('Test Room')).not.toBeInTheDocument());

        // Check if the tags are not rendered
        await waitFor(() => {
            expect(screen.queryByText('学习')).not.toBeInTheDocument();
            expect(screen.queryByText('娱乐')).not.toBeInTheDocument();
            expect(screen.queryByText('其他')).not.toBeInTheDocument();
        });
    });
});
