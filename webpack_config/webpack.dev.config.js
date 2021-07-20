/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getDefault = require('./webpack.common.config.js')
const { ROOT_PATH } = require('./paths')

let ENVPATH = '../envs/development.env.js'
const CONSTS = require(ENVPATH)
const publicPath = CONSTS.PUBLIC_PATH

function getConfig(target) {
  const defaultCfg = getDefault(target)

  const config = merge(defaultCfg, {
    // profile: true,
    mode: 'development',
    devtool: 'source-map',
    output: {
      path: path.resolve(
        ROOT_PATH,
        target === 'web' ? '.dist/assets/' : '.dist/server_assets'
      ),
      filename: '[name].bundle.js',
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
      publicPath,
    },
    stats: {
      cachedAssets: true,
    },
    plugins: [
      new webpack.DefinePlugin(
        Object.assign(
          {
            PRDUCTION: false,
            DEVELOPMENT: true,
          },
          CONSTS.extractKeyValue(CONSTS)
        )
      ),
    ],
  })

  if (target !== 'web') {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
      })
    )
  }
  return config
}

module.exports = [getConfig('web'), getConfig('node')]
