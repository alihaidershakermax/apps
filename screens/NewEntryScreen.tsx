import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

interface Chapter {
  id: string;
  title: string;
}

interface Book {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface FontSizeOption {
  id: 'small' | 'medium' | 'large' | 'xlarge';
  name: string;
  size: number;
}

interface AlignmentOption {
  id: 'right' | 'center' | 'left' | 'justify';
  name: string;
  icon: string; // Changed from MaterialIconName to string
}

// Sample books for dropdown
const books: Book[] = [
  { id: '1', title: 'رحلة الحياة', chapters: [
    { id: 'ch1', title: 'الفصل الأول: البداية' },
    { id: 'ch2', title: 'الفصل الثاني: المواجهة' },
  ]},
  { id: '2', title: 'ذكريات الطفولة', chapters: [
    { id: 'ch1', title: 'الفصل الأول: سنوات الطفولة المبكرة' },
  ]},
  { id: '3', title: 'أيام الحرب', chapters: [
    { id: 'ch1', title: 'الفصل الأول: بداية الحصار' },
  ]},
];

type NewEntryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewEntry'>;
type NewEntryScreenRouteProp = RouteProp<RootStackParamList, 'NewEntry'>;

export default function NewEntryScreen() {
  const navigation = useNavigation<NewEntryScreenNavigationProp>();
  const route = useRoute<NewEntryScreenRouteProp>();
  const { bookId } = route.params;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book>(books.find(book => book.id === bookId) || books[0]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(selectedBook.chapters[0]);
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  const [showChapterDropdown, setShowChapterDropdown] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [fontSize, setFontSize] = useState<FontSizeOption['id']>('medium');
  const [alignment, setAlignment] = useState<AlignmentOption['id']>('right');
  const [showFormatting, setShowFormatting] = useState(false);

  // Get current date in Arabic format
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString('ar-EG', options);
  };

  // Function to generate image based on entry content
  const generateImage = async () => {
    if (!content || content.length < 10) {
      toast.error('يرجى كتابة محتوى كافٍ للصفحة أولاً');
      return;
    }

    setIsGeneratingImage(true);
    
    try {
      // Generate a prompt based on the content
      const prompt = `${title || 'صفحة من كتاب'}: ${content.substring(0, 100)}`;
      
      // Call the image generation API
      const newImageUrl = `https://api.a0.dev/assets/image?text=${encodeURIComponent(prompt)}&aspect=16:9`;
      setImageUrl(newImageUrl);
      toast.success('تم إنشاء الصورة بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء الصورة');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Function to save the entry
  const savePage = () => {
    if (!title.trim()) {
      toast.error('يرجى إدخال عنوان للصفحة');
      return;
    }

    if (!content.trim()) {
      toast.error('يرجى كتابة محتوى الصفحة');
      return;
    }

    // Here you would save the entry to your storage
    // For now, we'll just show a success message and navigate back
    toast.success('تم حفظ الصفحة بنجاح');
    navigation.goBack();
  };

  // Font size options
  const fontSizeOptions: FontSizeOption[] = [
    { id: 'small', name: 'صغير', size: 14 },
    { id: 'medium', name: 'متوسط', size: 16 },
    { id: 'large', name: 'كبير', size: 18 },
    { id: 'xlarge', name: 'كبير جداً', size: 20 },
  ];

  // Alignment options
  const alignmentOptions: AlignmentOption[] = [
    { id: 'right', name: 'يمين', icon: 'format-align-right' },
    { id: 'center', name: 'وسط', icon: 'format-align-center' },
    { id: 'left', name: 'يسار', icon: 'format-align-left' },
    { id: 'justify', name: 'ضبط', icon: 'format-align-justify' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>صفحة جديدة</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={savePage}
        >
          <Text style={styles.saveButtonText}>حفظ</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Date display */}
        <Text style={styles.dateText}>{getCurrentDate()}</Text>

        {/* Book selection */}
        <View style={styles.bookSelector}>
          <Text style={styles.sectionLabel}>الكتاب:</Text>
          <TouchableOpacity 
            style={styles.bookDropdown}
            onPress={() => {
              setShowBookDropdown(!showBookDropdown);
              setShowChapterDropdown(false);
            }}
          >
            <Text style={styles.bookDropdownText}>{selectedBook.title}</Text>
            <Ionicons 
              name={showBookDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showBookDropdown && (
            <View style={styles.dropdownMenu}>
              {books.map(book => (
                <TouchableOpacity 
                  key={book.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedBook(book);
                    setSelectedChapter(book.chapters[0]);
                    setShowBookDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{book.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Chapter selection */}
        <View style={styles.bookSelector}>
          <Text style={styles.sectionLabel}>الفصل:</Text>
          <TouchableOpacity 
            style={styles.bookDropdown}
            onPress={() => {
              setShowChapterDropdown(!showChapterDropdown);
              setShowBookDropdown(false);
            }}
          >
            <Text style={styles.bookDropdownText}>{selectedChapter.title}</Text>
            <Ionicons 
              name={showChapterDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showChapterDropdown && (
            <View style={styles.dropdownMenu}>
              {selectedBook.chapters.map(chapter => (
                <TouchableOpacity 
                  key={chapter.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedChapter(chapter);
                    setShowChapterDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{chapter.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Title input */}
        <TextInput
          style={styles.titleInput}
          placeholder="عنوان الصفحة..."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          textAlign="right"
        />

        {/* Formatting options */}
        <View style={styles.formattingContainer}>
          <TouchableOpacity 
            style={styles.formattingButton}
            onPress={() => setShowFormatting(!showFormatting)}
          >
            <Ionicons name="format-text" size={20} color="#3498db" />
            <Text style={styles.formattingButtonText}>تنسيق النص</Text>
            <Ionicons 
              name={showFormatting ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#3498db" 
            />
          </TouchableOpacity>

          {showFormatting && (
            <View style={styles.formattingOptions}>
              <View style={styles.formattingSection}>
                <Text style={styles.formattingLabel}>حجم الخط:</Text>
                <View style={styles.fontSizeOptions}>
                  {fontSizeOptions.map(option => (
                    <TouchableOpacity 
                      key={option.id}
                      style={[
                        styles.fontSizeOption,
                        fontSize === option.id && styles.selectedFontSizeOption
                      ]}
                      onPress={() => setFontSize(option.id)}
                    >
                      <Text style={[
                        styles.fontSizeText,
                        { fontSize: option.size },
                        fontSize === option.id && styles.selectedOptionText
                      ]}>
                        أ
                      </Text>
                      <Text style={[
                        styles.fontSizeName,
                        fontSize === option.id && styles.selectedOptionText
                      ]}>
                        {option.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formattingSection}>
                <Text style={styles.formattingLabel}>محاذاة:</Text>
                <View style={styles.alignmentOptions}>
                  {alignmentOptions.map(option => (
                    <TouchableOpacity 
                      key={option.id}
                      style={[
                        styles.alignmentOption,
                        alignment === option.id && styles.selectedAlignmentOption
                      ]}
                      onPress={() => setAlignment(option.id)}
                    >
                      <Ionicons 
                        name={option.icon} 
                        size={20} 
                        color={alignment === option.id ? '#fff' : '#333'} 
                      />
                      <Text style={[
                        styles.alignmentName,
                        alignment === option.id && { color: '#fff' }
                      ]}>
                        {option.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Content input */}
        <TextInput
          style={[
            styles.contentInput,
            { 
              fontSize: fontSizeOptions.find(option => option.id === fontSize)?.size,
              textAlign: alignment === 'left' ? 'left' : alignment === 'center' ? 'center' : alignment === 'justify' ? 'justify' : 'right'
            }
          ]}
          placeholder="اكتب محتوى الصفحة هنا..."
          placeholderTextColor="#999"
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />

        {/* Image section */}
        <View style={styles.imageSection}>
          <Text style={styles.sectionLabel}>الصورة:</Text>
          <View style={styles.imageOptions}>
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={() => toast.info('ميزة التقاط صورة قيد التطوير')}
            >
              <Ionicons name="camera-outline" size={24} color="#3498db" />
              <Text style={styles.imageOptionText}>التقاط صورة</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={() => toast.info('ميزة اختيار صورة قيد التطوير')}
            >
              <Ionicons name="image-outline" size={24} color="#3498db" />
              <Text style={styles.imageOptionText}>اختيار صورة</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imageOption}
              onPress={generateImage}
              disabled={isGeneratingImage}
            >
              <Ionicons name="sparkles-outline" size={24} color="#3498db" />
              <Text style={styles.imageOptionText}>
                {isGeneratingImage ? 'جاري الإنشاء...' : 'إنشاء صورة'}
              </Text>
            </TouchableOpacity>
          </View>

          {imageUrl && (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: imageUrl }} 
                style={styles.imagePreview} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setImageUrl(null)}
              >
                <Ionicons name="close-circle" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Page position */}
        <View style={styles.pagePositionSection}>
          <Text style={styles.sectionLabel}>موضع الصفحة:</Text>
          <View style={styles.pagePositionOptions}>
            <TouchableOpacity style={[styles.pagePositionOption, styles.selectedPagePositionOption]}>
              <Ionicons name="page-last" size={24} color="#3498db" />
              <Text style={styles.pagePositionText}>إضافة في نهاية الفصل</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pagePositionOption}>
              <Ionicons name="page-first" size={24} color="#666" />
              <Text style={styles.pagePositionText}>إضافة في بداية الفصل</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alignmentName: {
    color: '#333',
    fontSize: 12,
    marginLeft: 5,
  },
  alignmentOption: {
    alignItems: 'center',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 8,
  },
  alignmentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  bookDropdown: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  bookDropdownText: {
    color: '#333',
    fontSize: 16,
  },
  bookSelector: {
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  contentInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    color: '#333',
    height: 200,
    lineHeight: 24,
    marginBottom: 15,
    padding: 12,
  },
  dateText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'right',
  },
  dropdownItem: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 12,
  },
  dropdownItemText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'right',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    elevation: 3,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  fontSizeName: {
    color: '#666',
    fontSize: 12,
  },
  fontSizeOption: {
    alignItems: 'center',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
    padding: 8,
  },
  fontSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontSizeText: {
    color: '#333',
    marginBottom: 5,
  },
  formattingButton: {
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderColor: '#bde0ff',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  formattingButtonText: {
    color: '#3498db',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'right',
  },
  formattingContainer: {
    marginBottom: 15,
  },
  formattingLabel: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  formattingOptions: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  formattingSection: {
    marginBottom: 15,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageOption: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: '30%',
  },
  imageOptionText: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  imagePreview: {
    borderRadius: 5,
    height: 200,
    width: '100%',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  imageSection: {
    marginBottom: 20,
  },
  pagePositionOption: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 12,
  },
  pagePositionOptions: {
    flexDirection: 'column',
  },
  pagePositionSection: {
    marginBottom: 20,
  },
  pagePositionText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 10,
  },
  removeImageButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  selectedAlignmentOption: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  selectedFontSizeOption: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  selectedOptionText: {
    color: '#fff',
  },
  selectedPagePositionOption: {
    backgroundColor: '#f0f8ff',
    borderColor: '#3498db',
  },
  titleInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    color: '#333',
    fontSize: 18,
    marginBottom: 15,
    padding: 12,
  },
});