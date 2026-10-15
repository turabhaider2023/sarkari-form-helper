import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/config/site.js'
import { categories } from './src/config/categories.js'
import { presets } from './src/config/presets.js'

function pageUrl(routePath) {
  if (routePath === '/') return `${SITE_URL}/`
  return `${SITE_URL}${routePath}/`
}

function writeSeoFiles(outDir) {
  const paths = ['/', ...categories.map((item) => item.path), ...presets.map((item) => item.path)]
  const urls = paths.map((routePath) => `  <url><loc>${pageUrl(routePath)}</loc></url>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
  fs.writeFileSync(
    path.join(outDir, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  )
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    entry: 'src/main.jsx',
    dirStyle: 'nested',
    script: 'async',
    onFinished() {
      writeSeoFiles(path.resolve('dist'))
    },
  },
})
