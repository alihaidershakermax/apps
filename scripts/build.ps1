# سكريبت بناء ونشر تطبيق Expo React Native

Write-Host "🚀 بدء عملية البناء والنشر..." -ForegroundColor Green

# التحقق من وجود Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js مثبت: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً." -ForegroundColor Red
    exit 1
}

# التحقق من وجود npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm مثبت: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm غير مثبت. يرجى تثبيت npm أولاً." -ForegroundColor Red
    exit 1
}

# التحقق من وجود Expo CLI
try {
    $expoVersion = expo --version
    Write-Host "✅ Expo CLI مثبت: $expoVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 تثبيت Expo CLI..." -ForegroundColor Yellow
    npm install -g @expo/cli
}

# تثبيت التبعيات
Write-Host "📦 تثبيت التبعيات..." -ForegroundColor Yellow
npm install

# التحقق من الأخطاء
Write-Host "🔍 فحص الأخطاء..." -ForegroundColor Yellow
try {
    npm run type-check
} catch {
    Write-Host "⚠️  لا يوجد سكريبت type-check" -ForegroundColor Yellow
}

# بناء للويب
Write-Host "🌐 بناء للويب..." -ForegroundColor Yellow
npm run build:web

# بناء للأندرويد (اختياري)
$buildAndroid = Read-Host "هل تريد بناء للأندرويد؟ (y/n)"
if ($buildAndroid -eq "y" -or $buildAndroid -eq "Y") {
    Write-Host "🤖 بناء للأندرويد..." -ForegroundColor Yellow
    eas build --platform android
}

# بناء للـ iOS (اختياري)
$buildIOS = Read-Host "هل تريد بناء للـ iOS؟ (y/n)"
if ($buildIOS -eq "y" -or $buildIOS -eq "Y") {
    Write-Host "🍎 بناء للـ iOS..." -ForegroundColor Yellow
    eas build --platform ios
}

Write-Host "✅ تم الانتهاء من عملية البناء!" -ForegroundColor Green
Write-Host "📱 يمكنك الآن نشر التطبيق على المتاجر أو تشغيله محلياً." -ForegroundColor Cyan

Read-Host "اضغط Enter للخروج" 