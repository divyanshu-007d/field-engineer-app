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
  const { colors } = useTheme();

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
    padding: tokens.spacing.md,
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
    borderRadius: tokens.borderRadius.md,
    padding: tokens.spacing.lg,
    ...tokens.elevation.level3,
  },
});

export default LoadingSpinner;