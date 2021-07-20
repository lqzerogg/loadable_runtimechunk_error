/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
let ENVPATH = '../envs/development.env.js'
const CONSTS = require(ENVPATH)

const { SERVER_PATH, ROOT_PATH, SERVER_ASSETS_PATH } = require('./paths')

module.exports = {
  target: 'node',
  context: ROOT_PATH,
  externalsPresets: { node: true },
  externals: [
    nodeExternals(),
    ({ context, request }, callback) => {
      // external webpack config
      const resultCfg = /(webpack_config)(\/[.\w]+)/.exec(request)
      if (resultCfg) {
        return callback(
          null,
          `commonjs ${ROOT_PATH}/${resultCfg[1]}${resultCfg[2]}`
        )
      }
      callback()
    },
  ],
  entry: {
    server: [path.resolve(SERVER_PATH, 'index.ts')],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              caller: { target: 'node' },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    clean: true,
    pathinfo: false,
  },
  resolve: {
    modules: [path.resolve(ROOT_PATH, 'node_modules')],
    alias: {
      // '@webpack_config': path.resolve(ROOT_PATH, 'webpack_config'),
    },
    symlinks: false,
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign(
        {
          PRDUCTION: false,
          DEVELOPMENT: true,
        },
        CONSTS.extractKeyValue({
          ROOT_PATH,
          SERVER_ASSETS_PATH,
        })
      )
    ),
  ],
}
