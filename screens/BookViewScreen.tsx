import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { StyleOption, MaterialIconName, Book, Chapter, Page, RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { bookData } from '../data/books';

type BookViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookView'>;
type BookViewScreenRouteProp = RouteProp<RootStackParamList, 'BookView'>;

// Book styles
const bookStyles: Record<string, StyleOption> = {
  classic: { id: 'classic', name: 'كلاسيكي', color: '#8B4513', icon: 'book' },
  vintage: { id: 'vintage', name: 'عتيق', color: '#DAA520', icon: 'book-open-page-variant' },
  military: { id: 'military', name: 'عسكري', color: '#556B2F', icon: 'shield' },
  modern: { id: 'modern', name: 'عصري', color: '#2C3E50', icon: 'book-open-variant' },
  feminine: { id: 'feminine', name: 'أنثوي', color: '#FF69B4', icon: 'flower' },
  artistic: { id: 'artistic', name: 'فني', color: '#9B59B6', icon: 'palette' }
};

// Date format options
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export default function BookViewScreen() {
  const navigation = useNavigation<BookViewScreenNavigationProp>();
  const route = useRoute<BookViewScreenRouteProp>();
  const { bookId } = route.params;
  const book = bookData[bookId] as Book;

  // Get all pages across chapters
  const allPages = book.chapters.reduce<Page[]>((pages: Page[], chapter: Chapter) => {
    return [...pages, ...chapter.pages];
  }, []);

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', DATE_FORMAT_OPTIONS);
  };

  // Render a single page
  const renderPage = (page: Page, index: number) => {
    return (
      <TouchableOpacity 
        key={page.id} 
        style={styles.pageItem}
        onPress={() => navigation.navigate('EntryDetail', { entryId: page.id })}
      >
        <Text style={styles.pageTitle}>{page.title}</Text>
        <Text style={styles.pageDate}>
          {page.date && formatDate(new Date(page.date))}
        </Text>
        <Text style={styles.pagePreview} numberOfLines={2}>
          {page.content}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render a chapter with its pages
  const renderChapter = (chapter: Chapter, chapterIndex: number) => {
    return (
      <View key={chapter.id} style={styles.chapterContainer}>
        <View style={styles.chapterHeader}>
          <Text style={styles.chapterTitle}>
            {chapter.title}
          </Text>
          <Text style={styles.chapterPageCount}>
            {chapter.pages.length} صفحات
          </Text>
        </View>
        <View style={styles.pagesContainer}>
          {chapter.pages.map((page: Page, pageIndex: number) => renderPage(page, pageIndex))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.bookHeader}>
          <Text style={styles.bookTitleText}>{book.title}</Text>
          <Text style={styles.bookDateText}>
            {book.dateCreated && formatDate(new Date(book.dateCreated))}
          </Text>
        </View>
        <View style={styles.chaptersContainer}>
          {book.chapters.map((chapter: Chapter, index: number) => renderChapter(chapter, index))}
        </View>
        <View style={styles.pagesContainer}>
          {allPages.map((page: Page, index: number) => renderPage(page, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookHeader: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bookDateText: {
    fontSize: 16,
    color: '#666',
  },
  chaptersContainer: {
    padding: 15,
  },
  chapterContainer: {
    marginBottom: 20,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chapterPageCount: {
    fontSize: 14,
    color: '#666',
  },
  pagesContainer: {
    marginTop: 10,
  },
  pageItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pageDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  pagePreview: {
    fontSize: 14,
    color: '#666',
  },
});