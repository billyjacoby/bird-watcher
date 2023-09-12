module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: true,
        allowUndefined: false,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@lib': './src/lib',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@stores': './src/stores',
        },
      },
    ],
  ],
};
