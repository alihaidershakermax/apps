import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Dimensions,
  Animated,
  PanResponder,
  Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Sample book data
const bookData = {
  '1': {
    id: '1',
    title: 'رحلة الحياة',
    author: 'أنت',
    coverColor: '#3498db',
    coverImage: 'https://api.a0.dev/assets/image?text=رحلة الحياة&aspect=2:3',
    style: 'classic',
    paperColor: '#ffffff',
    fontFamily: 'serif',
    chapters: [
      {
        id: 'ch1',
        title: 'الفصل الأول: البداية',
        pages: [
          { 
            id: 'p1', 
            title: 'البداية', 
            content: 'كانت البداية صعبة، لكنها كانت ضرورية لفهم ما سيأتي لاحقاً. في تلك الأيام لم أكن أعلم أن الحياة ستأخذني في هذا المسار الطويل والمليء بالمفاجآت. كل خطوة كانت تقودني إلى المرحلة التالية، وكل تجربة كانت تعلمني درساً جديداً.',
            date: '2025-06-25',
            imageUrl: 'https://api.a0.dev/assets/image?text=البداية&aspect=16:9'
          },
          { 
            id: 'p2', 
            title: 'التحول', 
            content: 'بعد سنوات من المحاولة، جاء التحول الذي غير مجرى حياتي بالكامل. كان ذلك اليوم مختلفاً، شعرت فيه بأن شيئاً ما قد تغير في داخلي. رؤيتي للأمور أصبحت مختلفة، وأهدافي أصبحت أكثر وضوحاً. كان ذلك بداية مرحلة جديدة في حياتي.',
            date: '2025-06-22',
            imageUrl: 'https://api.a0.dev/assets/image?text=التحول&aspect=16:9'
          },
        ]
      },
      {
        id: 'ch2',
        title: 'الفصل الثاني: المواجهة',
        pages: [
          { 
            id: 'p3', 
            title: 'التحدي الأول', 
            content: 'واجهت أول تحدٍ حقيقي في حياتي عندما اضطررت لاتخاذ قرار صعب. كان علي الاختيار بين طريقين، كلاهما له إيجابياته وسلبياته. استغرقت وقتاً طويلاً في التفكير، وزنت كل الخيارات، واستشرت من أثق بهم، وفي النهاية اتخذت القرار الذي أعتقد أنه الأفضل.',
            date: '2025-06-20',
            imageUrl: 'https://api.a0.dev/assets/image?text=التحدي الأول&aspect=16:9'
          },
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'ذكريات الطفولة',
    author: 'أنت',
    coverColor: '#e74c3c',
    coverImage: 'https://api.a0.dev/assets/image?text=ذكريات الطفولة&aspect=2:3',
    style: 'vintage',
    paperColor: '#fffff0',
    fontFamily: 'serif',
    chapters: [
      {
        id: 'ch1',
        title: 'الفصل الأول: سنوات الطفولة المبكرة',
        pages: [
          { 
            id: 'p1', 
            title: 'ذكرى من الطفولة', 
            content: 'تذكرت اليوم عندما كنت صغيراً وكنت ألعب في حديقة المنزل. كانت أيام جميلة وبسيطة. كنت أقضي ساعات في اللعب مع أصدقائي دون أي هموم. كانت الحياة أبسط بكثير، والسعادة كانت تكمن في الأشياء الصغيرة.',
            date: '2025-06-24',
            imageUrl: 'https://api.a0.dev/assets/image?text=ذكرى من الطفولة&aspect=16:9'
          },
        ]
      }
    ]
  },
  '3': {
    id: '3',
    title: 'أيام الحرب',
    author: 'أنت',
    coverColor: '#2ecc71',
    coverImage: 'https://api.a0.dev/assets/image?text=أيام الحرب&aspect=2:3',
    style: 'military',
    paperColor: '#f5f5f5',
    fontFamily: 'sans-serif',
    chapters: [
      {
        id: 'ch1',
        title: 'الفصل الأول: بداية الحصار',
        pages: [
          { 
            id: 'p1', 
            title: 'يوم الحصار', 
            content: 'لم نكن نعلم أن ذلك اليوم سيكون بداية لفترة طويلة من الحصار. استيقظنا على أصوات القصف والانفجارات. كان الوضع مرعباً، لكننا حاولنا الحفاظ على هدوئنا قدر الإمكان. جمعنا ما استطعنا من مؤن وانتقلنا إلى القبو حيث كان أكثر أماناً.',
            date: '2025-06-23',
            imageUrl: 'https://api.a0.dev/assets/image?text=يوم الحصار&aspect=16:9'
          },
        ]
      }
    ]
  }
};

// Book style icons mapping
const bookStyleIcons = {
  classic: { name: 'book', color: '#8e44ad' },
  vintage: { name: 'book-open-page-variant', color: '#d35400' },
  military: { name: 'shield', color: '#27ae60' },
  modern: { name: 'book-open-variant', color: '#3498db' },
  feminine: { name: 'flower', color: '#e84393' },
  artistic: { name: 'palette', color: '#f39c12' },
};

export default function BookViewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId } = route.params || { bookId: '1' };
  
  const book = bookData[bookId];
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(-1); // -1 for cover, 0+ for pages
  const [showMenu, setShowMenu] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  
  // Get all pages from all chapters
  const getAllPages = () => {
    let allPages = [];
    book.chapters.forEach(chapter => {
      allPages = [...allPages, ...chapter.pages.map(page => ({...page, chapterTitle: chapter.title}))];
    });
    return allPages;
  };
  
  const allPages = getAllPages();
  
  // Animation values
  const pagePosition = useRef(new Animated.Value(0)).current;
  const pageTurn = useRef(new Animated.Value(0)).current;
  
  // Pan responder for page turning
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx < 0 && currentPage < allPages.length - 1) {
          // Swiping left (next page)
          pageTurn.setValue(Math.max(-100, Math.min(0, dx)));
        } else if (dx > 0 && currentPage > -1) {
          // Swiping right (previous page)
          pageTurn.setValue(Math.max(0, Math.min(100, dx)));
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx < -50 && currentPage < allPages.length - 1) {
          // Turn to next page
          Animated.timing(pageTurn, {
            toValue: -100,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentPage(currentPage + 1);
            pageTurn.setValue(0);
          });
        } else if (dx > 50 && currentPage > -1) {
          // Turn to previous page
          Animated.timing(pageTurn, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCurrentPage(currentPage - 1);
            pageTurn.setValue(0);
          });
        } else {
          // Return to current page
          Animated.timing(pageTurn, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  // Function to share the book
  const shareBook = async () => {
    try {
      await Share.share({
        message: `شاهد كتابي "${book.title}" بقلم ${book.author}!`,
        title: book.title,
      });
    } catch (error) {
      toast.error('حدث خطأ أثناء المشاركة');
    }
  };

  // Function to export book as PDF
  const exportPDF = () => {
    toast.success('جاري تصدير الكتاب كملف PDF...');
    setTimeout(() => {
      toast.success('تم تصدير الكتاب بنجاح!');
    }, 2000);
  };

  // Function to navigate to chapter management
  const manageChapters = () => {
    setShowMenu(false);
    navigation.navigate('ChapterManagement', { bookId });
  };

  // Function to navigate to book export screen
  const navigateToExport = () => {
    setShowMenu(false);
    navigation.navigate('BookExport', { bookId });
  };

  // Render book cover
  const renderCover = () => (
    <View style={styles.page}>
      {book.coverImage ? (
        <Image 
          source={{ uri: book.coverImage }} 
          style={styles.coverImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.coverContent, { backgroundColor: book.coverColor }]} />
      )}
      <View style={styles.coverOverlay}>
        <MaterialCommunityIcons 
          name={bookStyleIcons[book.style]?.name || 'book'} 
          size={40} 
          color="#fff" 
          style={styles.coverIcon}
        />
        <Text style={styles.coverTitle}>{book.title}</Text>
        <Text style={styles.coverAuthor}>بقلم: {book.author}</Text>
        <Text style={styles.coverChapters}>{book.chapters.length} فصل | {allPages.length} صفحة</Text>
      </View>
    </View>
  );

  // Render page
  const renderPage = (page, index) => (
    <View 
      style={[
        styles.page, 
        { backgroundColor: book.paperColor }
      ]} 
      key={page.id}
    >
      <View style={styles.pageContent}>
        <View style={styles.chapterIndicator}>
          <Text style={[
            styles.chapterTitle, 
            { 
              color: book.paperColor === '#333333' ? '#fff' : '#333',
              fontFamily: book.fontFamily
            }
          ]}>
            {page.chapterTitle}
          </Text>
        </View>
        
        <Text style={[
          styles.pageTitle, 
          { 
            color: book.paperColor === '#333333' ? '#fff' : '#333',
            fontFamily: book.fontFamily
          }
        ]}>
          {page.title}
        </Text>
        
        <Text style={[
          styles.pageDate, 
          { 
            color: book.paperColor === '#333333' ? '#ccc' : '#999',
            fontFamily: book.fontFamily
          }
        ]}>
          {formatDate(page.date)}
        </Text>
        
        {page.imageUrl && (
          <Image 
            source={{ uri: page.imageUrl }} 
            style={styles.pageImage} 
            resizeMode="cover"
          />
        )}
        
        <ScrollView style={styles.contentScrollView}>
          <Text style={[
            styles.pageText, 
            { 
              color: book.paperColor === '#333333' ? '#fff' : '#333',
              fontFamily: book.fontFamily
            }
          ]}>
            {page.content}
          </Text>
        </ScrollView>
      </View>
      <Text style={[
        styles.pageNumber, 
        { color: book.paperColor === '#333333' ? '#ccc' : '#999' }
      ]}>
        {index + 1}
      </Text>
    </View>
  );

  // Calculate page turn styles
  const leftPageStyle = {
    transform: [
      { perspective: 1000 },
      {
        rotateY: pageTurn.interpolate({
          inputRange: [0, 100],
          outputRange: ['0deg', '-180deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
    zIndex: pageTurn.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const rightPageStyle = {
    transform: [
      { perspective: 1000 },
      {
        rotateY: pageTurn.interpolate({
          inputRange: [-100, 0],
          outputRange: ['180deg', '0deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
    zIndex: pageTurn.interpolate({
      inputRange: [-1, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{book.title}</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Dropdown menu */}
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              setShowChapters(!showChapters);
            }}
          >
            <Ionicons name="list-outline" size={20} color="#333" />
            <Text style={styles.menuItemText}>الفصول</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={shareBook}
          >
            <Ionicons name="share-outline" size={20} color="#333" />
            <Text style={styles.menuItemText}>مشاركة</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={navigateToExport}
          >
            <Ionicons name="document-outline" size={20} color="#333" />
            <Text style={styles.menuItemText}>تصدير كـ PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setShowMenu(false);
              navigation.navigate('NewEntry', { bookId });
            }}
          >
            <Ionicons name="add-outline" size={20} color="#333" />
            <Text style={styles.menuItemText}>إضافة صفحة</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={manageChapters}
          >
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.menuItemText}>إدارة الفصول</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Chapters sidebar */}
      {showChapters && (
        <View style={styles.chaptersSidebar}>
          <View style={styles.chaptersHeader}>
            <Text style={styles.chaptersTitle}>الفصول</Text>
            <TouchableOpacity onPress={() => setShowChapters(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.chaptersList}>
            <TouchableOpacity 
              style={[
                styles.chapterItem, 
                currentPage === -1 && styles.activeChapterItem
              ]}
              onPress={() => {
                setCurrentPage(-1);
                setShowChapters(false);
              }}
            >
              <Text style={styles.chapterItemText}>الغلاف</Text>
            </TouchableOpacity>
            {book.chapters.map((chapter, chapterIndex) => (
              <View key={chapter.id}>
                <TouchableOpacity 
                  style={styles.chapterItem}
                  onPress={() => {
                    // Find the index of the first page in this chapter within allPages
                    const firstPageIndex = allPages.findIndex(
                      page => page.chapterTitle === chapter.title
                    );
                    if (firstPageIndex !== -1) {
                      setCurrentPage(firstPageIndex);
                      setShowChapters(false);
                    }
                  }}
                >
                  <Text style={styles.chapterItemText}>{chapter.title}</Text>
                </TouchableOpacity>
                {chapter.pages.map((page, pageIndex) => {
                  // Find the index of this page in allPages
                  const pageGlobalIndex = allPages.findIndex(p => p.id === page.id);
                  return (
                    <TouchableOpacity 
                      key={page.id}
                      style={[
                        styles.pageItem, 
                        currentPage === pageGlobalIndex && styles.activePageItem
                      ]}
                      onPress={() => {
                        setCurrentPage(pageGlobalIndex);
                        setShowChapters(false);
                      }}
                    >
                      <Text style={styles.pageItemText}>{page.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Book view */}
      <View 
        style={styles.bookContainer}
        {...panResponder.panHandlers}
      >
        {currentPage === -1 ? (
          renderCover()
        ) : (
          renderPage(allPages[currentPage], currentPage)
        )}
      </View>

      {/* Navigation controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, currentPage <= -1 && styles.disabledButton]}
          onPress={() => currentPage > -1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage <= -1}
        >
          <Ionicons name="chevron-back" size={24} color={currentPage <= -1 ? "#ccc" : "#333"} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chaptersButton}
          onPress={() => setShowChapters(!showChapters)}
        >
          <Text style={styles.pageIndicator}>
            {currentPage === -1 ? 'الغلاف' : `${currentPage + 1} / ${allPages.length}`}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, currentPage >= allPages.length - 1 && styles.disabledButton]}
          onPress={() => currentPage < allPages.length - 1 && setCurrentPage(currentPage + 1)}
          disabled={currentPage >= allPages.length - 1}
        >
          <Ionicons name="chevron-forward" size={24} color={currentPage >= allPages.length - 1 ? "#ccc" : "#333"} />
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        اسحب لليمين أو لليسار لتقليب الصفحات
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 5,
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  chaptersSidebar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  chaptersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chaptersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chaptersList: {
    flex: 1,
  },
  chapterItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  activeChapterItem: {
    backgroundColor: '#e6f7ff',
  },
  chapterItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  pageItem: {
    padding: 12,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activePageItem: {
    backgroundColor: '#e6f7ff',
  },
  pageItemText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  page: {
    width: width - 40,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverContent: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  coverIcon: {
    marginBottom: 20,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  coverAuthor: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  coverChapters: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  pageContent: {
    flex: 1,
    padding: 20,
  },
  chapterIndicator: {
    marginBottom: 10,
  },
  chapterTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 5,
  },
  pageDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
    textAlign: 'right',
  },
  pageImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 15,
  },
  contentScrollView: {
    flex: 1,
  },
  pageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'right',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 12,
    color: '#999',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#f9f9f9',
  },
  chaptersButton: {
    padding: 10,
  },
  pageIndicator: {
    fontSize: 16,
    color: '#666',
  },
  instructions: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    paddingVertical: 10,
  },
});