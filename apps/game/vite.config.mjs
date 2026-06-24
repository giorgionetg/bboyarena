import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const gameRoot = fileURLToPath(new URL('.', import.meta.url));
const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

export default defineConfig({
  root: gameRoot,
  publicDir: `${gameRoot}/public`,
  plugins: [react()],
  build: {
    outDir: `${repoRoot}/dist-game`,
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0',
    port: 4322
  },
  preview: {
    host: '0.0.0.0',
    port: 4323
  }
});
