/* eslint-disable @typescript-eslint/no-var-requires */
const common = require('./common.env')

const envs = {
  SERVER_URL: '/',
  ASSETS_PATH: 'assets/',
}
envs.PUBLIC_PATH = `${envs.SERVER_URL}${envs.ASSETS_PATH}`
Object.assign(envs, common)

module.exports = envs
