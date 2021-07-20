import express from 'express'
import webpackCfg from '../webpack_config/webpack.dev.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import hotMiddleware from 'webpack-hot-middleware'
import { render } from './render'

// console.log(App)

async function createServer() {
  const app = express()

  //dev mod
  if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackCfg[0] as unknown as webpack.Configuration)
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackCfg[0].output.publicPath,
        writeToDisk: true,
      })
    )
    app.use(
      hotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      })
    )
    const serverAssetsCompiler = webpack(
      webpackCfg[1] as unknown as webpack.Configuration
    )
    serverAssetsCompiler.watch(
      {
        aggregateTimeout: 300,
        poll: undefined,
      },
      (err, stats) => {
        console.log(stats)
        if (err) {
          console.error(err)
        }
      }
    )
  }

  app.get('*', async (req, res) => {
    res.send(render(req.url, {})).end()
  })

  app.listen(3000, () => {
    console.log('Server listening 3000')
  })
}

createServer()
