import { colors } from '@/constants/colors';
import { PlayerProvider } from '@/contexts/PlayerContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];

  return (
    <PlayerProvider>
      <StatusBar style="light" backgroundColor={currentColors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PlayerProvider>
  );
}
