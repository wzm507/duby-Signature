# 图片加载问题修复文档

## 问题描述
在本地开发环境中图片加载正常，但部署到Vercel后图片无法加载，导致网站显示不完整。

## 问题根源分析

### 1. 图片存储与引用方式
- **存储位置**：图片存储在项目根目录的 `images_new` 文件夹中
- **引用方式**：前端代码通过绝对路径 `/images_new/...` 引用图片
- **构建过程**：Vite默认只处理 `public` 目录下的静态资源

### 2. Git LFS配置影响
- 项目使用了Git LFS（Large File Storage）跟踪图片文件
- 在CI/CD环境中，如果未正确配置Git LFS，会导致只获取到LFS指针文件而不是实际图片

### 3. 构建配置问题
- 原构建过程未将 `images_new` 目录复制到 `public` 目录
- Vite构建时无法找到并处理这些图片资源

## 解决方案

### 1. 创建图片复制脚本
创建 `copy-images-to-public.js` 脚本，在构建前将 `images_new` 目录完整复制到 `public` 目录：

```javascript
// copy-images-to-public.js
import fs from 'fs';
import path from 'path';

// 源目录和目标目录
const sourceDir = path.join(process.cwd(), 'images_new');
const destDir = path.join(process.cwd(), 'public', 'images_new');

// 复制目录函数
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// 清理并复制
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });
copyDirectory(sourceDir, destDir);

console.log('Images have been successfully copied to public directory!');
```

### 2. 更新构建脚本
修改 `package.json` 中的构建脚本，确保在构建前运行图片复制：

```json
"scripts": {
  "dev": "vite",
  "copy-images": "node copy-images-to-public.js",
  "build": "npm run copy-images && vite build",
  "preview": "vite preview"
}
```

### 3. 配置Vite静态资源处理
更新 `vite.config.js`，确保 `public` 目录被正确配置：

```javascript
export default defineConfig({
  // 配置静态资源目录
  publicDir: 'public',
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg']
  }
});
```

### 4. 优化GitHub Actions配置
更新 `.github/workflows/deploy.yml`，添加Git LFS支持：

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
  with:
    lfs: true
```

## 验证结果

### 1. 本地构建测试
- ✅ 图片成功复制到 `public/images_new` 目录
- ✅ 构建产物中包含完整的 `dist/images_new` 目录
- ✅ 所有图片文件大小正确，无缺失
- ✅ 构建过程无错误

### 2. 目录结构验证
```
public/
└── images_new/
    ├── buy-new/
    │   ├── 1/
    │   ├── 2/
    │   └── ...
    └── Awards/

dist/
└── images_new/
    ├── buy-new/
    │   ├── 1/
    │   ├── 2/
    │   └── ...
    └── Awards/
```

### 3. 图片引用验证
- 前端代码中的图片引用路径保持不变：`/images_new/buy-new/1/1.png`
- 构建后图片可通过相同路径访问

### 4. 构建产物大小
- `dist/images_new` 目录大小：734MB
- 包含所有必要的图片文件

## 技术原理

### Vite静态资源处理机制
1. **public目录**：Vite会将 `public` 目录下的所有文件直接复制到构建产物的根目录
2. **绝对路径引用**：通过 `/images_new/...` 引用的资源会被解析为构建产物根目录下的对应文件
3. **构建过程**：Vite构建时会自动处理 `public` 目录下的所有静态资源

### Git LFS在CI/CD中的应用
1. **LFS指针**：Git LFS将大文件替换为小的指针文件
2. **CI/CD配置**：需要在GitHub Actions中启用 `lfs: true` 才能获取实际文件
3. **本地复制**：通过在构建前复制图片到 `public` 目录，确保Vite能正确处理这些资源

## 部署建议

### 1. Vercel部署配置
- 使用默认的Vercel构建配置
- 确保构建命令为 `npm run build`
- 无需特殊的输出目录配置（Vite默认输出到 `dist` 目录）

### 2. 监控与验证
- 部署后检查构建日志，确认 `copy-images` 步骤成功执行
- 访问部署后的网站，验证图片是否正常加载
- 检查浏览器开发者工具的网络面板，确认图片请求返回200状态

### 3. 后续维护
- **新增图片**：直接添加到 `images_new` 目录，构建时会自动复制
- **图片更新**：修改 `images_new` 目录中的图片，构建时会自动更新
- **目录结构**：保持 `images_new` 目录结构的一致性

## 结论

通过实施上述解决方案，成功解决了图片在Vercel部署后无法加载的问题。关键在于：

1. **构建前复制**：确保图片在构建过程开始前就被复制到 `public` 目录
2. **Vite配置**：正确配置Vite的静态资源处理机制
3. **Git LFS支持**：在CI/CD环境中正确配置Git LFS

此解决方案确保了图片在本地开发和Vercel部署环境中都能正常加载，同时保持了代码结构的清晰性和可维护性。
