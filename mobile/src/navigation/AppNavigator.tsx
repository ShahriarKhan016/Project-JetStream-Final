/**
 * App Navigator - Main navigation structure
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else {
            iconName = 'musical-note';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.accent.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.border.subtle,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.background.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'JetStream' }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{ title: 'Your Library' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.accent.primary,
          background: colors.background.primary,
          card: colors.background.secondary,
          text: colors.text.primary,
          border: colors.border.default,
          notification: colors.accent.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background.primary,
          },
          headerTintColor: colors.text.primary,
          headerShadowVisible: false,
          cardStyle: {
            backgroundColor: colors.background.primary,
          },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Player" 
          component={PlayerScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
