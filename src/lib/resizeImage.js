import { fitJpegSize } from './fitJpegSize.js'

export function clampCrop(image, crop) {
  const sx = Math.min(Math.max(crop.sx, 0), image.width - 1)
  const sy = Math.min(Math.max(crop.sy, 0), image.height - 1)
  const sw = Math.min(Math.max(crop.sw, 1), image.width - sx)
  const sh = Math.min(Math.max(crop.sh, 1), image.height - sy)
  return { sx, sy, sw, sh }
}

export async function renderJpeg({ image, crop, width, height, minKb, maxKb }) {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))

  const ctx = canvas.getContext('2d', { alpha: false })
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const safeCrop = clampCrop(image, crop)
  ctx.drawImage(
    image,
    safeCrop.sx,
    safeCrop.sy,
    safeCrop.sw,
    safeCrop.sh,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  const encode = (quality) => new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Could not make JPEG'))
        return
      }
      resolve(blob)
    }, 'image/jpeg', quality)
  })

  const fitted = await fitJpegSize(encode, minKb * 1024, maxKb * 1024)
  return {
    ...fitted,
    width: canvas.width,
    height: canvas.height,
  }
}
