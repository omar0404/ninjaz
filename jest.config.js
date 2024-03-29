module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/ImageMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@realm|react-native-config)/)',
  ],
  testPathIgnorePatterns: ['<rootDir>/e2e'],
};
