'use client'

import { useTheme } from '@/context/theme-context'
import { BsMoon, BsSun } from 'react-icons/bs'

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed right-5 bottom-5 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:bg-gray-950"
    >
      {theme === 'light' ? <BsSun /> : <BsMoon />}
    </button>
  )
}
