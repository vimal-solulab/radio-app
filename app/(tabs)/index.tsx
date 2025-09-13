import { FavoriteCard } from "@/components/FavoriteCard";
import { GradientBackground } from "@/components/GradientBackground";
import { RecentCard } from "@/components/RecentCard";
import { TrendingCard } from "@/components/TrendingCard";
import { Typography } from "@/components/typography";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { usePlayer } from "@/contexts/PlayerContext";
import {
  getStationsByCategory,
  mockStations,
  RadioStation,
} from "@/store/radioData";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() { 
  const {
    currentStation,
    isPlaying,
    playStation,
    pauseStation,
    recentStations,
    favorites,
    toggleFavorite,
    isFavorite,
  } = usePlayer();

  // Dynamic padding based on mini player visibility
  const miniPlayerPadding = currentStation ? 80 : 0;

  // Helper function to get station objects from IDs
  const getStationsByIds = (stationIds: string[]) => {
    return stationIds
      .map((id) => mockStations.find((station) => station.id === id))
      .filter(Boolean) as RadioStation[];
  };

  const recentStationsData = getStationsByIds(recentStations);
  const favoriteStationsData = getStationsByIds(favorites);
  const topStations = getStationsByCategory("top");

  // If no recent stations, show some sample data for demo - limit to 5 items
  const displayRecentStations =
    recentStationsData.length > 0
      ? recentStationsData.slice(0, 5)
      : topStations.slice(0, 5);
  const displayFavoriteStations =
    favoriteStationsData.length > 0
      ? favoriteStationsData
      : topStations.slice(0, 4);

  const handleStationPress = (station: RadioStation) => {
    // Station press logic
  };

  const handlePlayPress = (station: RadioStation) => {
    if (currentStation?.id === station.id && isPlaying) {
      pauseStation();
    } else {
      playStation(station);
    }
  };

  const handleSeeAllPress = () => {
    router.push("/(tabs)/explore");
  };

  const renderFavoriteCard = ({ item }: { item: RadioStation }) => (
    <FavoriteCard
      id={item.id}
      name={item.name}
      frequency={item.frequency}
      description={item.description}
      image={item.image}
      logo={item.logo}
      isPlaying={currentStation?.id === item.id && isPlaying}
      isFavorite={isFavorite(item.id)}
      onPress={() => handleStationPress(item)}
      onPlayPress={() => handlePlayPress(item)}
      onFavoritePress={() => toggleFavorite(item.id)}
    />
  );

  const renderRecentCard = ({ item }: { item: RadioStation }) => (
    <RecentCard
      id={item.id}
      name={item.name}
      frequency={item.frequency}
      description={item.description}
      image={item.image}
      logo={item.logo}
      isPlaying={currentStation?.id === item.id && isPlaying}
      onPress={() => handleStationPress(item)}
      onPlayPress={() => handlePlayPress(item)}
    />
  );

  const renderTrendingCard = ({ item }: { item: RadioStation }) => (
    <TrendingCard
      id={item.id}
      name={item.name}
      frequency={item.frequency}
      description={item.description}
      image={item.image}
      logo={item.logo}
      isPlaying={currentStation?.id === item.id && isPlaying}
      onPress={() => handleStationPress(item)}
      onPlayPress={() => handlePlayPress(item)}
    />
  );

  const renderSectionHeader = (
    title: string,
    subtitleOrShowSeeAll?: string | boolean,
    showSeeAllOrOnPress?: boolean | (() => void),
    onSeeAllPress?: () => void
  ) => {
    // Handle different parameter patterns
    let subtitle: string | undefined;
    let showSeeAll: boolean;
    let onPress: (() => void) | undefined;

    if (typeof subtitleOrShowSeeAll === 'string') {
      subtitle = subtitleOrShowSeeAll;
      showSeeAll = typeof showSeeAllOrOnPress === 'boolean' ? showSeeAllOrOnPress : true;
      onPress = typeof showSeeAllOrOnPress === 'function' ? showSeeAllOrOnPress : onSeeAllPress;
    } else {
      subtitle = undefined;
      showSeeAll = subtitleOrShowSeeAll ?? true;
      onPress = typeof showSeeAllOrOnPress === 'function' ? showSeeAllOrOnPress : onSeeAllPress;
    }

    return (
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.titleWithLine}>
            <View style={[styles.verticalLine, { backgroundColor: colors.natural.accent }]} />
            <Typography variant="h5" color="primary" weight="bold">
              {title}
            </Typography>
          </View>
          {subtitle && (
            <Typography variant="body2" color="secondary">
              {subtitle}
            </Typography>
          )}
        </View>
        {showSeeAll && (
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={onPress || handleSeeAllPress}
          >
            <Typography variant="body2" color="accent" weight="bold">
              See All
            </Typography>
            <ChevronRight size={16} color={colors.natural.accent} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingBottom: miniPlayerPadding }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Typography variant="body" color="primary">
              Good{" "}
              {new Date().getHours() < 12
                ? "Morning"
                : new Date().getHours() < 18
                ? "Afternoon"
                : "Evening"}
            </Typography>
            <Typography variant="h5" weight="bold" color="primary">
              Welcome back!
            </Typography>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={[styles.profileAvatar]}>
              <Typography
                variant="h6"
                color="white"
                weight="bold"
                numberOfLines={1}
              >
                U
              </Typography>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Recently Played Section */}
          {renderSectionHeader(
            "Recently Played",
            true,
            handleSeeAllPress
          )}
          <FlatList
            data={displayRecentStations}
            renderItem={renderRecentCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          {/* Favorites Section */}
          {renderSectionHeader(
            "Your Favorites",
            `${displayFavoriteStations.length} stations`,
            false
          )}
          <FlatList
            data={displayFavoriteStations}
            renderItem={renderFavoriteCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          {/* Trending Section */}
          {renderSectionHeader(
            "Trending Now",
            true,
            handleSeeAllPress
          )}
          <FlatList
            data={topStations.slice(0, 4)}
            renderItem={renderTrendingCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </ScrollView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.ml,
    paddingVertical: spacing.xms,
  },
  headerContent: {
    flex: 1,
    gap: 2,
  },

  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: colors.natural.accent,
  },

  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 16,
    paddingHorizontal: spacing.ml,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  titleWithLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  verticalLine: {
    width: 3,
    height: 20,
    borderRadius: 1.5,
  },
  sectionTitle: {
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sectionSubtitle: {
    opacity: 0.7,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: spacing.xms,
    paddingVertical: 4,
  },
  seeAllText: {
    // Typography handles font styling
  },
  horizontalList: {
    paddingRight: 20,
  },
});
