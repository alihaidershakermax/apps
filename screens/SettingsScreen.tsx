import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Animated,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import type { FontSize, FontFamily } from '../types/theme';
import { StorageService } from '../services/storage';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const fontSizeOptions: { label: string; value: FontSize }[] = [
  { label: 'صغير جداً', value: 'xs' },
  { label: 'صغير', value: 'sm' },
  { label: 'متوسط', value: 'md' },
  { label: 'كبير', value: 'lg' },
  { label: 'كبير جداً', value: 'xl' },
  { label: 'ضخم', value: 'xxl' },
];

const fontFamilyOptions: { label: string; value: FontFamily }[] = [
  { label: 'الخط الافتراضي', value: 'default' },
  { label: 'خط عربي', value: 'arabic' },
  { label: 'خط زخرفي', value: 'decorative' },
];

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { theme, toggleTheme, setFontSize, setFontFamily } = useTheme();
  const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
  const [isRestoreModalVisible, setIsRestoreModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await StorageService.createBackup();
      toast.success('تم حفظ النسخة الاحتياطية بنجاح');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ النسخة الاحتياطية');
    } finally {
      setIsLoading(false);
      setIsBackupModalVisible(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      const backupUri = await StorageService.pickBackupFile();
      await StorageService.restoreFromBackup(backupUri);
      toast.success('تم استعادة النسخة الاحتياطية بنجاح');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ أثناء استعادة النسخة الاحتياطية');
    } finally {
      setIsLoading(false);
      setIsRestoreModalVisible(false);
    }
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    value: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { backgroundColor: theme.colors.background.paper }
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons
          name={icon as any}
          size={24}
          color={theme.colors.text.primary}
          style={styles.settingIcon}
        />
        <Text style={[styles.settingTitle, { color: theme.colors.text.primary }]}>
          {title}
        </Text>
      </View>
      {value}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.default }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderSettingItem(
          'moon',
          'الوضع الداكن',
          <Switch
            value={theme.isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.colors.neutral.gray300,
              true: theme.colors.primary.main,
            }}
          />
        )}

        {renderSettingItem(
          'text',
          'حجم الخط',
          <View style={styles.fontSizeContainer}>
            {fontSizeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.fontSizeOption,
                  {
                    backgroundColor:
                      theme.fonts.sizes[option.value] === theme.fonts.sizes.md
                        ? theme.colors.primary.main
                        : theme.colors.background.paper,
                  },
                ]}
                onPress={() => setFontSize(option.value)}
              >
                <Text
                  style={[
                    styles.fontSizeLabel,
                    {
                      color:
                        theme.fonts.sizes[option.value] === theme.fonts.sizes.md
                          ? theme.colors.text.inverse
                          : theme.colors.text.primary,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {renderSettingItem(
          'text',
          'نوع الخط',
          <View style={styles.fontFamilyContainer}>
            {fontFamilyOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.fontFamilyOption,
                  {
                    backgroundColor:
                      theme.fonts.families[option.value] === theme.fonts.families.default
                        ? theme.colors.primary.main
                        : theme.colors.background.paper,
                  },
                ]}
                onPress={() => setFontFamily(option.value)}
              >
                <Text
                  style={[
                    styles.fontFamilyLabel,
                    {
                      color:
                        theme.fonts.families[option.value] === theme.fonts.families.default
                          ? theme.colors.text.inverse
                          : theme.colors.text.primary,
                      fontFamily: theme.fonts.families[option.value],
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {renderSettingItem(
          'cloud-upload',
          'نسخة احتياطية',
          <Ionicons
            name="chevron-forward"
            size={24}
            color={theme.colors.text.secondary}
          />,
          () => setIsBackupModalVisible(true)
        )}

        {renderSettingItem(
          'cloud-download',
          'استعادة النسخة الاحتياطية',
          <Ionicons
            name="chevron-forward"
            size={24}
            color={theme.colors.text.secondary}
          />,
          () => setIsRestoreModalVisible(true)
        )}
      </ScrollView>

      <Modal
        visible={isBackupModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsBackupModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background.paper },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
              نسخة احتياطية
            </Text>
            <Text style={[styles.modalText, { color: theme.colors.text.secondary }]}>
              هل تريد حفظ نسخة احتياطية من بياناتك؟
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.colors.primary.main }]}
                onPress={handleBackup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.text.inverse} />
                ) : (
                  <Text style={[styles.modalButtonText, { color: theme.colors.text.inverse }]}>
                    نعم
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.colors.status.error }]}
                onPress={() => setIsBackupModalVisible(false)}
                disabled={isLoading}
              >
                <Text style={[styles.modalButtonText, { color: theme.colors.text.inverse }]}>
                  لا
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isRestoreModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsRestoreModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background.paper },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
              استعادة النسخة الاحتياطية
            </Text>
            <Text style={[styles.modalText, { color: theme.colors.text.secondary }]}>
              هل تريد استعادة النسخة الاحتياطية؟ سيتم استبدال البيانات الحالية.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.colors.primary.main }]}
                onPress={handleRestore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.text.inverse} />
                ) : (
                  <Text style={[styles.modalButtonText, { color: theme.colors.text.inverse }]}>
                    نعم
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.colors.status.error }]}
                onPress={() => setIsRestoreModalVisible(false)}
                disabled={isLoading}
              >
                <Text style={[styles.modalButtonText, { color: theme.colors.text.inverse }]}>
                  لا
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  fontSizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fontSizeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  fontSizeLabel: {
    fontSize: 14,
  },
  fontFamilyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fontFamilyOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  fontFamilyLabel: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'right',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;