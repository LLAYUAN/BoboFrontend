// __mocks__/user.js
export const unfollow = jest.fn((userID) => Promise.resolve({ code: 200 }));
