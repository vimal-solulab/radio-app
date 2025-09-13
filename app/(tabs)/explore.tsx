import { GradientBackground } from "@/components/GradientBackground";
import { MiniPlayer } from "@/components/MiniPlayer";
import { colors } from "@/constants/colors";
import {
  getStationsByCategory,
  mockStations,
  RadioStation,
  searchStations,
} from "@/constants/radioData";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SearchTabType = "top" | "discover" | "top40";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? "light"];
  const [activeTab, setActiveTab] = useState<SearchTabType>("top");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(
    mockStations[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const topStations = getStationsByCategory("top");
  const discoverStations = getStationsByCategory("discover");
  const searchResults = searchQuery ? searchStations(searchQuery) : [];

  const tabs: { key: SearchTabType; label: string }[] = [
    { key: "top", label: "Top Stations" },
    { key: "discover", label: "Discover" },
    { key: "top40", label: "Top 40" },
  ];

  const handlePlayPress = (station: RadioStation) => {
    setCurrentStation(station);
    setIsPlaying(!isPlaying);
  };

  const handleMiniPlayerPress = () => {
    // Navigate to player screen
  };

  const handleMiniPlayerPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getGradientStyle = (id: string) => {
    const gradients = [
      ['#FF6B6B', '#4ECDC4'], // Red to teal
      ['#45B7D1', '#96CEB4'], // Blue to green
      ['#F093FB', '#F5576C'], // Pink to red
      ['#4FACFE', '#00F2FE'], // Blue to cyan
      ['#43E97B', '#38F9D7'], // Green to cyan
      ['#FA709A', '#FEE140'], // Pink to yellow
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
              <Text style={styles.stationLogoText}>{item.name.charAt(0)}</Text>
            )}
            <View style={[styles.gradientOverlay, { backgroundColor: gradientEnd }]} />
          </View>
          <View style={styles.stationDetails}>
            <Text style={[styles.stationName, { color: currentColors.text }]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.stationFrequency,
                { color: currentColors.textSecondary },
              ]}
            >
              {item.frequency}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.playButton,
            {
              backgroundColor:
                currentStation?.id === item.id && isPlaying
                  ? currentColors.accent
                  : "rgba(63, 43, 150, 0.15)",
              shadowColor:
                currentStation?.id === item.id && isPlaying
                  ? currentColors.accent
                  : "rgba(0, 0, 0, 0.1)",
            },
          ]}
          onPress={() => handlePlayPress(item)}
        >
          <Text
            style={[
              styles.playButtonText,
              {
                color:
                  currentStation?.id === item.id && isPlaying
                    ? "#fff"
                    : currentColors.accent,
              },
            ]}
          >
            {currentStation?.id === item.id && isPlaying ? "⏸" : "▶"}
          </Text>
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
              { backgroundColor: currentColors.cardBackground },
            ]}
          >
            <Search
              size={20}
              color={currentColors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: "#000" }]}
              placeholder="Search station"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Search Results Header */}
        {searchQuery && (
          <View style={styles.searchResultsHeader}>
            <Text
              style={[styles.searchResultsTitle, { color: currentColors.text }]}
            >
              {searchQuery}
            </Text>
            <Text
              style={[
                styles.searchResultsCount,
                { color: currentColors.textSecondary },
              ]}
            >
              {searchResults.length} stations found
            </Text>
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
                    backgroundColor: currentColors.accent,
                  },
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === tab.key
                          ? "#fff"
                          : currentColors.textSecondary,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
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

        {/* Mini Player */}
        {currentStation && (
          <MiniPlayer
            stationName={currentStation.name}
            stationDescription={currentStation.description}
            image={currentStation.image}
            logo={currentStation.logo}
            isPlaying={isPlaying}
            onPlayPause={handleMiniPlayerPlayPause}
            onPress={handleMiniPlayerPress}
          />
        )}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchResultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchResultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  searchResultsCount: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  stationList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stationListContent: {
    paddingBottom: 100, // Space for mini player
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
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
  },
  stationName: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  stationFrequency: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
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
