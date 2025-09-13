import { NavTab } from '@/components/navtab';
import { colors } from '@/constants/colors';
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import { Home, Play, Search } from 'lucide-react-native';
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: NavTab,
        tabBarStyle: {
          backgroundColor: colors[colorScheme ?? 'light'].background,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          title: 'Player',
          tabBarIcon: ({ color }) => <Play size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
