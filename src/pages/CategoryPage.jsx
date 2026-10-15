import { useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import ExamBrowser from '../components/ExamBrowser.jsx'
import { categoryByPath } from '../config/categories.js'
import { SITE_URL } from '../config/site.js'
import { useLang } from '../context/Language.jsx'

export default function CategoryPage() {
  const { pathname } = useLocation()
  const category = categoryByPath(pathname)
  const { t } = useLang()

  if (!category) return null

  const copy = t.cat[category.id]

  return (
    <>
      <Head>
        <title>{`${copy.h1} | Sarkari Form Helper`}</title>
        <meta name="description" content={copy.description} />
        <link rel="canonical" href={`${SITE_URL}${category.path}/`} />
      </Head>

      <section className="mt-5">
        <h1 className="w-full text-3xl leading-tight font-extrabold text-emerald-950 sm:text-4xl">
          {copy.h1}
        </h1>
        <p className="mt-3 w-full text-base leading-7 text-stone-600">{copy.description}</p>
      </section>
      <ExamBrowser categoryId={category.id} />
    </>
  )
}
