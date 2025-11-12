@echo off
echo ========================================
echo   JetStream Music Player
echo   Version 1.0
echo ========================================
echo.

:: Check if dependencies are installed
if not exist "web\node_modules\" (
    echo [ERROR] Dependencies not installed!
    echo Please run setup.bat first.
    echo.
    pause
    exit /b 1
)

echo Starting JetStream Music Player...
echo.
echo The application will open in your browser automatically.
echo.
echo Keep this window open while using the app.
echo Press Ctrl+C to stop the server.
echo.
echo ========================================
echo.

:: Start the web server
cd web
start http://localhost:5173
npm run dev

:: This will keep the window open if the server stops
pause
