import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pause, Play } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MiniPlayerProps {
  stationName: string;
  stationDescription: string;
  logo?: string;
  image?: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPress: () => void;
}

export function MiniPlayer({
  stationName,
  stationDescription,
  logo,
  image,
  isPlaying,
  onPlayPause,
  onPress
}: MiniPlayerProps) {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: currentColors.cardBackground,
          shadowColor: currentColors.shadow,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.logoContainer}>
        {image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.logo}
            resizeMode="cover"
          />
        ) : logo ? (
          <Image 
            source={{ uri: logo }} 
            style={styles.logo}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderLogo, { backgroundColor: currentColors.accent }]}>
            <Text style={styles.logoText}>{stationName.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.stationName, { color: '#000' }]} numberOfLines={1}>
          {stationName}
        </Text>
        <Text style={[styles.description, { color: '#666' }]} numberOfLines={1}>
          {stationDescription}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.playButton,
          {
            backgroundColor: currentColors.accent,
          }
        ]}
        onPress={onPlayPause}
      >
        {isPlaying ? (
          <Pause size={20} color="#fff" />
        ) : (
          <Play size={20} color="#fff" fill="#fff" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoContainer: {
    marginRight: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f2b96',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  stationName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 13,
    opacity: 0.8,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
