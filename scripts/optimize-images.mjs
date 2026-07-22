import { access, mkdtemp, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const REFERENCE_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
])
const IGNORED_DIRECTORIES = new Set(['.git', '.cache', 'dist', 'node_modules'])
const DEFAULT_PROTECTED_PNGS = new Set(['og-image.png'])

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function walk(directory, shouldInclude, files = []) {
  if (!(await exists(directory))) return files

  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) await walk(entryPath, shouldInclude, files)
    } else if (shouldInclude(entryPath)) {
      files.push(entryPath)
    }
  }

  return files
}

function normalizedRelative(from, to) {
  return path.relative(from, to).split(path.sep).join('/')
}

async function convertToWebp(sourcePath, outputPath, maxDimension) {
  const sourceStats = await stat(sourcePath)
  if (await exists(outputPath)) {
    const outputStats = await stat(outputPath)
    if (outputStats.mtimeMs >= sourceStats.mtimeMs) return false
  }

  const metadata = await sharp(sourcePath).metadata()
  if ((metadata.pages ?? 1) > 1) throw new Error(`Animated image is not supported: ${sourcePath}`)

  await sharp(sourcePath)
    .rotate()
    .resize({ width: maxDimension, height: maxDimension, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(outputPath)

  return true
}

async function optimizeProtectedPng(filePath) {
  const metadata = await sharp(filePath).metadata()
  if (metadata.isPalette) return false

  const original = await readFile(filePath)
  const optimized = await sharp(original)
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true, quality: 90 })
    .toBuffer()

  if (optimized.length >= original.length) return false

  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'portfolio-image-'))
  const temporaryPath = path.join(temporaryDirectory, path.basename(filePath))
  try {
    await writeFile(temporaryPath, optimized)
    await rename(temporaryPath, filePath)
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }

  return true
}

async function rewriteReferences(rootDir, replacements) {
  if (replacements.length === 0) return 0

  const files = await walk(rootDir, (filePath) =>
    REFERENCE_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  )
  let changedFiles = 0

  for (const filePath of files) {
    const original = await readFile(filePath, 'utf8')
    let updated = original
    for (const { from, to } of replacements) updated = updated.replaceAll(from, to)

    if (updated !== original) {
      await writeFile(filePath, updated)
      changedFiles += 1
    }
  }

  return changedFiles
}

export async function optimizeImages({
  rootDir = process.cwd(),
  publicDirectory = 'public',
  maxDimension = 2400,
  protectedPngs = DEFAULT_PROTECTED_PNGS,
  logger = console,
} = {}) {
  const publicDir = path.resolve(rootDir, publicDirectory)
  const rasterFiles = await walk(publicDir, (filePath) =>
    RASTER_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  )
  const replacements = []
  const originalsToRemove = []
  let converted = 0
  let optimized = 0

  for (const sourcePath of rasterFiles) {
    const relativePath = normalizedRelative(publicDir, sourcePath)
    const extension = path.extname(sourcePath).toLowerCase()

    if (extension === '.png' && protectedPngs.has(relativePath)) {
      if (await optimizeProtectedPng(sourcePath)) optimized += 1
      continue
    }

    const outputPath = `${sourcePath.slice(0, -extension.length)}.webp`
    if (await convertToWebp(sourcePath, outputPath, maxDimension)) converted += 1

    replacements.push({
      from: relativePath,
      to: normalizedRelative(publicDir, outputPath),
    })
    originalsToRemove.push(sourcePath)
  }

  const rewrittenFiles = await rewriteReferences(rootDir, replacements)
  await Promise.all(originalsToRemove.map((sourcePath) => rm(sourcePath)))

  logger.log(
    `[images] ${converted} converted, ${optimized} PNG optimized, ${rewrittenFiles} reference file${rewrittenFiles === 1 ? '' : 's'} updated.`,
  )

  return { converted, optimized, rewrittenFiles }
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
if (isDirectRun) {
  optimizeImages().catch((error) => {
    console.error(`[images] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  })
}
