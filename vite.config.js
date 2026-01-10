import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg']
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './images_new/**/*.{png,jpg,jpeg,webp,svg}',
          dest: './images_new'
        }
      ]
    })
  ]
});