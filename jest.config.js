module.exports = {
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        "node_modules/(?!(@ant-design/icons|some-other-package)/)"
    ],

    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
