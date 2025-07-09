import type { ThemeColors } from '../types/theme';

export const lightColors: ThemeColors = {
  primary: {
    main: '#3498db',
    dark: '#2980b9',
    light: '#f0f8ff',
  },
  secondary: {
    main: '#2ecc71',
    dark: '#27ae60',
    light: '#e8f5e9',
  },
  accent: {
    main: '#e74c3c',
    dark: '#c0392b',
    light: '#fbe9e7',
  },
  neutral: {
    white: '#fff',
    black: '#000',
    gray100: '#f9f9f9',
    gray200: '#f0f0f0',
    gray300: '#ddd',
    gray400: '#999',
    gray500: '#666',
  },
  text: {
    primary: '#000',
    secondary: '#666',
    disabled: '#999',
    inverse: '#fff',
  },
  background: {
    default: '#fff',
    paper: '#f9f9f9',
    inverse: '#121212',
  },
  status: {
    error: '#e74c3c',
    warning: '#f1c40f',
    success: '#2ecc71',
    info: '#3498db',
  },
};

export const darkColors: ThemeColors = {
  primary: {
    main: '#3498db',
    dark: '#2980b9',
    light: '#f0f8ff',
  },
  secondary: {
    main: '#2ecc71',
    dark: '#27ae60',
    light: '#e8f5e9',
  },
  accent: {
    main: '#e74c3c',
    dark: '#c0392b',
    light: '#fbe9e7',
  },
  neutral: {
    white: '#fff',
    black: '#000',
    gray100: '#1e1e1e',
    gray200: '#2a2a2a',
    gray300: '#333',
    gray400: '#666',
    gray500: '#999',
  },
  text: {
    primary: '#fff',
    secondary: '#aaa',
    disabled: '#666',
    inverse: '#000',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
    inverse: '#fff',
  },
  status: {
    error: '#e74c3c',
    warning: '#f1c40f',
    success: '#2ecc71',
    info: '#3498db',
  },
};

// Book style colors - these will be used in the StyleOptions type
export const bookColors = {
  classic: '#8B4513',
  vintage: '#DAA520',
  military: '#556B2F',
  modern: '#2C3E50',
  feminine: '#FF69B4',
  artistic: '#9B59B6',
} as const;

// Social media colors
export const socialColors = {
  telegram: '#0088cc',
  twitter: '#1da1f2',
  instagram: '#e1306c',
} as const; 