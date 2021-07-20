/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge')
const defaultCfg = require('./webpack.server.common.config.js')
const { ROOT_PATH } = require('./paths')

module.exports = merge(defaultCfg, {
  profile: true,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(ROOT_PATH, '.dist/server/'),
    filename: '[name].bundle.js',
  },
})
