// Book related types
export interface Page {
  id: string;
  title: string;
  content?: string;
  date?: string;
  imageUrl?: string;
}

export interface Chapter {
  id: string;
  title: string;
  pages: Page[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  style: string;
  coverColor: string;
  coverImage?: string;
  dateCreated: string;
  chapters: Chapter[];
}

export interface BookData {
  [key: string]: Book;
}

// Icon types
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type IonIconName = keyof typeof Ionicons.glyphMap;
export type MaterialIconName = keyof typeof MaterialCommunityIcons.glyphMap;

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  NewEntry: { bookId: string };
  BookView: { bookId: string };
  EntryDetail: { entryId: string };
  NewBook: undefined;
  Settings: undefined;
  ChapterManagement: { bookId: string };
  BookExport: { bookId: string };
};

// Style types
export interface StyleOption {
  id: string;
  name: string;
  icon: MaterialIconName;
  color: string;
}

export interface StyleOptions {
  [key: string]: StyleOption;
}

// Format types for export
export interface ExportFormat {
  id: string;
  name: string;
  icon: IonIconName;
}

export interface ExportDestination {
  id: string;
  name: string;
  icon: IonIconName;
}

// Date format options
export const DATE_FORMAT_OPTIONS = {
  weekday: 'long' as const,
  year: 'numeric' as const,
  month: 'long' as const,
  day: 'numeric' as const,
} as const;

export type DateFormatOptions = typeof DATE_FORMAT_OPTIONS; 