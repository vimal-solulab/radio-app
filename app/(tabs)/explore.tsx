import { GradientBackground } from "@/components/GradientBackground";
import { Typography } from "@/components/typography";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { usePlayer } from "@/contexts/PlayerContext";
import {
  getStationsByCategory,
  RadioStation,
  searchStations,
} from "@/store/radioData";
import { Pause, Play, Search } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SearchTabType = "top" | "discover" | "top40";

export default function SearchScreen() {
  
  const { currentStation, isPlaying, playStation, pauseStation, isLoading } = usePlayer();
  const [activeTab, setActiveTab] = useState<SearchTabType>("top");
  const [searchQuery, setSearchQuery] = useState("");
  const lastClickTime = useRef<number>(0);

  const topStations = getStationsByCategory("top");
  const discoverStations = getStationsByCategory("discover");
  const searchResults = searchQuery ? searchStations(searchQuery) : [];

  const tabs: { key: SearchTabType; label: string }[] = [
    { key: "top", label: "Top Stations" },
    { key: "discover", label: "Discover" },
    { key: "top40", label: "Top 40" },
  ];

  const handlePlayPress = (station: RadioStation) => {
    // Debounce rapid clicks (prevent clicks within 500ms)
    const now = Date.now();
    if (now - lastClickTime.current < 500) {
      console.log('Click debounced - too soon after last click');
      return;
    }
    lastClickTime.current = now;

    // Prevent action if already loading
    if (isLoading) {
      console.log('Already loading, ignoring click');
      return;
    }

    if (currentStation?.id === station.id && isPlaying) {
      pauseStation();
    } else {
      playStation(station);
    }
  };

  const getGradientStyle = (id: string) => {
    const gradients = [
      ["#FF6B6B", "#4ECDC4"], // Red to teal
      ["#45B7D1", "#96CEB4"], // Blue to green
      ["#F093FB", "#F5576C"], // Pink to red
      ["#4FACFE", "#00F2FE"], // Blue to cyan
      ["#43E97B", "#38F9D7"], // Green to cyan
      ["#FA709A", "#FEE140"], // Pink to yellow
    ];

    const gradientIndex = parseInt(id) % gradients.length;
    return gradients[gradientIndex];
  };

  const renderStationRow = ({ item }: { item: RadioStation }) => {
    const [gradientStart, gradientEnd] = getGradientStyle(item.id);

    return (
      <View style={styles.stationRow}>
        <View style={styles.stationInfo}>
          <View
            style={[
              styles.stationLogo,
              {
                backgroundColor: gradientStart,
                shadowColor: gradientStart,
              },
            ]}
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.stationLogoImage}
                resizeMode="cover"
              />
            ) : (
              <Typography
                style={styles.stationLogoText}
                color="white"
                weight="bold"
              >
                {item.name.charAt(0)}
              </Typography>
            )}
            <View
              style={[styles.gradientOverlay, { backgroundColor: gradientEnd }]}
            />
          </View>
          <View style={styles.stationDetails}>
            <Typography
              color="primary"
              variant="body"
              weight="bold"
              numberOfLines={1}
            >
              {item.name}
            </Typography>
            <Typography color="secondary" variant="body2" numberOfLines={1}>
              {item.frequency}
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.playButton,
            {
              backgroundColor:
                currentStation?.id === item.id && isPlaying
                  ? colors.natural.accent
                  : "rgba(63, 43, 150, 0.15)",
              shadowColor:
                currentStation?.id === item.id && isPlaying
                  ? colors.natural.accent
                  : "rgba(0, 0, 0, 0.1)",
            },
          ]}
          onPress={() => handlePlayPress(item)}
        >
          {currentStation?.id === item.id && isPlaying ? (
            <Pause size={20} color="#fff" />
          ) : (
            <Play size={20} color="#fff" fill="#fff" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const getDisplayData = () => {
    if (searchQuery) {
      return searchResults;
    }

    switch (activeTab) {
      case "top":
        return topStations;
      case "discover":
        return discoverStations;
      case "top40":
        return topStations; // Using top stations as placeholder for Top 40
      default:
        return [];
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.natural.cardBackground },
            ]}
          >
            <Search
              size={20}
              color={colors.text.secondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholderTextColor={colors.text.secondary}
              placeholder="Search station"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Search Results Header */}
        {searchQuery && (
          <View style={styles.searchResultsHeader}>
            <Typography variant="body" color="primary" weight="bold">
              {searchQuery}
            </Typography>
            <Typography color="secondary" variant="body2">
              {searchResults.length} stations found
            </Typography>
          </View>
        )}

        {/* Tabs */}
        {!searchQuery && (
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  activeTab === tab.key && {
                    backgroundColor: colors.natural.accent,
                  },
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Typography
                  color={activeTab === tab.key ? "white" : "primary"}
                  weight={activeTab === tab.key ? "bold" : "normal"}
                >
                  {tab.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Station List */}
        <FlatList
          data={getDisplayData()}
          renderItem={renderStationRow}
          keyExtractor={(item) => item.id}
          style={styles.stationList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.stationListContent}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 60,
  },
  searchContainer: {
    paddingHorizontal: spacing.ml,
    marginBottom: spacing.ml,
  },
  searchBar: {
    backgroundColor: colors.background.card,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.full,
    paddingHorizontal: spacing.ml,
    paddingVertical: spacing.xms,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  searchIcon: {
    marginRight: spacing.ml,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchResultsHeader: {
    paddingHorizontal: spacing.ml,
    marginBottom: 16,
  },
  searchResultsTitle: {
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    marginBottom: 4,
  },
  searchResultsCount: {},
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.ml,
    marginBottom: spacing.ml,
  },
  tab: {
    paddingHorizontal: spacing.ml,
    paddingVertical: 8,
    borderRadius: radius.full,
    marginRight: 8,
  },

  stationList: {
    flex: 1,
    paddingHorizontal: spacing.ml,
  },
  stationListContent: {
    paddingBottom: 180, // Space for mini player (90px) + bottom navigation (90px)
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.ms,
    paddingHorizontal: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    gap: spacing.ms,
  },
  stationInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stationLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
    position: "relative",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    opacity: 0.3,
  },
  stationLogoImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  stationLogoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  stationDetails: {
    flex: 1,
    alignItems: "flex-start",
    gap: spacing.xms,
  },

  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
