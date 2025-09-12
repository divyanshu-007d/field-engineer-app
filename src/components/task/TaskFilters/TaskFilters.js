import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const TaskFilters = ({
  filters = {},
  onFilterChange,
  availableStatuses = ['all', 'pending', 'in-progress', 'completed', 'overdue'],
  availablePriorities = ['all', 'low', 'medium', 'high', 'critical'],
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const handleStatusFilter = (status) => {
    onFilterChange?.({
      ...filters,
      status: filters.status === status ? 'all' : status,
    });
  };

  const handlePriorityFilter = (priority) => {
    onFilterChange?.({
      ...filters,
      priority: filters.priority === priority ? 'all' : priority,
    });
  };

  const clearAllFilters = () => {
    onFilterChange?.({
      status: 'all',
      priority: 'all',
      assignedTo: 'all',
      dateRange: 'all',
    });
  };

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { color: colors.primary, label: 'Completed' };
      case 'in-progress':
        return { color: colors.secondary, label: 'In Progress' };
      case 'pending':
        return { color: colors.tertiary, label: 'Pending' };
      case 'overdue':
        return { color: colors.error, label: 'Overdue' };
      case 'all':
        return { color: colors.onSurfaceVariant, label: 'All Tasks' };
      default:
        return { color: colors.onSurfaceVariant, label: status };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return { color: colors.error, label: 'Critical' };
      case 'high':
        return { color: colors.secondary, label: 'High' };
      case 'medium':
        return { color: colors.tertiary, label: 'Medium' };
      case 'low':
        return { color: colors.surfaceVariant, label: 'Low' };
      case 'all':
        return { color: colors.onSurfaceVariant, label: 'All Priorities' };
      default:
        return { color: colors.onSurfaceVariant, label: priority };
    }
  };

  const renderFilterChip = (
    value,
    isActive,
    onPress,
    config,
    testID
  ) => {
    const chipStyle = isActive
      ? {
          backgroundColor: config.color,
          borderColor: config.color,
        }
      : {
          backgroundColor: 'transparent',
          borderColor: colors.outline,
        };

    const textStyle = isActive
      ? { color: colors.surface }
      : { color: colors.onSurfaceVariant };

    return (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        style={[styles.filterChip, chipStyle]}
        activeOpacity={0.7}
      >
        <Text style={[styles.filterChipText, textStyle]}>
          {config.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    (filters.assignedTo && filters.assignedTo !== 'all') ||
    (filters.dateRange && filters.dateRange !== 'all');

  return (
    <View style={[styles.container, style]} {...props}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Filters
        </Text>
        {hasActiveFilters && (
          <TouchableOpacity
            onPress={clearAllFilters}
            style={styles.clearButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.clearButtonText, { color: colors.primary }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Status Filters */}
      <View style={styles.filterSection}>
        <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
          Status
        </Text>
        <View style={styles.chipContainer}>
          {availableStatuses.map((status) => {
            const config = getStatusConfig(status);
            const isActive = filters.status === status;
            
            return renderFilterChip(
              status,
              isActive,
              () => handleStatusFilter(status),
              config,
              `status-filter-${status}`
            );
          })}
        </View>
      </View>

      {/* Priority Filters */}
      <View style={styles.filterSection}>
        <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
          Priority
        </Text>
        <View style={styles.chipContainer}>
          {availablePriorities.map((priority) => {
            const config = getPriorityConfig(priority);
            const isActive = filters.priority === priority;
            
            return renderFilterChip(
              priority,
              isActive,
              () => handlePriorityFilter(priority),
              config,
              `priority-filter-${priority}`
            );
          })}
        </View>
      </View>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <View style={[styles.summarySection, { borderTopColor: colors.outlineVariant }]}>
          <Text style={[styles.summaryText, { color: colors.onSurfaceVariant }]}>
            Active filters: {' '}
            {filters.status !== 'all' && getStatusConfig(filters.status).label}
            {filters.status !== 'all' && filters.priority !== 'all' && ', '}
            {filters.priority !== 'all' && getPriorityConfig(filters.priority).label}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  title: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    lineHeight: tokens.typography.titleMedium.lineHeight,
  },
  clearButton: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
  },
  clearButtonText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: tokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: tokens.typography.labelLarge.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.sm,
    letterSpacing: 0.1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.borderRadius.full,
    borderWidth: 1,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  summarySection: {
    paddingTop: tokens.spacing.md,
    borderTopWidth: 1,
    marginTop: tokens.spacing.sm,
  },
  summaryText: {
    fontSize: tokens.typography.bodySmall.fontSize,
    lineHeight: tokens.typography.bodySmall.lineHeight,
    fontStyle: 'italic',
  },
});

export default TaskFilters;