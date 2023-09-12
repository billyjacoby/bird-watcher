/* eslint-disable @typescript-eslint/no-var-requires */
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const defConf = getDefaultConfig();
const config = {
  resetCache: true,
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defConf.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defConf.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
