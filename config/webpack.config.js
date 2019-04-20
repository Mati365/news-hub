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

const GLOBAL_ALIASES = {
  '@i18n': 'shared/page-i18n/src/',
  '@jss': 'shared/page-jss/src/',
  '@utils': 'shared/page-utils/src/',
  '@constants': 'shared/page-constants/src/',
  '@icons': 'shared/page-icons/src/',

  '@client/links': 'client/packages/page-layout/src/containers/Links/',
  '@client/core': 'client/packages/page-core/src/',
  '@client/layout': 'client/packages/page-layout/src/',
  '@client': 'client/',

  '@services': 'server/src/services/',
  '@db': 'server/src/db/',
  '@db/models': 'server/src/db/models/',
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
              /^@shared.*/,
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
