import { MiniPlayer } from "@/components/MiniPlayer";
import { NavTab } from "@/components/navtab";
import { colors } from "@/constants/colors";
import { usePlayer } from "@/contexts/PlayerContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs, router } from "expo-router";
import { Home, Search, Settings } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentStation, isPlaying, pauseStation, resumeStation } =
    usePlayer();
  const insets = useSafeAreaInsets();

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
            tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: NavTab,
            
            tabBarStyle: {
              backgroundColor: colors[colorScheme ?? "light"].background,
              borderTopColor: "rgba(255, 255, 255, 0.1)",
              paddingBottom: insets.bottom,
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
