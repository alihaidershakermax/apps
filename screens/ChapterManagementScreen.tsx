import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Book, Chapter } from '../types';
import { bookData } from '../data/books';
import { toast } from 'sonner-native';

type ChapterManagementScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChapterManagement'>;
type ChapterManagementScreenRouteProp = RouteProp<RootStackParamList, 'ChapterManagement'>;

export default function ChapterManagementScreen() {
  const navigation = useNavigation<ChapterManagementScreenNavigationProp>();
  const route = useRoute<ChapterManagementScreenRouteProp>();
  const { bookId } = route.params;
  
  const book = bookData[bookId] as Book;
  const [chapters, setChapters] = useState<Chapter[]>(book.chapters);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState<string>('');

  // Function to add a new chapter
  const addChapter = () => {
    if (!newChapterTitle.trim()) {
      toast.error('يرجى إدخال عنوان للفصل');
      return;
    }

    const newChapter: Chapter = {
      id: `ch${chapters.length + 1}`,
      title: newChapterTitle.trim(),
      pages: []
    };

    setChapters([...chapters, newChapter]);
    setNewChapterTitle('');
    toast.success('تم إضافة الفصل بنجاح');
  };

  // Function to update chapter title
  const updateChapterTitle = (chapterId: string, newTitle: string) => {
    if (!newTitle.trim()) {
      toast.error('يرجى إدخال عنوان للفصل');
      return;
    }

    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, title: newTitle.trim() }
        : chapter
    ));
    setEditingChapter(null);
    toast.success('تم تحديث عنوان الفصل');
  };

  // Function to delete chapter
  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    toast.success('تم حذف الفصل');
  };

  // Function to move chapter up
  const moveChapterUp = (index: number) => {
    if (index > 0) {
      const newChapters = [...chapters];
      [newChapters[index], newChapters[index - 1]] = [newChapters[index - 1], newChapters[index]];
      setChapters(newChapters);
    }
  };

  // Function to move chapter down
  const moveChapterDown = (index: number) => {
    if (index < chapters.length - 1) {
      const newChapters = [...chapters];
      [newChapters[index], newChapters[index + 1]] = [newChapters[index + 1], newChapters[index]];
      setChapters(newChapters);
    }
  };

  // Render chapter item
  const renderChapterItem = ({ item, index }: { item: Chapter; index: number }) => (
    <View key={item.id} style={styles.chapterItem}>
      {editingChapter === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={item.title}
            onChangeText={(text) => {
              setChapters(chapters.map(ch => 
                ch.id === item.id ? { ...ch, title: text } : ch
              ));
            }}
            placeholder="عنوان الفصل..."
            placeholderTextColor="#999"
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.editButton, styles.saveButton]}
              onPress={() => updateChapterTitle(item.id, item.title)}
            >
              <Ionicons name="checkmark" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, styles.cancelButton]}
              onPress={() => setEditingChapter(null)}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.chapterContent}>
          <View style={styles.chapterInfo}>
            <Text style={styles.chapterTitle}>{item.title}</Text>
            <Text style={styles.pageCount}>{item.pages.length} صفحة</Text>
          </View>
          <View style={styles.chapterActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setEditingChapter(item.id)}
            >
              <Ionicons name="pencil" size={20} color="#3498db" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => deleteChapter(item.id)}
            >
              <Ionicons name="trash" size={20} color="#e74c3c" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, index === 0 && styles.disabledButton]}
              onPress={() => moveChapterUp(index)}
              disabled={index === 0}
            >
              <Ionicons name="arrow-up" size={20} color={index === 0 ? "#ccc" : "#666"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, index === chapters.length - 1 && styles.disabledButton]}
              onPress={() => moveChapterDown(index)}
              disabled={index === chapters.length - 1}
            >
              <Ionicons name="arrow-down" size={20} color={index === chapters.length - 1 ? "#ccc" : "#666"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
        <Text style={styles.headerTitle}>إدارة الفصول</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Add new chapter */}
      <View style={styles.addChapterContainer}>
        <TextInput
          style={styles.input}
          value={newChapterTitle}
          onChangeText={setNewChapterTitle}
          placeholder="عنوان الفصل الجديد..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addChapter}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Chapters list */}
      <ScrollView style={styles.chaptersList}>
        {chapters.map((chapter, index) => renderChapterItem({ item: chapter, index }))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginLeft: 10,
    padding: 5,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  addChapterContainer: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  chapterActions: {
    flexDirection: 'row',
  },
  chapterContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterItem: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 15,
  },
  chapterTitle: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
  chaptersList: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  editActions: {
    flexDirection: 'row',
  },
  editButton: {
    alignItems: 'center',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    marginLeft: 5,
    width: 40,
  },
  editContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  editInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingHorizontal: 15,
    textAlign: 'right',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingHorizontal: 15,
    textAlign: 'right',
  },
  pageCount: {
    color: '#666',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
});