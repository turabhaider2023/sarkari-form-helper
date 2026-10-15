import { Link } from 'react-router-dom'
import { useLang } from '../context/Language.jsx'
import { MarkIcon, NoticeIcon } from './Icons.jsx'

function Disclaimer() {
  const { t } = useLang()

  return (
    <div className="flex items-start justify-end gap-3 text-right">
      <div className="min-w-0">
        <span className="inline-flex rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-white">
          {t.noticeTag}
        </span>
        <p className="mt-1 text-[13px] leading-5 font-bold text-stone-900 sm:text-sm sm:leading-6">
          {t.notOfficial}
        </p>
        <p className="mt-1 text-[13px] leading-5 font-medium text-stone-700 sm:text-sm sm:leading-6">
          {t.sizeCanChange}
        </p>
      </div>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-700/30">
        <NoticeIcon />
      </span>
    </div>
  )
}

export default function Header() {
  const { lang, changeLang, t } = useLang()

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-950/10 bg-[#f6f3ec]/95 backdrop-blur">
      <div className="flex w-full items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-md shadow-emerald-900/20">
            <MarkIcon />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold tracking-tight text-emerald-950">
              {t.siteName}
            </span>
            <span className="hidden text-xs text-stone-600 sm:block">{t.tagline}</span>
          </span>
        </Link>
        <div className="ml-auto hidden min-w-0 flex-1 md:block">
          <Disclaimer />
        </div>
        <div className="ml-auto flex shrink-0 rounded-full bg-white p-1 text-sm font-bold shadow-sm ring-1 ring-stone-200 md:ml-0">
          <button
            type="button"
            onClick={() => changeLang('hi')}
            aria-pressed={lang === 'hi'}
            className={lang === 'hi'
              ? 'rounded-full bg-emerald-800 px-3 py-2 text-white'
              : 'rounded-full px-3 py-2 text-stone-600'}
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => changeLang('en')}
            aria-pressed={lang === 'en'}
            className={lang === 'en'
              ? 'rounded-full bg-emerald-800 px-3 py-2 text-white'
              : 'rounded-full px-3 py-2 text-stone-600'}
          >
            English
          </button>
        </div>
      </div>
      <div className="border-t border-amber-200 bg-amber-50 px-4 py-2.5 sm:px-6 md:hidden">
        <Disclaimer />
      </div>
    </header>
  )
}
