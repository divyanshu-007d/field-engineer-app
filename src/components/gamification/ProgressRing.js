import React, { useEffect, useRef } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, Animated } from 'react-native';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import Svg, { Circle } from 'react-native-svg';
import tokens from '../../design-system/tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressRing = ({ 
  progress = 0,
  maxProgress = 100,
  size = 120,
  strokeWidth = 8,
  title,
  subtitle,
  color,
  showPercentage = true,
  animated = true,
  isVisible = true 
}) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min((progress / maxProgress) * 100, 100);
  
  const ringColor = color || (theme?.colors?.primary || '#2979ff');
  const backgroundColor = theme?.colors?.outline || '#E0E0E0';

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progressPercent,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(progressPercent);
    }
  }, [progressPercent, animated]);

  if (!isVisible) return null;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    svgContainer: {
      transform: [{ rotate: '-90deg' }],
    },
    textContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressText: {
      fontSize: size * 0.16,
      fontWeight: tokens.typography.titleLarge.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
    },
    titleText: {
      fontSize: size * 0.08,
      fontWeight: tokens.typography.labelMedium.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
      marginTop: 2,
      textAlign: 'center',
    },
    subtitleText: {
      fontSize: size * 0.06,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
    },
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svgContainer}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [circumference, 0],
          })}
        />
      </Svg>
      
      <View style={styles.textContainer}>
        {showPercentage && (
          <Text style={styles.progressText}>
            {Math.round(progressPercent)}%
          </Text>
        )}
        {title && (
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={styles.subtitleText} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export const ProgressDashboard = ({ progressItems, title = "Progress Overview" }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.lg || 24,
      textAlign: 'center',
    },
    progressGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    progressItem: {
      marginBottom: theme?.spacing?.md || 16,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.progressGrid}>
          {progressItems.map((item, index) => (
            <View key={item.id || index} style={styles.progressItem}>
              <ProgressRing
                progress={item.progress}
                maxProgress={item.maxProgress}
                title={item.title}
                subtitle={item.subtitle}
                color={item.color}
                size={item.size || 100}
                animated={item.animated !== false}
              />
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};