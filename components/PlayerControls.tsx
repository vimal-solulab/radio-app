import { colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
// @ts-ignore
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { Slider } from "@react-native-assets/slider";
import {
  Heart,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Sliders,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "./typography";
interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onFavorite: () => void;
  onSettings: () => void;
  isFavorite?: boolean;
  bass?: number;
  treble?: number;
  balance?: number;
  audioEffects?: {
    reverb: boolean;
    echo: boolean;
    surround: boolean;
  };
  onBassChange?: (bass: number) => void;
  onTrebleChange?: (treble: number) => void;
  onBalanceChange?: (balance: number) => void;
  onToggleAudioEffect?: (effect: "reverb" | "echo" | "surround") => void;
  isLoading?: boolean;
  error?: string | null;
  loadingProgress?: number;
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  volume,
  onVolumeChange,
  onFavorite,
  onSettings,
  isFavorite = false,
  bass = 0.5,
  treble = 0.5,
  balance = 0.5,
  audioEffects = { reverb: false, echo: false, surround: false },
  onBassChange,
  onTrebleChange,
  onBalanceChange,
  onToggleAudioEffect,
  isLoading = false,
  error = null,
  loadingProgress = 0,
}: PlayerControlsProps) {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? "light"];
  const [showSoundModal, setShowSoundModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* Main Play Controls */}
      <View style={styles.mainControls}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          ]}
          onPress={onPrevious}
        >
          <SkipBack size={24} color={currentColors.text} />
        </TouchableOpacity>

        <View style={styles.playButtonContainer}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={onPlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [{ rotate: `${loadingProgress * 360}deg` }],
                  },
                ]}
              />
            ) : isPlaying ? (
              <Pause size={32} color="#fff" />
            ) : (
              <Play size={32} color="#fff" fill="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.controlButton,
            { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          ]}
          onPress={onNext}
        >
          <SkipForward size={24} color={currentColors.text} />
        </TouchableOpacity>
      </View>

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Typography
            variant="body2"
            color="error"
            weight="medium"
            numberOfLines={2}
          >
            {error}
          </Typography>
        </View>
      )}

      {/* Volume Control */}
      <View style={styles.volumeContainer}>
        <TouchableOpacity
          style={styles.volumeIconButton}
          onPress={() => onVolumeChange(0)}
        >
          <VolumeX
            size={20}
            color={
              volume === 0 ? currentColors.accent : currentColors.textSecondary
            }
          />
        </TouchableOpacity>

        <View style={styles.volumeSliderContainer}>
          <CustomSlider
            value={volume}
            onValueChange={onVolumeChange}
            label={null}
            color={currentColors.accent}
            width={Math.min(Dimensions.get("window").width - 160, 230)}
          />
        </View>

        <TouchableOpacity
          style={styles.volumeIconButton}
          onPress={() => onVolumeChange(1)}
        >
          {volume === 0 ? (
            <VolumeX size={20} color={currentColors.textSecondary} />
          ) : volume < 0.5 ? (
            <Volume1 size={20} color={currentColors.textSecondary} />
          ) : (
            <Volume2
              size={20}
              color={
                volume === 1
                  ? currentColors.accent
                  : currentColors.textSecondary
              }
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          ]}
          onPress={() => setShowSoundModal(true)}
        >
          <Sliders size={20} color={currentColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomButton,
            {
              backgroundColor: isFavorite
                ? `${currentColors.accent}20`
                : "rgba(255, 255, 255, 0.1)",
            },
          ]}
          onPress={onFavorite}
        >
          <Heart
            size={24}
            color={
              isFavorite ? currentColors.accent : currentColors.textSecondary
            }
            fill={isFavorite ? currentColors.accent : "transparent"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomButton,
            { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          ]}
          onPress={onSettings}
        >
          <Settings size={24} color={currentColors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Sound Settings Modal */}
      <Modal
        visible={showSoundModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSoundModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Typography
              variant="h4"
              color="primary"
              weight="bold"
              style={styles.modalTitle}
            >
              Sound Settings
            </Typography>

            {/* Bass Control */}
            <View style={styles.bassContainer}>
              <CustomSlider
                value={bass}
                onValueChange={(value) => onBassChange?.(value)}
                label={`Bass: ${Math.round((bass - 0.5) * 100)}`}
                color={currentColors.accent}
              />

              {/* Treble Control */}
              <CustomSlider
                value={treble}
                onValueChange={(value) => onTrebleChange?.(value)}
                label={`Treble: ${Math.round((treble - 0.5) * 100)}`}
                color={currentColors.accent}
              />

              {/* Balance Control */}
              <CustomSlider
                value={balance}
                onValueChange={(value) => onBalanceChange?.(value)}
                label={`Balance: ${
                  balance < 0.5 ? "L" : balance > 0.5 ? "R" : "C"
                }`}
                color={currentColors.accent}
              />
            </View>
            {/* Audio Effects */}
            <View style={styles.effectsContainer}>
              <Typography
                variant="h4"
                color="primary"
                weight="bold"
                style={styles.effectsTitle}
              >
                Audio Effects
              </Typography>
              <View style={styles.effectsRow}>
                <TouchableOpacity
                  style={[
                    styles.effectButton,
                    {
                      backgroundColor: audioEffects.reverb
                        ? currentColors.accent
                        : "rgba(255, 255, 255, 0.1)",
                    },
                  ]}
                  onPress={() => onToggleAudioEffect?.("reverb")}
                >
                  <Typography
                    variant="body2"
                    weight="medium"
                    style={styles.effectText}
                    color={audioEffects.reverb ? "white" : "secondary"}
                    numberOfLines={1}
                  >
                    Reverb
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.effectButton,
                    {
                      backgroundColor: audioEffects.echo
                        ? currentColors.accent
                        : "rgba(255, 255, 255, 0.1)",
                    },
                  ]}
                  onPress={() => onToggleAudioEffect?.("echo")}
                >
                  <Typography
                    variant="body2"
                    weight="medium"
                    style={styles.effectText}
                    color={audioEffects.echo ? "white" : "secondary"}
                    numberOfLines={1}
                  >
                    Echo
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.effectButton,
                    {
                      backgroundColor: audioEffects.surround
                        ? currentColors.accent
                        : "rgba(255, 255, 255, 0.1)",
                    },
                  ]}
                  onPress={() => onToggleAudioEffect?.("surround")}
                >
                  <Typography
                    variant="body2"
                    weight="medium"
                    style={styles.effectText}
                    color={audioEffects.surround ? "white" : "secondary"}
                    numberOfLines={1}
                  >
                    Surround
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSoundModal(false)}
            >
              <Typography variant="body2" weight="medium" color="primary">
                Close
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Simple Slider Component using Library
const CustomSlider = ({
  value,
  onValueChange,
  label,
  color,
  width,
}: {
  value: number;
  onValueChange: (value: number) => void;
  label: string | null;
  color: string;
  width?: number;
}) => {
  const sliderWidth = width || 250;

  return (
    <View style={styles.sliderContainer}>
      {label && (
        <Typography
          variant="body2"
          color="secondary"
          weight="medium"
          style={styles.sliderLabel}
          numberOfLines={1}
        >
          {label}
        </Typography>
      )}
      <Slider
        style={{ width: sliderWidth, height: 20 }}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onValueChange}
        minTrackStyle={{
          backgroundColor: color,
          height: 12,
          borderRadius: 12,
        }}
        maxTrackStyle={{
          backgroundColor: "#CCCCCC",
          height: 12,
          borderRadius: 12,
        }}
        thumbStyle={{
          backgroundColor: color,
          width: 24,
          height: 24,
          borderRadius: 12,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 0, 0, 0.3)",
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  playButtonContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: colors.natural.accent,
    borderRadius: radius.full,
  },
  loadingProgress: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.full,
    backgroundColor: colors.natural.accent,
    borderWidth: 6,
    borderColor: colors.natural.accent,
    borderTopColor: colors.neutral.white,
    borderRightColor: colors.neutral.white,
    borderBottomColor: "transparent",
    borderLeftColor: colors.neutral.white,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 40,
  },
  volumeIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  volumeSliderContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  volumeLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    minWidth: 40,
    textAlign: "center",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  bottomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  soundSettingsButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 8,
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
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },

  modalScrollContent: {
    alignItems: "center",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  sliderContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  effectsContainer: {
    width: "100%",
    marginBottom: 16,
  },
  effectsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  effectsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  effectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    flex: 1,
    alignItems: "center",
  },
  effectText: {
    fontSize: 14,
    fontWeight: "500",
  },
  closeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radius.full,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  bassContainer: {
    width: "100%",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
});
