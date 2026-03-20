@echo off
chcp 65001 >nul
title 开发服务器 - hero-app

cd /d "%~dp0"

echo ========================================
echo   正在启动开发服务器...
echo ========================================
echo.

if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    call npm install
    echo.
)

echo 启动中，请在浏览器打开: http://localhost:3000
echo 按 Ctrl+C 可停止服务器
echo.

npm run dev

pause
