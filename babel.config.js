module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-flow'
    ],
    plugins: [
      // React Native Reanimated plugin (should be last)
      'react-native-reanimated/plugin',
      // Optional: Add other plugins you might need
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-transform-react-jsx-source'
    ],
    env: {
      production: {
        plugins: [
          'react-native-paper/babel',
          'transform-remove-console'
        ]
      }
    }
  };
};