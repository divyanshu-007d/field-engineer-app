import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity 
} from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const { width: screenWidth } = Dimensions.get('window');

const Toast = ({
  message,
  type = 'info', // success, error, warning, info
  duration = 3000,
  onHide,
  visible = true,
  action,
  actionText,
  onActionPress,
}) => {
  const { theme } = useTheme();
  const { colors } = theme || {};
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const getToastColors = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.tertiary,
          textColor: colors.onTertiary,
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          textColor: colors.onError,
        };
      case 'warning':
        return {
          backgroundColor: colors.secondary,
          textColor: colors.onSecondary,
        };
      case 'info':
      default:
        return {
          backgroundColor: colors.inverseSurface,
          textColor: colors.onInverseSurface,
        };
    }
  };

  const toastColors = getToastColors();

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: tokens.motion.duration.medium2,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: tokens.motion.duration.medium2,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide
      if (duration > 0) {
        const hideTimer = setTimeout(() => {
          hideToast();
        }, duration);

        return () => clearTimeout(hideTimer);
      }
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: tokens.motion.duration.short4,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: tokens.motion.duration.short4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastColors.backgroundColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text 
        style={[
          styles.message,
          tokens.typography.bodyMedium,
          { color: toastColors.textColor }
        ]}
        numberOfLines={2}
      >
        {message}
      </Text>
      
      {action && actionText && (
        <TouchableOpacity 
          style={styles.action}
          onPress={onActionPress}
        >
          <Text 
            style={[
              styles.actionText,
              tokens.typography.labelMedium,
              { color: toastColors.textColor }
            ]}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: theme?.spacing?.md || 16,
    right: theme?.spacing?.md || 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme?.spacing?.md || 16,
    borderRadius: theme?.borderRadius?.md || 8,
    zIndex: tokens.zIndex.toast,
    ...tokens.elevation.level3,
  },
  message: {
    flex: 1,
    marginRight: theme?.spacing?.sm || 8,
  },
  action: {
    paddingHorizontal: theme?.spacing?.sm || 8,
    paddingVertical: theme?.spacing?.xs || 4,
  },
  actionText: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default Toast;