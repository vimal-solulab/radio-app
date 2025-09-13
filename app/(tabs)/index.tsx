import { GradientBackground } from "@/components/GradientBackground";
import { StationCard } from "@/components/StationCard";
import { colors } from "@/constants/colors";
import {
  getStationsByCategory,
  RadioStation
} from "@/constants/radioData";
import { usePlayer } from "@/contexts/PlayerContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  ChevronRight,
  Clock,
  Heart,
  Music,
  Radio,
  TrendingUp
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get('window');

type TabType = "recent" | "recommended" | "search" | "top";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? "light"];
  const { currentStation, isPlaying, playStation, pauseStation } = usePlayer();
  const [activeTab, setActiveTab] = useState<TabType>("recent");

  const recentStations = getStationsByCategory("recent");
  const favoriteStations = getStationsByCategory("favorite");
  const topStations = getStationsByCategory("top");
  const discoverStations = getStationsByCategory("discover");

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: "recent", label: "Recent", icon: Clock },
    { key: "recommended", label: "Recommended", icon: TrendingUp },
    { key: "search", label: "Search", icon: Radio },
    { key: "top", label: "Top", icon: Music },
  ];

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

  const renderStationCard = ({ item }: { item: RadioStation }) => (
    <StationCard
      id={item.id}
      name={item.name}
      frequency={item.frequency}
      description={item.description}
      image={item.image}
      logo={item.logo}
      isPlaying={currentStation?.id === item.id && isPlaying}
      onPress={() => handleStationPress(item)}
      onPlayPress={() => handlePlayPress(item)}
      size="medium"
    />
  );

  const renderFavoriteCard = ({ item }: { item: RadioStation }) => (
    <StationCard
      id={item.id}
      name={item.name}
      frequency={item.frequency}
      description={item.description}
      image={item.image}
      logo={item.logo}
      isPlaying={currentStation?.id === item.id && isPlaying}
      onPress={() => handleStationPress(item)}
      onPlayPress={() => handlePlayPress(item)}
      size="small"
    />
  );

  const renderLargeCard = ({ item }: { item: RadioStation }) => (
    <StationCard
      id={item.id}
      name={item.name}
      frequency={item.frequency}
      description={item.description}
      image={item.image}
      logo={item.logo}
      isPlaying={currentStation?.id === item.id && isPlaying}
      onPress={() => handleStationPress(item)}
      onPlayPress={() => handlePlayPress(item)}
      size="large"
    />
  );

  const renderSectionHeader = (title: string, subtitle?: string, showSeeAll = true) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={[styles.sectionTitle, { color: currentColors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.sectionSubtitle, { color: currentColors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showSeeAll && (
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={[styles.seeAllText, { color: currentColors.accent }]}>
            See All
          </Text>
          <ChevronRight size={16} color={currentColors.accent} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.greeting, { color: currentColors.text }]}>
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
            </Text>
            <Text style={[styles.userName, { color: currentColors.text }]}>
              Welcome back!
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={[styles.profileAvatar, { backgroundColor: currentColors.accent }]}>
              <Text style={styles.profileText}>U</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Access Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
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
                <IconComponent 
                  size={18} 
                  color={activeTab === tab.key ? "#fff" : currentColors.textSecondary} 
                />
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
            );
          })}
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Section */}
          {activeTab === "recent" && (
            <React.Fragment>
              {renderSectionHeader("Recently Played", "Continue where you left off")}
              <FlatList
                data={recentStations.slice(0, 3)}
                renderItem={renderLargeCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />

              {renderSectionHeader("Your Favorites", `${favoriteStations.length} stations`, false)}
              <FlatList
                data={favoriteStations}
                renderItem={renderFavoriteCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />

              {renderSectionHeader("Trending Now", "What's popular right now")}
              <FlatList
                data={topStations.slice(0, 4)}
                renderItem={renderStationCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </React.Fragment>
          )}

          {/* Recommended Tab */}
          {activeTab === "recommended" && (
            <React.Fragment>
              {renderSectionHeader("Made for You", "Personalized recommendations")}
              <FlatList
                data={discoverStations}
                renderItem={renderStationCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />

              {renderSectionHeader("Popular This Week", "Trending stations")}
              <FlatList
                data={topStations}
                renderItem={renderStationCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </React.Fragment>
          )}

          {/* Search Tab */}
          {activeTab === "search" && (
            <React.Fragment>
              {renderSectionHeader("Browse Categories", "Explore by genre")}
              <View style={styles.categoryGrid}>
                <TouchableOpacity style={[styles.categoryCard, { backgroundColor: currentColors.cardBackground }]}>
                  <Music size={24} color={currentColors.accent} />
                  <Text style={[styles.categoryText, { color: currentColors.text }]}>Music</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryCard, { backgroundColor: currentColors.cardBackground }]}>
                  <Radio size={24} color={currentColors.accent} />
                  <Text style={[styles.categoryText, { color: currentColors.text }]}>Talk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryCard, { backgroundColor: currentColors.cardBackground }]}>
                  <TrendingUp size={24} color={currentColors.accent} />
                  <Text style={[styles.categoryText, { color: currentColors.text }]}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryCard, { backgroundColor: currentColors.cardBackground }]}>
                  <Heart size={24} color={currentColors.accent} />
                  <Text style={[styles.categoryText, { color: currentColors.text }]}>Sports</Text>
                </TouchableOpacity>
              </View>

              {renderSectionHeader("Quick Search", "Popular searches")}
              <FlatList
                data={topStations.slice(0, 6)}
                renderItem={renderStationCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </React.Fragment>
          )}

          {/* Top Tab */}
          {activeTab === "top" && (
            <React.Fragment>
              {renderSectionHeader("Top Charts", "Most played stations")}
              <FlatList
                data={topStations}
                renderItem={renderStationCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />

              {renderSectionHeader("Global Hits", "Worldwide favorites")}
              <FlatList
                data={discoverStations}
                renderItem={renderStationCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </React.Fragment>
          )}
        </ScrollView>

      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.8,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "500",
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
    fontSize: 14,
    fontWeight: "600",
  },
  horizontalList: {
    paddingRight: 20,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    width: (screenWidth - 60) / 2,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
