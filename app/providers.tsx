'use client'

import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </ThemeProvider>
  )
}
