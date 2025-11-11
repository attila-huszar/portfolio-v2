'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsMoon, BsSun } from 'react-icons/bs'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  const onToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label="Toggle theme"
      className="fixed right-5 bottom-5 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:bg-gray-950"
    >
      {theme === 'light' ? <BsSun /> : <BsMoon />}
    </button>
  )
}
