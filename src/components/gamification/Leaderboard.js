import React, { useState } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const LeaderboardEntry = ({ 
  user, 
  rank, 
  currentUser = false,
  showDetails = true,
  onPress 
}) => {
  const { theme } = useTheme();

  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return { name: 'emoji-events', color: '#FFD700' }; // Gold
      case 2:
        return { name: 'emoji-events', color: '#C0C0C0' }; // Silver
      case 3:
        return { name: 'emoji-events', color: '#CD7F32' }; // Bronze
      default:
        return { name: 'person', color: theme?.colors?.onSurface || '#000000' };
    }
  };

  const rankIcon = getRankIcon();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme?.spacing?.md || 16,
      backgroundColor: currentUser ? theme?.colors?.primary || '#2979ff' : 'transparent',
      borderRadius: theme?.borderRadius?.sm || 4,
      marginBottom: theme?.spacing?.xs || 4,
    },
    rankContainer: {
      width: 40,
      alignItems: 'center',
      marginRight: theme?.spacing?.md || 16,
    },
    rankNumber: {
      fontSize: tokens.typography.titleSmall.fontSize,
      fontWeight: tokens.typography.titleSmall.fontWeight,
      color: currentUser ? tokens.colors.onPrimaryContainer : theme?.colors?.onSurface || '#000000',
    },
    rankIcon: {
      marginTop: 2,
    },
    userInfo: {
      flex: 1,
      marginRight: theme?.spacing?.md || 16,
    },
    userName: {
      fontSize: tokens.typography.bodyLarge.fontSize,
      fontWeight: tokens.typography.bodyLarge.fontWeight,
      color: currentUser ? tokens.colors.onPrimaryContainer : theme?.colors?.onSurface || '#000000',
      marginBottom: 2,
    },
    userDetails: {
      fontSize: tokens.typography.bodySmall.fontSize,
      color: currentUser ? tokens.colors.onPrimaryContainer : theme?.colors?.onSurface || '#000000',
    },
    scoreContainer: {
      alignItems: 'flex-end',
    },
    scoreText: {
      fontSize: tokens.typography.titleSmall.fontSize,
      fontWeight: tokens.typography.titleSmall.fontWeight,
      color: currentUser ? tokens.colors.onPrimaryContainer : theme?.colors?.primary || '#2979ff',
    },
    scoreLabel: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: currentUser ? tokens.colors.onPrimaryContainer : theme?.colors?.onSurface || '#000000',
    },
  });

  const EntryContent = (
    <View style={styles.container}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankNumber}>#{rank}</Text>
        {rank <= 3 && (
          <MaterialIcons 
            name={rankIcon.name} 
            size={16} 
            color={rankIcon.color}
            style={styles.rankIcon}
          />
        )}
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        {showDetails && (
          <Text style={styles.userDetails}>
            {user.department} • {user.tasksCompleted} tasks
          </Text>
        )}
      </View>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{user.score.toLocaleString()}</Text>
        <Text style={styles.scoreLabel}>points</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {EntryContent}
      </TouchableOpacity>
    );
  }

  return EntryContent;
};

export const Leaderboard = ({ 
  users = [], 
  currentUserId,
  title = "Leaderboard",
  timeframe = "week",
  showTimeframePicker = true,
  maxEntries = 10,
  isVisible = true 
}) => {
  const { theme } = useTheme();
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);

  if (!isVisible) return null;

  const timeframes = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ];

  const sortedUsers = [...users]
    .sort((a, b) => b.score - a.score)
    .slice(0, maxEntries)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  const currentUserRank = sortedUsers.find(user => user.id === currentUserId);
  const currentUserInTop = currentUserRank !== undefined;

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme?.spacing?.lg || 24,
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
    },
    timeframeContainer: {
      flexDirection: 'row',
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
      padding: 2,
    },
    timeframeButton: {
      paddingHorizontal: theme?.spacing?.sm || 8,
      paddingVertical: theme?.spacing?.xs || 4,
      borderRadius: theme?.borderRadius?.xs || 2,
    },
    timeframeButtonActive: {
      backgroundColor: theme?.colors?.primary || '#2979ff',
    },
    timeframeText: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    timeframeTextActive: {
      color: tokens.colors.onPrimary,
      fontWeight: tokens.typography.labelSmall.fontWeight,
    },
    podiumContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: theme?.spacing?.lg || 24,
      height: 120,
    },
    podiumPlace: {
      alignItems: 'center',
      marginHorizontal: theme?.spacing?.xs || 4,
    },
    podiumBar: {
      width: 60,
      backgroundColor: theme?.colors?.primary || '#2979ff',
      borderTopLeftRadius: theme?.borderRadius?.sm || 4,
      borderTopRightRadius: theme?.borderRadius?.sm || 4,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingVertical: theme?.spacing?.xs || 4,
    },
    podiumBarFirst: {
      height: 80,
      backgroundColor: '#FFD700',
    },
    podiumBarSecond: {
      height: 60,
      backgroundColor: '#C0C0C0',
    },
    podiumBarThird: {
      height: 40,
      backgroundColor: '#CD7F32',
    },
    podiumRank: {
      fontSize: theme?.typography?.labelLarge?.fontSize || 14,
      fontWeight: theme?.typography?.labelLarge?.fontWeight || '600',
      color: '#FFFFFF',
    },
    podiumName: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginTop: theme?.spacing?.xs || 4,
      textAlign: 'center',
    },
    podiumScore: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    listContainer: {
      marginTop: theme?.spacing?.md || 16,
    },
    currentUserSection: {
      marginTop: theme?.spacing?.md || 16,
      paddingTop: theme?.spacing?.md || 16,
      borderTopWidth: 1,
      borderTopColor: theme?.colors?.outline || '#E0E0E0',
    },
    currentUserLabel: {
      fontSize: tokens.typography.labelMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.sm || 8,
      textAlign: 'center',
    },
  });

  const renderPodium = () => {
    const topThree = sortedUsers.slice(0, 3);
    if (topThree.length === 0) return null;

    return (
      <View style={styles.podiumContainer}>
        {/* Second Place */}
        {topThree[1] && (
          <View style={styles.podiumPlace}>
            <View style={[styles.podiumBar, styles.podiumBarSecond]}>
              <Text style={styles.podiumRank}>2</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>
              {topThree[1].name.split(' ')[0]}
            </Text>
            <Text style={styles.podiumScore}>
              {topThree[1].score.toLocaleString()}
            </Text>
          </View>
        )}
        
        {/* First Place */}
        {topThree[0] && (
          <View style={styles.podiumPlace}>
            <View style={[styles.podiumBar, styles.podiumBarFirst]}>
              <Text style={styles.podiumRank}>1</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>
              {topThree[0].name.split(' ')[0]}
            </Text>
            <Text style={styles.podiumScore}>
              {topThree[0].score.toLocaleString()}
            </Text>
          </View>
        )}
        
        {/* Third Place */}
        {topThree[2] && (
          <View style={styles.podiumPlace}>
            <View style={[styles.podiumBar, styles.podiumBarThird]}>
              <Text style={styles.podiumRank}>3</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>
              {topThree[2].name.split(' ')[0]}
            </Text>
            <Text style={styles.podiumScore}>
              {topThree[2].score.toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          
          {showTimeframePicker && (
            <View style={styles.timeframeContainer}>
              {timeframes.map((tf) => (
                <TouchableOpacity
                  key={tf.value}
                  style={[
                    styles.timeframeButton,
                    selectedTimeframe === tf.value && styles.timeframeButtonActive
                  ]}
                  onPress={() => setSelectedTimeframe(tf.value)}
                >
                  <Text
                    style={[
                      styles.timeframeText,
                      selectedTimeframe === tf.value && styles.timeframeTextActive
                    ]}
                  >
                    {tf.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {renderPodium()}

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {sortedUsers.slice(3).map((user) => (
            <LeaderboardEntry
              key={user.id}
              user={user}
              rank={user.rank}
              currentUser={user.id === currentUserId}
              showDetails={true}
            />
          ))}
        </ScrollView>

        {!currentUserInTop && currentUserId && (
          <View style={styles.currentUserSection}>
            <Text style={styles.currentUserLabel}>Your Position</Text>
            {/* This would show current user's position if not in top 10 */}
          </View>
        )}
      </View>
    </Card>
  );
};