import { Link } from 'react-router-dom'
import { useLang } from '../context/Language.jsx'
import { NoticeIcon } from './Icons.jsx'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="mt-8 bg-emerald-950 text-emerald-50">
      <div className="flex w-full flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-8">
        <div className="min-w-0 flex-1">
          <Link to="/" className="text-lg font-extrabold">{t.siteName}</Link>
          <p className="mt-3 w-full rounded-2xl bg-amber-300 px-4 py-3 text-base leading-7 font-extrabold text-emerald-950 shadow-sm">{t.privacy}</p>
        </div>
        <div className="flex w-full items-start justify-end gap-3 pr-28 text-right lg:max-w-xl lg:shrink-0 lg:pr-32">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-extrabold tracking-wide text-white">
              {t.noticeTag}
            </span>
            <p className="mt-2 text-sm leading-6 font-bold text-amber-100">{t.notOfficial}</p>
            <p className="mt-2 text-sm leading-6 font-medium text-amber-50/90">{t.sizeCanChange}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
            <NoticeIcon />
          </span>
        </div>
      </div>
    </footer>
  )
}
