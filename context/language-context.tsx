"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import frTranslations from "@/i18n/fr.json"
import arTranslations from "@/i18n/ar.json"

type Language = "fr" | "ar"
type Translations = typeof frTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isRTL: boolean
}

const translations: Record<Language, Translations> = {
  fr: frTranslations,
  ar: arTranslations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "fr" || savedLang === "ar")) {
      setLanguageState(savedLang)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = language
      localStorage.setItem("language", language)
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === "ar",
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
