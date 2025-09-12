import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';
import TaskCard from '../TaskCard';
import TaskFilters from '../TaskFilters';
import LoadingSpinner from '../../common/LoadingSpinner';

const TaskList = ({
  tasks = [],
  loading = false,
  refreshing = false,
  onRefresh,
  onTaskPress,
  onTaskPriorityPress,
  filters: externalFilters,
  onFiltersChange,
  showFilters = true,
  variant = 'default', // default, compact, detailed
  emptyMessage = 'No tasks found',
  emptySubMessage = 'Tasks will appear here when available',
  style,
  contentContainerStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const [internalFilters, setInternalFilters] = useState({
    status: 'all',
    priority: 'all',
    assignedTo: 'all',
    dateRange: 'all',
  });

  // Use external filters if provided, otherwise use internal state
  const activeFilters = externalFilters || internalFilters;
  const handleFiltersChange = onFiltersChange || setInternalFilters;

  // Filter tasks based on active filters
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (activeFilters.status !== 'all' && task.status?.toLowerCase() !== activeFilters.status?.toLowerCase()) {
      return false;
    }

    // Priority filter
    if (activeFilters.priority !== 'all' && task.priority?.toLowerCase() !== activeFilters.priority?.toLowerCase()) {
      return false;
    }

    // Assigned to filter (if implemented)
    if (activeFilters.assignedTo !== 'all' && task.assignedTo?.toLowerCase() !== activeFilters.assignedTo?.toLowerCase()) {
      return false;
    }

    // Date range filter (can be extended)
    if (activeFilters.dateRange !== 'all') {
      const now = new Date();
      const taskDate = new Date(task.dueDate);
      
      switch (activeFilters.dateRange) {
        case 'today':
          if (taskDate.toDateString() !== now.toDateString()) return false;
          break;
        case 'this-week':
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
          const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
          if (taskDate < weekStart || taskDate > weekEnd) return false;
          break;
        case 'overdue':
          if (taskDate >= now || task.status?.toLowerCase() === 'completed') return false;
          break;
        default:
          break;
      }
    }

    return true;
  });

  // Sort tasks by priority and due date
  const sortedTasks = filteredTasks.sort((a, b) => {
    // First sort by priority
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority?.toLowerCase()] || 0;
    const bPriority = priorityOrder[b.priority?.toLowerCase()] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority; // Higher priority first
    }
    
    // Then sort by due date
    const aDate = new Date(a.dueDate || '9999-12-31');
    const bDate = new Date(b.dueDate || '9999-12-31');
    return aDate - bDate; // Earlier dates first
  });

  const renderTask = ({ item, index }) => (
    <TaskCard
      task={item}
      variant={variant}
      onPress={() => onTaskPress?.(item, index)}
      onPriorityPress={() => onTaskPriorityPress?.(item, index)}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyMessage, { color: colors.onSurfaceVariant }]}>
        {emptyMessage}
      </Text>
      <Text style={[styles.emptySubMessage, { color: colors.onSurfaceVariant }]}>
        {emptySubMessage}
      </Text>
    </View>
  );

  const renderHeader = () => {
    if (!showFilters) return null;
    
    return (
      <View style={styles.filtersContainer}>
        <TaskFilters
          filters={activeFilters}
          onFilterChange={handleFiltersChange}
        />
        
        {/* Results summary */}
        <View style={[styles.resultsHeader, { borderBottomColor: colors.outlineVariant }]}>
          <Text style={[styles.resultsText, { color: colors.onSurfaceVariant }]}>
            {sortedTasks.length} {sortedTasks.length === 1 ? 'task' : 'tasks'}
            {activeFilters.status !== 'all' || activeFilters.priority !== 'all' ? ' (filtered)' : ''}
          </Text>
        </View>
      </View>
    );
  };

  if (loading && tasks.length === 0) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <LoadingSpinner size="large" message="Loading tasks..." />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={sortedTasks}
        renderItem={renderTask}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          ) : undefined
        }
        contentContainerStyle={[
          styles.contentContainer,
          sortedTasks.length === 0 && styles.emptyContentContainer,
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.xl,
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
  },
  filtersContainer: {
    marginBottom: tokens.spacing.lg,
  },
  resultsHeader: {
    paddingVertical: tokens.spacing.sm,
    borderBottomWidth: 1,
    marginTop: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  resultsText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: tokens.spacing.xl * 2,
    paddingHorizontal: tokens.spacing.lg,
  },
  emptyMessage: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: tokens.spacing.sm,
  },
  emptySubMessage: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    textAlign: 'center',
    lineHeight: tokens.typography.bodyMedium.lineHeight,
  },
});

export default TaskList;