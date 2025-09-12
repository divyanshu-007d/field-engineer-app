import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const Card = ({
  children,
  variant = 'elevated', // elevated, filled, outlined
  onPress,
  style,
  contentStyle,
  ...props
}) => {
  const { colors } = useTheme();

  const getCardStyles = () => {
    const baseStyle = {
      borderRadius: tokens.componentTokens.card.borderRadius,
      padding: tokens.componentTokens.card.padding,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceContainerLow,
          ...tokens.elevation.level1,
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceContainerHighest,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.outlineVariant,
        };
      default:
        return baseStyle;
    }
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[getCardStyles(), style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      {...props}
    >
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  content: {
    // Additional content styling can go here
  },
});

export default Card;