import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
