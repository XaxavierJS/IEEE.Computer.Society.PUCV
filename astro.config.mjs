// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Configuración para GitHub Pages
  output: 'static',
  site: 'https://www.ieeepucv.computer',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});