import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Theme, ThemeMode, FontSize, FontFamily } from '../types/theme';
import { lightColors, darkColors } from './colors';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setFontSize: (size: FontSize) => void;
  setFontFamily: (family: FontFamily) => void;
}

const defaultTheme: Theme = {
  colors: lightColors,
  fonts: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    families: {
      default: 'System',
      arabic: 'Noto Sans Arabic',
      decorative: 'Tajawal',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  isDark: false,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  toggleTheme: () => {},
  setFontSize: () => {},
  setFontFamily: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = useCallback(() => {
    setTheme(prev => ({
      ...prev,
      colors: prev.isDark ? lightColors : darkColors,
      isDark: !prev.isDark,
    }));
  }, []);

  const setFontSize = useCallback((size: FontSize) => {
    setTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        currentSize: size,
      },
    }));
  }, []);

  const setFontFamily = useCallback((family: FontFamily) => {
    setTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        currentFamily: family,
      },
    }));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setFontSize,
      setFontFamily,
    }),
    [theme, toggleTheme, setFontSize, setFontFamily]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}; 