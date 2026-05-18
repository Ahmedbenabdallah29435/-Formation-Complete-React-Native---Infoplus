import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { dark } = useTheme();

  const tabBarBg = dark ? '#2A3047' : '#ffffff';
  const activeColor = dark ? '#90CAF9' : '#0D47A1';
  const inactiveColor = dark ? '#7A82A0' : '#9AA0A6';

  const androidMin = 0;
  const bottomPad = Platform.OS === 'android' ? Math.max(insets.bottom, androidMin) : insets.bottom;
  const baseHeight = 56;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopWidth: 0,
          height: baseHeight + bottomPad,
          paddingTop: 6,
          paddingBottom: bottomPad,
          shadowColor: '#0D47A1',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: dark ? 0 : 0.06,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="formations"
        options={{
          title: 'Formation',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="book.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
