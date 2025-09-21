import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const PriorityBadge = ({
  priority = 'medium', // low, medium, high, critical
  size = 'medium', // small, medium, large
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors } = theme || {};

  const getPriorityConfig = () => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return {
          backgroundColor: colors.error,
          textColor: colors.onError,
          label: 'CRITICAL',
        };
      case 'high':
        return {
          backgroundColor: colors.secondary,
          textColor: colors.onSecondary,
          label: 'HIGH',
        };
      case 'medium':
        return {
          backgroundColor: colors.tertiary,
          textColor: colors.onTertiary,
          label: 'MEDIUM',
        };
      case 'low':
        return {
          backgroundColor: colors.surfaceVariant,
          textColor: colors.onSurfaceVariant,
          label: 'LOW',
        };
      default:
        return {
          backgroundColor: colors.surfaceVariant,
          textColor: colors.onSurfaceVariant,
          label: priority.toUpperCase(),
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: theme?.spacing?.xs || 4,
          paddingVertical: theme?.spacing?.xs || 4 / 2,
          fontSize: tokens.typography.labelSmall.fontSize,
          borderRadius: theme?.borderRadius?.xs || 2,
        };
      case 'large':
        return {
          paddingHorizontal: theme?.spacing?.md || 16,
          paddingVertical: theme?.spacing?.sm || 8,
          fontSize: theme?.typography?.labelLarge?.fontSize || 14,
          borderRadius: theme?.borderRadius?.sm || 4,
        };
      case 'medium':
      default:
        return {
          paddingHorizontal: theme?.spacing?.sm || 8,
          paddingVertical: theme?.spacing?.xs || 4,
          fontSize: tokens.typography.labelMedium.fontSize,
          borderRadius: theme?.borderRadius?.xs || 2,
        };
    }
  };

  const priorityConfig = getPriorityConfig();
  const sizeConfig = getSizeConfig();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: priorityConfig.backgroundColor,
          paddingHorizontal: sizeConfig.paddingHorizontal,
          paddingVertical: sizeConfig.paddingVertical,
          borderRadius: sizeConfig.borderRadius,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          {
            color: priorityConfig.textColor,
            fontSize: sizeConfig.fontSize,
            fontWeight: '600',
          },
        ]}
      >
        {priorityConfig.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    letterSpacing: 0.5,
  },
});

export default PriorityBadge;