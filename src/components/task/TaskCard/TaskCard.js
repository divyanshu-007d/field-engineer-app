import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';
import Card from '../../common/Card';
import PriorityBadge from '../PriorityBadge';

const TaskCard = ({
  task,
  onPress,
  onPriorityPress,
  style,
  variant = 'default', // default, compact, detailed
  ...props
}) => {
  const { theme } = useTheme();
  const { colors, isDark } = theme || {};

  if (!task) return null;

  const getStatusConfig = () => {
    switch (task.status?.toLowerCase()) {
      case 'completed':
        return {
          color: colors.primary,
          backgroundColor: `${colors.primary}15`,
          label: 'Completed',
        };
      case 'in-progress':
      case 'in_progress':
        return {
          color: colors.secondary,
          backgroundColor: `${colors.secondary}15`,
          label: 'In Progress',
        };
      case 'pending':
        return {
          color: colors.tertiary,
          backgroundColor: `${colors.tertiary}15`,
          label: 'Pending',
        };
      case 'overdue':
        return {
          color: colors.error,
          backgroundColor: `${colors.error}15`,
          label: 'Overdue',
        };
      default:
        return {
          color: colors.onSurfaceVariant,
          backgroundColor: `${colors.onSurfaceVariant}15`,
          label: task.status || 'Unknown',
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return dateString;
    }
  };

  const statusConfig = getStatusConfig();

  const renderCompactCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="outlined" style={[styles.compactCard, style]}>
        <View style={styles.compactHeader}>
          <View style={styles.compactTitleRow}>
            <Text
              style={[
                styles.title,
                { color: colors.onSurface, fontSize: theme?.typography?.titleMedium?.fontSize || 18 },
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <PriorityBadge priority={task.priority} size="small" />
          </View>
          <View style={styles.compactMetadata}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: statusConfig.color, fontSize: tokens.typography.labelSmall.fontSize },
                ]}
              >
                {statusConfig.label}
              </Text>
            </View>
            {task.dueDate && (
              <Text
                style={[
                  styles.metadataText,
                  { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
                ]}
              >
                Due {formatDate(task.dueDate)}
              </Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderDetailedCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" style={[styles.detailedCard, style]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                { color: colors.onSurface, fontSize: tokens.typography.titleLarge.fontSize },
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <TouchableOpacity onPress={onPriorityPress} activeOpacity={0.8}>
              <PriorityBadge priority={task.priority} size="medium" />
            </TouchableOpacity>
          </View>
          
          {task.description && (
            <Text
              style={[
                styles.description,
                { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodyMedium.fontSize },
              ]}
              numberOfLines={3}
            >
              {task.description}
            </Text>
          )}
        </View>

        <View style={styles.metadata}>
          <View style={styles.metadataRow}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: statusConfig.color, fontSize: tokens.typography.labelMedium.fontSize },
                ]}
              >
                {statusConfig.label}
              </Text>
            </View>
            
            {task.location && (
              <Text
                style={[
                  styles.metadataText,
                  { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
                ]}
                numberOfLines={1}
              >
                📍 {task.location}
              </Text>
            )}
          </View>

          <View style={styles.metadataRow}>
            {task.dueDate && (
              <Text
                style={[
                  styles.metadataText,
                  { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
                ]}
              >
                Due: {formatDate(task.dueDate)} at {formatTime(task.dueDate)}
              </Text>
            )}
            
            {task.assignedTo && (
              <Text
                style={[
                  styles.metadataText,
                  { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
                ]}
                numberOfLines={1}
              >
                Assigned to: {task.assignedTo}
              </Text>
            )}
          </View>

          {task.tags && task.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {task.tags.slice(0, 3).map((tag, index) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    { backgroundColor: `${colors.primary}15`, borderColor: `${colors.primary}30` },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: colors.primary, fontSize: tokens.typography.labelSmall.fontSize },
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
              {task.tags.length > 3 && (
                <Text
                  style={[
                    styles.metadataText,
                    { color: colors.onSurfaceVariant, fontSize: tokens.typography.labelSmall.fontSize },
                  ]}
                >
                  +{task.tags.length - 3} more
                </Text>
              )}
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderDefaultCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="outlined" style={[styles.defaultCard, style]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                { color: colors.onSurface, fontSize: theme?.typography?.titleMedium?.fontSize || 18 },
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <TouchableOpacity onPress={onPriorityPress} activeOpacity={0.8}>
              <PriorityBadge priority={task.priority} size="small" />
            </TouchableOpacity>
          </View>
          
          {task.description && (
            <Text
              style={[
                styles.description,
                { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
              ]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          )}
        </View>

        <View style={styles.metadata}>
          <View style={styles.metadataRow}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.backgroundColor },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: statusConfig.color, fontSize: tokens.typography.labelSmall.fontSize },
                ]}
              >
                {statusConfig.label}
              </Text>
            </View>
            
            {task.dueDate && (
              <Text
                style={[
                  styles.metadataText,
                  { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
                ]}
              >
                Due {formatDate(task.dueDate)}
              </Text>
            )}
          </View>

          {task.location && (
            <Text
              style={[
                styles.metadataText,
                { color: colors.onSurfaceVariant, fontSize: tokens.typography.bodySmall.fontSize },
              ]}
              numberOfLines={1}
            >
              📍 {task.location}
            </Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  switch (variant) {
    case 'compact':
      return renderCompactCard();
    case 'detailed':
      return renderDetailedCard();
    default:
      return renderDefaultCard();
  }
};

const styles = StyleSheet.create({
  defaultCard: {
    marginBottom: theme?.spacing?.sm || 8,
  },
  compactCard: {
    marginBottom: theme?.spacing?.xs || 4,
  },
  detailedCard: {
    marginBottom: theme?.spacing?.md || 16,
  },
  compactHeader: {
    padding: theme?.spacing?.sm || 8,
  },
  header: {
    padding: theme?.spacing?.md || 16,
    paddingBottom: theme?.spacing?.sm || 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme?.spacing?.xs || 4,
  },
  compactTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme?.spacing?.xs || 4,
  },
  title: {
    flex: 1,
    marginRight: theme?.spacing?.sm || 8,
    fontWeight: '600',
    lineHeight: tokens.typography.titleMedium.lineHeight,
  },
  description: {
    lineHeight: tokens.typography.bodyMedium.lineHeight,
    marginTop: theme?.spacing?.xs || 4,
  },
  metadata: {
    paddingHorizontal: theme?.spacing?.md || 16,
    paddingBottom: theme?.spacing?.md || 16,
    gap: theme?.spacing?.xs || 4,
  },
  compactMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme?.spacing?.xs || 4,
  },
  statusBadge: {
    paddingHorizontal: theme?.spacing?.sm || 8,
    paddingVertical: theme?.spacing?.xs || 4 / 2,
    borderRadius: theme?.borderRadius?.xs || 2,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  metadataText: {
    lineHeight: tokens.typography.bodySmall.lineHeight,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme?.spacing?.xs || 4,
    marginTop: theme?.spacing?.xs || 4,
  },
  tag: {
    paddingHorizontal: theme?.spacing?.sm || 8,
    paddingVertical: theme?.spacing?.xs || 4 / 2,
    borderRadius: theme?.borderRadius?.xs || 2,
    borderWidth: 1,
  },
  tagText: {
    fontWeight: '500',
  },
});

export default TaskCard;