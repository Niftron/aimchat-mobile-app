module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          components: './src/components/containers',
          elements: './src/components/elements',
          screens: './src/screens',
          app: './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
