import { GradientBackground } from "@/components/GradientBackground";
import { PlayerControls } from "@/components/PlayerControls";
import { Typography } from "@/components/typography";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { usePlayer } from "@/contexts/PlayerContext";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function FullPlayerScreen() {
  const {
    currentStation,
    isPlaying,
    pauseStation,
    resumeStation,
    volume,
    setVolume,
    bass,
    setBass,
    treble,
    setTreble,
    balance,
    setBalance,
    audioEffects,
    toggleAudioEffect,
    toggleFavorite,
    isFavorite: isStationFavorite,
    playPreviousStation,
    playNextStation,
    isLoading,
    loadingProgress,
    error,
  } = usePlayer();

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
    playPreviousStation();
  };

  const handleNext = () => {
    playNextStation();
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleFavorite = () => {
    if (currentStation) {
      toggleFavorite(currentStation.id);
    }
  };

  const handleSettings = () => {
    router.push("/(tabs)/settings");
  };

  const handleMinimize = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleMinimize}>
          <ArrowLeft size={24} color={colors.natural.accent} />
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
            <Typography variant="h4" color="primary" weight="bold">
              {currentStation.name.charAt(0)}
            </Typography>
          )}
        </View>
      </View>

      {/* Station Info */}
      <View style={styles.stationInfo}>
        <Typography variant="h4" color="primary" weight="bold">
          {currentStation.name}
        </Typography>
        <Typography
          variant="h5"
          weight="bold"
          color="primary"
          numberOfLines={1}
        >
          {currentStation.description}
        </Typography>
        <View style={styles.stationMeta}>
          <Typography variant="body" color="secondary" style={styles.metaText}>
            {currentStation.frequency}
          </Typography>
          <Typography variant="body" color="secondary" style={styles.metaText}>
            •
          </Typography>
          <Typography variant="body" color="secondary" style={styles.metaText}>
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
        onFavorite={handleFavorite}
        onSettings={handleSettings}
        isFavorite={
          currentStation ? isStationFavorite(currentStation.id) : false
        }
        bass={bass}
        treble={treble}
        balance={balance}
        audioEffects={audioEffects}
        onBassChange={setBass}
        onTrebleChange={setTreble}
        onBalanceChange={setBalance}
        onToggleAudioEffect={toggleAudioEffect}
        isLoading={isLoading}
        loadingProgress={loadingProgress}
        error={error}
      />
    </ScrollView>
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
    backgroundColor: colors.border.light,
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
  statusContainer: {
    alignItems: "center",
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  sleepTimerStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: radius.full,
  },
  shuffleStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: radius.full,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: colors.background.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  modalSubtitle: {
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  timerOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  timerOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    minWidth: 80,
    alignItems: "center",
  },
  cancelButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
});
