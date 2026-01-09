#!/usr/bin/env pwsh

<#
.SYNOPSIS
手动部署迪拜旗舰房产网站到Vercel的脚本

.DESCRIPTION
此脚本执行以下操作：
1. 检查Node.js是否已安装
2. 安装项目依赖
3. 构建项目
4. 检查是否安装了Vercel CLI
5. 登录Vercel
6. 部署到Vercel生产环境

.PARAMETER VercelToken
可选参数，用于非交互式登录Vercel的API Token

.EXAMPLE
# 交互式运行脚本
.manual-deploy.ps1

.EXAMPLE
# 使用Vercel Token非交互式运行脚本
.manual-deploy.ps1 -VercelToken "your-vercel-token-here"

.NOTES
作者: Signature Dubai
版本: 1.0
日期: 2026-01-08
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$VercelToken = ""
)

# 设置颜色输出
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

Write-Host "========================================" -ForegroundColor $InfoColor
Write-Host "迪拜旗舰房产网站 - 手动部署脚本" -ForegroundColor $InfoColor
Write-Host "========================================" -ForegroundColor $InfoColor
Write-Host ""

# 检查Node.js是否已安装
Write-Host "检查Node.js安装情况..." -ForegroundColor $InfoColor
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到Node.js。请先安装Node.js 18或更高版本。" -ForegroundColor $ErrorColor
    exit 1
}

$nodeVersion = & node --version
Write-Host "已安装Node.js版本: $nodeVersion" -ForegroundColor $SuccessColor

# 检查npm是否已安装
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到npm。请确保Node.js安装包含npm。" -ForegroundColor $ErrorColor
    exit 1
}

$npmVersion = & npm --version
Write-Host "已安装npm版本: $npmVersion" -ForegroundColor $SuccessColor
Write-Host ""

# 安装项目依赖
Write-Host "安装项目依赖..." -ForegroundColor $InfoColor
try {
    & npm install --silent
    Write-Host "依赖安装完成" -ForegroundColor $SuccessColor
} catch {
    Write-Host "错误: 依赖安装失败: $($_.Exception.Message)" -ForegroundColor $ErrorColor
    exit 1
}

Write-Host ""

# 构建项目
Write-Host "构建项目..." -ForegroundColor $InfoColor
try {
    & npm run build
    Write-Host "项目构建完成" -ForegroundColor $SuccessColor
} catch {
    Write-Host "错误: 项目构建失败: $($_.Exception.Message)" -ForegroundColor $ErrorColor
    exit 1
}

Write-Host ""

# 检查是否安装了Vercel CLI
Write-Host "检查Vercel CLI安装情况..." -ForegroundColor $InfoColor
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "未找到Vercel CLI，正在全局安装..." -ForegroundColor $WarningColor
    try {
        & npm install -g vercel --silent
        Write-Host "Vercel CLI安装完成" -ForegroundColor $SuccessColor
    } catch {
        Write-Host "错误: Vercel CLI安装失败: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        exit 1
    }
} else {
    $vercelVersion = & vercel --version
    Write-Host "已安装Vercel CLI版本: $vercelVersion" -ForegroundColor $SuccessColor
}

Write-Host ""

# 登录Vercel
if (-not [string]::IsNullOrEmpty($VercelToken)) {
    Write-Host "使用提供的Vercel Token登录..." -ForegroundColor $InfoColor
    try {
        & vercel login --token $VercelToken --silent
        Write-Host "Vercel登录成功" -ForegroundColor $SuccessColor
    } catch {
        Write-Host "错误: Vercel登录失败: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        exit 1
    }
} else {
    Write-Host "请在接下来的浏览器窗口中登录Vercel..." -ForegroundColor $InfoColor
    try {
        & vercel login
        Write-Host "Vercel登录成功" -ForegroundColor $SuccessColor
    } catch {
        Write-Host "错误: Vercel登录失败: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        exit 1
    }
}

Write-Host ""

# 部署到Vercel生产环境
Write-Host "部署到Vercel生产环境..." -ForegroundColor $InfoColor
Write-Host "注意: 部署过程可能需要几分钟时间，请耐心等待。" -ForegroundColor $WarningColor

try {
    & vercel deploy --prod --confirm
    Write-Host ""
    Write-Host "部署成功! 您的网站已成功部署到Vercel生产环境。" -ForegroundColor $SuccessColor
    Write-Host "您可以通过Vercel控制台查看部署状态和访问URL。" -ForegroundColor $InfoColor
} catch {
    Write-Host "错误: 部署失败: $($_.Exception.Message)" -ForegroundColor $ErrorColor
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor $InfoColor
Write-Host "部署脚本执行完成" -ForegroundColor $SuccessColor
Write-Host "========================================" -ForegroundColor $InfoColor