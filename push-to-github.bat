@echo off
echo 正在推送代码到GitHub...
echo.

cd /d "e:\工作\迪拜旗舰房产\duby\duby"

echo 步骤1: 添加文件到Git
git add .

echo.
echo 步骤2: 提交更改
git commit -m "修复Vercel环境变量配置：解决SMTP环境变量缺失问题，确保部署成功"

echo.
echo 步骤3: 推送到GitHub
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ 推送成功！Vercel将自动部署
    echo.
    echo 📋 接下来请访问以下链接检查部署状态：
    echo https://vercel.com/wzm507/duby-Signature
) else (
    echo ❌ 推送失败，请检查网络连接
    echo 💡 稍后可以手动运行: git push origin main
)

echo.
pause