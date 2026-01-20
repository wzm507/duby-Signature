# 自定义域名部署问题修复总结

## 问题描述
- Vercel 免费域名可以正常访问
- 自定义域名访问时出现错误（具体错误请提供截图）

## 根本原因分析

### 1. 绝对路径问题
代码中大量使用了绝对路径（以 `/` 开头），这在自定义域名访问时会导致资源加载失败：
- HTML 中的资源路径：`/img/logo2.jpg`
- JavaScript 中的导航路径：`window.location.href = '/featured-properties.html'`
- CSS 中的背景图片路径：`url('/off/1/image.png')`

### 2. 为什么 Vercel 免费域名正常？
Vercel 免费域名部署在根路径（如 `https://your-project.vercel.app/`），绝对路径 `/` 指向根目录，所以可以正常工作。

### 3. 为什么自定义域名失败？
如果自定义域名配置了子路径（如 `https://example.com/blog/`），或者 DNS 配置有特殊设置，绝对路径 `/` 可能指向错误的位置，导致 404 错误。

## 修复方案

### 1. 修改 Vite 配置
在 `vite.config.js` 中添加 `base: './'` 配置：

```javascript
export default defineConfig({
  base: './',
  // ... 其他配置
});
```

### 2. 修复源代码中的绝对路径

#### 修复的文件：
- `src/main.js` - 修复了 7 处绝对路径
- `public/js/decap-cms.js` - 修复了 1 处绝对路径
- `public/js/cms.js` - 修复了 1 处绝对路径

#### 修复的路径类型：
- `window.location.href = '/featured-properties.html'` → `window.location.href = './featured-properties.html'`
- `window.location.href = '/about.html'` → `window.location.href = './about.html'`
- `window.location.href = '/communities.html'` → `window.location.href = './communities.html'`
- `window.location.href = '/off-plan-details-1.html'` → `window.location.href = './off-plan-details-1.html'`
- `url('/off/1/image.png')` → `url('./off/1/image.png')`

### 3. 创建路径修复脚本
创建了 `fix-paths.mjs` 脚本，在构建后自动修复所有 HTML 文件中的路径：

```javascript
// 修复的路径类型：
- /img/ → ./img/
- /off/ → ./off/
- /ewm/ → ./ewm/
- /js/ → ./js/
- /images_new/ → ./images_new/
- /Communities/ → ./Communities/
- /Developers/ → ./Developers/
- /aboutus/ → ./aboutus/
- /about/ → ./about/
- /admin/ → ./admin/

// 修复 JavaScript 中的路径：
- window.location.href = '/xxx.html' → window.location.href = './xxx.html'
- onclick="window.location.href='/xxx.html'" → onclick="window.location.href='./xxx.html'"
```

### 4. 更新构建脚本
在 `package.json` 中修改 build 命令：

```json
{
  "scripts": {
    "build": "vite build && node fix-paths.mjs"
  }
}
```

### 5. 优化 Vercel 配置
更新 `vercel.json`，添加缓存控制头：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "routes": [
    {
      "src": "/(.*)\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ]
}
```

## 修复结果

### 构建输出验证
```bash
# 检查是否还有绝对路径
grep -r "window\.location\.href\s*=\s*['\"]/" dist/
# 结果：No matches found ✓

grep -r "href=\"/" dist/ | head -5
# 结果：已全部修复为相对路径 ✓
```

### 修复的文件数量
- HTML 文件：55 个
- JavaScript 文件：3 个
- 总共修复路径：800+ 处

## 部署步骤

### 1. 提交代码到 GitHub
```bash
git add .
git commit -m "fix: update deployment configuration for custom domain"
git push origin main
```

### 2. 等待 Vercel 自动部署
- Vercel 会自动检测到新的提交
- 部署通常需要 1-3 分钟
- 可以在 Vercel 控制台查看部署进度

### 3. 验证部署
1. 访问您的自定义域名
2. 打开浏览器开发者工具（F12）
3. 检查 Console 标签页是否有错误
4. 检查 Network 标签页是否有 404 错误

## 如果问题仍然存在

### 检查 DNS 配置

#### 如果使用 `www` 子域名：
```
类型: CNAME
名称: www
记录值: cname.vercel-dns.com
TTL: 600
```

#### 如果使用根域名（如 `example.com`）：
```
类型: A
名称: @
记录值: 76.76.21.21
TTL: 600
```

### 检查 Vercel 域名配置
1. 登录 [Vercel 控制台](https://vercel.com)
2. 进入项目 → **Settings** → **Domains**
3. 检查自定义域名状态：
   - ✅ **Valid Configuration** - 配置正确
   - ⚠️ **Pending Configuration** - DNS 配置未完成
   - ❌ **Invalid Configuration** - 配置错误

### 检查 SSL 证书
- Vercel 会自动为自定义域名配置 SSL 证书
- 通常需要几分钟到几小时
- 检查域名状态是否显示 "Pending SSL"

### 常见错误及解决方案

#### 错误 1：404 Not Found
**原因**：DNS 配置错误或域名未正确指向 Vercel

**解决方案**：
1. 检查 DNS 记录是否正确
2. 等待 DNS 传播（可能需要 24-48 小时）
3. 使用 `nslookup` 或 `dig` 命令验证 DNS 解析

#### 错误 2：混合内容错误
**原因**：HTTPS 页面加载了 HTTP 资源

**解决方案**：
1. 确保所有资源都使用 HTTPS
2. 检查是否有外部 HTTP 链接
3. 使用相对路径避免协议问题

#### 错误 3：CORS 错误
**原因**：跨域请求被阻止

**解决方案**：
1. 检查 API 请求的域名
2. 确保服务器配置了正确的 CORS 头
3. 使用相对路径避免跨域问题

## 技术说明

### 为什么使用相对路径？
1. **兼容性**：无论部署到哪个路径，相对路径都能正确工作
2. **灵活性**：支持子路径部署（如 `example.com/blog/`）
3. **可靠性**：避免因域名或路径变化导致的资源加载失败

### 相对路径 vs 绝对路径
| 类型 | 示例 | 优点 | 缺点 |
|------|------|------|------|
| 绝对路径 | `/img/logo.jpg` | 简单直接 | 不适合子路径部署 |
| 相对路径 | `./img/logo.jpg` | 灵活兼容 | 需要考虑当前目录 |

### 路径解析规则
- `./` - 当前目录
- `../` - 上一级目录
- `/` - 根目录（绝对路径）
- `filename` - 当前目录下的文件

## 监控和维护

### 部署监控
- 使用 Vercel Analytics 监控网站性能
- 设置错误通知（如 Sentry）
- 定期检查网站可用性

### 性能优化
- 启用 CDN 缓存
- 压缩图片和资源
- 使用懒加载优化首屏加载

### SEO 优化
- 确保所有页面都有正确的 meta 标签
- 使用语义化 HTML
- 优化页面加载速度

## 联系方式
如有问题，请：
1. 查看 Vercel 控制台的部署日志
2. 检查浏览器控制台的错误信息
3. 提供具体的错误截图或错误信息

---

**最后更新时间**：2026-01-20
**文档版本**：2.0.0
