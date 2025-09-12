import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import { TaskList } from '../../components/task';

const TaskListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignedTo: 'all',
    dateRange: 'all',
  });

  // Mock task data
  const mockTasks = [
    {
      id: 1,
      title: 'Repair traffic light at Main St & 5th Ave',
      description: 'Traffic light is not functioning properly. Red light is stuck on.',
      priority: 'critical',
      status: 'pending',
      dueDate: '2025-09-13T14:00:00Z',
      createdAt: '2025-09-13T08:00:00Z',
      location: 'Main St & 5th Ave, Downtown',
      assignedTo: 'John Smith',
      category: 'Traffic Systems',
      tags: ['urgent', 'traffic', 'electrical'],
      progress: 0,
    },
    {
      id: 2,
      title: 'Fix pothole on Central Avenue',
      description: 'Large pothole causing vehicle damage. Size approximately 3x2 feet.',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-09-13T16:30:00Z',
      createdAt: '2025-09-12T14:30:00Z',
      updatedAt: '2025-09-13T09:15:00Z',
      location: 'Central Avenue, Block 200',
      assignedTo: 'John Smith',
      category: 'Road Maintenance',
      tags: ['road-repair', 'safety'],
      progress: 35,
    },
    {
      id: 3,
      title: 'Water main leak on Oak Street',
      description: 'Small water leak detected near fire hydrant. Requires investigation.',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-09-14T10:00:00Z',
      createdAt: '2025-09-13T07:45:00Z',
      location: 'Oak Street, near fire hydrant #127',
      assignedTo: 'John Smith',
      category: 'Water Systems',
      tags: ['water', 'leak', 'infrastructure'],
      progress: 0,
    },
    {
      id: 4,
      title: 'Broken streetlight on Elm Avenue',
      description: 'Streetlight not working. Bulb replacement needed.',
      priority: 'low',
      status: 'completed',
      dueDate: '2025-09-12T18:00:00Z',
      createdAt: '2025-09-11T16:20:00Z',
      updatedAt: '2025-09-12T17:30:00Z',
      location: 'Elm Avenue, in front of house #234',
      assignedTo: 'John Smith',
      category: 'Lighting',
      tags: ['lighting', 'maintenance'],
      progress: 100,
    },
    {
      id: 5,
      title: 'Graffiti removal at bus stop',
      description: 'Graffiti vandalism on bus stop shelter needs cleaning.',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2025-09-15T12:00:00Z',
      createdAt: '2025-09-13T06:30:00Z',
      updatedAt: '2025-09-13T11:00:00Z',
      location: 'Bus Stop #45, Park Avenue',
      assignedTo: 'John Smith',
      category: 'Cleaning & Maintenance',
      tags: ['cleaning', 'vandalism', 'public-transport'],
      progress: 20,
    },
    {
      id: 6,
      title: 'Tree branch blocking sidewalk',
      description: 'Large tree branch fell and is blocking pedestrian access.',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-09-13T13:00:00Z',
      createdAt: '2025-09-13T10:15:00Z',
      location: 'Maple Street sidewalk, near school',
      assignedTo: 'John Smith',
      category: 'Tree Maintenance',
      tags: ['trees', 'sidewalk', 'safety', 'emergency'],
      progress: 0,
    },
    {
      id: 7,
      title: 'Inspect park playground equipment',
      description: 'Routine safety inspection of playground equipment at Riverside Park.',
      priority: 'low',
      status: 'pending',
      dueDate: '2025-09-16T09:00:00Z',
      createdAt: '2025-09-13T08:45:00Z',
      location: 'Riverside Park, Playground Area',
      assignedTo: 'John Smith',
      category: 'Parks & Recreation',
      tags: ['inspection', 'playground', 'safety', 'routine'],
      progress: 0,
    },
    {
      id: 8,
      title: 'Repair park bench',
      description: 'Wooden park bench has broken slats and needs repair.',
      priority: 'low',
      status: 'overdue',
      dueDate: '2025-09-12T15:00:00Z',
      createdAt: '2025-09-10T12:00:00Z',
      location: 'City Park, near pond',
      assignedTo: 'John Smith',
      category: 'Parks & Recreation',
      tags: ['furniture', 'repair', 'wood'],
      progress: 0,
    },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTasks(mockTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetails', { taskId: task.id, task });
  };

  const handleTaskPriorityPress = (task) => {
    // Could open priority change modal
    alert(`Priority: ${task.priority.toUpperCase()}`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          My Tasks
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Assigned field engineering tasks
        </Text>
      </View>

      <TaskList
        tasks={tasks}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onTaskPress={handleTaskPress}
        onTaskPriorityPress={handleTaskPriorityPress}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        showFilters={true}
        variant="default"
        emptyMessage="No tasks assigned"
        emptySubMessage="New tasks will appear here when assigned by your supervisor"
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
  },
  title: {
    fontSize: tokens.typography.headlineMedium.fontSize,
    fontWeight: '600',
    lineHeight: tokens.typography.headlineMedium.lineHeight,
    marginBottom: tokens.spacing.xs,
  },
  subtitle: {
    fontSize: tokens.typography.bodyLarge.fontSize,
    lineHeight: tokens.typography.bodyLarge.lineHeight,
  },
  taskList: {
    flex: 1,
  },
});

export default TaskListScreen;