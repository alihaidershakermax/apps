export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
  };
  accent: {
    main: string;
    light: string;
    dark: string;
  };
  neutral: {
    white: string;
    black: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  background: {
    default: string;
    paper: string;
    inverse: string;
  };
  status: {
    error: string;
    warning: string;
    success: string;
    info: string;
  };
}

export interface ThemeFonts {
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  families: {
    default: string;
    arabic: string;
    decorative: string;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  isDark: boolean;
}

export type ThemeMode = 'light' | 'dark';
export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type FontFamily = 'default' | 'arabic' | 'decorative'; 