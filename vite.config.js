import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';
import path from 'path';

// 插件：复制并更新静态 HTML 文件
function copyAndUpdateStaticHTML() {
  return {
    name: 'copy-and-update-static-html',
    writeBundle() {
      const staticHTMLFiles = [
        'featured-properties.html',
        'rent.html',
        'property-detail.html',
        'off-plan.html',
        'about.html',
        'services.html',
        'communities.html',
        'developers.html',
        'all-news.html',
        'career.html'
      ];

      staticHTMLFiles.forEach(file => {
        const sourcePath = path.resolve(__dirname, 'public', file);
        const destPath = path.resolve(__dirname, 'dist', file);

        if (fs.existsSync(sourcePath)) {
          let content = fs.readFileSync(sourcePath, 'utf-8');
          // 替换 /src/main.js 为 /assets/index.js
          content = content.replace(
            /<script type="module" src="\/src\/main\.js"><\/script>/g,
            '<script type="module" src="/assets/index.js"></script>'
          );
          fs.writeFileSync(destPath, content);
          console.log(`Copied and updated: ${file}`);
        }
      });
    }
  };
}

// 确保静态HTML文件能够正常访问
export default defineConfig({
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.SVG'],
    rollupOptions: {
      output: {
        // 固定 JS 文件名，避免哈希变化导致引用问题
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'images_new/buy-new/**/*',
          dest: 'images_new/buy-new'
        },
        {
          src: 'images_new/Awards/**/*',
          dest: 'images_new/Awards'
        },
        {
          src: 'images_new/about/**/*',
          dest: 'images_new/about'
        },
        {
          src: 'public/images_new/buy-new/**/*',
          dest: 'images_new/buy-new'
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
          src: 'public/aboutus/ryuan/**/*',
          dest: 'aboutus/ryuan'
        },
        {
          src: 'public/aboutus/hero/**/*',
          dest: 'aboutus/hero'
        },
        {
          src: 'public/aboutus/team-awards/**/*',
          dest: 'aboutus/team-awards'
        },
        {
          src: 'public/aboutus/*.*',
          dest: 'aboutus'
        },
        {
          src: 'public/banner/**/*',
          dest: 'banner'
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
        },
        {
          src: 'public/img/news/**/*',
          dest: 'img/news'
        }
      ]
    }),
    copyAndUpdateStaticHTML()
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
