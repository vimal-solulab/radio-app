import { GradientBackground } from '@/components/GradientBackground';
import { PlayerControls } from '@/components/PlayerControls';
import { colors } from '@/constants/colors';
import { mockStations, RadioStation } from '@/constants/radioData';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlayerScreen() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];
  const [currentStation, setCurrentStation] = useState<RadioStation>(mockStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    // Previous track logic
  };

  const handleNext = () => {
    // Next track logic
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleSleepTimer = () => {
    // Sleep timer logic
  };

  const handleFavorite = () => {
    // Favorite logic
  };

  const handleSettings = () => {
    // Settings logic
  };

  const handleMinimize = () => {
    // Minimize player logic
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.minimizeButton}
            onPress={handleMinimize}
          >
            <ChevronDown size={24} color={currentColors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Station Logo */}
        <View style={styles.logoContainer}>
          <View style={[
            styles.stationLogo,
            {
              backgroundColor: '#000',
              borderColor: currentColors.accent,
            }
          ]}>
            <Text style={styles.logoText}>{currentStation.name}</Text>
            <Text style={styles.logoSubtext}>1065</Text>
          </View>
        </View>

        {/* Station Info */}
        <View style={styles.stationInfo}>
          <Text style={[styles.stationName, { color: currentColors.text }]}>
            {currentStation.name}
          </Text>
          <Text style={[styles.stationDescription, { color: currentColors.textSecondary }]}>
            {currentStation.description}
          </Text>
        </View>

        {/* Player Controls */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          onSleepTimer={handleSleepTimer}
          onFavorite={handleFavorite}
          onSettings={handleSettings}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  minimizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  stationLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  logoSubtext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stationInfo: {
    alignItems: 'center',
    marginBottom: 60,
  },
  stationName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  stationDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
