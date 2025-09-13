@echo off
echo Building APK for Radio App...
echo.

echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Prebuilding for Android...
call npx expo prebuild --platform android

echo.
echo Step 3: Building APK...
call npx expo run:android --variant release

echo.
echo APK build completed! Check the android/app/build/outputs/apk/release/ folder for your APK file.
pause
