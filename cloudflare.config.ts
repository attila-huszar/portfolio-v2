import { bindings, defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
  worker: defineWorker({
    name: 'attila',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-11-10',
    observability: {
      enabled: true,
      logs: { enabled: true },
      traces: { enabled: true, headSamplingRate: 0.01 },
    },
    assets: {
      htmlHandling: 'none',
      notFoundHandling: 'none',
      runWorkerFirst: ['/*', '!/_next/static/*', '!/*/_next/static/*'],
    },
    env: {
      ASSETS: bindings.assets(),
      CONTACT_EMAIL: bindings.text(process.env.CONTACT_EMAIL ?? ''),
      RESEND_API_KEY: bindings.secret(),
    },
  }),
})
