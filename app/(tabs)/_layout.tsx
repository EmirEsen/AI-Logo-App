import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerTitle: 'HEXA',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold'
        },
        headerStyle: {
          height: 100
        },
        tabBarStyle: {
          position: 'absolute',
          height: 90,
          borderTopWidth: 0
        },
        tabBarIconStyle: {
          marginTop: 8,
          marginBottom: 8
        },
        tabBarBackground: () => (
          <BlurView intensity={90} tint={'dark'} style={{ flex: 1 }} />
        )
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused, color }) => (
            <SymbolView size={32} name={focused ? 'sparkles' : 'sparkles'} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
