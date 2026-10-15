import { Head } from 'vite-react-ssg'
import ExamBrowser from '../components/ExamBrowser.jsx'
import { SITE_URL } from '../config/site.js'
import { useLang } from '../context/Language.jsx'

export default function HomePage() {
  const { t } = useLang()

  return (
    <>
      <Head>
        <title>{t.homeTitle}</title>
        <meta name="description" content={t.homeDescription} />
        <link rel="canonical" href={`${SITE_URL}/`} />
      </Head>

      <section className="hero-grid relative -mx-4 mt-0 w-[calc(100%+2rem)] overflow-hidden bg-emerald-900 px-4 py-8 text-white shadow-xl shadow-emerald-950/20 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 sm:py-12 lg:-mx-8 lg:w-[calc(100%+4rem)] lg:px-8">
        <div className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-amber-400/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-emerald-300/20 blur-2xl" />
        <p className="relative w-full text-sm font-bold tracking-wide text-amber-200 sm:text-base">{t.tagline}</p>
        <h1 className="relative mt-2 w-full text-3xl leading-tight font-extrabold sm:text-5xl">
          {t.homeH1}
        </h1>
        <p className="relative mt-4 w-full text-base leading-7 text-emerald-50 sm:text-lg">
          {t.homeIntro}
        </p>
        <p className="relative mt-5 w-full rounded-2xl bg-white/10 px-4 py-3 text-sm leading-6 text-emerald-50 ring-1 ring-white/15 sm:text-base">
          {t.privacy}
        </p>
      </section>

      <h2 className="sr-only">{t.chooseTool}</h2>
      <ExamBrowser />
    </>
  )
}
