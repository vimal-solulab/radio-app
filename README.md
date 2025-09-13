# Radio Streaming App 📻

A modern React Native (Expo) radio streaming application with a beautiful dark blue/purple gradient theme and iOS-style design.

## Features

- **Home Screen**: Recent, Recommended, and Favorite radio stations with horizontal scrolling cards
- **Search Screen**: Search functionality with Top Stations, Discover, and Top 40 tabs
- **Player Screen**: Full-screen player with station logo, controls, and volume slider
- **Mini Player**: Sticky bottom player that persists across screens
- **Modern UI**: Dark blue/purple gradient background with white cards and rounded corners
- **Responsive Design**: Clean, minimal design with consistent spacing and shadows

## Design Theme

- **Background**: Dark blue to purple gradient (`#1a1a2e` → `#16213e`)
- **Accent Color**: Deep purple (`#3f2b96`) with neon effect
- **Cards**: White background with rounded corners and soft shadows
- **Typography**: Bold modern fonts with high contrast
- **Navigation**: Bottom tab navigation with 3 tabs (Home, Search, Player)

## Screens

### 1. Home Screen
- Top tabs: Recent, Recommended, Search, Top
- Horizontal scrolling station cards
- Favorite stations section
- Sticky mini-player at bottom

### 2. Search Screen
- Search bar with placeholder "Search station"
- Tabs: Top Stations, Discover, Top 40
- Vertical list of radio stations
- Station logo, name, frequency, and play button

### 3. Player Screen
- Large circular station logo in center
- Station name and description
- Music controls (Previous, Play/Pause, Next)
- Volume slider
- Bottom icons (Sleep timer, Favorite, Settings)

## Components

- **StationCard**: Reusable station card with different sizes (small, medium, large)
- **MiniPlayer**: Sticky bottom player component
- **PlayerControls**: Full-screen player controls
- **GradientBackground**: Dark gradient background wrapper

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open the app in:
   - iOS Simulator (press `i`)
   - Android Emulator (press `a`)
   - Expo Go app on your device (scan QR code)

## Project Structure

```
app/
├── (tabs)/
│   ├── index.tsx      # Home screen
│   ├── explore.tsx    # Search screen
│   ├── player.tsx     # Player screen
│   └── _layout.tsx    # Tab navigation
components/
├── StationCard.tsx    # Station card component
├── MiniPlayer.tsx     # Mini player component
├── PlayerControls.tsx # Player controls component
└── GradientBackground.tsx # Background wrapper
constants/
├── colors.ts          # Color scheme
├── radioData.ts       # Mock radio station data
└── theme.ts           # Theme configuration
```

## Technologies Used

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** for bottom tabs
- **Lucide React Native** for icons
- **Expo Router** for file-based routing

## Mock Data

The app includes mock radio station data with stations from various countries including Sri Lanka, UK, France, Germany, and Spain. You can easily replace this with real radio streaming data.

## Customization

- Update `constants/colors.ts` to change the color scheme
- Modify `store/radioData.ts` to add your own radio stations
- Customize components in the `components/` directory
- Adjust styling in each screen's StyleSheet

Enjoy your modern radio streaming app! 🎵