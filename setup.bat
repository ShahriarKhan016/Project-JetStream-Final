@echo off
echo ========================================
echo   JetStream Music Player - Setup
echo   Version 1.0
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run this setup again.
    echo.
    pause
    exit /b 1
)

echo [1/3] Node.js found: 
node --version
echo.

echo [2/3] Installing dependencies...
echo This may take a few minutes on first run...
echo.

:: Install web dependencies
cd web
if exist "node_modules\" (
    echo Web dependencies already installed, skipping...
) else (
    echo Installing web dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install web dependencies!
        pause
        exit /b 1
    )
)
cd ..

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo   Setup completed successfully!
echo ========================================
echo.
echo To start the application, run: start.bat
echo.
pause
