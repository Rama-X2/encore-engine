@echo off
echo 🚀 Starting deployment fix process...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache

REM Install dependencies
echo 📦 Installing dependencies...
npm ci

REM Type check
echo 🔍 Running type check...
npm run type-check

REM Lint check
echo 🧽 Running lint check...
npm run lint

REM Build project
echo 🏗️ Building project...
npm run build

echo ✅ Deployment preparation completed!
echo 🎯 Ready for Vercel deployment!
pause
