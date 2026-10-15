import { createContext, useContext, useEffect, useState } from 'react'
import { strings } from '../i18n.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('hi')

  useEffect(() => {
    const saved = localStorage.getItem('sfh-lang')
    if (saved === 'en' || saved === 'hi') {
      setLang(saved)
    }
  }, [])

  function changeLang(next) {
    setLang(next)
    localStorage.setItem('sfh-lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t: strings[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
