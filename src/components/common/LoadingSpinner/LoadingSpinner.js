import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const LoadingSpinner = ({
  size = 'large', // small, large
  color,
  style,
  overlay = false,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors } = theme || {};

  const spinnerColor = color || colors.primary;

  if (overlay) {
    return (
      <View style={[styles.overlay, { backgroundColor: colors.scrim + '80' }, style]}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator 
            size={size} 
            color={spinnerColor} 
            {...props} 
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator 
        size={size} 
        color={spinnerColor} 
        {...props} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme?.spacing?.md || 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: tokens.zIndex.overlay,
  },
  spinnerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme?.borderRadius?.md || 8,
    padding: theme?.spacing?.lg || 24,
    ...tokens.elevation.level3,
  },
});

export default LoadingSpinner;