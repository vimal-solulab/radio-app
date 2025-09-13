import { MiniPlayer } from "@/components/MiniPlayer";
import { NavTab } from "@/components/navtab";
import { colors } from "@/constants/colors";
import { usePlayer } from "@/contexts/PlayerContext";
import { Tabs, router } from "expo-router";
import { Home, Search, Settings } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  const {
    currentStation,
    isPlaying,
    pauseStation,
    resumeStation,
    isLoading,
    loadingProgress,
  } = usePlayer();

  const handleMiniPlayerPress = () => {
    router.push("/full-player");
  };

  const handleMiniPlayerPlayPause = () => {
    if (isPlaying) {
      pauseStation();
    } else {
      resumeStation();
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content Area */}
      <View style={styles.content}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.natural.accent,
            headerShown: false,
            tabBarButton: NavTab,
            tabBarInactiveTintColor: colors.text.secondary,
            tabBarStyle: {
              backgroundColor: colors.natural.cardBackground,
              height: 80,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => <Home size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color }) => <Search size={24} color={color} />,
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
            }}
          />
        </Tabs>
      </View>

      {/* Mini Player - Above Bottom Navigation */}
      {currentStation && (
        <MiniPlayer
          stationName={currentStation.name}
          stationDescription={currentStation.description}
          image={currentStation.image}
          logo={currentStation.logo}
          isPlaying={isPlaying}
          onPlayPause={handleMiniPlayerPlayPause}
          onPress={handleMiniPlayerPress}
          isVisible={!!currentStation}
          isLoading={isLoading}
          loadingProgress={loadingProgress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
});
