# Radio App Release APK Fix Guide

## Problem Identified
आपका radio app Expo development में तो चल रहा था, लेकिन release APK में audio play नहीं हो रहा था। यह issue HTTP URLs के कारण था।

## Root Cause
- **HTTP URLs**: सभी radio stations HTTP URLs use कर रहे हैं (`http://94.130.113.214:8000/...`)
- **Android Security**: Android 9+ (API 28+) release builds में HTTP traffic को default में block करता है
- **Debug vs Release**: Debug manifest में `usesCleartextTraffic="true"` था, लेकिन release manifest में नहीं था

## Solutions Applied

### 1. Android Manifest Fix
- **File**: `android/app/src/main/AndroidManifest.xml`
- **Change**: Added `android:usesCleartextTraffic="true"` to application tag
- **Purpose**: Allows HTTP traffic in release builds

### 2. Network Security Configuration
- **File**: `android/app/src/main/res/xml/network_security_config.xml` (Created)
- **Purpose**: Specific domain configuration for HTTP traffic
- **Security**: Only allows HTTP for specific radio server domains

### 3. App Configuration Update
- **File**: `app.json`
- **Changes**: 
  - Added `usesCleartextTraffic: true`
  - Added proper network permissions
- **Purpose**: Expo configuration for release builds

### 4. Audio Player Enhancement
- **File**: `contexts/PlayerContext.tsx`
- **Changes**: Added explicit Android/iOS implementation settings
- **Purpose**: Better compatibility with release builds

## Files Modified

1. `android/app/src/main/AndroidManifest.xml` - Added cleartext traffic permission
2. `android/app/src/main/res/xml/network_security_config.xml` - Created network security config
3. `app.json` - Updated Expo configuration
4. `contexts/PlayerContext.tsx` - Enhanced audio player configuration

## How to Build Release APK

### Method 1: Using Existing Script
```bash
# Run the build script
./build-apk.bat
```

### Method 2: Manual Steps
```bash
# 1. Install dependencies
npm install

# 2. Prebuild for Android
npx expo prebuild --platform android

# 3. Build release APK
npx expo run:android --variant release
```

### Method 3: Using EAS Build (Recommended for Production)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build APK
eas build --platform android --profile preview
```

## Testing the Fix

1. **Build the APK**: Use any of the methods above
2. **Install on Device**: Install the generated APK on your Android device
3. **Test Radio Playback**: Try playing different radio stations
4. **Verify**: Audio should now play in release APK

## Security Considerations

- The fix allows HTTP traffic only for specific radio server domains
- Other HTTPS traffic remains secure
- This is a temporary solution - consider migrating to HTTPS URLs in the future

## Future Improvements

1. **HTTPS Migration**: Update radio URLs to use HTTPS
2. **Error Handling**: Add better error messages for network issues
3. **Offline Support**: Add offline radio station caching
4. **Stream Quality**: Add quality selection options

## Troubleshooting

### If audio still doesn't play:
1. Check device internet connection
2. Verify radio server is accessible
3. Check Android logs: `adb logcat | grep -i audio`
4. Test with different radio stations

### If build fails:
1. Clean build: `cd android && ./gradlew clean`
2. Rebuild: `npx expo run:android --variant release`
3. Check for missing dependencies

## Support
If you encounter any issues, check:
- Device Android version (should be 5.0+)
- Internet connectivity
- Radio server status
- App permissions
