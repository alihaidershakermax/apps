import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { DATE_FORMAT_OPTIONS } from '../types';

type EntryDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EntryDetail'>;
type EntryDetailScreenRouteProp = RouteProp<RootStackParamList, 'EntryDetail'>;

// Define mood styles
const moodStyles = {
  happy: { name: 'سعيد', color: '#2ecc71' },
  sad: { name: 'حزين', color: '#e74c3c' },
  angry: { name: 'غاضب', color: '#e67e22' },
  excited: { name: 'متحمس', color: '#f1c40f' },
  calm: { name: 'هادئ', color: '#3498db' },
  nostalgic: { name: 'حنين', color: '#9b59b6' },
} as const;

// Import the entries data
import { entriesData } from '../data/entries';

export default function EntryDetailScreen() {
  const navigation = useNavigation<EntryDetailScreenNavigationProp>();
  const route = useRoute<EntryDetailScreenRouteProp>();
  const { entryId } = route.params;
  
  const entry = entriesData[entryId];
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', DATE_FORMAT_OPTIONS);
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
        <Text style={styles.headerTitle}>{entry.title}</Text>
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Options menu */}
      {showOptions && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => {
              setShowOptions(false);
              // Add edit functionality
            }}
          >
            <Ionicons name="pencil" size={20} color="#333" />
            <Text style={styles.optionText}>تعديل</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => {
              setShowOptions(false);
              // Add share functionality
            }}
          >
            <Ionicons name="share" size={20} color="#333" />
            <Text style={styles.optionText}>مشاركة</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => {
              setShowOptions(false);
              // Add delete functionality
            }}
          >
            <Ionicons name="trash" size={20} color="#e74c3c" />
            <Text style={[styles.optionText, { color: '#e74c3c' }]}>حذف</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Entry header */}
        <View style={styles.entryHeader}>
          <Text style={styles.date}>{formatDate(entry.date)}</Text>
          <View style={styles.moodContainer}>
            <View style={[styles.moodIndicator, { backgroundColor: moodStyles[entry.mood as keyof typeof moodStyles].color }]} />
            <Text style={styles.moodText}>{moodStyles[entry.mood as keyof typeof moodStyles].name}</Text>
          </View>
        </View>

        {/* Entry image */}
        {entry.imageUrl && (
          <Image 
            source={{ uri: entry.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Entry content */}
        <Text style={styles.entryContent}>{entry.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  date: {
    color: '#666',
    fontSize: 16,
  },
  entryContent: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
  entryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  image: {
    borderRadius: 8,
    height: 200,
    marginBottom: 15,
    width: '100%',
  },
  moodContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  moodIndicator: {
    borderRadius: 5,
    height: 10,
    marginRight: 5,
    width: 10,
  },
  moodText: {
    color: '#666',
    fontSize: 14,
  },
  optionItem: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 12,
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 10,
  },
  optionsButton: {
    padding: 5,
  },
  optionsMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    position: 'absolute',
    right: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    top: 60,
    zIndex: 10,
  },
});