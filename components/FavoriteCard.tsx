import { card } from "@/constants/card";
import { colors } from "@/constants/colors";
import { Heart, Pause, Play } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "./typography";

interface FavoriteCardProps {
  id: string;
  name: string;
  frequency: string;
  description: string;
  logo?: string;
  image?: string;
  isPlaying?: boolean;
  isFavorite?: boolean;
  onPress?: () => void;
  onPlayPress?: () => void;
  onFavoritePress?: () => void;
}

export function FavoriteCard({
  id,
  name,
  frequency,
  description,
  logo,
  image,
  isPlaying = false,
  isFavorite = false,
  onPress,
  onPlayPress,
  onFavoritePress,
}: FavoriteCardProps) {
 
  // Get gradient colors based on station ID
  const gradients = [
    ["#FF6B6B", "#4ECDC4"], // Red to teal
    ["#45B7D1", "#96CEB4"], // Blue to green
    ["#F093FB", "#F5576C"], // Pink to red
    ["#4FACFE", "#00F2FE"], // Blue to cyan
    ["#43E97B", "#38F9D7"], // Green to cyan
    ["#FA709A", "#FEE140"], // Pink to yellow
  ];

  const gradientIndex = parseInt(id) % gradients.length;
  const [gradientStart, gradientEnd] = gradients[gradientIndex];

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {/* Image Section */}
        <View style={[styles.imageSection, { backgroundColor: gradientStart }]}>
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
            <View
              style={[
                styles.placeholderImage,
                { backgroundColor: gradientEnd },
              ]}
            >
              <Typography style={styles.imageText}>{name.charAt(0)}</Typography>
            </View>
          )}

          {/* Gradient overlay */}
          <View
            style={[styles.gradientOverlay, { backgroundColor: gradientEnd }]}
          />

          {/* Heart Button */}
          <TouchableOpacity
            style={styles.heartButton}
            onPress={onFavoritePress}
            activeOpacity={0.8}
          >
            <Heart
              size={16}
              color={isFavorite ? "#FF6B6B" : "#fff"}
              fill={isFavorite ? "#FF6B6B" : "none"}
            />
          </TouchableOpacity>

          {/* Play Button */}
          <TouchableOpacity
            style={[
              styles.playButton,
              {
                backgroundColor: isPlaying
                  ? colors.natural.accent
                  : "rgba(0, 0, 0, 0.6)",
              },
            ]}
            onPress={onPlayPress}
            activeOpacity={0.8}
          >
            {isPlaying ? (
              <Pause size={16} color="#fff" />
            ) : (
              <Play size={16} color="#fff" fill="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <Typography
            style={styles.stationName}
            color="primary"
            weight="bold"
            variant="body"
            numberOfLines={1}
          >
            {name}
          </Typography>
          <Typography

            variant="body2"
            style={styles.frequency}
            color="secondary"
            numberOfLines={1}
          >
            {frequency}
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...card.favoriteCard,
    overflow: "hidden",
  },
  imageSection: {
    width: "100%",
    height: 140,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  imageText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textSection: {
    padding: 16,
    paddingTop: 12,
    alignItems: "center",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  playButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  stationName: {
    marginBottom: 6,
  },
  frequency: {
    textAlign: "center",
  },
});
