/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../')
const CLIENT_PATH = path.resolve(ROOT_PATH, 'client')
const ASSETS_PATH = path.resolve(ROOT_PATH, 'assets')
const SERVER_PATH = path.resolve(ROOT_PATH, 'server')
const SERVER_ASSETS_PATH = path.resolve(ROOT_PATH, '.dist/assets')

module.exports = {
  SERVER_ASSETS_PATH,
  ROOT_PATH,
  CLIENT_PATH,
  ASSETS_PATH,
  SERVER_PATH,
}
