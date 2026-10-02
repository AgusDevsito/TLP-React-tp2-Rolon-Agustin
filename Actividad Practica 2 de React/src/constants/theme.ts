/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2D2D2D',
    background: '#FFFDF7',
    backgroundElement: '#FFF3E0',
    backgroundSelected: '#FFE0B2',
    textSecondary: '#5D4037',
    primary: '#F57C00',
    primaryDark: '#E65100',
    accent: '#388E3C',
    accentLight: '#66BB6A',
    buttonText: '#FFFFFF',
  },
  dark: {
    text: '#FAFAFA',
    background: '#1A1A1A',
    backgroundElement: '#2E2E2E',
    backgroundSelected: '#3E3E3E',
    textSecondary: '#BCAAA4',
    primary: '#FFB74D',
    primaryDark: '#FFA726',
    accent: '#66BB6A',
    accentLight: '#81C784',
    buttonText: '#1A1A1A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
