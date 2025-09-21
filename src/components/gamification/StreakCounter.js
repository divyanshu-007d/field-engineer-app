import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from '../common/Card';
import { useTheme } from '../../design-system';
import { MaterialIcons } from '@expo/vector-icons';

export const StreakCounter = ({ 
  streakCount = 0,
  streakType = "days",
  title = "Current Streak",
  icon = "local-fire-department",
  maxStreak = 0,
  isVisible = true 
}) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  const getStreakColor = () => {
    if (streakCount === 0) return theme?.colors?.onSurface || '#000000';
    if (streakCount < 7) return theme?.colors?.warning || '#FF9800';
    if (streakCount < 30) return theme?.colors?.primary || '#2979ff';
    return theme?.colors?.error || '#F44336'; // Hot streak!
  };

  const getStreakMessage = () => {
    if (streakCount === 0) return "Start your streak today!";
    if (streakCount === 1) return "Great start! Keep it up!";
    if (streakCount < 7) return "Building momentum!";
    if (streakCount < 30) return "You're on fire! 🔥";
    return "Unstoppable! 🚀";
  };

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
      alignItems: 'center',
    },
    iconContainer: {
      marginBottom: theme?.spacing?.md || 16,
    },
    streakNumber: {
      fontSize: 48,
      fontWeight: '800',
      color: getStreakColor(),
      textAlign: 'center',
    },
    streakLabel: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.xs || 4,
    },
    title: {
      fontSize: tokens.typography.bodyLarge.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.sm || 8,
    },
    message: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      fontStyle: 'italic',
    },
    maxStreakContainer: {
      marginTop: theme?.spacing?.md || 16,
      padding: theme?.spacing?.sm || 8,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maxStreakText: {
      fontSize: tokens.typography.labelMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginLeft: theme?.spacing?.xs || 4,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons 
            name={icon} 
            size={48} 
            color={getStreakColor()}
          />
        </View>
        
        <Text style={styles.title}>{title}</Text>
        
        <Text style={styles.streakNumber}>{streakCount}</Text>
        <Text style={styles.streakLabel}>{streakType} in a row</Text>
        
        <Text style={styles.message}>{getStreakMessage()}</Text>
        
        {maxStreak > 0 && (
          <View style={styles.maxStreakContainer}>
            <MaterialIcons 
              name="emoji-events" 
              size={16} 
              color={theme?.colors?.onSurface || '#000000'}
            />
            <Text style={styles.maxStreakText}>
              Best streak: {maxStreak} {streakType}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

export const StreakCalendar = ({ 
  streakData = [],
  currentMonth = new Date(),
  isVisible = true 
}) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDateStatus = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return streakData.find(item => item.date === dateString);
  };

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    monthYear: {
      fontSize: tokens.typography.bodyLarge.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.lg || 24,
    },
    calendar: {
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      padding: theme?.spacing?.sm || 8,
    },
    weekRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme?.spacing?.xs || 4,
    },
    dayHeader: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayHeaderText: {
      fontSize: tokens.typography.labelSmall.fontSize,
      fontWeight: tokens.typography.labelSmall.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
    },
    dayCell: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      margin: 1,
    },
    dayText: {
      fontSize: tokens.typography.labelMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    dayTextOtherMonth: {
      color: theme?.colors?.onSurface || '#000000',
      opacity: 0.5,
    },
    dayActive: {
      backgroundColor: theme?.colors?.primary || '#2979ff',
    },
    dayActiveText: {
      color: tokens.colors.onPrimary,
      fontWeight: 'bold',
    },
    legend: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme?.spacing?.md || 16,
      gap: theme?.spacing?.md || 16,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: theme?.spacing?.xs || 4,
    },
    legendText: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>Streak Calendar</Text>
        <Text style={styles.monthYear}>
          {currentMonth.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </Text>
        
        <View style={styles.calendar}>
          {/* Day headers */}
          <View style={styles.weekRow}>
            {dayNames.map(day => (
              <View key={day} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
            ))}
          </View>
          
          {/* Calendar grid */}
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                const dateStatus = getDateStatus(day);
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                
                return (
                  <View
                    key={dayIndex}
                    style={[
                      styles.dayCell,
                      dateStatus && styles.dayActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        !isCurrentMonth && styles.dayTextOtherMonth,
                        dateStatus && styles.dayActiveText,
                      ]}
                    >
                      {day.getDate()}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View 
              style={[
                styles.legendDot, 
                { backgroundColor: theme?.colors?.primary || '#2979ff' }
              ]} 
            />
            <Text style={styles.legendText}>Task completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View 
              style={[
                styles.legendDot, 
                { backgroundColor: theme?.colors?.outline || '#E0E0E0' }
              ]} 
            />
            <Text style={styles.legendText}>No activity</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};