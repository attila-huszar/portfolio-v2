'use client'

import { useTheme } from 'next-themes'
import { BsMoon, BsSun } from 'react-icons/bs'

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  const onToggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label="Toggle theme"
      className="fixed right-5 bottom-5 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/80 shadow-2xl backdrop-blur-sm transition-all hover:scale-[1.15] active:scale-105 dark:bg-gray-950"
    >
      <BsSun aria-hidden="true" className="dark:hidden" />
      <BsMoon aria-hidden="true" className="hidden dark:block" />
    </button>
  )
}
