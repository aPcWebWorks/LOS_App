// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   env: {
//     production: {
//       plugins: ['react-native-paper/babel'],
//     },
//   },
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin', 'react-native-paper/babel'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
