import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LanguageProvider, useLang } from '../context/Language.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function BackToTop() {
  const { t } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-4 bottom-5 z-30 rounded-full bg-emerald-800 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-950/30"
    >
      {t.backToTop}
    </button>
  )
}

function Shell() {
  const { t } = useLang()

  return (
    <div className="min-h-screen text-stone-900">
      <Header />
      <main className="w-full px-4 pb-16 sm:px-6 lg:px-8">
        <Suspense fallback={<p className="py-10 text-center text-lg">{t.loading}</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function Layout() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  )
}
