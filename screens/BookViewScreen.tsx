import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Book, Chapter, Page } from '../types';
import { bookData } from '../data/books';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

type BookViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookView'>;
type BookViewScreenRouteProp = RouteProp<RootStackParamList, 'BookView'>;

// Render chapters
const renderChapters = (chapters: Chapter[]) => {
  return chapters.map((chapter) => (
    <View key={chapter.id} style={styles.chapterContainer}>
      <Text style={styles.chapterTitle}>{chapter.title}</Text>
      {renderPages(chapter.pages)}
    </View>
  ));
};

// Render pages
const renderPages = (pages: Page[]) => {
  return pages.map((page) => (
    <View key={page.id} style={styles.pageContainer}>
      <Text style={styles.pageTitle}>{page.title}</Text>
      <Text style={styles.pageDate}>{page.date}</Text>
      <Text style={styles.pageContent}>{page.content}</Text>
    </View>
  ));
};

export default function BookViewScreen() {
  const navigation = useNavigation<BookViewScreenNavigationProp>();
  const route = useRoute<BookViewScreenRouteProp>();
  const { bookId } = route.params;
  const book = bookData[bookId] as Book;

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{book.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BookExport', { bookId })}>
          <Text style={styles.exportButton}>تصدير</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {renderChapters(book.chapters)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    ...commonStyles.header,
  },
  headerTitle: {
    ...commonStyles.headerTitle,
  },
  backButton: {
    color: colors.gray500,
    fontSize: 16,
  },
  exportButton: {
    color: colors.primary,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  chapterContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    padding: 15,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray700,
    marginBottom: 10,
  },
  pageContainer: {
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray700,
    marginBottom: 5,
  },
  pageDate: {
    fontSize: 14,
    color: colors.gray500,
    marginBottom: 10,
  },
  pageContent: {
    fontSize: 16,
    color: colors.gray700,
    lineHeight: 24,
  },
});