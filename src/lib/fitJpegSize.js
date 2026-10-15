// Binary search: JPEG size is not linear, so we keep the highest quality that still fits under the KB limit.
async function highestQualityAtOrBelow(encode, limitBytes) {
  let low = 0.05
  let high = 0.92
  let best = null

  for (let step = 0; step < 8; step += 1) {
    const quality = (low + high) / 2
    const blob = await encode(quality)
    if (blob.size <= limitBytes) {
      best = { blob, quality }
      low = quality
    } else {
      high = quality
    }
  }

  return best
}

export async function fitJpegSize(encode, minBytes, maxBytes) {
  const aimBytes = Math.floor(maxBytes * 0.9)
  const underAim = await highestQualityAtOrBelow(encode, aimBytes)

  if (underAim && underAim.blob.size >= minBytes) {
    return { ...underAim, warning: null }
  }

  const underMax = await highestQualityAtOrBelow(encode, maxBytes)
  if (underMax && underMax.blob.size >= minBytes) {
    return { ...underMax, warning: null }
  }

  if (underMax) {
    return { ...underMax, warning: 'under' }
  }

  let quality = 0.05
  let blob = await encode(quality)
  while (blob.size > maxBytes && quality > 0.01) {
    quality = Math.max(0.01, Number((quality - 0.01).toFixed(2)))
    blob = await encode(quality)
  }

  return {
    blob,
    quality,
    warning: blob.size > maxBytes ? 'over' : 'under',
  }
}
