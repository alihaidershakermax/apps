import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

// Get screen dimensions
const { width } = Dimensions.get('window');

// Types for our data
interface BookItem {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  coverImage: string;
  pages: number;
  chapters: number;
  lastUpdated: string;
  style: keyof typeof bookStyleIcons;
}

interface PageItem {
  id: string;
  title: string;
  date: string;
  bookId: string;
  preview: string;
}

interface BookStyleIcon {
  name: MaterialIconName;
  color: string;
}

// Sample data for books
const sampleBooks: BookItem[] = [
  { 
    id: '1', 
    title: 'رحلة الحياة', 
    author: 'أنت', 
    coverColor: '#3498db', 
    coverImage: 'https://api.a0.dev/assets/image?text=رحلة الحياة&aspect=2:3',
    pages: 24, 
    chapters: 3,
    lastUpdated: '2025-06-25',
    style: 'classic'
  },
  { 
    id: '2', 
    title: 'ذكريات الطفولة', 
    author: 'أنت', 
    coverColor: '#e74c3c', 
    coverImage: 'https://api.a0.dev/assets/image?text=ذكريات الطفولة&aspect=2:3',
    pages: 12, 
    chapters: 2,
    lastUpdated: '2025-06-20',
    style: 'vintage'
  },
  { 
    id: '3', 
    title: 'أيام الحرب', 
    author: 'أنت', 
    coverColor: '#2ecc71', 
    coverImage: 'https://api.a0.dev/assets/image?text=أيام الحرب&aspect=2:3',
    pages: 8, 
    chapters: 1,
    lastUpdated: '2025-06-15',
    style: 'military'
  },
];

// Sample data for recent pages
const recentPages: PageItem[] = [
  { id: '1', title: 'الفصل الأول: البداية', date: '2025-06-25', bookId: '1', preview: 'كانت البداية صعبة، لكنها كانت ضرورية لفهم ما سيأتي لاحقاً...' },
  { id: '2', title: 'مقدمة الكتاب', date: '2025-06-24', bookId: '2', preview: 'في هذا الكتاب سأروي قصة طفولتي كما عشتها بكل تفاصيلها...' },
  { id: '3', title: 'يوم الحصار', date: '2025-06-23', bookId: '3', preview: 'لم نكن نعلم أن ذلك اليوم سيكون بداية لفترة طويلة من الحصار...' },
  { id: '4', title: 'الفصل الثاني: التحول', date: '2025-06-22', bookId: '1', preview: 'بعد سنوات من المحاولة، جاء التحول الذي غير مجرى حياتي بالكامل...' },
];

// Book style icons mapping
const bookStyleIcons: Record<string, BookStyleIcon> = {
  classic: { name: 'book', color: '#8e44ad' },
  vintage: { name: 'book-open-page-variant', color: '#d35400' },
  military: { name: 'shield', color: '#27ae60' },
  modern: { name: 'book-open-variant', color: '#3498db' },
  feminine: { name: 'flower', color: '#e84393' },
  artistic: { name: 'palette', color: '#f39c12' },
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'books' | 'pages' | 'stats'>('books');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // Function to render book item
  const renderBookItem = ({ item }: { item: BookItem }) => (
    <TouchableOpacity 
      style={styles.bookItem}
      onPress={() => {
        setSelectedBook(item);
        setActiveTab('pages');
      }}
    >
      <View style={styles.bookCoverContainer}>
        <Image 
          source={{ uri: item.coverImage }} 
          style={styles.bookCover}
          resizeMode="cover"
        />
        <View style={styles.bookInfo}>
          <MaterialCommunityIcons 
            name={bookStyleIcons[item.style]?.name || 'book'} 
            size={16} 
            color={bookStyleIcons[item.style]?.color || '#999'} 
          />
          <Text style={styles.bookPages}>{item.pages} صفحة</Text>
        </View>
      </View>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>بقلم: {item.author}</Text>
      <Text style={styles.bookDate}>آخر تحديث: {formatDate(item.lastUpdated)}</Text>
    </TouchableOpacity>
  );

  // Function to render page item
  const renderPageItem = ({ item }: { item: PageItem }) => (
    <TouchableOpacity 
      style={styles.pageItem}
      onPress={() => navigation.navigate('EntryDetail', { entryId: item.id })}
    >
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>{item.title}</Text>
        <MaterialCommunityIcons name="file-document-outline" size={24} color="#3498db" />
      </View>
      <Text style={styles.pageDate}>{formatDate(item.date)}</Text>
      <Text style={styles.pagePreview} numberOfLines={2}>{item.preview}</Text>
      <View style={styles.pageFooter}>
        <Text style={styles.pageBook}>
          {sampleBooks.find(book => book.id === item.bookId)?.title || 'كتاب غير معروف'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  // Function to render statistics tab
  const renderStatisticsTab = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>3</Text>
        <Text style={styles.statLabel}>كتب</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>44</Text>
        <Text style={styles.statLabel}>صفحة</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>6</Text>
        <Text style={styles.statLabel}>فصول</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>تقدم الكتابة</Text>
        <View style={styles.bookProgressList}>
          {sampleBooks.map(book => (
            <View key={book.id} style={styles.bookProgressItem}>
              <View style={styles.bookProgressHeader}>
                <Text style={styles.bookProgressTitle}>{book.title}</Text>
                <Text style={styles.bookProgressPages}>{book.pages} / 100</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${book.pages}%`, backgroundColor: book.coverColor }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // Fix the navigation.navigate call
  const handleAddEntry = () => {
    if (selectedBook) {
      navigation.navigate('NewEntry', { bookId: selectedBook.id });
    } else {
      toast.error('الرجاء اختيار دفتر أولاً');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>مؤلف</Text>
        <Text style={styles.headerSubtitle}>Mo'alif</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pages' && styles.activeTab]}
          onPress={() => setActiveTab('pages')}
        >
          <Text style={[styles.tabText, activeTab === 'pages' && styles.activeTabText]}>الصفحات</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>الكتب</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}
        >
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>الإحصائيات</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === 'pages' && (
        <FlatList
          data={recentPages}
          renderItem={renderPageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.pagesList}
        />
      )}

      {activeTab === 'books' && (
        <View style={styles.booksContainer}>
          <FlatList
            data={sampleBooks}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={styles.booksList}
          />
        </View>
      )}

      {activeTab === 'stats' && renderStatisticsTab()}

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddEntry}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    borderBottomColor: '#3498db',
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  bookCover: {
    height: '100%',
    width: '100%',
  },
  bookCoverContainer: {
    borderRadius: 10,
    elevation: 4,
    height: ((width - 50) / 2) * 1.5,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: (width - 50) / 2,
  },
  bookDate: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  bookInfo: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  bookItem: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 5,
    width: (width - 50) / 2,
  },
  bookPages: {
    color: '#fff',
    fontSize: 12,
  },
  bookProgressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  bookProgressItem: {
    marginBottom: 15,
  },
  bookProgressList: {
    width: '100%',
  },
  bookProgressPages: {
    color: '#666',
    fontSize: 14,
  },
  bookProgressTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  booksContainer: {
    flex: 1,
    padding: 15,
  },
  booksList: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 28,
    bottom: 20,
    elevation: 5,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 56,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerButton: {
    marginLeft: 15,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerSubtitle: {
    alignSelf: 'flex-end',
    color: '#666',
    fontSize: 14,
    marginLeft: 5,
  },
  headerTitle: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pageBook: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageDate: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'right',
  },
  pageFooter: {
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  pageHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pageItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pagePreview: {
    color: '#666',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'right',
  },
  pageTitle: {
    color: '#333',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  pagesList: {
    padding: 15,
  },
  progressBar: {
    height: '100%',
  },
  progressBarContainer: {
    backgroundColor: '#eee',
    borderRadius: 4,
    height: 8,
    overflow: 'hidden',
  },
  progressContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 16,
  },
  statNumber: {
    color: '#3498db',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flex: 1,
    padding: 20,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15,
  },
  tabText: {
    color: '#999',
    fontSize: 16,
  },
  tabs: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});