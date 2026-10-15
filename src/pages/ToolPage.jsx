import { useLocation } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { presetByPath } from '../config/presets.js'
import { SITE_URL } from '../config/site.js'
import { useLang } from '../context/Language.jsx'
import { getPageText } from '../i18n.js'
import ResizeTool from '../components/ResizeTool.jsx'
import ToolLinks from '../components/ToolLinks.jsx'

function formatCm(value) {
  return Number(value).toFixed(1)
}

export function Component() {
  const { pathname } = useLocation()
  const preset = presetByPath(pathname)
  const { t, lang } = useLang()

  if (!preset) return null

  const page = getPageText(lang, preset)
  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }).replace(/</g, '\\u003c')

  const pixelText = preset.width
    ? `${preset.width} × ${preset.height}`
    : t.pixelsKeep
  const cmText = preset.cmWidth
    ? `${formatCm(preset.cmWidth)} × ${formatCm(preset.cmHeight)} cm`
    : t.cmKeep

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={`${SITE_URL}${preset.path}/`} />
      </Head>

      <div className="pt-5">
        <p className="text-xs font-extrabold tracking-[0.14em] text-emerald-800 uppercase">
          {preset.exam === 'General' ? t.groupGeneral : preset.exam}
        </p>
        <h1 className="mt-1 max-w-3xl text-3xl leading-tight font-extrabold text-emerald-950 sm:text-4xl">
          {page.h1}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-900">{t.privacy}</p>
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <ResizeTool key={preset.id} preset={preset} />

        <div className="grid gap-5">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-lg font-extrabold">{t.sizeTable}</h2>
            <table className="mt-4 w-full text-left">
              <tbody className="grid gap-3">
                <tr className="grid rounded-2xl bg-emerald-50 px-4 py-3">
                  <th className="text-xs font-bold tracking-wide text-emerald-800 uppercase">{t.pixelSize}</th>
                  <td className="mt-1 text-lg font-extrabold text-emerald-950">{pixelText}</td>
                </tr>
                <tr className="grid rounded-2xl bg-amber-50 px-4 py-3">
                  <th className="text-xs font-bold tracking-wide text-amber-800 uppercase">{t.cmSize}</th>
                  <td className="mt-1 text-lg font-extrabold text-amber-950">{cmText}</td>
                </tr>
                <tr className="grid rounded-2xl bg-stone-100 px-4 py-3">
                  <th className="text-xs font-bold tracking-wide text-stone-500 uppercase">{t.fileSize}</th>
                  <td className="mt-1 text-lg font-extrabold">{preset.minKb}–{preset.maxKb} KB</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm leading-6 text-stone-600">{preset.sourceNote}</p>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <h2 className="text-lg font-extrabold">{t.guideTitle}</h2>
            <ol className="mt-4 grid gap-3">
              {page.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-base leading-7">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-extrabold">{t.faqTitle}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {page.faqs.map((faq) => (
            <details key={faq.q} className="rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-stone-200">
              <summary className="cursor-pointer font-bold text-emerald-950">{faq.q}</summary>
              <p className="mt-2 text-sm leading-6 text-stone-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <ToolLinks currentId={preset.id} />
    </>
  )
}
