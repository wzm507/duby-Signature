import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    strictPort: false
  },
  resolve: {
    alias: {
      // 添加别名，指向项目根目录的img目录
      '@img': resolve(__dirname, './img'),
      '@images_new': resolve(__dirname, './images_new')
    }
  },
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.mp4', '**/*.webm', '**/*.ogg'],
    // 优化构建配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 将第三方库分离到单独的chunk
          vendor: ['vue', 'axios'],
          // 将大型资源分离
          images: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp']
        }
      }
    },
    // 限制资源大小
    chunkSizeWarningLimit: 1000,
    // 优化CSS
    cssCodeSplit: true,
    // 压缩资源
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './img/**/*.{png,jpg,jpeg,webp,svg}',
          dest: './img'
        },
        {
          src: './images_new/**/*.{png,jpg,jpeg,webp,svg}',
          dest: './images_new'
        }
      ]
    })
  ]
});
