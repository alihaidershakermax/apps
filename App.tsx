import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import React, { createContext, useState, useEffect } from 'react';
import HomeScreen from "./screens/HomeScreen"
import NewEntryScreen from "./screens/NewEntryScreen"
import BookViewScreen from "./screens/BookViewScreen"
import EntryDetailScreen from "./screens/EntryDetailScreen"
import NewBookScreen from "./screens/NewBookScreen"
import SettingsScreen from "./screens/SettingsScreen"
import ChapterManagementScreen from "./screens/ChapterManagementScreen"
import BookExportScreen from "./screens/BookExportScreen"

// إنشاء سياق عام للتطبيق لمشاركة الإعدادات
export const AppContext = createContext(null);
  
const Stack = createNativeStackNavigator();
  
function RootStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        animation: 'slide_from_right',
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewEntry" component={NewEntryScreen} />
      <Stack.Screen name="BookView" component={BookViewScreen} />
      <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
      <Stack.Screen name="NewBook" component={NewBookScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChapterManagement" component={ChapterManagementScreen} />
      <Stack.Screen name="BookExport" component={BookExportScreen} />
    </Stack.Navigator>
  );
}
  
export default function App() {
  // إعدادات التطبيق العامة
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ar'); // 'ar' للعربية، 'en' للإنجليزية
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

  // تأثير الوضع المظلم على الواجهة
  useEffect(() => {
    // هنا يمكن إضافة منطق إضافي لتطبيق الوضع المظلم
    console.log('تم تغيير وضع العرض إلى:', darkMode ? 'مظلم' : 'فاتح');
  }, [darkMode]);

  // تأثير تغيير اللغة
  useEffect(() => {
    // هنا يمكن إضافة منطق إضافي لتطبيق تغيير اللغة
    console.log('تم تغيير اللغة إلى:', language === 'ar' ? 'العربية' : 'الإنجليزية');
  }, [language]);

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      language, setLanguage,
      notifications, setNotifications,
      cloudSync, setCloudSync,
      appLock, setAppLock,
      telegramEnabled, setTelegramEnabled,
      telegramBot, setTelegramBot,
      telegramChannel, setTelegramChannel,
      autoBackup, setAutoBackup,
      backupFrequency, setBackupFrequency,
      fontFamily, setFontFamily,
      fontSize, setFontSize
    }}>
      <SafeAreaProvider style={[styles.container, darkMode && styles.darkContainer]}>
        <Toaster theme={darkMode ? 'dark' : 'light'} />
        <NavigationContainer theme={darkMode ? NavigationDarkTheme : NavigationDefaultTheme}>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  },
  darkContainer: {
    backgroundColor: '#121212',
  }
});