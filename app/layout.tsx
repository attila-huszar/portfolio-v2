import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ThemeContextProvider from '@/context/theme-context'
import ThemeSwitch from '@/components/theme-switch'
import ActiveSectionContextProvider from '@/context/active-section-context'
import './globals.css'

import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Attila Huszár | Web Dev',
  description:
    'Developer based in Budapest, passionate about building web applications, learning new technologies, traveling and exploring new places.',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} dark:text-opacity-90 relative bg-stone-50 pt-32 text-gray-950 dark:bg-gray-900 dark:text-gray-50`}
      >
        <div className="absolute -top-24 right-44 -z-10 size-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="absolute -top-4 left-[-35rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:-left-60 2xl:-left-20 dark:bg-[#676394]"></div>
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
