import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../design-system/ThemeProvider';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Import authentication context
import { AuthContext } from '../contexts/AuthContext';

const AppNavigator = () => {
  const { theme } = useTheme();
  const { colors, isDark } = theme || {};
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Simulate checking authentication state
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // In a real app, this would check AsyncStorage or SecureStore
        // For prototype, we'll start with auth flow
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsAuthenticated(false); // Start with login screen
      } catch (error) {
        console.error('Error checking auth state:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Authentication functions
  const signIn = async (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Create navigation theme based on current theme
  const navigationTheme = {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.onSurface,
      border: colors.outlineVariant,
      notification: colors.error,
    },
  };

  const authContextValue = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    isLoading,
  };

  if (isLoading) {
    // In a real app, you might show a splash screen here
    return null;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer theme={navigationTheme}>
        {isAuthenticated ? (
          <MainNavigator />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigator;