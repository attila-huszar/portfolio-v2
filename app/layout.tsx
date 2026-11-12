import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Analytics from '@/components/analytics'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ThemeSwitch from '@/components/theme-switch'
import Providers from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Attila Huszár | Web Dev',
  description:
    'Developer based in Budapest, passionate about building web applications, learning new technologies, traveling and exploring new places.',
  verification: {
    google: 'XijBpG52cCq4ocnOWZwDxRuDQLqCA28f93Fe67Z-j9Y',
  },
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} dark:text-opacity-90 relative bg-stone-50 pt-32 text-gray-950 dark:bg-gray-900 dark:text-gray-50`}
      >
        <div className="absolute -top-24 right-44 -z-10 size-125 rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-275 dark:bg-[#946263]"></div>
        <div className="absolute -top-4 -left-140 -z-10 h-125 w-200 rounded-full bg-[#dbd7fb] blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20 dark:bg-[#676394]"></div>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ThemeSwitch />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
