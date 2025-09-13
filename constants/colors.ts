// Radio App Color Scheme - Dark Blue/Purple Gradient Theme
const accentColor = "#3f2b96"; // Deep purple with neon effect
const gradientStart = "#1a1a2e"; // Dark blue
const gradientEnd = "#16213e"; // Darker blue
const cardBackground = "#ffffff";
const textPrimary = "#ffffff";
const textSecondary = "#b8b8d1";

export const colors = {
  natural: {
    accent: "#3f2b96",
    gradientStart: "#1a1a2e",
    gradientEnd: "#16213e",
    cardBackground: "#ffffff",
    textPrimary: "#ffffff",
    textSecondary: "#b8b8d1",
  },

  light: {
    text: "#11181C",
    background: "#fff",
    tint: accentColor,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: accentColor,
    // Radio app specific colors
    accent: accentColor,
    gradientStart: gradientStart,
    gradientEnd: gradientEnd,
    cardBackground: cardBackground,
    textSecondary: "#666",
    shadow: "rgba(0, 0, 0, 0.1)",
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
    shadow: "rgba(0, 0, 0, 0.3)",
  },

  // Primary Royal Luxury palette
  primary: {
    navy: "#1A2B4C",
    darkNavy: "#0F1B2E",
    lightNavy: "#2C3E5C",
    gold: "#D4AF37",
    darkGold: "#B8941F",
    lightGold: "#E6C757",
    platinum: "#E5E4E2",
    red: "#d4af37", // Royal red for primary buttons
    blue: "#0F52BA", // Royal blue for secondary buttons
    header: "#0E2538", // New header color
  },
  // Secondary luxury colors
  secondary: {
    burgundy: "#800020",
    emerald: "#50C878",
    sapphire: "#0F52BA",
    pearl: "#F8F6F0",
    champagne: "#F7E7CE",
    bronze: "#CD7F32",
  },
  // Neutral luxury palette
  neutral: {
    white: "#FFFFFF",
    ivory: "#FFFFF0",
    cream: "#F5F5DC",
    lightGray: "#F8F9FA",
    gray: "#6C757D",
    charcoal: "#36454F",
    darkGray: "#495057",
    black: "#000000",
    obsidian: "#0B1426",
  },
  // Status colors with luxury touch
  status: {
    success: "#2E8B57", // Sea Green
    error: "#DC143C", // Crimson
    errorLight: "#FFE6E6", // Light red background
    warning: "#DAA520", // Goldenrod

    // Property Status Colors
    approved: "#10B981", // Emerald Green - Success/Approved
    rejected: "#EF4444", // Red - Error/Rejected
    pending: "#3B82F6", // Blue - Info/Pending
    draft: "#6B7280", // Gray - Draft
    resubmit: "#8B5CF6", // Purple - Special/Resubmit
  },
  // Background colors
  background: {
    main: "#f8f9fa",
    primary: "#FFFFFF",
    secondary: "#F8F9FA",
    tertiary: "#F5F5DC", // Cream
    card: "#FFFFFF",
    overlay: "rgba(26, 43, 76, 0.8)", // Navy overlay
    gradient: {
      primary: ["#1A2B4C", "#2C3E5C"],
      gold: ["#D4AF37", "#E6C757"],
      luxury: ["#0F1B2E", "#1A2B4C", "#D4AF37"],
    },
  },
  // Text colors
  text: {
    primary: "#1A2B4C",
    secondary: "#6C757D",
    tertiary: "#495057",
    inverse: "#FFFFFF",
    gold: "#D4AF37",
    navy: "#1A2B4C",
    muted: "#8E8E93",
  },
  // Border colors
  border: {
    light: "#E9ECEF",
    medium: "#DEE2E6",
    dark: "#ADB5BD",
    gold: "#D4AF37",
    navy: "#1A2B4C",
  },
  // Interactive states
  interactive: {
    hover: "rgba(212, 175, 55, 0.1)",
    pressed: "rgba(212, 175, 55, 0.2)",
    disabled: "#E9ECEF",
    focus: "rgba(212, 175, 55, 0.3)",
  },
};
