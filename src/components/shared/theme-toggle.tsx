"use client"

import { Palette, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-8 w-8"
        aria-hidden="true"
      />
    )
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Moon fill="currentColor" />
      ) : (
        <Sun fill="currentColor" />
      )}
    </Button>
  )
}
