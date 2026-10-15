import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { presets } from '../config/presets.js'
import { useLang } from '../context/Language.jsx'
import { renderJpeg } from '../lib/resizeImage.js'
import CropBox from './CropBox.jsx'

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

function isAllowedFile(file) {
  const name = file.name.toLowerCase()
  const extensionOk = name.endsWith('.jpg')
    || name.endsWith('.jpeg')
    || name.endsWith('.png')
    || name.endsWith('.webp')
  return allowedTypes.includes(file.type) || extensionOk
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => resolve({ img, url })
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('load'))
    }
    img.src = url
  })
}

function readCustom(form) {
  const width = Number(form.width.value)
  const height = Number(form.height.value)
  const minKb = Number(form.minKb.value)
  const maxKb = Number(form.maxKb.value)
  const values = [width, height, minKb, maxKb]
  const valid = values.every((value) => Number.isFinite(value) && value > 0)
    && maxKb > minKb
    && width <= 5000
    && height <= 5000
  if (!valid) return null
  return {
    width: Math.round(width),
    height: Math.round(height),
    minKb,
    maxKb,
  }
}

export default function ResizeTool({ preset }) {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const areaRef = useRef(null)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [custom, setCustom] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)

  const active = custom || preset
  const aspect = active.width && active.height
    ? active.width / active.height
    : (image ? image.width / image.height : 1)

  function rememberArea(area) {
    areaRef.current = area
  }

  function clearPhoto() {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    if (result?.url) URL.revokeObjectURL(result.url)
    setImage(null)
    setImageUrl('')
    setResult(null)
    setError('')
    areaRef.current = null
  }

  async function onFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!isAllowedFile(file)) {
      setError(t.badType)
      return
    }
    clearPhoto()
    try {
      const loaded = await loadImage(file)
      setImage(loaded.img)
      setImageUrl(loaded.url)
    } catch {
      setError(t.loadError)
    }
  }

  function onCustom(event) {
    event.preventDefault()
    const next = readCustom(event.currentTarget)
    if (!next) {
      setError(t.badCustom)
      return
    }
    setError('')
    setResult(null)
    setCustom(next)
  }

  async function onResize() {
    if (!image || !areaRef.current) return
    setBusy(true)
    setError('')
    try {
      const crop = areaRef.current
      const width = active.width || crop.sw
      const height = active.height || crop.sh
      const made = await renderJpeg({
        image,
        crop,
        width,
        height,
        minKb: active.minKb,
        maxKb: active.maxKb,
      })
      if (result?.url) URL.revokeObjectURL(result.url)
      const kb = Math.max(1, Math.round(made.blob.size / 1024))
      const slug = custom ? 'custom' : preset.fileSlug
      setResult({
        url: URL.createObjectURL(made.blob),
        kbText: (made.blob.size / 1024).toFixed(1),
        fileName: `${slug}-${kb}kb.jpg`,
        width: made.width,
        height: made.height,
        warning: made.warning,
      })
    } catch {
      setError(t.resizeError)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="rounded-[1.7rem] bg-white p-4 shadow-lg shadow-emerald-950/5 ring-1 ring-stone-200 sm:p-5">
      <label className="block text-sm font-bold text-stone-600" htmlFor="preset-pick">
        {t.presetLabel}
      </label>
      <select
        id="preset-pick"
        className="mt-1 h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 text-base font-semibold"
        value={preset.path}
        onChange={(event) => navigate(event.target.value)}
      >
        {presets.map((item) => (
          <option key={item.id} value={item.path}>
            {lang === 'hi' ? item.labelHi : item.labelEn}
          </option>
        ))}
      </select>

      <details className="mt-3 rounded-2xl bg-stone-50 p-3 ring-1 ring-stone-200">
        <summary className="cursor-pointer text-base font-bold">{t.customSize}</summary>
        <form onSubmit={onCustom} className="mt-3 grid grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            {t.widthPx}
            <input name="width" inputMode="numeric" className="mt-1 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-base" />
          </label>
          <label className="text-sm font-semibold">
            {t.heightPx}
            <input name="height" inputMode="numeric" className="mt-1 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-base" />
          </label>
          <label className="text-sm font-semibold">
            {t.minKb}
            <input name="minKb" inputMode="decimal" className="mt-1 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-base" />
          </label>
          <label className="text-sm font-semibold">
            {t.maxKb}
            <input name="maxKb" inputMode="decimal" className="mt-1 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-base" />
          </label>
          <button type="submit" className="col-span-2 h-12 rounded-2xl bg-emerald-950 text-base font-bold text-white">
            {t.useCustom}
          </button>
        </form>
        {custom && (
          <button type="button" onClick={() => setCustom(null)} className="mt-2 text-sm font-semibold text-emerald-800">
            {t.clearCustom}
          </button>
        )}
      </details>

      {custom && <p className="mt-3 text-sm font-semibold text-emerald-800">{t.customOn}</p>}

      {!image && (
        <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-700 bg-gradient-to-b from-emerald-50 to-white px-4 py-8 text-center transition hover:border-emerald-900 hover:bg-emerald-50">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-2xl text-white shadow-md">+</span>
          <span className="text-xl font-extrabold text-emerald-950">{t.choosePhoto}</span>
          <span className="mt-2 max-w-xs text-sm leading-6 text-stone-600">{t.photoTypes}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            onChange={onFile}
          />
        </label>
      )}

      {image && (
        <div className="mt-4">
          <CropBox
            imageUrl={imageUrl}
            image={image}
            aspect={aspect}
            onAreaChange={rememberArea}
          />
          <label className="mt-3 block text-center text-sm font-semibold text-emerald-800">
            {t.changePhoto}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              className="sr-only"
              onChange={onFile}
            />
          </label>
          <button
            type="button"
            onClick={onResize}
            disabled={busy}
            className="mt-3 h-14 w-full rounded-2xl bg-emerald-800 text-lg font-extrabold text-white shadow-md shadow-emerald-900/20 disabled:opacity-60"
          >
            {busy ? t.working : t.resize}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3 py-3 text-sm leading-6 text-red-800">{error}</p>
      )}

      {result && (
        <div className="mt-4 rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
          <h2 className="text-lg font-extrabold text-emerald-950">{t.resultReady}</h2>
          {result.warning === 'over' && (
            <p className="mt-2 rounded-xl bg-amber-100 px-3 py-3 text-sm leading-6 text-amber-950">{t.warningOver}</p>
          )}
          {result.warning === 'under' && (
            <p className="mt-2 rounded-xl bg-amber-100 px-3 py-3 text-sm leading-6 text-amber-950">{t.warningUnder}</p>
          )}
          <img src={result.url} alt="" className="mx-auto mt-3 max-h-64 rounded-2xl border border-white bg-white shadow-sm" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <p className="rounded-2xl bg-white px-3 py-3 text-sm">
              <span className="block text-xs font-bold text-stone-500">{t.finalKb}</span>
              <span className="text-lg font-extrabold">{result.kbText} KB</span>
            </p>
            <p className="rounded-2xl bg-white px-3 py-3 text-sm">
              <span className="block text-xs font-bold text-stone-500">{t.finalPixels}</span>
              <span className="text-lg font-extrabold">{result.width} × {result.height}</span>
            </p>
          </div>
          <a
            href={result.url}
            download={result.fileName}
            className="mt-3 flex h-14 items-center justify-center rounded-2xl bg-emerald-800 text-lg font-extrabold text-white shadow-md"
          >
            {t.download}
          </a>
          <button
            type="button"
            onClick={clearPhoto}
            className="mt-2 h-12 w-full rounded-2xl border border-emerald-200 bg-white text-base font-bold text-emerald-900"
          >
            {t.tryAnother}
          </button>
        </div>
      )}
    </section>
  )
}
