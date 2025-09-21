import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../design-system/ThemeProvider';
import tokens from '../design-system/tokens';

// Import screens
import { LoginScreen, ProfileSetupScreen } from '../screens/auth';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const { theme } = useTheme();
  const { colors } = theme || {};

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Employee Login',
        }}
      />
      <Stack.Screen 
        name="ProfileSetup" 
        component={ProfileSetupScreen}
        options={{
          title: 'Profile Setup',
          gestureEnabled: false, // Prevent going back during setup
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;