// import React from 'react';
// import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Follower from '../Follower';  // 调整导入路径
//
// // Mock the navigate function from react-router-dom
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => jest.fn(),
// }));
//
// jest.mock('../../service/user', () => ({
//     unfollow: jest.fn(() => Promise.resolve({ code: 200 })),
// }));
//
// describe('Follower', () => {
//     const followers = [
//         { userID: 1, nickname: 'User One', introduction: 'Introduction One' },
//         { userID: 2, nickname: 'User Two', introduction: 'Introduction Two' },
//         { userID: 3, nickname: 'User Three', introduction: 'Introduction Three' },
//     ];
//
//     const renderComponent = () =>
//         render(
//             <BrowserRouter>
//                 <Follower follower={followers} />
//             </BrowserRouter>
//         );
//
//     it('应渲染前两个粉丝', () => {
//         renderComponent();
//
//         expect(screen.getByText('User One')).toBeInTheDocument();
//         expect(screen.getByText('User Two')).toBeInTheDocument();
//         expect(screen.queryByText('User Three')).not.toBeInTheDocument();
//     });
//
//     it('点击"查看全部"按钮应显示所有粉丝', () => {
//         renderComponent();
//
//         fireEvent.click(screen.getByText('查看全部'));
//
//         const modal = screen.getByRole('dialog');
//         expect(within(modal).getByText('User One')).toBeInTheDocument();
//         expect(within(modal).getByText('User Two')).toBeInTheDocument();
//         expect(within(modal).getByText('User Three')).toBeInTheDocument();
//     });
//
//     it('应调用handleDetail函数导航到用户详情页面', () => {
//         const navigateMock = jest.fn();
//         jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);
//
//         renderComponent();
//
//         fireEvent.click(screen.getByText('User One'));
//
//         expect(navigateMock).toHaveBeenCalledWith('/visitprofile/1');
//     });
//
// });
