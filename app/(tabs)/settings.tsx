import { GradientBackground } from "@/components/GradientBackground";
import { Typography } from "@/components/typography";
import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import {
  ArrowLeft,
  Bell,
  Download,
  Heart,
  Moon,
  Share,
  Sun,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const currentColors = colors[colorScheme ?? "light"];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsItems = [
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Get notified about new stations",
      icon: Bell,
      type: "toggle",
      value: notificationsEnabled,
      onPress: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: "theme",
      title: "Dark Mode",
      subtitle: "Switch to dark mode",
      icon: darkMode ? Sun : Moon,
      type: "toggle",
      value: darkMode,
      onPress: () => setDarkMode(!darkMode),
    },
    {
      id: "downloads",
      title: "Downloads",
      subtitle: "Manage downloaded content",
      icon: Download,
      type: "navigate",
      onPress: () => {},
    },
    {
      id: "favorites",
      title: "My Favorites",
      subtitle: "View your favorite stations",
      icon: Heart,
      type: "navigate",
      onPress: () => {},
    },
    {
      id: "share",
      title: "Share App",
      subtitle: "Tell your friends about this app",
      icon: Share,
      type: "navigate",
      onPress: () => {},
    },
  ];

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={currentColors.text} />
          </TouchableOpacity>
          <Typography variant="h4" color="primary" weight="bold">
            Settings
          </Typography>
          <View style={styles.placeholder} />
        </View>

        {/* Settings List */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={item.onPress}
            >
              <View style={styles.settingLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: currentColors.accent },
                  ]}
                >
                  <item.icon size={20} color="#fff" />
                </View>
                <View style={styles.settingText}>
                  <Typography variant="h6" color="primary" weight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    {item.subtitle}
                  </Typography>
                </View>
              </View>

              {item.type === "toggle" ? (
                <View
                  style={[
                    styles.toggle,
                    {
                      backgroundColor: item.value
                        ? currentColors.accent
                        : colors.background.main,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      {
                        backgroundColor: colors.neutral.white,
                        transform: [
                          { translateX: item.value ? spacing.ml : 0 },
                        ],
                      },
                    ]}
                  />
                </View>
              ) : (
                <ArrowLeft
                  size={20}
                  color={currentColors.text}
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              )}
            </TouchableOpacity>
          ))}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {},
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.ml,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    marginVertical: spacing.xs,
    backgroundColor: colors.background.card,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: 4,
  },
  settingSubtitle: {
    opacity: 0.8,
  },
  toggle: {
    width: spacing.xxl,
    height: spacing.lgs,
    borderRadius: radius.full,
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  toggleThumb: {
    width: spacing.ml,
    height: spacing.ml,
    borderRadius: radius.full,
    shadowOffset: { width: 0, height: radius.xs },
    shadowOpacity: 0.2,
    shadowRadius: radius.xs,
    elevation: radius.xs,
  },
});
