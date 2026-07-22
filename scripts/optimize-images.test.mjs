import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import { afterEach, describe, expect, it } from 'vitest'
import { optimizeImages } from './optimize-images.mjs'

const temporaryDirectories = []
const silentLogger = { log() {}, warn() {} }

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  )
})

async function createFixture() {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'portfolio-images-test-'))
  temporaryDirectories.push(rootDir)

  const assetsDir = path.join(rootDir, 'public', 'assets')
  await mkdir(assetsDir, { recursive: true })
  await sharp({ create: { width: 320, height: 200, channels: 3, background: '#fe9a2e' } })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'hero.jpg'))
  await sharp({ create: { width: 180, height: 80, channels: 4, background: '#141210' } })
    .png()
    .toFile(path.join(assetsDir, 'logo.png'))
  await sharp({ create: { width: 300, height: 160, channels: 3, background: '#151210' } })
    .png()
    .toFile(path.join(rootDir, 'public', 'og-image.png'))
  await writeFile(
    path.join(rootDir, 'index.html'),
    '<meta property="og:image" content="https://example.com/og-image.png"><img src="/assets/logo.png">',
  )
  await writeFile(path.join(rootDir, 'app.tsx'), "export const hero = '/assets/hero.jpg'\n")

  return rootDir
}

describe('image optimizer', () => {
  it('converts raster assets, rewrites references, and preserves the social PNG', async () => {
    const rootDir = await createFixture()
    const socialImageBefore = await sharp(path.join(rootDir, 'public', 'og-image.png')).metadata()

    const result = await optimizeImages({ rootDir, maxDimension: 240, logger: silentLogger })

    expect(result.converted).toBe(2)
    await expect(stat(path.join(rootDir, 'public', 'assets', 'hero.webp'))).resolves.toBeTruthy()
    await expect(stat(path.join(rootDir, 'public', 'assets', 'logo.webp'))).resolves.toBeTruthy()
    await expect(stat(path.join(rootDir, 'public', 'assets', 'hero.jpg'))).rejects.toThrow()
    await expect(stat(path.join(rootDir, 'public', 'assets', 'logo.png'))).rejects.toThrow()
    await expect(stat(path.join(rootDir, 'public', 'og-image.png'))).resolves.toBeTruthy()

    expect(await readFile(path.join(rootDir, 'app.tsx'), 'utf8')).toContain('/assets/hero.webp')
    expect(await readFile(path.join(rootDir, 'index.html'), 'utf8')).toContain('/assets/logo.webp')
    expect(await readFile(path.join(rootDir, 'index.html'), 'utf8')).toContain('/og-image.png')

    const heroMetadata = await sharp(path.join(rootDir, 'public', 'assets', 'hero.webp')).metadata()
    const socialImageAfter = await sharp(path.join(rootDir, 'public', 'og-image.png')).metadata()
    expect(heroMetadata.width).toBe(240)
    expect(socialImageAfter.width).toBe(socialImageBefore.width)
    expect(socialImageAfter.height).toBe(socialImageBefore.height)
  })

  it('is idempotent after the initial conversion', async () => {
    const rootDir = await createFixture()
    await optimizeImages({ rootDir, logger: silentLogger })

    const secondRun = await optimizeImages({ rootDir, logger: silentLogger })

    expect(secondRun.converted).toBe(0)
    expect(secondRun.optimized).toBe(0)
    expect(secondRun.rewrittenFiles).toBe(0)
  })
})
