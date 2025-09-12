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
  const { colors } = useTheme();

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
          paddingHorizontal: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs / 2,
          fontSize: tokens.typography.labelSmall.fontSize,
          borderRadius: tokens.borderRadius.xs,
        };
      case 'large':
        return {
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          fontSize: tokens.typography.labelLarge.fontSize,
          borderRadius: tokens.borderRadius.sm,
        };
      case 'medium':
      default:
        return {
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          fontSize: tokens.typography.labelMedium.fontSize,
          borderRadius: tokens.borderRadius.xs,
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