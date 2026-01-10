#!/usr/bin/env pwsh

# 迪拜旗舰房产项目 - Vercel 手动部署脚本
# 适用于Windows PowerShell环境

# 检查Node.js和npm是否安装
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 错误：未安装Node.js，请先安装Node.js 18或更高版本"
    Write-Host "   下载地址：https://nodejs.org/"
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 错误：未安装npm，请先安装Node.js"
    exit 1
}

# 检查Vercel CLI是否安装
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "📦 正在安装Vercel CLI..."
    npm install -g vercel
    if (-not $?) {
        Write-Host "❌ 错误：安装Vercel CLI失败"
        exit 1
    }
    Write-Host "✅ Vercel CLI安装成功"
}

# 检查项目目录
if (-not (Test-Path "./package.json")) {
    Write-Host "❌ 错误：当前目录不是项目根目录（缺少package.json）"
    exit 1
}

Write-Host "📋 开始部署流程..."
Write-Host ""

# 1. 安装依赖
Write-Host "1. 正在安装项目依赖..."
npm install
if (-not $?) {
    Write-Host "❌ 错误：安装依赖失败"
    exit 1
}
Write-Host "✅ 依赖安装成功"
Write-Host ""

# 2. 构建项目
Write-Host "2. 正在构建项目..."
npm run build
if (-not $?) {
    Write-Host "❌ 错误：项目构建失败"
    exit 1
}
Write-Host "✅ 项目构建成功"
Write-Host ""

# 3. 部署到Vercel
Write-Host "3. 正在部署到Vercel..."
Write-Host "   请确保已登录Vercel（执行vercel login登录）"
Write-Host ""
vercel --prod
if (-not $?) {
    Write-Host "❌ 错误：部署失败"
    exit 1
}

Write-Host ""
Write-Host "🎉 部署成功！"
Write-Host ""
Write-Host "📌 部署完成后，您可以通过以下方式验证："
Write-Host "   1. 访问Vercel提供的URL检查网站是否正常运行"
Write-Host "   2. 登录Vercel控制台查看部署状态：https://vercel.com/dashboard"
Write-Host ""
Write-Host "🔧 自动部署配置提示："
Write-Host "   如需设置GitHub Actions自动部署，请在GitHub仓库中配置以下Secrets："
Write-Host "   - VERCEL_TOKEN: Vercel API令牌（Full Access权限）"
Write-Host "   - ORG_ID: Vercel组织ID"
Write-Host "   - PROJECT_ID: Vercel项目ID"
Write-Host ""
Write-Host "   配置路径：GitHub仓库 → Settings → Secrets and variables → Actions"
