import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';
import Card from '../../common/Card';
import PriorityBadge from '../PriorityBadge';
import Button from '../../common/Button';

const TaskDetails = ({
  task,
  onEdit,
  onDelete,
  onUpdateStatus,
  onAssign,
  onClose,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  if (!task) {
    return (
      <View style={[styles.container, styles.emptyContainer, style]}>
        <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
          No task selected
        </Text>
      </View>
    );
  }

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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return dateString;
    }
  };

  const statusConfig = getStatusConfig();

  const renderInfoSection = (title, content, icon) => {
    if (!content) return null;
    
    return (
      <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
          {icon && <Text style={styles.infoIcon}>{icon}</Text>}
          <Text style={[styles.infoTitle, { color: colors.onSurfaceVariant }]}>
            {title}
          </Text>
        </View>
        <Text style={[styles.infoContent, { color: colors.onSurface }]}>
          {content}
        </Text>
      </View>
    );
  };

  const getNextStatus = () => {
    switch (task.status?.toLowerCase()) {
      case 'pending':
        return 'in-progress';
      case 'in-progress':
      case 'in_progress':
        return 'completed';
      case 'completed':
        return 'pending';
      default:
        return 'in-progress';
    }
  };

  const getStatusButtonLabel = () => {
    const nextStatus = getNextStatus();
    switch (nextStatus) {
      case 'in-progress':
        return 'Start Task';
      case 'completed':
        return 'Mark Complete';
      case 'pending':
        return 'Reopen Task';
      default:
        return 'Update Status';
    }
  };

  return (
    <ScrollView 
      style={[styles.container, style]} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {/* Header */}
      <Card variant="outlined" style={styles.headerCard}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: colors.onSurface }]}>
              {task.title}
            </Text>
            <View style={styles.badgeContainer}>
              <PriorityBadge priority={task.priority} size="medium" />
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusConfig.backgroundColor },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: statusConfig.color },
                  ]}
                >
                  {statusConfig.label}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>

      {/* Description */}
      {task.description && (
        <Card variant="filled" style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: colors.onSurface }]}>
              {task.description}
            </Text>
          </View>
        </Card>
      )}

      {/* Task Details */}
      <Card variant="filled" style={styles.sectionCard}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
            Task Details
          </Text>
          
          {renderInfoSection('Due Date', formatDate(task.dueDate), '📅')}
          {renderInfoSection('Location', task.location, '📍')}
          {renderInfoSection('Assigned To', task.assignedTo, '👤')}
          {renderInfoSection('Created', formatDate(task.createdAt), '📝')}
          {renderInfoSection('Updated', formatDate(task.updatedAt), '🔄')}
          
          {task.estimatedDuration && renderInfoSection(
            'Estimated Duration', 
            `${task.estimatedDuration} hours`, 
            '⏱️'
          )}
          
          {task.category && renderInfoSection('Category', task.category, '📂')}
        </View>
      </Card>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <Card variant="filled" style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {task.tags.map((tag, index) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    { 
                      backgroundColor: `${colors.primary}15`, 
                      borderColor: `${colors.primary}30` 
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      { color: colors.primary },
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      )}

      {/* Progress */}
      {task.progress !== undefined && (
        <Card variant="filled" style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
              Progress
            </Text>
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  { backgroundColor: `${colors.primary}20` },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    { 
                      backgroundColor: colors.primary,
                      width: `${Math.max(0, Math.min(100, task.progress))}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.onSurface }]}>
                {Math.round(task.progress)}%
              </Text>
            </View>
          </View>
        </Card>
      )}

      {/* Notes */}
      {task.notes && (
        <Card variant="filled" style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
              Notes
            </Text>
            <Text style={[styles.notes, { color: colors.onSurface }]}>
              {task.notes}
            </Text>
          </View>
        </Card>
      )}

      {/* Actions */}
      <Card variant="outlined" style={styles.actionsCard}>
        <View style={styles.actions}>
          <Button
            title={getStatusButtonLabel()}
            onPress={() => onUpdateStatus?.(getNextStatus())}
            variant="filled"
            style={styles.actionButton}
          />
          
          <View style={styles.secondaryActions}>
            <Button
              title="Edit"
              onPress={onEdit}
              variant="outlined"
              style={styles.secondaryButton}
            />
            <Button
              title="Assign"
              onPress={onAssign}
              variant="outlined"
              style={styles.secondaryButton}
            />
            <Button
              title="Delete"
              onPress={onDelete}
              variant="text"
              style={[styles.secondaryButton, { borderColor: colors.error }]}
              titleStyle={{ color: colors.error }}
            />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: tokens.spacing.md,
    paddingBottom: tokens.spacing.xl,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: tokens.typography.titleMedium.fontSize,
    textAlign: 'center',
  },
  headerCard: {
    marginBottom: tokens.spacing.md,
  },
  header: {
    padding: tokens.spacing.md,
  },
  titleSection: {
    marginBottom: tokens.spacing.sm,
  },
  title: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '600',
    lineHeight: tokens.typography.headlineSmall.lineHeight,
    marginBottom: tokens.spacing.md,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    flexWrap: 'wrap',
  },
  statusBadge: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.borderRadius.xs,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  sectionCard: {
    marginBottom: tokens.spacing.md,
  },
  section: {
    padding: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.md,
    letterSpacing: 0.1,
  },
  description: {
    fontSize: tokens.typography.bodyLarge.fontSize,
    lineHeight: tokens.typography.bodyLarge.lineHeight,
  },
  infoSection: {
    marginBottom: tokens.spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.xs,
  },
  infoIcon: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    marginRight: tokens.spacing.sm,
  },
  infoTitle: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  infoContent: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    lineHeight: tokens.typography.bodyMedium.lineHeight,
    marginLeft: tokens.spacing.lg + tokens.spacing.sm, // Icon width + margin
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  tag: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.borderRadius.xs,
    borderWidth: 1,
  },
  tagText: {
    fontSize: tokens.typography.labelSmall.fontSize,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: tokens.borderRadius.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: tokens.borderRadius.xs,
  },
  progressText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  notes: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    lineHeight: tokens.typography.bodyMedium.lineHeight,
    fontStyle: 'italic',
  },
  actionsCard: {
    marginTop: tokens.spacing.sm,
  },
  actions: {
    padding: tokens.spacing.md,
  },
  actionButton: {
    marginBottom: tokens.spacing.md,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    flexWrap: 'wrap',
  },
  secondaryButton: {
    flex: 1,
    minWidth: 100,
  },
});

export default TaskDetails;