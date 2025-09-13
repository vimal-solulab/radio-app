import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pause, Play } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RecentCardProps {
  id: string;
  name: string;
  frequency: string;
  description: string;
  logo?: string;
  image?: string;
  isPlaying?: boolean;
  onPress?: () => void;
  onPlayPress?: () => void;
}

export function RecentCard({
  id,
  name,
  frequency,
  description,
  logo,
  image,
  isPlaying = false,
  onPress,
  onPlayPress,
}: RecentCardProps) {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];

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
        {
          backgroundColor: currentColors.cardBackground,
          shadowColor: currentColors.shadow,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Square Image at Top */}
      <View style={[
        styles.imageContainer,
        {
          backgroundColor: gradientStart,
        }
      ]}>
        {image ? (
          <Image 
            source={{ uri: image }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : logo ? (
          <Image 
            source={{ uri: logo }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: gradientEnd }]}>
            <Text style={styles.imageText}>{name.charAt(0)}</Text>
          </View>
        )}
        {/* Gradient overlay for better text readability */}
        <View style={[styles.gradientOverlay, { backgroundColor: gradientEnd }]} />
      </View>
      
      {/* Content Below Image */}
      <View style={styles.content}>
        <Text style={[styles.stationName, { color: currentColors.text }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.frequency, { color: currentColors.textSecondary }]} numberOfLines={1}>
          {frequency}
        </Text>
        <Text style={[styles.description, { color: currentColors.textSecondary }]} numberOfLines={2}>
          {description}
        </Text>
        
        {/* Play Button Below Content */}
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
              size={16}
              color="#fff"
            />
          ) : (
            <Play
              size={16}
              color={isPlaying ? '#fff' : currentColors.accent}
              fill={isPlaying ? '#fff' : 'none'}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 6,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
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
    opacity: 0.3,
  },
  imageText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  stationName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  frequency: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
  },
});
