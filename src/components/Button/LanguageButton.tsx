'use client'

import { usePathname, useRouter, useParams } from 'next/navigation'

export default function LanguageButton({ locales = ['en', 'ru'] }: { locales?: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const currentLocale = (params.lang as string) || 'en'

  const nextLocale = locales[(locales.indexOf(currentLocale) + 1) % locales.length]

  function changeLocale(targetLocale: string) {
    if (!pathname) return

    const segments = pathname.split('/')
    segments[1] = targetLocale
    const newPath = segments.join('/')

    document.cookie = `locale=${targetLocale}; path=/; max-age=31536000`

    router.push(newPath)
  }

  return (
      <button
          type="button"
          onClick={() => changeLocale(nextLocale)}
          className="flex items-center rounded-full transition-colors text-[16px] text-fd-muted-foreground cursor-pointer hover:text-fd-foreground"
      >
        {/*<Languages size={16} />*/}
        <span className="h-6 flex items-center font-medium uppercase">{currentLocale}</span>
      </button>
  )
}