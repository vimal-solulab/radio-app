import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Clock, Heart, Pause, Play, Settings, SkipBack, SkipForward, Volume2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onSleepTimer: () => void;
  onFavorite: () => void;
  onSettings: () => void;
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  volume,
  onVolumeChange,
  onSleepTimer,
  onFavorite,
  onSettings
}: PlayerControlsProps) {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      {/* Main Play Controls */}
      <View style={styles.mainControls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
          onPress={onPrevious}
        >
          <SkipBack size={24} color={currentColors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.playButton,
            {
              backgroundColor: currentColors.accent,
              shadowColor: currentColors.accent,
            }
          ]}
          onPress={onPlayPause}
        >
          {isPlaying ? (
            <Pause size={32} color="#fff" />
          ) : (
            <Play size={32} color="#fff" fill="#fff" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
          onPress={onNext}
        >
          <SkipForward size={24} color={currentColors.text} />
        </TouchableOpacity>
      </View>

      {/* Volume Control */}
      <View style={styles.volumeContainer}>
        <Volume2 size={20} color={currentColors.textSecondary} />
        <View style={styles.volumeSlider}>
          <View
            style={[
              styles.volumeProgress,
              {
                backgroundColor: currentColors.accent,
                width: `${volume * 100}%`,
              }
            ]}
          />
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
          onPress={onSleepTimer}
        >
          <Clock size={24} color={currentColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
          onPress={onFavorite}
        >
          <Heart size={24} color={currentColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
          onPress={onSettings}
        >
          <Settings size={24} color={currentColors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  volumeSlider: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginLeft: 12,
    position: 'relative',
  },
  volumeProgress: {
    height: '100%',
    borderRadius: 2,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
