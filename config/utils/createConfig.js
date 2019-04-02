const {resolve} = require('path');

const createConfig = ({
  outputFolder,
  entry,
  target,
  externals,
  outputFile,
  plugins,
  alias,
}) => ({
  target,
  entry,
  externals,
  plugins,
  node: {
    constants: false,
    global: true,
    process: true,
    Buffer: true,
    __dirname: false,
    __filename: true,
  },
  output: {
    path: outputFolder,
    filename: outputFile,
    publicPath: '/',
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve(__dirname, '../../node_modules'),
      resolve(__dirname, '../../src'),
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?:\/(?!@page.*))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ], // polyfill for new browser
              '@babel/preset-react', // react jsx compiler
            ],
            plugins: [
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-logical-assignment-operators',
              '@babel/plugin-proposal-do-expressions',
              '@babel/plugin-proposal-function-bind',
              [
                '@babel/plugin-proposal-pipeline-operator',
                {
                  proposal: 'minimal',
                },
              ],
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true,
                },
              ],
              [
                '@babel/transform-runtime',
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});

module.exports = createConfig;
