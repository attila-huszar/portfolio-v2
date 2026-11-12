## [Portfolio site](https://attila.huszar.workers.dev/)

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs)](https://nextjs.org/)
[![vinext](https://img.shields.io/badge/vinext-000?logo=vite&logoColor=white)](https://vinext.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Framer](https://img.shields.io/badge/Framer-0055FF?logo=framer)](https://www.framer.com/motion/)

[![CI](https://github.com/attila-huszar/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/attila-huszar/portfolio-v2/actions/workflows/ci.yml)
[![CodeQL](https://github.com/attila-huszar/portfolio-v2/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/attila-huszar/portfolio-v2/actions/workflows/github-code-scanning/codeql)
[![GitHub last commit](https://img.shields.io/github/last-commit/attila-huszar/portfolio-v2/main?logo=github)](https://github.com/attila-huszar/portfolio-v2/commits/main)

[<img src="https://s3.eu-central-1.amazonaws.com/attila.huszar/portfolio/portfolio-v2.webp" alt="portfolio site" width="500">](https://attila.overclocked.workers.dev/)

## Development

Built with vinext, Vite, React, and Tailwind on Cloudflare Workers.
Use Node.js 26 (`.nvmrc`).

```sh
npm ci
npm run dev
```

For local email delivery, copy `.env.example` to `.env.local` and set
`RESEND_API_KEY` and `CONTACT_EMAIL`. The CV URL lives in `assets/info.json`.

Checks: `npm run lint`, `npm run typecheck`, and `npm run build`.
Use `npm run preview` to test the production build locally.

## Deployment

Worker config: `cloudflare.config.ts`. For manual deployment, run
`npx cf auth login`, then `npm run deploy`.

| Cloudflare Git builds | Build command   | Deploy command                                       |
| --------------------- | --------------- | ---------------------------------------------------- |
| Production            | `npm run build` | `npx cf deploy --prebuilt --mode production --force` |
| Preview               | Leave empty     | `npx cf previews deploy`                             |

`--force` allows CI to replace the Worker previously uploaded through the script API.
Set `CONTACT_EMAIL` as a build variable for production and previews, and
`RESEND_API_KEY` as a runtime secret on each Worker.
