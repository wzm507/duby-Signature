import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// 确保静态HTML文件能够正常访问
export default defineConfig({
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.SVG']
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'img/**/*',
          dest: 'img'
        },
        {
          src: 'public/img/**/*',
          dest: 'img'
        },
        {
          src: 'public/off/**/*',
          dest: 'off'
        },
        {
          src: 'public/ewm/**/*',
          dest: 'ewm'
        },
        {
          src: 'images_new/**/*',
          dest: 'images_new'
        },
        {
          src: 'public/aboutus/**/*',
          dest: 'aboutus'
        },
        {
          src: 'public/banner/**/*',
          dest: 'banner'
        },
        {
          src: 'public/BUY/**/*',
          dest: 'BUY'
        },
        {
          src: 'public/Communities/**/*',
          dest: 'Communities'
        },
        {
          src: 'public/DAMAC Islands/**/*',
          dest: 'DAMAC Islands'
        },
        {
          src: 'public/Developers/**/*',
          dest: 'Developers'
        },
        {
          src: 'public/Greenridge/**/*',
          dest: 'Greenridge'
        },
        {
          src: 'public/icons/**/*',
          dest: 'icons'
        },
        {
          src: 'public/Lyvia by Palace/**/*',
          dest: 'Lyvia by Palace'
        },
        {
          src: 'public/Services/**/*',
          dest: 'Services'
        },
        {
          src: 'public/Terra Gardens/**/*',
          dest: 'Terra Gardens'
        },
        {
          src: 'public/sp/**/*',
          dest: 'sp'
        },
        {
          src: 'public/png/**/*',
          dest: 'png'
        },
        {
          src: 'public/js/**/*',
          dest: 'js'
        }
      ]
    })
  ],
  // 配置路由，确保静态HTML文件能被正确访问
  server: {
    // 禁用单页应用的重写规则，确保静态HTML文件可以直接访问
    strictPort: true,
    // 配置代理，解决跨域问题
    proxy: {
      '/send-email': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  // 配置构建选项
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
