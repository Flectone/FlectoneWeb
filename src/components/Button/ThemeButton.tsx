'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { IoMoon, IoSunny } from "react-icons/io5"
import { useTranslations } from 'next-intl'

export default function ThemeButton() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('ThemeSwitcher')

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const activeTheme =
    theme === 'system'
      ? systemTheme === 'dark'
        ? 'dark'
        : 'light'
      : theme

  const currentIcon = activeTheme === 'dark' ? <IoMoon size={16}/> : <IoSunny size={16}/>
  const themeName = activeTheme === 'dark' ? t('dark') : t('light')

  const handleClick = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer flex items-center px-2 py-1 rounded-full hover:bg-(--muted-primary) duration-100"
    >
      {currentIcon}
    </button>
  )
}
