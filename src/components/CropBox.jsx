import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/Language.jsx'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function useFrameSize(ref, aspect) {
  const [size, setSize] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const measure = () => {
      const maxW = el.clientWidth
      const maxH = 220
      let width = maxW
      let height = width / aspect
      if (height > maxH) {
        height = maxH
        width = height * aspect
      }
      setSize((prev) => {
        if (prev && Math.abs(prev.w - width) < 0.5 && Math.abs(prev.h - height) < 0.5) {
          return prev
        }
        return { w: width, h: height }
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, aspect])

  return size
}

export default function CropBox({ imageUrl, image, aspect, onAreaChange }) {
  const { t } = useLang()
  const wrapRef = useRef(null)
  const frame = useFrameSize(wrapRef, aspect)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState(null)
  const drag = useRef(null)

  const cover = image && frame
    ? Math.max(frame.w / image.width, frame.h / image.height)
    : 1
  const scale = cover * zoom
  const drawnW = image ? image.width * scale : 0
  const drawnH = image ? image.height * scale : 0
  const maxX = Math.max(0, drawnW - (frame?.w || 0))
  const maxY = Math.max(0, drawnH - (frame?.h || 0))
  const centered = {
    x: Math.max(0, (drawnW - (frame?.w || 0)) / 2),
    y: Math.max(0, (drawnH - (frame?.h || 0)) / 2),
  }
  const viewPan = pan
    ? { x: clamp(pan.x, 0, maxX), y: clamp(pan.y, 0, maxY) }
    : centered

  useEffect(() => {
    setZoom(1)
    setPan(null)
  }, [image, aspect])

  useEffect(() => {
    if (!image || !frame) return
    onAreaChange({
      sx: viewPan.x / scale,
      sy: viewPan.y / scale,
      sw: frame.w / scale,
      sh: frame.h / scale,
    })
  }, [image, frame, onAreaChange, scale, viewPan.x, viewPan.y])

  function onPointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { x: event.clientX, y: event.clientY, pan: viewPan }
  }

  function onPointerMove(event) {
    if (!drag.current) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    setPan({
      x: clamp(drag.current.pan.x - dx, 0, maxX),
      y: clamp(drag.current.pan.y - dy, 0, maxY),
    })
  }

  function onPointerUp() {
    drag.current = null
  }

  function changeZoom(nextZoom) {
    if (!image || !frame || !pan) {
      setZoom(nextZoom)
      return
    }
    const nextScale = cover * nextZoom
    const centerX = (viewPan.x + frame.w / 2) / scale
    const centerY = (viewPan.y + frame.h / 2) / scale
    const nextMaxX = Math.max(0, image.width * nextScale - frame.w)
    const nextMaxY = Math.max(0, image.height * nextScale - frame.h)
    setZoom(nextZoom)
    setPan({
      x: clamp(centerX * nextScale - frame.w / 2, 0, nextMaxX),
      y: clamp(centerY * nextScale - frame.h / 2, 0, nextMaxY),
    })
  }

  return (
    <div>
      <div ref={wrapRef} className="flex w-full justify-center">
        <div
          className="relative overflow-hidden rounded-xl bg-stone-900 touch-none select-none"
          style={{ width: frame?.w || '100%', height: frame?.h || 220 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {imageUrl && frame && (
            <img
              src={imageUrl}
              alt=""
              draggable="false"
              className="pointer-events-none absolute top-0 left-0 max-w-none"
              style={{
                width: drawnW,
                height: drawnH,
                transform: `translate(${-viewPan.x}px, ${-viewPan.y}px)`,
              }}
            />
          )}
        </div>
      </div>
      <label className="mt-3 block text-sm font-semibold">
        {t.zoom}
        <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoom}
          onChange={(event) => changeZoom(Number(event.target.value))}
          className="mt-1 h-8 w-full accent-emerald-800"
        />
      </label>
    </div>
  )
}
