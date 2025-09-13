import { GradientBackground } from "@/components/GradientBackground";
import { PlayerControls } from "@/components/PlayerControls";
import { Typography } from "@/components/typography";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { usePlayer } from "@/contexts/PlayerContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function FullPlayerScreen() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? "light"];
  const { currentStation, isPlaying, pauseStation, resumeStation } =
    usePlayer();
  const [volume, setVolume] = useState(0.7);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!currentStation) {
    return (
      <GradientBackground>
        <View style={styles.emptyContainer}>
          <Typography variant="body" color="primary" weight="bold">
            No station selected
          </Typography>
        </View>
      </GradientBackground>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseStation();
    } else {
      resumeStation();
    }
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
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    // Share logic
  };

  const handleCast = () => {
    // Cast logic
  };

  const handleMinimize = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleMinimize}>
            <ArrowLeft size={24} color={currentColors.text} />
          </TouchableOpacity>
          <Typography variant="h4" color="primary" weight="bold">
            Now Playing
          </Typography>
          <View style={styles.placeholder} />
        </View>

        {/* Station Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.stationLogo}>
            {currentStation.image ? (
              <Image
                source={{ uri: currentStation.image }}
                style={styles.stationImage}
                resizeMode="cover"
              />
            ) : (
              <Typography variant="h4" color="white" weight="bold">
                {currentStation.name.charAt(0)}
              </Typography>
            )}
          </View>
        </View>

        {/* Station Info */}
        <View style={styles.stationInfo}>
          <Typography variant="h4" color="white" weight="bold">
            {currentStation.name}
          </Typography>
          <Typography variant="h5" 
          weight="bold"
          color="primary" 
          numberOfLines={1}>
            {currentStation.description}
          </Typography>
          <View style={styles.stationMeta}>
            <Typography
              variant="body"
              color="secondary"
              style={styles.metaText}
            >
              {currentStation.frequency}
            </Typography>
            <Typography
              variant="body"
              color="secondary"
              style={styles.metaText}
            >
              •
            </Typography>
            <Typography
              variant="body"
              color="secondary"
              style={styles.metaText}
            >
              {currentStation.country || "India"}
            </Typography>
          </View>
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
          onSettings={handleShare}
        />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.ms,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  stationLogo: {
    width: 200,
    height: 200,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.border.light,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  stationImage: {
    width: 200,
    height: 200,
    borderRadius: radius.full,
  },

  stationInfo: {
    alignItems: "center",
    marginBottom: spacing.ml,
    paddingHorizontal: spacing.ml,
    gap: spacing.xs,
  },

  stationDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 12,
  },
  stationMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    marginBottom: 40,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
