import { Link } from 'react-router-dom'
import { presets } from '../config/presets.js'
import { useLang } from '../context/Language.jsx'

export default function ToolLinks({ currentId }) {
  const { lang, t } = useLang()
  const items = presets.filter((item) => item.id !== currentId)

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold">{t.otherTools}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className="block rounded-2xl bg-white px-4 py-4 font-bold text-emerald-950 shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="block text-xs font-bold text-amber-700">{item.minKb}–{item.maxKb} KB</span>
              <span className="mt-1 block text-base">
                {lang === 'hi' ? item.labelHi : item.labelEn}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
