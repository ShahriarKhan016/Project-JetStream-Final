@echo off
echo ========================================
echo JetStream Mobile - Setup Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo Node.js found!
echo.

echo [2/4] Cleaning previous installation...
if exist node_modules (
    echo Removing old node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing old package-lock.json...
    del package-lock.json
)
echo Clean complete!
echo.

echo [3/4] Installing dependencies...
echo This may take 2-5 minutes...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Setup successful! You can now run:
echo    start-mobile.bat
echo ========================================
echo.
pause
