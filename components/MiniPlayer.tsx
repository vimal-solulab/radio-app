import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { Pause, Play } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "./typography";

interface MiniPlayerProps {
  stationName: string;
  stationDescription: string;
  logo?: string;
  image?: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPress: () => void;
  isVisible: boolean;
  isLoading?: boolean;
  loadingProgress?: number;
}

export function MiniPlayer({
  stationName,
  stationDescription,
  logo,
  image,
  isPlaying,
  onPlayPause,
  onPress,
  isVisible,
  isLoading = false,
  loadingProgress = 0,
}: MiniPlayerProps) {
 

  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnimation]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
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
            <View
              style={[
                styles.placeholderLogo,
                { backgroundColor: colors.natural.accent },
              ]}  
            >
              <Typography variant="body" color="white">
                {stationName.charAt(0)}
              </Typography>
            </View>
          )}
        </View>

        <View style={styles.textContent}>
          <Typography
            variant="body"
            color="white"
            weight="bold"
            numberOfLines={1}
          >
            {stationName}
          </Typography>
          <Typography
            style={styles.stationDescription}
            variant="caption"
            color="white"
            numberOfLines={1}
          >
            {stationDescription}
          </Typography>
        </View>

        <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
          {isLoading ? (
            <View style={styles.loadingProgressContainer}>
              <View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [{ rotate: `${loadingProgress * 360}deg` }],
                  },
                ]}
              />
            </View>
          ) : isPlaying ? (
            <Pause size={20} color="#fff" />
          ) : (
            <Play size={20} color="#fff" fill="#fff" />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    height: 70,
    borderRadius: radius.full,
    backgroundColor: colors.natural.accent,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.ms,
    gap: spacing.xs,
  },
  logoContainer: {
    marginRight: 16,
    borderRadius: 24,
    overflow: "hidden",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: radius.full,
  },
  placeholderLogo: {
    width: 50,
    height: 50,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.natural.accent,
  },

  textContent: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.xxs,
  },

  playButton: {
    width: 50,
    height: 50,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: radius.xs },
    shadowOpacity: 0.1,
    shadowRadius: radius.xs,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.neutral.white,
    backgroundColor: colors.natural.accent,
  },
  stationDescription: {
    opacity: 0.8,
  },

  loadingProgress: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.full,
    backgroundColor: colors.natural.accent,
    borderWidth: 5,
    borderColor: colors.natural.accent,
    borderTopColor: colors.neutral.white,
    borderRightColor: colors.neutral.white,
    borderBottomColor: "transparent",
    borderLeftColor: colors.neutral.white,
  },
  loadingProgressContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: radius.full,
    backgroundColor: colors.natural.accent,
  },
});
