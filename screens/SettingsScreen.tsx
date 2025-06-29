import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Alert,
  Image,
  TextInput,
  Linking,
  Platform,
  ActivityIndicator,
  Modal,
  Animated,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

const { width } = Dimensions.get('window');

// Tabs for settings
const TABS = [
  { id: 'general', title: 'عام', icon: 'settings-outline' },
  { id: 'appearance', title: 'المظهر', icon: 'color-palette-outline' },
  { id: 'security', title: 'الأمان', icon: 'shield-outline' },
  { id: 'telegram', title: 'تليجرام', icon: 'paper-plane-outline' },
  { id: 'about', title: 'حول', icon: 'information-circle-outline' },
];

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  // Local state for settings
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [notifications, setNotifications] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [appLock, setAppLock] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [telegramBot, setTelegramBot] = useState('@moalif_bot');
  const [telegramChannel, setTelegramChannel] = useState('@moalif_backup');
  const [autoBackup, setAutoBackup] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [fontFamily, setFontFamily] = useState('Amiri');
  const [fontSize, setFontSize] = useState('medium');

  // UI state
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showFontSizeModal, setShowFontSizeModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('classic');
  
  // Animation values
  const scrollX = useRef(new Animated.Value(0)).current;
  const tabIndicatorPosition = scrollX.interpolate({
    inputRange: TABS.map((_, i) => i * width),
    outputRange: TABS.map((_, i) => i * (width / TABS.length)),
    extrapolate: 'clamp',
  });
  
  // Update tab indicator position when active tab changes
  useEffect(() => {
    const tabIndex = TABS.findIndex(tab => tab.id === activeTab);
    Animated.spring(scrollX, {
      toValue: tabIndex * width,
      useNativeDriver: false,
      friction: 8,
      tension: 50
    }).start();
  }, [activeTab]);
  
  // Available fonts
  const availableFonts = [
    { id: 'Amiri', name: 'أميري' },
    { id: 'Cairo', name: 'القاهرة' },
    { id: 'Tajawal', name: 'تجوال' },
    { id: 'Scheherazade', name: 'شهرزاد' },
    { id: 'Noto', name: 'نوتو' },
    { id: 'Dubai', name: 'دبي' },
    { id: 'Almarai', name: 'المراعي' },
  ];
  
  // Font sizes
  const fontSizes = [
    { id: 'small', name: 'صغير' },
    { id: 'medium', name: 'متوسط' },
    { id: 'large', name: 'كبير' },
    { id: 'xlarge', name: 'كبير جداً' },
  ];

  // Available themes
  const availableThemes = [
    { id: 'classic', name: 'كلاسيكي', color: '#8B4513' },
    { id: 'modern', name: 'عصري', color: '#3498db' },
    { id: 'dark', name: 'داكن', color: '#2c3e50' },
    { id: 'light', name: 'فاتح', color: '#ecf0f1' },
    { id: 'vintage', name: 'قديم', color: '#D2B48C' },
    { id: 'elegant', name: 'أنيق', color: '#9b59b6' },
    { id: 'nature', name: 'طبيعة', color: '#27ae60' },
    { id: 'romantic', name: 'رومانسي', color: '#e74c3c' },
  ];

  // Function to toggle language
  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    toast.success(`تم تغيير اللغة إلى ${newLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}`);
  };

  // Function to clear all data
  const confirmClearData = () => {
    Alert.alert(
      'حذف جميع البيانات',
      'هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'حذف',
          onPress: () => {
            setIsLoading(true);
            // محاكاة عملية حذف البيانات
            setTimeout(() => {
              // هنا يتم حذف جميع البيانات من التخزين
              setIsLoading(false);
              toast.success('تم حذف جميع البيانات بنجاح');
            }, 1500);
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Function to sign out
  const confirmSignOut = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'تسجيل الخروج',
          onPress: () => {
            setIsLoading(true);
            // محاكاة عملية تسجيل الخروج
            setTimeout(() => {
              // هنا يتم تسجيل خروج المستخدم
              setIsLoading(false);
              toast.success('تم تسجيل الخروج بنجاح');
              navigation.navigate('Home');
            }, 1000);
          },
        },
      ]
    );
  };

  // Function to connect to Telegram
  const connectTelegram = () => {
    setIsLoading(true);
    // محاكاة عملية الاتصال بتليجرام
    setTimeout(() => {
      // هنا يتم تنفيذ الاتصال الفعلي بتليجرام
      setTelegramEnabled(true);
      setIsLoading(false);
      toast.success('تم الاتصال بتليجرام بنجاح');
    }, 1500);
  };

  // Function to open Telegram bot
  const openTelegramBot = () => {
    const url = `https://t.me/${telegramBot.replace('@', '')}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        toast.error('لا يمكن فتح تليجرام');
      }
    });
  };

  // Function to open Telegram channel
  const openTelegramChannel = () => {
    const url = `https://t.me/${telegramChannel.replace('@', '')}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        toast.error('لا يمكن فتح تليجرام');
      }
    });
  };

  // Function to backup to Telegram
  const backupToTelegram = () => {
    if (!telegramEnabled) {
      toast.error('يرجى الاتصال بتليجرام أولاً');
      return;
    }
    
    setIsLoading(true);
    // محاكاة عملية النسخ الاحتياطي إلى تليجرام
    setTimeout(() => {
      // هنا يتم تنفيذ النسخ الاحتياطي الفعلي إلى تليجرام
      setIsLoading(false);
      toast.success('تم إرسال نسخة احتياطية إلى تليجرام بنجاح');
    }, 2000);
  };

  // Function to create cloud backup
  const createCloudBackup = () => {
    if (!cloudSync) {
      toast.error('يرجى تفعيل المزامنة السحابية أولاً');
      return;
    }

    setIsLoading(true);
    // محاكاة عملية إنشاء نسخة احتياطية سحابية
    setTimeout(() => {
      // هنا يتم تنفيذ إنشاء النسخة الاحتياطية السحابية
      setIsLoading(false);
      toast.success('تم إنشاء نسخة احتياطية سحابية بنجاح');
    }, 2000);
  };

  // Function to restore from cloud backup
  const restoreFromCloudBackup = () => {
    if (!cloudSync) {
      toast.error('يرجى تفعيل المزامنة السحابية أولاً');
      return;
    }

    Alert.alert(
      'استعادة من نسخة احتياطية',
      'هل أنت متأكد من استعادة البيانات من النسخة الاحتياطية؟ سيتم استبدال البيانات الحالية.',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'استعادة',
          onPress: () => {
            setIsLoading(true);
            // محاكاة عملية استعادة النسخة الاحتياطية
            setTimeout(() => {
              // هنا يتم تنفيذ استعادة النسخة الاحتياطية
              setIsLoading(false);
              toast.success('تم استعادة النسخة الاحتياطية بنجاح');
            }, 2500);
          },
        },
      ]
    );
  };

  // Function to change font
  const changeFont = (fontId) => {
    setFontFamily(fontId);
    setShowFontModal(false);
    toast.success(`تم تغيير الخط إلى ${availableFonts.find(font => font.id === fontId).name}`);
  };

  // Function to change font size
  const changeFontSize = (sizeId) => {
    setFontSize(sizeId);
    setShowFontSizeModal(false);
    toast.success(`تم تغيير حجم الخط إلى ${fontSizes.find(size => size.id === sizeId).name}`);
  };

  // Function to change theme
  const changeTheme = (themeId) => {
    setSelectedTheme(themeId);
    setShowThemeModal(false);
    toast.success(`تم تغيير التصميم إلى ${availableThemes.find(theme => theme.id === themeId).name}`);
  };

  // Function to toggle app lock
  const toggleAppLock = (value) => {
    if (value) {
      // إذا كان المستخدم يريد تفعيل قفل التطبيق
      Alert.alert(
        'تفعيل قفل التطبيق',
        'سيتم طلب رمز PIN أو بصمة عند فتح التطبيق. هل تريد المتابعة؟',
        [
          {
            text: 'إلغاء',
            style: 'cancel',
          },
          {
            text: 'تفعيل',
            onPress: () => {
              setAppLock(true);
              toast.success('تم تفعيل قفل التطبيق بنجاح');
            },
          },
        ]
      );
    } else {
      // إذا كان المستخدم يريد إلغاء تفعيل قفل التطبيق
      setAppLock(false);
      toast.success('تم إلغاء تفعيل قفل التطبيق');
    }
  };

  // Function to change PIN
  const changePin = () => {
    // محاكاة تغيير رمز PIN
    setTimeout(() => {
      toast.success('تم تغيير رمز القفل بنجاح');
    }, 500);
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'telegram':
        return renderTelegramSettings();
      case 'about':
        return renderAboutSettings();
      default:
        return renderGeneralSettings();
    }
  };

  // Render general settings
  const renderGeneralSettings = () => {
    return (
      <View style={styles.tabContent}>
        <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>الوضع الداكن</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تفعيل المظهر الداكن للتطبيق</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ddd', true: '#3498db' }}
            thumbColor={darkMode ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
        
        <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>اللغة</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تغيير لغة التطبيق</Text>
          </View>
          <TouchableOpacity 
            style={[styles.languageButton, darkMode && styles.darkLanguageButton]}
            onPress={toggleLanguage}
          >
            <Text style={[styles.languageButtonText, darkMode && styles.darkText]}>
              {language === 'ar' ? 'العربية' : 'English'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>تذكير يومي</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تلقي تذكير يومي للكتابة</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ddd', true: '#3498db' }}
            thumbColor={notifications ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {notifications && (
          <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, darkMode && styles.darkText]}>وقت التذكير</Text>
              <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تحديد وقت التذكير اليومي</Text>
            </View>
            <TouchableOpacity style={[styles.timeButton, darkMode && styles.darkTimeButton]}>
              <Text style={[styles.timeButtonText, darkMode && styles.darkText]}>9:00 م</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.actionButton, styles.dangerButton]}
          onPress={confirmClearData}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={[styles.actionButtonText, styles.dangerButtonText]}>حذف جميع البيانات</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render appearance settings
  const renderAppearanceSettings = () => {
    return (
      <View style={styles.tabContent}>
        <TouchableOpacity 
          style={[styles.settingItem, darkMode && styles.darkSettingItem]}
          onPress={() => setShowFontModal(true)}
        >
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>نوع الخط</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تغيير نوع الخط المستخدم في الكتابة</Text>
          </View>
          <View style={styles.fontPreviewContainer}>
            <Text style={[styles.fontPreview, darkMode && styles.darkText, { fontFamily }]}>أبجد</Text>
            <Ionicons name="chevron-forward" size={20} color={darkMode ? "#aaa" : "#666"} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingItem, darkMode && styles.darkSettingItem]}
          onPress={() => setShowFontSizeModal(true)}
        >
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>حجم الخط</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تغيير حجم الخط المستخدم في الكتابة</Text>
          </View>
          <View style={styles.fontPreviewContainer}>
            <Text style={[styles.fontPreview, darkMode && styles.darkText]}>
              {fontSizes.find(size => size.id === fontSize).name}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={darkMode ? "#aaa" : "#666"} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingItem, darkMode && styles.darkSettingItem]}
          onPress={() => setShowThemeModal(true)}
        >
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>تصميم الكتاب</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تغيير التصميم الافتراضي للكتب</Text>
          </View>
          <View style={styles.themePreviewContainer}>
            <View 
              style={[
                styles.themePreview, 
                { backgroundColor: availableThemes.find(theme => theme.id === selectedTheme).color }
              ]} 
            />
            <Ionicons name="chevron-forward" size={20} color={darkMode ? "#aaa" : "#666"} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Render security settings
  const renderSecuritySettings = () => {
    return (
      <View style={styles.tabContent}>
        <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>قفل التطبيق</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>حماية التطبيق برمز أو بصمة</Text>
          </View>
          <Switch
            value={appLock}
            onValueChange={toggleAppLock}
            trackColor={{ false: '#ddd', true: '#3498db' }}
            thumbColor={appLock ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {appLock && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.securityButton]}
            onPress={changePin}
          >
            <MaterialIcons name="pin" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.actionButtonText}>تغيير رمز القفل</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={[styles.actionButton, darkMode && styles.darkActionButton]}
          onPress={confirmSignOut}
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.actionButtonText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render telegram settings
  const renderTelegramSettings = () => {
    return (
      <View style={styles.tabContent}>
        <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, darkMode && styles.darkText]}>تفعيل النسخ الاحتياطي عبر تليجرام</Text>
            <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>إرسال نسخ احتياطية من كتبك إلى قناة تليجرام</Text>
          </View>
          <Switch
            value={telegramEnabled}
            onValueChange={setTelegramEnabled}
            trackColor={{ false: '#ddd', true: '#3498db' }}
            thumbColor={telegramEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {telegramEnabled && (
          <>
            <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, darkMode && styles.darkText]}>بوت تليجرام</Text>
                <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>اسم بوت تليجرام للنسخ الاحتياطي</Text>
              </View>
              <View style={styles.telegramInputContainer}>
                <TextInput
                  style={[styles.telegramInput, darkMode && styles.darkTelegramInput]}
                  value={telegramBot}
                  onChangeText={setTelegramBot}
                  placeholder="@moalif_bot"
                  placeholderTextColor={darkMode ? "#777" : "#999"}
                />
                <TouchableOpacity style={styles.telegramLinkButton} onPress={openTelegramBot}>
                  <Ionicons name="open-outline" size={18} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, darkMode && styles.darkText]}>قناة النسخ الاحتياطي</Text>
                <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>قناة تليجرام لحفظ النسخ الاحتياطية</Text>
              </View>
              <View style={styles.telegramInputContainer}>
                <TextInput
                  style={[styles.telegramInput, darkMode && styles.darkTelegramInput]}
                  value={telegramChannel}
                  onChangeText={setTelegramChannel}
                  placeholder="@moalif_backup"
                  placeholderTextColor={darkMode ? "#777" : "#999"}
                />
                <TouchableOpacity style={styles.telegramLinkButton} onPress={openTelegramChannel}>
                  <Ionicons name="open-outline" size={18} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, darkMode && styles.darkText]}>نسخ احتياطي تلقائي</Text>
                <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>إرسال نسخ احتياطية تلقائي بشكل دوري</Text>
              </View>
              <Switch
                value={autoBackup}
                onValueChange={setAutoBackup}
                trackColor={{ false: '#ddd', true: '#3498db' }}
                thumbColor={autoBackup ? '#fff' : '#fff'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>

            {autoBackup && (
              <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, darkMode && styles.darkText]}>تكرار النسخ الاحتياطي</Text>
                  <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>تحديد وتيرة النسخ الاحتياطي التلقائي</Text>
                </View>
                <View style={styles.frequencyContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.frequencyButton, 
                      backupFrequency === 'daily' && styles.activeFrequency,
                      darkMode && styles.darkFrequencyButton,
                      backupFrequency === 'daily' && darkMode && styles.darkActiveFrequency
                    ]}
                    onPress={() => setBackupFrequency('daily')}
                  >
                    <Text style={[
                      styles.frequencyText, 
                      backupFrequency === 'daily' && styles.activeFrequencyText,
                      darkMode && styles.darkFrequencyText,
                      backupFrequency === 'daily' && darkMode && styles.darkActiveFrequencyText
                    ]}>يومي</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.frequencyButton, 
                      backupFrequency === 'weekly' && styles.activeFrequency,
                      darkMode && styles.darkFrequencyButton,
                      backupFrequency === 'weekly' && darkMode && styles.darkActiveFrequency
                    ]}
                    onPress={() => setBackupFrequency('weekly')}
                  >
                    <Text style={[
                      styles.frequencyText, 
                      backupFrequency === 'weekly' && styles.activeFrequencyText,
                      darkMode && styles.darkFrequencyText,
                      backupFrequency === 'weekly' && darkMode && styles.darkActiveFrequencyText
                    ]}>أسبوعي</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.frequencyButton, 
                      backupFrequency === 'monthly' && styles.activeFrequency,
                      darkMode && styles.darkFrequencyButton,
                      backupFrequency === 'monthly' && darkMode && styles.darkActiveFrequency
                    ]}
                    onPress={() => setBackupFrequency('monthly')}
                  >
                    <Text style={[
                      styles.frequencyText, 
                      backupFrequency === 'monthly' && styles.activeFrequencyText,
                      darkMode && styles.darkFrequencyText,
                      backupFrequency === 'monthly' && darkMode && styles.darkActiveFrequencyText
                    ]}>شهري</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.actionButton, styles.telegramButton]}
              onPress={backupToTelegram}
            >
              <FontAwesome5 name="telegram-plane" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>إرسال نسخة احتياطية الآن</Text>
            </TouchableOpacity>
          </>
        )}

        {!telegramEnabled && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.telegramButton]}
            onPress={connectTelegram}
          >
            <FontAwesome5 name="telegram-plane" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.actionButtonText}>ربط حساب تليجرام</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Render about settings
  const renderAboutSettings = () => {
    return (
      <View style={styles.tabContent}>
        <View style={[styles.aboutContainer, darkMode && styles.darkAboutContainer]}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=مؤلف&aspect=1:1&seed=123' }} 
            style={styles.appLogo} 
          />
          <Text style={[styles.appName, darkMode && styles.darkText]}>مؤلف | Mo'alif</Text>
          <Text style={[styles.appVersion, darkMode && styles.darkSubText]}>الإصدار 1.0.0</Text>
          <Text style={[styles.appCopyright, darkMode && styles.darkSubText]}>© 2025 جميع الحقوق محفوظة</Text>
          
          <View style={styles.socialLinks}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://t.me/moalif')}
            >
              <FontAwesome5 name="telegram-plane" size={20} color="#0088cc" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://twitter.com/moalif')}
            >
              <FontAwesome5 name="twitter" size={20} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => Linking.openURL('https://instagram.com/moalif')}
            >
              <FontAwesome5 name="instagram" size={20} color="#E1306C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>جاري التحميل...</Text>
        </View>
      )}

      {/* Font Selection Modal */}
      <Modal
        visible={showFontModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFontModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, darkMode && styles.darkModalContainer]}>
            <Text style={[styles.modalTitle, darkMode && styles.darkText]}>اختر الخط</Text>
            <ScrollView style={styles.modalScrollView}>
              {availableFonts.map((font) => (
                <TouchableOpacity
                  key={font.id}
                  style={[
                    styles.modalItem,
                    fontFamily === font.id && styles.selectedModalItem,
                    darkMode && styles.darkModalItem,
                    fontFamily === font.id && darkMode && styles.darkSelectedModalItem,
                  ]}
                  onPress={() => changeFont(font.id)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      fontFamily === font.id && styles.selectedModalItemText,
                      darkMode && styles.darkModalItemText,
                      { fontFamily: font.id }
                    ]}
                  >
                    {font.name}
                  </Text>
                  {fontFamily === font.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#3498db" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFontModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Font Size Selection Modal */}
      <Modal
        visible={showFontSizeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFontSizeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, darkMode && styles.darkModalContainer]}>
            <Text style={[styles.modalTitle, darkMode && styles.darkText]}>اختر حجم الخط</Text>
            <ScrollView style={styles.modalScrollView}>
              {fontSizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  style={[
                    styles.modalItem,
                    fontSize === size.id && styles.selectedModalItem,
                    darkMode && styles.darkModalItem,
                    fontSize === size.id && darkMode && styles.darkSelectedModalItem,
                  ]}
                  onPress={() => changeFontSize(size.id)}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      fontSize === size.id && styles.selectedModalItemText,
                      darkMode && styles.darkModalItemText,
                      size.id === 'small' && { fontSize: 14 },
                      size.id === 'medium' && { fontSize: 16 },
                      size.id === 'large' && { fontSize: 18 },
                      size.id === 'xlarge' && { fontSize: 20 },
                    ]}
                  >
                    {size.name}
                  </Text>
                  {fontSize === size.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#3498db" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFontSizeModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, darkMode && styles.darkModalContainer]}>
            <Text style={[styles.modalTitle, darkMode && styles.darkText]}>اختر التصميم</Text>
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.themeGrid}>
                {availableThemes.map((theme) => (
                  <TouchableOpacity
                    key={theme.id}
                    style={[
                      styles.themeItem,
                      selectedTheme === theme.id && styles.selectedThemeItem,
                      darkMode && styles.darkThemeItem,
                      { backgroundColor: theme.color },
                    ]}
                    onPress={() => changeTheme(theme.id)}
                  >
                    <Text
                      style={[
                        styles.themeItemText,
                        theme.id === 'light' && { color: '#333' },
                      ]}
                    >
                      {theme.name}
                    </Text>
                    {selectedTheme === theme.id && (
                      <View style={styles.selectedThemeIndicator}>
                        <Ionicons name="checkmark-circle" size={24} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowThemeModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={[styles.header, darkMode && styles.darkHeader]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={darkMode ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, darkMode && styles.darkText]}>الإعدادات</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, darkMode && styles.darkTabsContainer]}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
              darkMode && styles.darkTabButton,
              activeTab === tab.id && darkMode && styles.darkActiveTabButton,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon} 
              size={18} 
              color={activeTab === tab.id 
                ? (darkMode ? '#3498db' : '#3498db') 
                : (darkMode ? '#aaa' : '#999')
              } 
            />
            <Text 
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
                darkMode && styles.darkTabText,
                activeTab === tab.id && darkMode && styles.darkActiveTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View 
          style={[
            styles.tabIndicator,
            { transform: [{ translateX: tabIndicatorPosition }] },
            darkMode && styles.darkTabIndicator,
          ]} 
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
    height: 60,
  },
  darkTabsContainer: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTabButton: {
    backgroundColor: 'transparent',
  },
  darkTabButton: {
    backgroundColor: 'transparent',
  },
  darkActiveTabButton: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  darkTabText: {
    color: '#aaa',
  },
  darkActiveTabText: {
    color: '#3498db',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: width / TABS.length,
    backgroundColor: '#3498db',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  darkTabIndicator: {
    backgroundColor: '#3498db',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  tabContent: {
    paddingBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  darkSettingItem: {
    backgroundColor: '#2a2a2a',
    shadowColor: '#000',
  },
  settingInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  languageButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  darkLanguageButton: {
    backgroundColor: '#3a3a3a',
  },
  languageButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  darkActionButton: {
    backgroundColor: '#2980b9',
  },
  buttonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: '#e74c3c',
  },
  securityButton: {
    backgroundColor: '#27ae60',
  },
  dangerButtonText: {
    color: '#fff',
  },
  telegramButton: {
    backgroundColor: '#0088cc',
  },
  telegramInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  telegramInput: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 14,
    color: '#333',
    minWidth: 120,
    textAlign: 'right',
  },
  darkTelegramInput: {
    backgroundColor: '#3a3a3a',
    color: '#fff',
  },
  telegramLinkButton: {
    padding: 5,
    marginRight: 5,
  },
  frequencyContainer: {
    flexDirection: 'row',
  },
  frequencyButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  darkFrequencyButton: {
    backgroundColor: '#3a3a3a',
  },
  activeFrequency: {
    backgroundColor: '#3498db',
  },
  darkActiveFrequency: {
    backgroundColor: '#2980b9',
  },
  frequencyText: {
    color: '#333',
    fontSize: 12,
  },
  darkFrequencyText: {
    color: '#ddd',
  },
  activeFrequencyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  darkActiveFrequencyText: {
    color: '#fff',
  },
  aboutContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  darkAboutContainer: {
    backgroundColor: '#2a2a2a',
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 15,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: '#999',
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 15,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  darkModalContainer: {
    backgroundColor: '#2a2a2a',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  darkModalItem: {
    borderBottomColor: '#444',
  },
  selectedModalItem: {
    backgroundColor: '#f0f8ff',
  },
  darkSelectedModalItem: {
    backgroundColor: '#2c3e50',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  darkModalItemText: {
    color: '#fff',
  },
  selectedModalItemText: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  modalCloseButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fontPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontPreview: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  themePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themePreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeItem: {
    width: '48%',
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  themeItemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectedThemeItem: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  darkThemeItem: {
    borderColor: '#fff',
  },
  selectedThemeIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  timeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  darkTimeButton: {
    backgroundColor: '#3a3a3a',
  },
  timeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});