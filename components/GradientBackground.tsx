import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
 

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.main }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
