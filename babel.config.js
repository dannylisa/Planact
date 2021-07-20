module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
          '.svg',
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@containers': './src/containers',
          '@modules': './src/modules',
          '@scenes': './src/scenes',
          '@style': './src/style',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};