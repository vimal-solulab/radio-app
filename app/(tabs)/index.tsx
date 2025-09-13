import { FavoriteCard } from "@/components/FavoriteCard";
import { GradientBackground } from "@/components/GradientBackground";
import { RecentCard } from "@/components/RecentCard";
import { TrendingCard } from "@/components/TrendingCard";
import { Typography } from "@/components/typography";
import { colors } from "@/constants/colors";
import {
  getStationsByCategory,
  mockStations,
  RadioStation
} from "@/constants/radioData";
import { spacing } from "@/constants/spacing";
import { usePlayer } from "@/contexts/PlayerContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import {
  ChevronRight
} from "lucide-react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? "light"];
  const { currentStation, isPlaying, playStation, pauseStation, recentStations, favorites, toggleFavorite, isFavorite } = usePlayer();
  
  // Dynamic padding based on mini player visibility
  const miniPlayerPadding = currentStation ? 80 : 0;

  // Helper function to get station objects from IDs
  const getStationsByIds = (stationIds: string[]) => {
    return stationIds.map(id => mockStations.find(station => station.id === id)).filter(Boolean) as RadioStation[];
  };

  const recentStationsData = getStationsByIds(recentStations);
  const favoriteStationsData = getStationsByIds(favorites);
  const topStations = getStationsByCategory("top");

  // If no recent stations, show some sample data for demo - limit to 5 items
  const displayRecentStations = recentStationsData.length > 0 ? recentStationsData.slice(0, 5) : topStations.slice(0, 5);
  const displayFavoriteStations = favoriteStationsData.length > 0 ? favoriteStationsData : topStations.slice(0, 4);


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


  const renderSectionHeader = (title: string, subtitle?: string, showSeeAll = true, onSeeAllPress?: () => void) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Typography variant="h3" color="primary" style={styles.sectionTitle}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" color="secondary" style={styles.sectionSubtitle}>
            {subtitle}
          </Typography>
        )}
      </View>
      {showSeeAll && (
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAllPress || handleSeeAllPress}>
          <Typography variant="subtitle2" color="primary" style={styles.seeAllText}>
            See All
          </Typography>
          <ChevronRight size={16} color={currentColors.accent} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingBottom: miniPlayerPadding }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Typography variant="subtitle2" color="primary" style={styles.greeting}>
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
            </Typography>
            <Typography variant="h4" color="primary" style={styles.userName}>
              Welcome back!
            </Typography>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={[styles.profileAvatar, { backgroundColor: currentColors.accent }]}>
              <Typography variant="h6" color="white" style={styles.profileText}>U</Typography>
            </View>
          </TouchableOpacity>
        </View>


        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Recently Played Section */}
          {renderSectionHeader("Recently Played", "Continue where you left off", true, handleSeeAllPress)}
          <FlatList
            data={displayRecentStations}
            renderItem={renderRecentCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          {/* Favorites Section */}
          {renderSectionHeader("Your Favorites", `${displayFavoriteStations.length} stations`, false)}
          <FlatList
            data={displayFavoriteStations}
            renderItem={renderFavoriteCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          {/* Trending Section */}
          {renderSectionHeader("Trending Now", "What's popular right now", true, handleSeeAllPress)}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    opacity: 0.8,
    marginBottom: 4,
  },
  userName: {
    letterSpacing: 0.5,
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileText: {
    // Typography handles color and font styling
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
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  seeAllText: {
    // Typography handles font styling
  },
  horizontalList: {
    paddingRight: 20,
  },
});
