import { readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { build } from 'vite'

const root = process.cwd()
const ssrOutDir = path.resolve(root, 'dist-ssr')

await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    minify: false,
  },
})

const { render } = await import(path.resolve(ssrOutDir, 'entry-server.js'))
const appHtml = render()

const indexPath = path.resolve(root, 'dist/index.html')
const html = await readFile(indexPath, 'utf-8')
const prerendered = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

if (prerendered === html) {
  throw new Error('Prerender failed: could not find <div id="root"></div> in dist/index.html')
}

await writeFile(indexPath, prerendered)
await rm(ssrOutDir, { recursive: true, force: true })

console.log('Prerendered dist/index.html')
