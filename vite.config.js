import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Link previews need absolute URLs. Vercel exposes the production domain at
// build time; SITE_URL overrides it, and local builds fall back to relative.
const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
const siteUrl = host && !host.startsWith('http') ? `https://${host}` : host

const siteUrlPlugin = {
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')),
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin],
})
