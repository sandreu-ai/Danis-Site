import sharp from 'sharp'

export async function processImage(
  buffer: Buffer,
  options: { maxWidth?: number; quality?: number } = {}
): Promise<{ webp: Buffer; thumbnail: Buffer }> {
  const { maxWidth = 1600, quality = 82 } = options

  const webp = await sharp(buffer)
    .resize(maxWidth, undefined, { withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()

  const thumbnail = await sharp(buffer)
    .resize(400, undefined, { withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer()

  return { webp, thumbnail }
}

export function generateImagePath(originalName: string, prefix = 'uploads') {
  const timestamp = Date.now()
  const cleanName = originalName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
  const baseName = cleanName.replace(/\.[^.]+$/, '')
  return {
    full: `${prefix}/${timestamp}-${baseName}.webp`,
    thumbnail: `${prefix}/thumbs/${timestamp}-${baseName}.webp`,
  }
}
