/// <reference types="expo" />

declare module 'sonner-native' {
  interface ToastOptions {
    duration?: number;
    position?: 'top' | 'bottom';
    style?: Record<string, string | number>;
  }

  interface ToastMethods {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
  }

  export const toast: ToastMethods;
} 