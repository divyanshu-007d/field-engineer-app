import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from '../common/Card';
import { useTheme } from '../../design-system';
import { MaterialIcons } from '@expo/vector-icons';

export const AchievementBadge = ({ 
  achievement, 
  size = 'medium',
  showProgress = false,
  isVisible = true 
}) => {
  const { theme } = useTheme();

  if (!isVisible || !achievement) return null;

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { iconSize: 24, badgeSize: 48, fontSize: 12 };
      case 'large':
        return { iconSize: 48, badgeSize: 96, fontSize: 16 };
      default:
        return { iconSize: 32, badgeSize: 64, fontSize: 14 };
    }
  };

  const getBadgeColor = () => {
    switch (achievement.tier) {
      case 'bronze':
        return '#CD7F32';
      case 'silver':
        return '#C0C0C0';
      case 'gold':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      default:
        return theme?.colors?.primary || '#2979ff';
    }
  };

  const sizeConfig = getSizeConfig();
  const badgeColor = getBadgeColor();
  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 100;
  const progressPercent = (progress / maxProgress) * 100;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      opacity: achievement.unlocked ? 1 : 0.5,
    },
    badgeContainer: {
      width: sizeConfig.badgeSize,
      height: sizeConfig.badgeSize,
      borderRadius: sizeConfig.badgeSize / 2,
      backgroundColor: badgeColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme?.spacing?.xs || 4,
      elevation: achievement.unlocked ? 3 : 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    badgeIcon: {
      color: '#FFFFFF',
    },
    titleText: {
      fontSize: sizeConfig.fontSize,
      fontWeight: tokens.typography.labelMedium.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.xs || 4,
    },
    descriptionText: {
      fontSize: sizeConfig.fontSize - 2,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      lineHeight: 16,
    },
    progressContainer: {
      marginTop: theme?.spacing?.xs || 4,
      width: '100%',
      alignItems: 'center',
    },
    progressBar: {
      width: '100%',
      height: 4,
      backgroundColor: theme?.colors?.outline || '#E0E0E0',
      borderRadius: 2,
      overflow: 'hidden',
      marginBottom: theme?.spacing?.xs || 4,
    },
    progressFill: {
      height: '100%',
      backgroundColor: badgeColor,
      borderRadius: 2,
    },
    progressText: {
      fontSize: 10,
      color: theme?.colors?.onSurface || '#000000',
    },
    unlockedDate: {
      fontSize: 10,
      color: theme?.colors?.onSurface || '#000000',
      marginTop: theme?.spacing?.xs || 4,
      fontStyle: 'italic',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <MaterialIcons 
          name={achievement.icon || 'emoji-events'} 
          size={sizeConfig.iconSize} 
          style={styles.badgeIcon}
        />
      </View>
      
      <Text style={styles.titleText}>{achievement.title}</Text>
      
      {size !== 'small' && achievement.description && (
        <Text style={styles.descriptionText} numberOfLines={2}>
          {achievement.description}
        </Text>
      )}

      {showProgress && !achievement.unlocked && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${Math.min(progressPercent, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {progress} / {maxProgress}
          </Text>
        </View>
      )}

      {achievement.unlocked && achievement.unlockedDate && (
        <Text style={styles.unlockedDate}>
          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
        </Text>
      )}
    </View>
  );
};

export const AchievementGrid = ({ achievements, columns = 3, showProgress = true }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.md || 16,
      textAlign: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    achievementItem: {
      width: `${100 / columns - 2}%`,
      marginBottom: theme?.spacing?.md || 16,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>Achievements</Text>
        <View style={styles.grid}>
          {achievements.map((achievement, index) => (
            <View key={achievement.id || index} style={styles.achievementItem}>
              <AchievementBadge 
                achievement={achievement} 
                size="small"
                showProgress={showProgress}
              />
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};