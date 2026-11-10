## [Portfolio site](https://attila.overclocked.workers.dev/)

[![vinext](https://img.shields.io/badge/vinext-000?logo=vite&logoColor=white)](https://vinext.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Framer](https://img.shields.io/badge/Framer-0055FF?logo=framer)](https://www.framer.com/motion/)

[![CI](https://github.com/attila-huszar/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/attila-huszar/portfolio-v2/actions/workflows/ci.yml)
[![CodeQL](https://github.com/attila-huszar/portfolio-v2/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/attila-huszar/portfolio-v2/actions/workflows/github-code-scanning/codeql)
[![GitHub last commit](https://img.shields.io/github/last-commit/attila-huszar/portfolio-v2/main?logo=github)](https://github.com/attila-huszar/portfolio-v2/commits/main)

[<img src="https://s3.eu-central-1.amazonaws.com/attila.huszar/portfolio/portfolio-v2.webp" alt="portfolio site" width="500">](https://attila.overclocked.workers.dev/)

## Development and Cloudflare deployment

This project uses [vinext beta on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/),
with Vite and the `cf` CLI. Worker configuration lives in `cloudflare.config.ts`.
The `next/*` imports are provided by vinext; the Next.js package is not required.

Use Node.js 26 LTS (`.nvmrc`) and install dependencies with `npm ci`.
For local email delivery, copy `.env.example` to `.env.local` and set
`RESEND_API_KEY` and `CONTACT_EMAIL`. The email address is read from the
environment, including the ignored `.env.local` file, rather than stored in
source. The server passes the runtime address to the contact section.
The public CV URL lives in `assets/info.json`.

| Command             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Develop with Vite in the Workers runtime       |
| `npm run lint`      | Check JavaScript, TypeScript, and React Hooks  |
| `npm run typecheck` | Generate Worker types and check TypeScript     |
| `npm run build`     | Build the production Worker and browser assets |
| `npm run preview`   | Run the production build locally               |
| `npm run deploy`    | Build and deploy to Cloudflare Workers         |

To deploy, authenticate with `npx cf auth login` and configure the
`RESEND_API_KEY` runtime secret for the `attila` Worker. For Cloudflare's
Git integration, use `npm run build` as the build command and
`npm run deploy -- --skip-build` as the deploy command.

Set `CONTACT_EMAIL` as a plain **build variable** in both production and preview
build settings. The build declares it as a plain **runtime variable** on the
Worker. Update the build variable before redeploying to change the recipient.
Builds without it still work for CI, but contact email delivery needs a value.

The site renders on each request and uses original image files, so it needs no
R2, KV, or Images bindings. CI runs lint, type checking, and the Worker build.
Production URL: https://attila.overclocked.workers.dev/.

Preview builds use `npx cf previews deploy` as their deploy command with no
separate build command, so the CLI builds with the correct preview context.
