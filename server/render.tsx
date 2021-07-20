import React from 'react'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ChunkExtractor } from '@loadable/server'

const webStats = path.resolve(ROOT_PATH, '.dist/assets/loadable-stats.json')
const serverStats = path.resolve(
  ROOT_PATH,
  '.dist/server_assets/loadable-stats.json'
)

export function render(url: string, context: Record<string, never>): string {
  const nodeExtractor = new ChunkExtractor({
    statsFile: serverStats,
    entrypoints: ['client'],
  })
  const { default: App } = nodeExtractor.requireEntrypoint()
  const extractor = new ChunkExtractor({
    statsFile: webStats,
    entrypoints: ['client'],
  })
  const jsx = extractor.collectChunks(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  )
  const scripts = extractor.getScriptTags()
  const styles = extractor.getStyleTags()
  const links = extractor.getLinkTags()
  const content = renderToString(jsx)
  const params = {
    scripts,
    styles,
    links,
    content,
  }
  return renderHtml(params)
}

function renderHtml({ scripts = '', styles = '', links = '', content = '' }) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    ${styles}
    ${links}
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src *; child-src 'none'; script-src 'nonce-Id1DogTWj5e4R/tUH+9PNQ==' localhost:5000 'self'; prefetch-src localhost:5000 'self'; style-src localhost:5000 'unsafe-inline' 'self';worker-src localhost:5000 'self';"
    />
    <title>{{title}}</title>
  </head>
  <body>
    <div id="root">
      ${content}
    </div>
    ${scripts}
  </body>
</html>
  `
}
