import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categories, categoryOfExam } from '../config/categories.js'
import { presets } from '../config/presets.js'
import { useLang } from '../context/Language.jsx'
import { ArrowIcon } from './Icons.jsx'

const toneList = ['emerald', 'amber', 'teal', 'sky']

const tones = {
  emerald: {
    chip: 'bg-emerald-100 text-emerald-900',
    card: 'hover:border-emerald-300',
  },
  amber: {
    chip: 'bg-amber-100 text-amber-950',
    card: 'hover:border-amber-300',
  },
  teal: {
    chip: 'bg-teal-100 text-teal-950',
    card: 'hover:border-teal-300',
  },
  sky: {
    chip: 'bg-sky-100 text-sky-950',
    card: 'hover:border-sky-300',
  },
}

function cardTone(index) {
  return tones[toneList[index % toneList.length]]
}

export default function ExamBrowser({ categoryId = null }) {
  const { lang, t } = useLang()
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const needle = query.trim().toLowerCase()
  const skipFirst = useRef(true)

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const timer = setTimeout(() => setReloadKey((value) => value + 1), 160)
    return () => clearTimeout(timer)
  }, [needle])

  const visible = useMemo(() => {
    return presets.filter((item) => {
      const category = categoryOfExam(item.exam)
      if (!needle) return !categoryId || category?.id === categoryId
      const catLabel = category ? t.cat[category.id]?.label : ''
      const hay = `${item.exam} ${item.labelHi} ${item.labelEn} ${category?.id || ''} ${catLabel || ''}`.toLowerCase()
      return hay.includes(needle)
    })
  }, [categoryId, needle, t])

  const groups = []
  visible.forEach((item) => {
    const category = categoryOfExam(item.exam)
    const key = category?.id || 'other'
    let group = groups.find((entry) => entry.id === key)
    if (!group) {
      group = { id: key, items: [] }
      groups.push(group)
    }
    group.items.push(item)
  })

  return (
    <div className="mt-8">
      <label className="block">
        <span className="sr-only">{t.searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-4 text-base font-semibold text-emerald-950 shadow-sm outline-none ring-emerald-700 placeholder:font-medium placeholder:text-stone-400 focus:ring-2"
        />
      </label>

      <div className="mt-3 flex w-full flex-wrap gap-2">
        <Link
          to="/"
          className={pathname === '/'
            ? 'min-w-[46%] flex-1 rounded-xl bg-emerald-800 px-3 py-3 text-center text-sm font-extrabold text-white sm:min-w-36'
            : 'min-w-[46%] flex-1 rounded-xl bg-white px-3 py-3 text-center text-sm font-extrabold text-emerald-950 ring-1 ring-stone-200 sm:min-w-36'}
        >
          {t.allCategories}
        </Link>
        {categories.map((category) => {
          const active = category.id === categoryId
          const label = t.cat[category.id]?.label || category.id
          return (
            <Link
              key={category.id}
              to={category.path}
              className={active
                ? 'min-w-[46%] flex-1 rounded-xl bg-emerald-800 px-3 py-3 text-center text-sm font-extrabold text-white sm:min-w-36'
                : 'min-w-[46%] flex-1 rounded-xl bg-white px-3 py-3 text-center text-sm font-extrabold text-emerald-950 ring-1 ring-stone-200 sm:min-w-36'}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {reloadKey > 0 && (
        <div key={reloadKey} className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1 overflow-hidden">
          <div className="reload-bar h-full bg-emerald-700" />
        </div>
      )}

      {visible.length === 0 ? (
        <p key={reloadKey} className="page-reload mt-6 rounded-2xl bg-white px-4 py-5 text-base font-semibold text-stone-600 ring-1 ring-stone-200">
          {t.noMatch}
        </p>
      ) : (
        <div key={reloadKey} className="page-reload mx-auto w-full sm:w-[75vw]">
          {groups.map((group) => {
        const copy = t.cat[group.id]
        return (
          <section key={group.id} className="mt-6">
            {(!categoryId || needle) && (
              <h2 className="text-lg font-extrabold text-emerald-950">{copy?.label}</h2>
            )}
            <ul className={`grid w-full gap-3 sm:grid-cols-2 ${categoryId && !needle ? 'mt-2' : 'mt-3'}`}>
              {group.items.map((item, index) => {
                const tone = cardTone(index)
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex h-full flex-col rounded-3xl border border-white bg-white p-5 shadow-sm ring-1 ring-stone-200/80 transition hover:-translate-y-0.5 hover:shadow-md ${tone.card}`}
                    >
                      <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${tone.chip}`}>
                        {item.minKb}–{item.maxKb} KB
                      </span>
                      <span className="mt-4 block text-xl font-extrabold text-emerald-950">
                        {lang === 'hi' ? item.labelHi : item.labelEn}
                      </span>
                      <span className="mt-1 block text-sm text-stone-500">
                        {lang === 'hi' ? item.labelEn : item.labelHi}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                        {t.openTool}
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
        </div>
      )}
    </div>
  )
}
