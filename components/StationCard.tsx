import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pause, Play } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StationCardProps {
  id: string;
  name: string;
  frequency: string;
  description: string;
  logo?: string;
  image?: string;
  isPlaying?: boolean;
  onPress?: () => void;
  onPlayPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function StationCard({
  id,
  name,
  frequency,
  description,
  logo,
  image,
  isPlaying = false,
  onPress,
  onPlayPress,
  size = 'medium'
}: StationCardProps) {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];

  const getCardStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallCard;
      case 'large':
        return styles.largeCard;
      default:
        return styles.mediumCard;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  const getGradientStyle = () => {
    // Different gradient colors for different stations
    const gradients = [
      ['#FF6B6B', '#4ECDC4'], // Red to teal
      ['#45B7D1', '#96CEB4'], // Blue to green
      ['#F093FB', '#F5576C'], // Pink to red
      ['#4FACFE', '#00F2FE'], // Blue to cyan
      ['#43E97B', '#38F9D7'], // Green to cyan
      ['#FA709A', '#FEE140'], // Pink to yellow
    ];
    
    const gradientIndex = parseInt(id) % gradients.length;
    return gradients[gradientIndex];
  };

  const [gradientStart, gradientEnd] = getGradientStyle();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        getCardStyle(),
        {
          backgroundColor: currentColors.cardBackground,
          shadowColor: currentColors.shadow,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Station Image/Logo */}
      <View style={[
        styles.logoContainer,
        {
          backgroundColor: gradientStart,
        }
      ]}>
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
          <View style={[styles.placeholderLogo, { backgroundColor: gradientEnd }]}>
            <Text style={styles.logoText}>{name.charAt(0)}</Text>
          </View>
        )}
        {/* Gradient overlay for better text readability */}
        <View style={[styles.gradientOverlay, { backgroundColor: gradientEnd }]} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.stationName, getTextStyle(), { color: '#000' }]}>
          {name}
        </Text>
        <Text style={[styles.frequency, { color: '#666' }]}>
          {frequency}
        </Text>
        {size !== 'small' && (
          <Text style={[styles.description, { color: '#888' }]} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.playButton,
          {
            backgroundColor: isPlaying ? currentColors.accent : 'rgba(63, 43, 150, 0.15)',
            shadowColor: isPlaying ? currentColors.accent : 'rgba(0, 0, 0, 0.1)',
          }
        ]}
        onPress={onPlayPress}
        activeOpacity={0.8}
      >
        {isPlaying ? (
          <Pause
            size={size === 'small' ? 14 : 18}
            color="#fff"
          />
        ) : (
          <Play
            size={size === 'small' ? 14 : 18}
            color={isPlaying ? '#fff' : currentColors.accent}
            fill={isPlaying ? '#fff' : 'none'}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 8,
    marginVertical: 6,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  smallCard: {
    width: 140,
    height: 90,
    padding: 14,
    borderRadius: 16,
  },
  mediumCard: {
    width: 220,
    height: 110,
    borderRadius: 20,
  },
  largeCard: {
    width: 300,
    height: 130,
    padding: 22,
    borderRadius: 24,
  },
  logoContainer: {
    marginRight: 16,
    position: 'relative',
    borderRadius: 28,
    overflow: 'hidden',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  placeholderLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    opacity: 0.3,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  stationName: {
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  smallText: {
    fontSize: 13,
  },
  mediumText: {
    fontSize: 17,
  },
  largeText: {
    fontSize: 19,
  },
  frequency: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
    opacity: 0.8,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
