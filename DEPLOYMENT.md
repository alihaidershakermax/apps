# دليل النشر - تطبيق المذكرات الشخصية

## نظرة عامة

هذا الدليل يوضح كيفية نشر تطبيق المذكرات الشخصية على مختلف المنصات.

## المتطلبات الأساسية

### للأجهزة المحمولة:
- حساب Expo (مجاني)
- EAS CLI: `npm install -g @expo/eas-cli`
- حساب Apple Developer (للـ iOS)
- حساب Google Play Console (للأندرويد)

### للويب:
- حساب GitHub (للنشر على GitHub Pages)
- أو أي خدمة استضافة ويب أخرى

## خطوات النشر

### 1. إعداد المشروع

```bash
# تثبيت التبعيات
npm install

# تسجيل الدخول إلى Expo
eas login

# تهيئة EAS Build
eas build:configure
```

### 2. النشر على الويب

#### الطريقة الأولى: GitHub Pages (تلقائي)
```bash
# عند الـ push إلى main/master branch
# سيتم النشر تلقائياً عبر GitHub Actions
git push origin main
```

#### الطريقة الثانية: يدوي
```bash
# بناء للويب
npm run build:web

# النشر على أي خدمة استضافة
# مثال: Netlify, Vercel, أو أي خادم ويب
```

### 3. النشر على الأجهزة المحمولة

#### للأندرويد:
```bash
# بناء APK
eas build --platform android --profile preview

# بناء AAB للنشر على Google Play
eas build --platform android --profile production

# رفع إلى Google Play Console
eas submit --platform android
```

#### للـ iOS:
```bash
# بناء للاختبار
eas build --platform ios --profile preview

# بناء للنشر على App Store
eas build --platform ios --profile production

# رفع إلى App Store Connect
eas submit --platform ios
```

### 4. النشر على متاجر التطبيقات

#### Google Play Store:
1. اذهب إلى [Google Play Console](https://play.google.com/console)
2. أنشئ تطبيق جديد
3. ارفع ملف AAB
4. املأ معلومات التطبيق
5. أرسل للمراجعة

#### Apple App Store:
1. اذهب إلى [App Store Connect](https://appstoreconnect.apple.com)
2. أنشئ تطبيق جديد
3. ارفع ملف IPA
4. املأ معلومات التطبيق
5. أرسل للمراجعة

## إعدادات البيئة

### المتغيرات البيئية المطلوبة:
```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Telegram (اختياري)
EXPO_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
EXPO_PUBLIC_TELEGRAM_CHANNEL_ID=your_channel_id
```

### إعداد EAS Secrets:
```bash
# إضافة المتغيرات السرية
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "your_url"
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your_key"
```

## اختبار النشر

### اختبار محلي:
```bash
# تشغيل محلي
npm start

# اختبار على جهاز حقيقي
npm run android
npm run ios
```

### اختبار البناء:
```bash
# اختبار بناء الويب
npm run build:web

# اختبار بناء الأندرويد
eas build --platform android --profile preview --local

# اختبار بناء iOS (يتطلب macOS)
eas build --platform ios --profile preview --local
```

## استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في التبعيات:**
   ```bash
   npm run clean
   npm install
   ```

2. **خطأ في البناء:**
   ```bash
   # مسح الكاش
   expo r -c
   # أو
   npm start -- --clear
   ```

3. **خطأ في النشر:**
   ```bash
   # التحقق من الإعدادات
   eas build:list
   eas build:view [BUILD_ID]
   ```

### سجلات الأخطاء:
- EAS Build logs: `eas build:view [BUILD_ID]`
- Expo logs: `expo logs`
- Metro logs: في terminal التشغيل

## الأمان

### أفضل الممارسات:
1. لا تضع المفاتيح السرية في الكود
2. استخدم EAS Secrets للمتغيرات الحساسة
3. فعّل التوقيع الرقمي للتطبيق
4. استخدم HTTPS للاتصالات

### التوقيع الرقمي:
```bash
# إنشاء مفتاح التوقيع
eas credentials

# إعداد التوقيع للأندرويد
eas credentials:configure

# إعداد التوقيع للـ iOS
eas credentials:configure --platform ios
```

## المراقبة والتحديثات

### مراقبة الأداء:
- استخدم Expo Analytics
- راقب سجلات الأخطاء
- تتبع استخدام التطبيق

### التحديثات:
```bash
# تحديث Expo SDK
expo upgrade

# تحديث التبعيات
npm update

# نشر تحديث
eas update --branch production --message "تحديث جديد"
```

## الدعم

إذا واجهت مشاكل في النشر:
1. راجع [وثائق Expo](https://docs.expo.dev)
2. راجع [وثائق EAS](https://docs.expo.dev/eas)
3. اطرح سؤالاً في [Expo Discord](https://discord.gg/expo)
4. افتح issue في GitHub repository

## روابط مفيدة

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Documentation](https://docs.expo.dev/eas)
- [React Native Documentation](https://reactnative.dev)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com) 