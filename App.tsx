import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Toaster } from 'sonner-native';
import { RootStackParamList } from './types';
import { colors } from './theme/colors';

// Import screens
import HomeScreen from './screens/HomeScreen';
import BookViewScreen from './screens/BookViewScreen';
import NewBookScreen from './screens/NewBookScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import BookExportScreen from './screens/BookExportScreen';
import ChapterManagementScreen from './screens/ChapterManagementScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    } else {
      console.warn('Fonts not loaded');
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.darkBackground,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookView" component={BookViewScreen} />
        <Stack.Screen name="NewBook" component={NewBookScreen} />
        <Stack.Screen name="NewEntry" component={NewEntryScreen} />
        <Stack.Screen name="BookExport" component={BookExportScreen} />
        <Stack.Screen name="ChapterManagement" component={ChapterManagementScreen} />
        <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <Toaster />
    </NavigationContainer>
  );
}