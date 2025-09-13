// Radio App Color Scheme - Dark Blue/Purple Gradient Theme
const accentColor = '#3f2b96'; // Deep purple with neon effect
const gradientStart = '#1a1a2e'; // Dark blue
const gradientEnd = '#16213e'; // Darker blue
const cardBackground = '#ffffff';
const textPrimary = '#ffffff';
const textSecondary = '#b8b8d1';

export const colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: accentColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: accentColor,
    // Radio app specific colors
    accent: accentColor,
    gradientStart: gradientStart,
    gradientEnd: gradientEnd,
    cardBackground: cardBackground,
    textSecondary: '#666',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: textPrimary,
    background: gradientStart,
    tint: accentColor,
    icon: textSecondary,
    tabIconDefault: textSecondary,
    tabIconSelected: accentColor,
    // Radio app specific colors
    accent: accentColor,
    gradientStart: gradientStart,
    gradientEnd: gradientEnd,
    cardBackground: cardBackground,
    textSecondary: textSecondary,
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};