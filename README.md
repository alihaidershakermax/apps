# تطبيق المذكرات الشخصية

تطبيق React Native مبني باستخدام Expo لإدارة المذكرات والكتب الشخصية.

## المميزات

- 📝 إنشاء وإدارة المذكرات
- 📚 تنظيم المذكرات في كتب
- 🎨 واجهة مستخدم عربية جميلة
- 🌙 دعم الوضع المظلم
- 📱 متوافق مع iOS و Android
- ☁️ مزامنة مع السحابة
- 📤 تصدير الكتب
- 🔒 حماية التطبيق بكلمة مرور

## المتطلبات

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- Expo CLI
- Expo Go (للاختبار على الهاتف)

## التثبيت

1. استنسخ المشروع:
```bash
git clone <repository-url>
cd apps-main
```

2. ثبت التبعيات:
```bash
npm install
# أو
yarn install
```

3. شغل التطبيق:
```bash
npm start
# أو
yarn start
```

## الأوامر المتاحة

- `npm start` - تشغيل خادم التطوير
- `npm run android` - تشغيل على Android
- `npm run ios` - تشغيل على iOS
- `npm run web` - تشغيل على الويب

## البناء للنشر

### للويب:
```bash
npm run web
```

### للأجهزة المحمولة:
```bash
expo build:android
expo build:ios
```

## هيكل المشروع

```
apps-main/
├── App.tsx                 # الملف الرئيسي للتطبيق
├── index.ts               # نقطة الدخول
├── app.json              # إعدادات Expo
├── package.json          # تبعيات المشروع
├── tsconfig.json         # إعدادات TypeScript
├── assets/               # الصور والأيقونات
└── screens/              # شاشات التطبيق
    ├── HomeScreen.tsx
    ├── NewEntryScreen.tsx
    ├── BookViewScreen.tsx
    ├── EntryDetailScreen.tsx
    ├── NewBookScreen.tsx
    ├── SettingsScreen.tsx
    ├── ChapterManagementScreen.tsx
    └── BookExportScreen.tsx
```

## التقنيات المستخدمة

- **React Native** - إطار العمل الأساسي
- **Expo** - منصة التطوير
- **TypeScript** - لغة البرمجة
- **React Navigation** - التنقل بين الشاشات
- **AsyncStorage** - التخزين المحلي
- **Supabase** - قاعدة البيانات السحابية
- **Lucide React Native** - الأيقونات
- **Sonner** - الإشعارات

## المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. أنشئ فرع جديد للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة 0BSD.

## الدعم

إذا واجهت أي مشاكل، يرجى فتح issue في GitHub أو التواصل معنا. 