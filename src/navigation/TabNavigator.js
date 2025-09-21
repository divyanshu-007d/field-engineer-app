import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../design-system/ThemeProvider';
import tokens from '../design-system/tokens';

// Import screens
import { 
  DashboardScreen, 
  TaskListScreen, 
  MapScreen, 
  CommunicationScreen, 
  ProfileScreen 
} from '../screens/main';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  const { colors, isDark } = theme || {};

  const getTabBarIcon = (route, focused) => {
    let icon;
    
    switch (route.name) {
      case 'Dashboard':
        icon = focused ? '🏠' : '🏡';
        break;
      case 'Map':
        icon = focused ? '🗺️' : '🗺️';
        break;
      case 'Tasks':
        icon = focused ? '📋' : '📋';
        break;
      case 'Communication':
        icon = focused ? '💬' : '💬';
        break;
      case 'Profile':
        icon = focused ? '👤' : '👤';
        break;
      default:
        icon = '📱';
    }
    
    return icon;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icon = getTabBarIcon(route, focused);
          return (
            <Text style={{ 
              fontSize: 24,
              opacity: focused ? 1 : 0.7
            }}>
              {icon}
            </Text>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outlineVariant,
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: tokens.typography.labelSmall.fontSize,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      })}
      initialRouteName="Tasks" // Center the main tasks tab
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TaskListScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarLabelStyle: {
            fontSize: tokens.typography.labelMedium.fontSize,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen 
        name="Communication" 
        component={CommunicationScreen}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;