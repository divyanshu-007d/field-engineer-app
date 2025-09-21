import React from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text } from 'react-native';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const SkillBadge = ({ 
  skill, 
  level = 'beginner',
  verified = false,
  showProgress = false,
  size = 'medium' 
}) => {
  const { theme } = useTheme();

  const getLevelColor = () => {
    switch (level) {
      case 'expert':
        return theme?.colors?.success || '#4CAF50';
      case 'advanced':
        return theme?.colors?.primary || '#2979ff';
      case 'intermediate':
        return theme?.colors?.secondary || '#03DAC6';
      default:
        return theme?.colors?.outline || '#E0E0E0';
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { badgeSize: 40, iconSize: 20, fontSize: 10 };
      case 'large':
        return { badgeSize: 80, iconSize: 40, fontSize: 16 };
      default:
        return { badgeSize: 60, iconSize: 30, fontSize: 12 };
    }
  };

  const sizeConfig = getSizeConfig();
  const levelColor = getLevelColor();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: theme?.spacing?.xs || 4,
    },
    badge: {
      width: sizeConfig.badgeSize,
      height: sizeConfig.badgeSize,
      borderRadius: sizeConfig.badgeSize / 2,
      backgroundColor: levelColor,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      elevation: verified ? 3 : 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    icon: {
      color: tokens.colors.onPrimary,
    },
    verifiedBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: theme?.colors?.success || '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    skillName: {
      fontSize: sizeConfig.fontSize,
      fontWeight: tokens.typography.labelMedium.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginTop: theme?.spacing?.xs || 4,
    },
    levelText: {
      fontSize: sizeConfig.fontSize - 2,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <MaterialIcons 
          name={skill.icon || 'star'} 
          size={sizeConfig.iconSize} 
          style={styles.icon}
        />
        {verified && (
          <View style={styles.verifiedBadge}>
            <MaterialIcons 
              name="verified" 
              size={10} 
              color={tokens.colors.onSuccess}
            />
          </View>
        )}
      </View>
      <Text style={styles.skillName}>{skill.name}</Text>
      <Text style={styles.levelText}>{level}</Text>
    </View>
  );
};

export const SkillsGrid = ({ skills = [], title = "Skills & Expertise" }) => {
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
      justifyContent: 'space-around',
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.grid}>
          {skills.map((skill, index) => (
            <SkillBadge
              key={skill.id || index}
              skill={skill}
              level={skill.level}
              verified={skill.verified}
              size="medium"
            />
          ))}
        </View>
      </View>
    </Card>
  );
};