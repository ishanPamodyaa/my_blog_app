module.exports = function(api) {
    api.cache(true);
    return {
      presets: [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // If using NativeWind
        'nativewind/babel', // If using NativeWind
      ],
      plugins: [
        'expo-router/babel',
        'react-native-reanimated/plugin', // If using React Native Reanimated
      ],
    };
  };