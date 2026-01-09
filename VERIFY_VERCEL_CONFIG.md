# Vercel 项目配置验证指南

## 步骤 1：登录Vercel账号
1. 打开浏览器，访问 https://vercel.com
2. 使用您的账号登录

## 步骤 2：导航到您的项目
1. 在Vercel控制台中，找到并点击您的项目
2. 项目名称应该与GitHub仓库 `duby-Signature` 对应

## 步骤 3：验证项目ID
1. 点击顶部的 "Settings" 选项卡
2. 在 "General" 部分找到 "Project ID"
3. 复制该ID并与GitHub Secrets中的 `PROJECT_ID` 进行比较
4. 确保两个ID完全匹配

## 步骤 4：验证组织ID
1. 点击顶部导航栏的 "Teams"（如果是个人账号则为 "Account Settings"）
2. 点击您的团队/组织
3. 在 "Settings" 页面的 "General" 部分找到 "Organization ID"
4. 复制该ID并与GitHub Secrets中的 `ORG_ID` 进行比较
5. 确保两个ID完全匹配

## 步骤 5：验证构建配置
1. 点击项目的 "Settings" 选项卡
2. 点击左侧导航栏的 "Build & Development Settings"
3. 验证以下配置：
   - **Build Command**: 应该是 `npm run build`
   - **Output Directory**: 应该是 `dist`
   - **Install Command**: 应该是 `npm install` 或 `npm ci`

## 步骤 6：验证部署设置
1. 点击项目的 "Deployments" 选项卡
2. 查看最近的部署记录
3. 检查是否有任何失败的部署及其错误信息
4. 点击任何部署记录可以查看详细的构建日志

## 步骤 7：验证环境变量
1. 点击项目的 "Settings" 选项卡
2. 点击左侧导航栏的 "Environment Variables"
3. 确保所有必要的环境变量都已正确配置
4. 特别检查与GitHub Actions中使用的变量是否一致

## 步骤 8：验证GitHub集成
1. 点击项目的 "Settings" 选项卡
2. 点击左侧导航栏的 "Git"
3. 验证GitHub仓库是否正确连接到该Vercel项目
4. 确保部署分支设置为 `main`

## 常见问题排查

### 问题 1：Project ID或Org ID不匹配
- **解决方法**：更新GitHub Secrets中的ID以匹配Vercel项目的实际ID

### 问题 2：构建命令或输出目录不匹配
- **解决方法**：在Vercel项目设置中更新构建配置，或在GitHub Actions工作流中更新相应配置

### 问题 3：环境变量缺失或不匹配
- **解决方法**：在Vercel项目或GitHub Secrets中添加或更新缺失的环境变量

### 问题 4：GitHub仓库连接不正确
- **解决方法**：在Vercel项目的Git设置中重新连接正确的GitHub仓库

## 下一步
如果验证完配置后问题仍然存在，请查看GitHub Actions的最新运行日志，其中包含我们添加的调试信息，可以帮助进一步定位问题。
