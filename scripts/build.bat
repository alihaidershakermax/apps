@echo off
echo 🚀 بدء عملية البناء والنشر...

REM التحقق من وجود Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً.
    exit /b 1
)

REM التحقق من وجود npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm غير مثبت. يرجى تثبيت npm أولاً.
    exit /b 1
)

REM التحقق من وجود Expo CLI
expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 تثبيت Expo CLI...
    npm install -g @expo/cli
)

REM تثبيت التبعيات
echo 📦 تثبيت التبعيات...
npm install

REM التحقق من الأخطاء
echo 🔍 فحص الأخطاء...
npm run type-check 2>nul || echo ⚠️  لا يوجد سكريبت type-check

REM بناء للويب
echo 🌐 بناء للويب...
npm run build:web

REM بناء للأندرويد (اختياري)
set /p build_android="هل تريد بناء للأندرويد؟ (y/n): "
if /i "%build_android%"=="y" (
    echo 🤖 بناء للأندرويد...
    eas build --platform android
)

REM بناء للـ iOS (اختياري)
set /p build_ios="هل تريد بناء للـ iOS؟ (y/n): "
if /i "%build_ios%"=="y" (
    echo 🍎 بناء للـ iOS...
    eas build --platform ios
)

echo ✅ تم الانتهاء من عملية البناء!
echo 📱 يمكنك الآن نشر التطبيق على المتاجر أو تشغيله محلياً.
pause 