'use client'

import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import ActiveSectionContextProvider from '@/context/active-section-context'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
    </ThemeProvider>
  )
}
