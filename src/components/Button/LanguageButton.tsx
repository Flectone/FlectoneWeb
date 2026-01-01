'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { GrLanguage } from 'react-icons/gr'

interface LanguageButtonProps {
  locales?: string[]
}

export default function LanguageButton({ locales = ['en', 'ru'] }: LanguageButtonProps) {
  const router = useRouter()
  const currentLocale = useLocale()

  const nextLocale = locales[(locales.indexOf(currentLocale) + 1) % locales.length]

  function changeLocale(targetLocale: string) {
    if (targetLocale === currentLocale) return

    document.cookie = `locale=${targetLocale}; path=/; max-age=31536000`

    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={() => changeLocale(nextLocale)}
      className="flex items-center cursor-pointer px-2 py-1 rounded-full hover:bg-muted-primary transition-colors duration-100"
    >
      <GrLanguage size={16} className="mr-1" />
      <span className="text-sm">{currentLocale}</span>
    </button>
  )
}
