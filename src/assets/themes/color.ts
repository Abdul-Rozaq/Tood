export const lightColors = {
  light: '#FFFFFF',
  primary: '#007AFF',
  background: '#F5F7FA',
  card: '#F2F2F7',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  gray: '#8E8E93',
  yellow: '#FFCC00',
} as const;

export const darkColors = {
  primary: '#0A84FF',
  background: '#000000',
  card: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  error: '#FF453A',
  success: '#32D74B',
  warning: '#FF9F0A',
  gray: '#8E8E93',
  yellow: '#FFCC00',
  light: '#000000',
} as const;

export type ThemeColors = typeof lightColors | typeof darkColors;
