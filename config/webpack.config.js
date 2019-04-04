const {resolve} = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ManifestPlugin = require('webpack-manifest-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const createConfig = require('./utils/createConfig');

require('dotenv').config({
  path: resolve(__dirname, '../.env'),
});

const OUTPUT_FOLDER = resolve(__dirname, '../dist');

console.log(resolve(__dirname, '../../src/client/packages/page-layout/src/'));

const GLOBAL_ALIASES = {
  '@i18n': resolve(__dirname, '../src/shared/page-i18n/src/'),
  '@jss': resolve(__dirname, '../src/shared/page-jss/src/'),
  '@utils': resolve(__dirname, '../src/shared/page-utils/src/'),
  '@constants': resolve(__dirname, '../src/shared/page-constants/src/'),

  '@client/links': resolve(__dirname, '../src/client/packages/page-layout/src/containers/Links/'),
  '@client/core': resolve(__dirname, '../src/client/packages/page-core/src/'),
  '@client/layout': resolve(__dirname, '../src/client/packages/page-layout/src/'),
  '@client': resolve(__dirname, '../src/client/'),

  '@server': resolve(__dirname, '../src/server/'),
};

module.exports = [
  // client stuff
  createConfig(
    {
      alias: GLOBAL_ALIASES,
      target: 'web',
      entry: resolve(__dirname, '../src/client/src/index.jsx'),
      outputFolder: OUTPUT_FOLDER,
      outputFile: 'public/client-[hash].js',
      plugins: [
        new ManifestPlugin,
        new CleanWebpackPlugin(
          {
            cleanOnceBeforeBuildPatterns: ['dist/'],
            root: resolve(__dirname, '../'),
          },
        ),
        new webpack.DefinePlugin(
          {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.API_URL': JSON.stringify(process.env.API_URL),
          },
        ),
      ],
    },
  ),

  // server stuff
  createConfig(
    {
      alias: GLOBAL_ALIASES,
      target: 'node',
      entry: resolve(__dirname, '../src/server/src/index.jsx'),
      outputFolder: OUTPUT_FOLDER,
      outputFile: 'server.js',
      externals: [
        nodeExternals(
          {
            whitelist: [
              /^@page.*/,
            ],
          },
        ),
      ],
      plugins: [
        new NodemonPlugin,
      ],
    },
  ),
];
