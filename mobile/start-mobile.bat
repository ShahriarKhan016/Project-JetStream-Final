@echo off
echo ========================================
echo Starting JetStream Mobile App
echo ========================================
echo.

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo [ERROR] Dependencies not installed!
    echo Please run: setup-mobile.bat
    pause
    exit /b 1
)
echo Dependencies found!
echo.

echo Starting Expo development server...
echo.
echo ========================================
echo Scan QR code with Expo Go app
echo OR press 'a' to open on Android emulator
echo ========================================
echo.

call npm start
