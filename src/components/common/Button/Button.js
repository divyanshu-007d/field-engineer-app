import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const Button = ({
  title,
  onPress,
  variant = 'filled', // filled, outlined, text
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}) => {
  const { colors, isDark } = useTheme();
  
  const getButtonStyles = () => {
    const baseStyle = {
      height: tokens.componentTokens.button.height[size],
      paddingHorizontal: tokens.componentTokens.button.paddingHorizontal[size],
      borderRadius: tokens.componentTokens.button.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.outline : colors.primary,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.outline : colors.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          paddingHorizontal: tokens.spacing.md,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyles = () => {
    const baseTextStyle = {
      ...tokens.typography.labelLarge,
      fontWeight: '500',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseTextStyle,
          color: disabled ? colors.onSurfaceVariant : colors.onPrimary,
        };
      case 'outlined':
      case 'text':
        return {
          ...baseTextStyle,
          color: disabled ? colors.onSurfaceVariant : colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'filled' ? colors.onPrimary : colors.primary} 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyles(), textStyle, icon && { marginLeft: tokens.spacing.xs }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;