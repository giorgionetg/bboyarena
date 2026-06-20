import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGithubPagesProjectRepo = process.env.GITHUB_ACTIONS === 'true' && repoName && !repoName.endsWith('.github.io');
const base = process.env.ASTRO_BASE_PATH ?? (isGithubPagesProjectRepo ? `/${repoName}/` : '/');

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,
  base,
  i18n: {
    defaultLocale: 'en-US',
    locales: [
      'en-US',
      { path: 'it', codes: ['it-IT'] },
      { path: 'es', codes: ['es-419'] },
      { path: 'pt-br', codes: ['pt-BR'] },
      { path: 'zh', codes: ['zh-Hans'] }
    ],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Breakdance 3D Street Battle',
        short_name: 'Street Battle',
        description: 'A dusty urban breakdance battle game in the browser',
        theme_color: '#8f8371',
        background_color: '#d4c7b3',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,json}']
      }
    })
  ],
  // Deploy statically
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
