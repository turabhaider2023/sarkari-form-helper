import { fitJpegSize } from '../src/lib/fitJpegSize.js'

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function fitsInsideRange() {
  const min = 20 * 1024
  const max = 50 * 1024
  const encode = async (quality) => ({ size: Math.round(quality * 200 * 1024) })
  const result = await fitJpegSize(encode, min, max)
  assert(result.blob.size <= max, 'size went over the max')
  assert(result.blob.size >= min, 'size stayed under the min')
  assert(result.warning === null, 'a fitting file should not warn')
  assert(result.blob.size <= max * 0.9 + 2048, 'size should sit a little under the max')
}

async function warnsWhenStillTooBig() {
  const encode = async () => ({ size: 80 * 1024 })
  const result = await fitJpegSize(encode, 20 * 1024, 50 * 1024)
  assert(result.warning === 'over', 'expected an over-size warning')
  assert(result.quality <= 0.01, 'quality should drop to the floor')
}

async function warnsWhenTooSmall() {
  const encode = async () => ({ size: 4 * 1024 })
  const result = await fitJpegSize(encode, 20 * 1024, 50 * 1024)
  assert(result.warning === 'under', 'expected an under-size warning')
  assert(result.blob.size <= 50 * 1024, 'small file should still be under the max')
}

await fitsInsideRange()
await warnsWhenStillTooBig()
await warnsWhenTooSmall()
console.log('fitJpegSize tests passed')
