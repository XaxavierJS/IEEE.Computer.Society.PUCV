// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Configuración para GitHub Pages
  output: 'static',
  base: '/IEEE.Computer.Society.PUCV',
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});