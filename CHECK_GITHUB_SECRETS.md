# GitHub Secrets 配置检查指南

## 步骤 1：登录GitHub并导航到仓库
1. 打开浏览器，访问 https://github.com/wzm507/duby-Signature
2. 登录您的GitHub账号

## 步骤 2：访问Secrets配置页面
1. 点击仓库页面顶部的 "Settings" 选项卡
2. 在左侧导航栏中，点击 "Secrets and variables" → "Actions"

## 步骤 3：验证所需的Secrets是否存在
请确保以下三个Secrets已正确配置：

### 1. VERCEL_TOKEN
- **名称**：`VERCEL_TOKEN`
- **值**：您的Vercel API Token
- **如何获取**：
  1. 登录Vercel账号：https://vercel.com
  2. 点击右上角头像 → "Settings" → "Tokens"
  3. 点击 "Create" 创建新Token，命名为 "GitHub Actions Token"
  4. 选择 "Full Account Access" 权限
  5. 复制生成的Token

### 2. ORG_ID
- **名称**：`ORG_ID`
- **值**：您的Vercel Organization ID
- **如何获取**：
  1. 登录Vercel账号
  2. 点击顶部导航栏的 "Teams"（如果您使用个人账号，则为 "Account Settings"）
  3. 点击您的团队/组织
  4. 在 "Settings" 页面的 "General" 部分找到 "Organization ID"
  5. 复制该ID

### 3. PROJECT_ID
- **名称**：`PROJECT_ID`
- **值**：您的Vercel Project ID
- **如何获取**：
  1. 登录Vercel账号
  2. 导航到您的项目页面
  3. 点击顶部的 "Settings" 选项卡
  4. 在 "General" 部分找到 "Project ID"
  5. 复制该ID

## 步骤 4：验证Secrets值的正确性
- 确保所有Secrets的值没有额外的空格或换行符
- 确保Token没有过期
- 确保ORG_ID和PROJECT_ID与您想要部署的Vercel项目匹配

## 步骤 5：更新Secrets（如果需要）
如果发现任何Secrets配置错误：
1. 点击对应Secret旁边的铅笔图标进行编辑
2. 更新值后点击 "Update secret"

## 步骤 6：重新触发GitHub Actions工作流
1. 返回仓库的 "Actions" 选项卡
2. 找到最近失败的 "Deploy to Vercel" 工作流
3. 点击右侧的 "Re-run jobs" 按钮
4. 选择 "Re-run all jobs"

## 下一步
如果验证完Secrets后问题仍然存在，我们将需要查看更详细的GitHub Actions日志。
