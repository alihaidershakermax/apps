import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { BookData } from '../types';

const BOOKS_STORAGE_KEY = '@books';
const BACKUP_FILENAME = 'books_backup.json';

export class StorageService {
  static async getAllBooks(): Promise<BookData> {
    try {
      const jsonValue = await AsyncStorage.getItem(BOOKS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (error) {
      console.error('Error reading books from storage:', error);
      return {};
    }
  }

  static async saveBooks(books: BookData): Promise<void> {
    try {
      const jsonValue = JSON.stringify(books);
      await AsyncStorage.setItem(BOOKS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving books to storage:', error);
      throw new Error('فشل حفظ البيانات');
    }
  }

  static async createBackup(): Promise<string> {
    try {
      const books = await this.getAllBooks();
      const backupData = {
        books,
        timestamp: new Date().toISOString(),
        version: '1.0',
      };

      const backupJson = JSON.stringify(backupData, null, 2);
      const backupPath = `${FileSystem.documentDirectory}${BACKUP_FILENAME}`;
      
      await FileSystem.writeAsStringAsync(backupPath, backupJson, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (!(await Sharing.isAvailableAsync())) {
        throw new Error('المشاركة غير متاحة على هذا الجهاز');
      }

      await Sharing.shareAsync(backupPath, {
        mimeType: 'application/json',
        dialogTitle: 'حفظ النسخة الاحتياطية',
      });

      return backupPath;
    } catch (error) {
      console.error('Error creating backup:', error);
      throw new Error('فشل إنشاء النسخة الاحتياطية');
    }
  }

  static async restoreFromBackup(uri: string): Promise<void> {
    try {
      const content = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const backupData = JSON.parse(content);

      if (!backupData.books || !backupData.timestamp || !backupData.version) {
        throw new Error('ملف النسخة الاحتياطية غير صالح');
      }

      await this.saveBooks(backupData.books);
    } catch (error) {
      console.error('Error restoring from backup:', error);
      throw new Error('فشل استعادة النسخة الاحتياطية');
    }
  }

  static async pickBackupFile(): Promise<string> {
    try {
      const result = await FileSystem.getInfoAsync(FileSystem.documentDirectory + BACKUP_FILENAME);
      if (!result.exists) {
        throw new Error('لم يتم العثور على ملف النسخة الاحتياطية');
      }
      return result.uri;
    } catch (error) {
      console.error('Error picking backup file:', error);
      throw new Error('فشل اختيار ملف النسخة الاحتياطية');
    }
  }
} 