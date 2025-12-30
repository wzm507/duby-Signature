@echo off
echo 正在部署到Vercel...
echo.

echo 步骤1: 构建项目
npm run build

echo.
echo 步骤2: 部署到Vercel
echo 如果Vercel CLI未登录，请访问 https://vercel.com/login
vercel --prod

echo.
echo 部署完成！
pause