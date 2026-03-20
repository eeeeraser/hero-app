@echo off
chcp 65001 >nul
title 推送到 GitHub - hero-app

cd /d "%~dp0"

echo ========================================
echo   推送到 GitHub (用户: eeeeraser)
echo ========================================
echo.

where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装：
    echo.
    echo 1. 访问 https://git-scm.com/download/win
    echo 2. 下载并安装 Git for Windows
    echo 3. 安装时勾选 "Add Git to PATH"
    echo 4. 安装完成后重启终端，再次运行此脚本
    echo.
    pause
    exit /b 1
)

echo [1/6] 配置 Git 用户信息...
git config --global user.email "eeeeraser@users.noreply.github.com"
git config --global user.name "eeeeraser"

echo.
echo [2/6] 初始化 Git 仓库...
if not exist ".git" (
    git init
) else (
    echo 仓库已存在
)

echo.
echo [3/6] 添加文件...
git add .

echo.
echo [4/6] 提交...
git commit -m "Initial commit: hero-app with image accordion" 2>nul
if %errorlevel% neq 0 (
    git commit -m "Update hero-app"
)

echo.
echo [5/6] 添加远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/eeeeraser/hero-app.git

echo.
echo [6/6] 推送到 GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   推送成功！
    echo   仓库地址: https://github.com/eeeeraser/hero-app
    echo ========================================
) else (
    echo.
    echo [提示] 如果推送失败，请先在 GitHub 创建仓库：
    echo 1. 访问 https://github.com/new
    echo 2. 仓库名填写: hero-app
    echo 3. 选择 Public
    echo 4. 不要勾选 "Add a README file"
    echo 5. 点击 Create repository
    echo 6. 再次运行此脚本
)

echo.
pause
