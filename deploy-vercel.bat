@echo off
echo =============================================
echo    迪拜房产网站 - Vercel自动部署脚本
echo =============================================
echo.

echo 步骤 1: 检查Git状态
git status

echo.
echo 步骤 2: 添加所有更改到Git
git add .

echo.
echo 步骤 3: 提交更改
git commit -m "feat: 部署更新 - %date% %time%"

echo.
echo 步骤 4: 推送到GitHub (这将触发Vercel自动部署)
git push origin main

echo.
echo 步骤 5: 构建项目
npm run build

echo.
echo =============================================
echo 部署完成！
echo.
echo GitHub: https://github.com/wzm507/duby-Signature
echo GitHub Actions将自动部署到Vercel
echo =============================================
pause