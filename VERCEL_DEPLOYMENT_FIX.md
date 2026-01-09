# Vercel部署失败解决方案

## 问题诊断
GitHub Actions工作流运行失败，无法触发Vercel自动部署。根据分析，主要原因是GitHub Secrets配置不正确或缺失。

## 解决方案步骤

### 步骤1：获取Vercel配置信息

#### 1.1 获取Vercel API Token

1. 登录Vercel控制台：https://vercel.com
2. 点击右上角的头像 → **Settings**
3. 在左侧菜单选择 **Tokens**
4. 点击 **Create Token** 按钮
5. 填写Token名称（如：`GitHub-Actions`）
6. 选择权限范围为 **Full Access**
7. 点击 **Create** 按钮
8. 复制生成的Token（注意：仅显示一次，务必保存）

#### 1.2 获取Organization ID

1. 登录Vercel控制台
2. 点击右上角的组织名称 → **Settings**
3. 在 **General** 标签页底部找到 **Organization ID**
4. 复制该ID

#### 1.3 获取Project ID

1. 登录Vercel控制台
2. 进入项目页面（确保项目已存在）
3. 点击 **Settings** → **General**
4. 在页面底部找到 **Project ID**
5. 复制该ID

### 步骤2：配置GitHub Secrets

1. 登录GitHub，进入仓库页面：https://github.com/wzm507/duby-Signature
2. 点击右上角的 **Settings**
3. 在左侧菜单选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret** 按钮
5. 依次创建以下三个Secrets：

| Secret名称 | 类型 | 值 |
|------------|------|-----|
| `VERCEL_TOKEN` | 文本 | 步骤1.1中获取的API Token |
| `ORG_ID` | 文本 | 步骤1.2中获取的Organization ID |
| `PROJECT_ID` | 文本 | 步骤1.3中获取的Project ID |

### 步骤3：验证项目配置

#### 3.1 检查vercel.json配置

确保`vercel.json`文件中的配置正确：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    },
    {
      "source": "/public/(.*)",
      "destination": "/$1"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      }
    },
    {
      "src": "/api/send-email",
      "methods": ["POST", "OPTIONS"],
      "dest": "/api/send-email.js"
    }
  ]
}
```

#### 3.2 检查package.json配置

确保`package.json`中的脚本配置正确：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 步骤4：重新触发部署

配置完成后，可以通过以下方式重新触发部署：

#### 方法1：推送新的提交

```bash
git add .
git commit -m "fix: update deployment configuration"
git push origin main
```

#### 方法2：手动触发GitHub Actions工作流

1. 进入GitHub仓库页面 → **Actions**
2. 选择 **Deploy to Vercel** 工作流
3. 点击 **Run workflow** 按钮
4. 在弹出的对话框中选择 **main** 分支
5. 点击 **Run workflow** 按钮

### 步骤5：验证部署状态

1. 进入GitHub仓库页面 → **Actions**
2. 点击最新的工作流运行
3. 查看运行状态和日志
4. 如果部署成功，访问Vercel项目URL查看网站

## 常见问题排查

### 问题1：Vercel构建失败

**原因**：依赖安装或构建过程出错

**解决方案**：
1. 确保`package.json`中的依赖版本正确
2. 在本地运行`npm install && npm run build`测试构建
3. 检查构建输出是否有错误信息

### 问题2：GitHub Actions权限不足

**原因**：工作流没有足够的权限访问仓库或执行部署

**解决方案**：
1. 检查工作流文件中的权限配置
2. 确保GitHub Secrets配置正确且有效
3. 检查Vercel API Token的权限范围

### 问题3：Vercel项目不存在

**原因**：指定的Vercel项目ID不存在或已被删除

**解决方案**：
1. 在Vercel控制台中创建新项目
2. 获取新的Project ID
3. 更新GitHub Secrets中的`PROJECT_ID`

## 备用部署方法

如果上述方法仍无法解决问题，可以尝试使用Vercel CLI手动部署：

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 链接项目
vercel link

# 部署到生产环境
vercel --prod
```

## 验证部署结果

部署完成后，可以通过以下方式验证：

1. **访问Vercel项目URL**：项目部署成功后，Vercel会提供一个URL
2. **检查GitHub Actions日志**：确认工作流执行成功
3. **查看Vercel控制台**：在Vercel项目页面查看部署历史

## 联系方式

如果遇到问题，可以通过以下方式获取帮助：
- GitHub Issues：在仓库中创建Issue
- Vercel支持：https://vercel.com/help
- 项目维护者：通过邮箱联系

---

**最后更新时间**：2026-01-08
**文档版本**：1.0.0