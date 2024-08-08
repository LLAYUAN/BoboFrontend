// import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// // import '@testing-library/jest-dom/extend-expect';
// import LoginForm from '../LoginForm';  // 根据需要调整导入路径
//
// // 模拟 react-router-dom 中的 navigate 函数
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => jest.fn(),
// }));
//
// describe('LoginForm', () => {
//     const handleLoginMock = jest.fn();
//
//     const renderComponent = () =>
//         render(
//             <BrowserRouter>
//                 <LoginForm handleLogin={handleLoginMock} />
//             </BrowserRouter>
//         );
//
//     it('应渲染 email 和 password 输入字段', () => {
//         renderComponent();
//
//         expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
//         expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//     });
//
//     it('当 email 未提供时应显示错误信息', async () => {
//         renderComponent();
//
//         fireEvent.click(screen.getByText('登 入'));
//
//         expect(await screen.findByText('Please input your email!')).toBeInTheDocument();
//     });
//
//     it('当 password 未提供时应显示错误信息', async () => {
//         renderComponent();
//
//         fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
//         fireEvent.click(screen.getByText('登 入'));
//
//         expect(await screen.findByText('Please input your password!')).toBeInTheDocument();
//     });
//
//     it('应调用 handleLogin 并传递 email 和 password', async () => {
//         renderComponent();
//
//         fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
//         fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
//
//         await act(async () => {
//             fireEvent.click(screen.getByText('登 入'));
//         });
//
//         expect(handleLoginMock).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password', remember: true });
//     });
//
//     it('点击 "register now!" 链接时应导航到注册页面', () => {
//         const navigateMock = jest.fn();
//         jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);
//
//         renderComponent();
//
//         fireEvent.click(screen.getByText('register now!'));
//
//         expect(navigateMock).toHaveBeenCalledWith('/register');
//     });
// });
