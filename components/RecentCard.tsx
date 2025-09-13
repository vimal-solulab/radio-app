import { card } from "@/constants/card";
import { colors } from "@/constants/colors";
import { Pause, Play } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "./typography";

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
 

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {/* Background Image */}
        <View style={styles.imageContainer}>
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
            <View style={styles.placeholderImage}>
              <Typography style={styles.imageText}>{name.charAt(0)}</Typography>
            </View>
          )}

          {/* Dark overlay for text readability */}
          <View style={styles.overlay} />

          {/* Text at Top */}
          <View style={styles.textContainer}>
            <Typography
              style={styles.stationName}
              color="white"
              weight="bold"
              variant="body"
              numberOfLines={1}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              style={styles.frequency}
              color="white"
              numberOfLines={1}
            >
              {frequency}
            </Typography>
          </View>

          {/* Play Button at Bottom Right */}
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...card.recentCard,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
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
    backgroundColor: "#333",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  imageText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "800",
  },
  textContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
  },
  stationName: {
    marginBottom: 2,
  },
  frequency: {
    opacity: 0.9,
  },
  playButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
