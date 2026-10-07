import { chromium } from 'playwright'

const outDir = '/private/tmp/claude-502/-Users-adrianiannantuono-Documents-GitHub-personal-website/b5eb99fe-1cf2-4bcf-862a-91260b8bb021/scratchpad'

const browser = await chromium.launch()

for (const width of [375, 390, 430, 640, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 2 })
  await page.goto('http://localhost:5175')
  await page.waitForSelector('#skills')
  const section = page.locator('#skills')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  const box = await section.boundingBox()
  await page.screenshot({ path: `${outDir}/row3-${width}.png`, clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 500) } })
  await page.close()
}

await browser.close()
