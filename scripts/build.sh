#!/bin/bash

# سكريبت بناء ونشر تطبيق Expo React Native

echo "🚀 بدء عملية البناء والنشر..."

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً."
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت. يرجى تثبيت npm أولاً."
    exit 1
fi

# التحقق من وجود Expo CLI
if ! command -v expo &> /dev/null; then
    echo "📦 تثبيت Expo CLI..."
    npm install -g @expo/cli
fi

# تثبيت التبعيات
echo "📦 تثبيت التبعيات..."
npm install

# التحقق من الأخطاء
echo "🔍 فحص الأخطاء..."
npm run lint 2>/dev/null || echo "⚠️  لا يوجد سكريبت lint"

# بناء للويب
echo "🌐 بناء للويب..."
npm run web

# بناء للأندرويد (اختياري)
read -p "هل تريد بناء للأندرويد؟ (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🤖 بناء للأندرويد..."
    expo build:android
fi

# بناء للـ iOS (اختياري)
read -p "هل تريد بناء للـ iOS؟ (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🍎 بناء للـ iOS..."
    expo build:ios
fi

echo "✅ تم الانتهاء من عملية البناء!"
echo "📱 يمكنك الآن نشر التطبيق على المتاجر أو تشغيله محلياً." 