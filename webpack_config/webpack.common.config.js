/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { ROOT_PATH, CLIENT_PATH, ASSETS_PATH } = require('./paths')
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const util = require('util')
// read as json data
// const toml = require('toml');
// const yaml = require('yamljs');
// const json5 = require('json5');

module.exports = (target) => {
  const config = {
    target,
    context: ROOT_PATH,
    externals: target === 'node' ? [nodeExternals()] : undefined,
    entry: {
      client: [
        path.resolve(
          CLIENT_PATH,
          `${target === 'web' ? 'client' : 'server'}-entry.tsx`
        ),
      ],
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
                caller: { target },
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
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
    },
    resolve: {
      alias: {
        '@assets': ASSETS_PATH,
      },
      modules: [path.resolve(ROOT_PATH, 'node_modules')],
      symlinks: false,
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new LoadablePlugin({ writeToDisk: true }),
      // new WorkboxPlugin.GenerateSW({
      //   clientsClaim: true,
      //   skipWaiting: true,
      // }),
    ],
  }
  return config
}
// load csv,tsv,xml as json
// other setting
// const defaultCfg = {
//   module: {
//     rules: [
//       {
//         test: /\.(csv|tsv)$/i,
//         use: ['csv-loader'],
//       },
//       {
//         test: /\.xml$/i,
//         use: ['xml-loader'],
//       },
//       {
//         test: /\.toml$/i,
//         type: 'json',
//         parser: {
//           parse: toml.parse,
//         },
//       },
//       {
//         test: /\.yaml$/i,
//         type: 'json',
//         parser: {
//           parse: yaml.parse,
//         },
//       },
//       {
//         test: /\.json5$/i,
//         type: 'json',
//         parser: {
//           parse: json5.parse,
//         },
//       },
//     ]
//   },
// };
