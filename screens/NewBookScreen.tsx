import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MaterialIconName } from '../types';

// Get screen dimensions
const { width } = Dimensions.get('window');

interface BookStyle {
  id: string;
  name: string;
  color: string;
  icon: MaterialIconName;
}

interface BookColor {
  id: string;
  name: string;
  color: string;
}

interface PaperType {
  id: string;
  name: string;
  color: string;
}

interface FontType {
  id: string;
  name: string;
  fontFamily: string;
}

// Book styles
const bookStyles: BookStyle[] = [
  { id: 'classic', name: 'كلاسيكي', color: '#8e44ad', icon: 'book' },
  { id: 'vintage', name: 'قديم', color: '#d35400', icon: 'book-open-page-variant' },
  { id: 'military', name: 'عسكري', color: '#27ae60', icon: 'shield' },
  { id: 'modern', name: 'عصري', color: '#3498db', icon: 'book-open-variant' },
  { id: 'feminine', name: 'نسائي', color: '#e84393', icon: 'flower' },
  { id: 'artistic', name: 'فني', color: '#f39c12', icon: 'palette' },
];

// Book colors
const bookColors: BookColor[] = [
  { id: '1', name: 'أزرق', color: '#3498db' },
  { id: '2', name: 'أحمر', color: '#e74c3c' },
  { id: '3', name: 'أخضر', color: '#2ecc71' },
  { id: '4', name: 'أصفر', color: '#f1c40f' },
  { id: '5', name: 'بنفسجي', color: '#9b59b6' },
  { id: '6', name: 'برتقالي', color: '#f39c12' },
  { id: '7', name: 'أسود', color: '#34495e' },
  { id: '8', name: 'وردي', color: '#e84393' },
  { id: '9', name: 'أزرق داكن', color: '#2c3e50' },
];

// Paper types
const paperTypes: PaperType[] = [
  { id: 'white', name: 'أبيض', color: '#ffffff' },
  { id: 'ivory', name: 'عاجي', color: '#fffff0' },
  { id: 'cream', name: 'كريمي', color: '#faf0e6' },
  { id: 'gray', name: 'رمادي فاتح', color: '#f5f5f5' },
  { id: 'dark', name: 'داكن', color: '#333333' },
];

// Font types
const fontTypes: FontType[] = [
  { id: 'traditional', name: 'تقليدي', fontFamily: 'serif' },
  { id: 'modern', name: 'حديث', fontFamily: 'sans-serif' },
  { id: 'handwritten', name: 'خط يدوي', fontFamily: 'cursive' },
  { id: 'elegant', name: 'أنيق', fontFamily: 'serif' },
  { id: 'simple', name: 'بسيط', fontFamily: 'sans-serif' },
];

type NewBookScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewBook'>;

export default function NewBookScreen() {
  const navigation = useNavigation<NewBookScreenNavigationProp>();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<BookStyle>(bookStyles[0]);
  const [selectedColor, setSelectedColor] = useState<BookColor>(bookColors[0]);
  const [selectedPaper, setSelectedPaper] = useState<PaperType>(paperTypes[0]);
  const [selectedFont, setSelectedFont] = useState<FontType>(fontTypes[0]);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);

  // Function to generate cover image
  const generateCoverImage = async () => {
    if (!title) {
      toast.error('يرجى إدخال عنوان الكتاب أولاً');
      return;
    }

    setIsGeneratingCover(true);
    
    try {
      // Generate a prompt based on the book title and style
      const prompt = `${title} - ${selectedStyle.name} book cover`;
      
      // Call the image generation API
      const imageUrl = `https://api.a0.dev/assets/image?text=${encodeURIComponent(prompt)}&aspect=2:3`;
      setCoverImage(imageUrl);
      toast.success('تم إنشاء غلاف الكتاب بنجاح');
    } catch {
      toast.error('حدث خطأ أثناء إنشاء غلاف الكتاب');
    } finally {
      setIsGeneratingCover(false);
    }
  };

  // Function to create a new book
  const createBook = () => {
    if (!title.trim()) {
      toast.error('يرجى إدخال عنوان للكتاب');
      return;
    }

    // Here you would save the new book to your storage
    // For now, we'll just show a success message and navigate back
    toast.success('تم إنشاء الكتاب بنجاح');
    navigation.goBack();
  };

  // Function to render style item
  const renderStyleItem = ({ item }: { item: BookStyle }) => (
    <TouchableOpacity 
      style={[
        styles.styleItem,
        selectedStyle.id === item.id && styles.selectedStyleItem
      ]}
      onPress={() => setSelectedStyle(item)}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
      <Text style={styles.styleName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to render color item
  const renderColorItem = ({ item }: { item: BookColor }) => (
    <TouchableOpacity 
      style={[
        styles.colorItem,
        selectedColor.id === item.id && styles.selectedColorItem
      ]}
      onPress={() => setSelectedColor(item)}
    >
      <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
      <Text style={styles.colorName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to render paper type item
  const renderPaperItem = ({ item }: { item: PaperType }) => (
    <TouchableOpacity 
      style={[
        styles.paperItem,
        selectedPaper.id === item.id && styles.selectedPaperItem,
        { backgroundColor: item.color }
      ]}
      onPress={() => setSelectedPaper(item)}
    >
      <Text style={[
        styles.paperName, 
        item.id === 'dark' ? { color: '#fff' } : { color: '#333' }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Function to render font type item
  const renderFontItem = ({ item }: { item: FontType }) => (
    <TouchableOpacity 
      style={[
        styles.fontItem,
        selectedFont.id === item.id && styles.selectedFontItem
      ]}
      onPress={() => setSelectedFont(item)}
    >
      <Text style={[styles.fontName, { fontFamily: item.fontFamily }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>كتاب جديد</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={createBook}
        >
          <Text style={styles.createButtonText}>إنشاء</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Book title */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>عنوان الكتاب:</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="أدخل عنوان الكتاب..."
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            textAlign="right"
          />
        </View>

        {/* Author name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>اسم المؤلف:</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="أدخل اسم المؤلف..."
            placeholderTextColor="#999"
            value={author}
            onChangeText={setAuthor}
            textAlign="right"
          />
        </View>

        {/* Book style */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>نمط الكتاب:</Text>
          <FlatList
            data={bookStyles}
            renderItem={renderStyleItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stylesList}
          />
        </View>

        {/* Book color */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>لون الغلاف:</Text>
          <FlatList
            data={bookColors}
            renderItem={renderColorItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.colorsList}
          />
        </View>

        {/* Paper type */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>نوع الورق:</Text>
          <FlatList
            data={paperTypes}
            renderItem={renderPaperItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.papersList}
          />
        </View>

        {/* Font type */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>نوع الخط:</Text>
          <FlatList
            data={fontTypes}
            renderItem={renderFontItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fontsList}
          />
        </View>

        {/* Cover image */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>غلاف الكتاب:</Text>
          <View style={styles.coverOptions}>
            <TouchableOpacity 
              style={styles.coverOption}
              onPress={() => toast.info('ميزة اختيار صورة قيد التطوير')}
            >
              <Ionicons name="image-outline" size={24} color="#3498db" />
              <Text style={styles.coverOptionText}>اختيار صورة</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.coverOption}
              onPress={generateCoverImage}
              disabled={isGeneratingCover}
            >
              <Ionicons name="sparkles-outline" size={24} color="#3498db" />
              <Text style={styles.coverOptionText}>
                {isGeneratingCover ? 'جاري الإنشاء...' : 'إنشاء غلاف تلقائي'}
              </Text>
            </TouchableOpacity>
          </View>

          {coverImage && (
            <View style={styles.coverPreviewContainer}>
              <Image 
                source={{ uri: coverImage }} 
                style={styles.coverPreview} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removeCoverButton}
                onPress={() => setCoverImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Book preview */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>معاينة:</Text>
          <View style={styles.previewContainer}>
            <View 
              style={[
                styles.bookPreview, 
                { backgroundColor: coverImage ? 'transparent' : selectedColor.color }
              ]}
            >
              {coverImage ? (
                <Image 
                  source={{ uri: coverImage }} 
                  style={styles.bookPreviewCover} 
                  resizeMode="cover"
                />
              ) : (
                <>
                  <MaterialCommunityIcons 
                    name={selectedStyle.icon} 
                    size={40} 
                    color="#fff" 
                    style={styles.bookPreviewIcon}
                  />
                  <Text style={[
                    styles.previewTitle,
                    { fontFamily: selectedFont.fontFamily }
                  ]}>
                    {title || 'عنوان الكتاب'}
                  </Text>
                  <Text style={styles.previewAuthor}>
                    {author || 'اسم المؤلف'}
                  </Text>
                </>
              )}
            </View>
            <View 
              style={[
                styles.bookPreviewPage, 
                { backgroundColor: selectedPaper.color }
              ]}
            >
              <Text style={[
                styles.previewPageText,
                { 
                  fontFamily: selectedFont.fontFamily,
                  color: selectedPaper.id === 'dark' ? '#fff' : '#333'
                }
              ]}>
                مرحباً بك في كتابك الجديد...
              </Text>
            </View>
          </View>
        </View>

        {/* Additional options */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>خيارات إضافية:</Text>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>إعدادات الخصوصية</Text>
            <Ionicons name="lock-closed-outline" size={24} color="#3498db" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>إضافة فصول تلقائية</Text>
            <Ionicons name="list-outline" size={24} color="#3498db" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>إعدادات المزامنة</Text>
            <Ionicons name="cloud-upload-outline" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
  },
  bookPreview: {
    alignItems: 'center',
    borderRadius: 5,
    elevation: 4,
    height: width * 0.6,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: width * 0.4,
    zIndex: 2,
  },
  bookPreviewCover: {
    borderRadius: 5,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bookPreviewIcon: {
    marginBottom: 10,
  },
  bookPreviewPage: {
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
    height: width * 0.6,
    justifyContent: 'center',
    marginLeft: -20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: width * 0.4,
    zIndex: 1,
  },
  colorCircle: {
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  colorItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 15,
    padding: 10,
    width: 60,
  },
  colorName: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  colorsList: {
    paddingVertical: 10,
  },
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  coverOption: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 15,
    width: '45%',
  },
  coverOptionText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  coverOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  coverPreview: {
    borderRadius: 10,
    height: width * 0.9,
    width: width * 0.6,
  },
  coverPreviewContainer: {
    alignItems: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  createButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fontItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginRight: 15,
    padding: 10,
    width: 100,
  },
  fontName: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  fontsList: {
    paddingVertical: 10,
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
  optionItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 15,
  },
  optionText: {
    color: '#333',
    fontSize: 16,
  },
  paperItem: {
    alignItems: 'center',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginRight: 15,
    padding: 10,
    width: 80,
  },
  paperName: {
    fontSize: 12,
    textAlign: 'center',
  },
  papersList: {
    paddingVertical: 10,
  },
  previewAuthor: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  previewPageText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'right',
  },
  previewTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  removeCoverButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  selectedColorItem: {
    backgroundColor: '#f0f8ff',
    borderColor: '#3498db',
  },
  selectedFontItem: {
    backgroundColor: '#f0f8ff',
    borderColor: '#3498db',
  },
  selectedPaperItem: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  selectedStyleItem: {
    backgroundColor: '#f0f8ff',
    borderColor: '#3498db',
  },
  styleItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 15,
    padding: 10,
    width: 80,
  },
  styleName: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  stylesList: {
    paddingVertical: 10,
  },
  titleInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    borderWidth: 1,
    color: '#333',
    fontSize: 18,
    padding: 12,
  },
});