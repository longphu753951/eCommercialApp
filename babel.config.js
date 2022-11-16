module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          screens: './screens',
          navigation: './navigation',
          assets: './assets',
          config: './config',
          components: './components',
          reducers: './reducers',
          store: './store',
          middlewares: './middlewares',
          utils: './utils',
          services: './services',
        },
      },
    ],
  ],
};
