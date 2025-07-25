@echo off
echo ========================================
echo Fixing Vercel Deployment Issues
echo ========================================

echo.
echo 1. Cleaning up node_modules and cache...
if exist node_modules (
    rmdir /s /q node_modules
    echo Node modules deleted.
)

if exist .next (
    rmdir /s /q .next
    echo Next.js cache deleted.
)

if exist package-lock.json (
    del package-lock.json
    echo Package lock deleted.
)

echo.
echo 2. Installing fresh dependencies...
npm install

echo.
echo 3. Running type check...
npm run type-check

echo.
echo 4. Running lint check...
npm run lint

echo.
echo 5. Testing build...
npm run build

echo.
echo ========================================
echo Fix completed! 
echo You can now try deploying to Vercel again.
echo ========================================

pause