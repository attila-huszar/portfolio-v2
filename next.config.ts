import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}

if (process.env.NODE_ENV === 'development') {
  const setupPlatform = async () => {
    await setupDevPlatform()
  }
  setupPlatform()
}

export default nextConfig
