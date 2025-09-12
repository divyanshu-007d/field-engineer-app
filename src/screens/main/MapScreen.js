import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { PriorityBadge } from '../../components/task';

const { width, height } = Dimensions.get('window');

// Mock MapView component since we don't have react-native-maps installed
const MockMapView = ({ style, children, ...props }) => {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[
        style, 
        { 
          backgroundColor: `${colors.primary}10`,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: tokens.borderRadius.sm,
        }
      ]}
      {...props}
    >
      <Text style={[styles.mapPlaceholder, { color: colors.onSurfaceVariant }]}>
        🗺️ Interactive Map
      </Text>
      <Text style={[styles.mapSubtext, { color: colors.onSurfaceVariant }]}>
        Google Maps integration will be implemented
      </Text>
      {children}
    </View>
  );
};

const MapScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [mapMode, setMapMode] = useState('standard'); // standard, satellite, hybrid

  // Mock task locations
  const mockTasks = [
    {
      id: 1,
      title: 'Repair traffic light at Main St & 5th Ave',
      priority: 'critical',
      status: 'pending',
      location: 'Main St & 5th Ave, Downtown',
      coordinates: { latitude: 40.7580, longitude: -73.9855 },
      estimatedTime: '30 min',
      distance: '2.3 miles',
    },
    {
      id: 2,
      title: 'Fix pothole on Central Avenue',
      priority: 'high',
      status: 'in-progress',
      location: 'Central Avenue, Block 200',
      coordinates: { latitude: 40.7505, longitude: -73.9934 },
      estimatedTime: '45 min',
      distance: '1.8 miles',
    },
    {
      id: 3,
      title: 'Water main leak on Oak Street',
      priority: 'medium',
      status: 'pending',
      location: 'Oak Street, near fire hydrant #127',
      coordinates: { latitude: 40.7614, longitude: -73.9776 },
      estimatedTime: '25 min',
      distance: '3.1 miles',
    },
    {
      id: 6,
      title: 'Tree branch blocking sidewalk',
      priority: 'high',
      status: 'pending',
      location: 'Maple Street sidewalk, near school',
      coordinates: { latitude: 40.7489, longitude: -73.9680 },
      estimatedTime: '20 min',
      distance: '4.2 miles',
    },
  ];

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const handleTaskMarkerPress = (task) => {
    setSelectedTask(task);
  };

  const handleNavigateToTask = (task) => {
    Alert.alert(
      'Navigation',
      `Start navigation to ${task.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Navigate', 
          onPress: () => {
            // In a real app, this would open the device's navigation app
            alert(`Navigation to ${task.location} will open in Google Maps`);
          }
        },
      ]
    );
  };

  const handleOptimizeRoute = () => {
    setRouteOptimized(!routeOptimized);
    Alert.alert(
      'Route Optimization',
      routeOptimized 
        ? 'Route optimization disabled' 
        : 'Route optimized for efficiency. Estimated time saved: 45 minutes',
      [{ text: 'OK' }]
    );
  };

  const handleLocationUpdate = () => {
    Alert.alert(
      'Location Update',
      'Your current location has been updated',
      [{ text: 'OK' }]
    );
  };

  const renderLocationCard = () => (
    <Card variant="elevated" style={styles.locationCard}>
      <View style={styles.locationContent}>
        <Text style={[styles.locationTitle, { color: colors.onSurface }]}>
          📍 Current Location
        </Text>
        <Text style={[styles.locationText, { color: colors.onSurfaceVariant }]}>
          Downtown Municipal Area
        </Text>
        <Text style={[styles.coordinatesText, { color: colors.onSurfaceVariant }]}>
          40.7128°N, 74.0060°W
        </Text>
        
        <Button
          title="Update Location"
          onPress={handleLocationUpdate}
          variant="outlined"
          style={styles.locationButton}
        />
      </View>
    </Card>
  );

  const renderTaskCard = (task) => (
    <Card key={task.id} variant="outlined" style={styles.taskCard}>
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <PriorityBadge priority={task.priority} size="small" />
          <Text style={[styles.taskDistance, { color: colors.onSurfaceVariant }]}>
            {task.distance} • {task.estimatedTime}
          </Text>
        </View>
        
        <Text 
          style={[styles.taskTitle, { color: colors.onSurface }]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        
        <Text style={[styles.taskLocation, { color: colors.onSurfaceVariant }]}>
          📍 {task.location}
        </Text>
        
        <View style={styles.taskActions}>
          <Button
            title="Navigate"
            onPress={() => handleNavigateToTask(task)}
            variant="filled"
            style={styles.taskActionButton}
          />
          <Button
            title="Details"
            onPress={() => navigation.navigate('TaskDetails', { taskId: task.id, task })}
            variant="outlined"
            style={styles.taskActionButton}
          />
        </View>
      </View>
    </Card>
  );

  const renderSelectedTaskOverlay = () => {
    if (!selectedTask) return null;

    return (
      <Card variant="elevated" style={styles.selectedTaskOverlay}>
        <View style={styles.selectedTaskContent}>
          <View style={styles.selectedTaskHeader}>
            <PriorityBadge priority={selectedTask.priority} size="medium" />
            <Button
              title="✕"
              onPress={() => setSelectedTask(null)}
              variant="text"
              style={styles.closeButton}
            />
          </View>
          
          <Text style={[styles.selectedTaskTitle, { color: colors.onSurface }]}>
            {selectedTask.title}
          </Text>
          
          <Text style={[styles.selectedTaskLocation, { color: colors.onSurfaceVariant }]}>
            📍 {selectedTask.location}
          </Text>
          
          <View style={styles.selectedTaskMeta}>
            <Text style={[styles.selectedTaskDistance, { color: colors.primary }]}>
              {selectedTask.distance} away
            </Text>
            <Text style={[styles.selectedTaskTime, { color: colors.secondary }]}>
              Est. {selectedTask.estimatedTime}
            </Text>
          </View>
          
          <View style={styles.selectedTaskActions}>
            <Button
              title="Start Navigation"
              onPress={() => handleNavigateToTask(selectedTask)}
              variant="filled"
              style={styles.selectedTaskButton}
            />
            <Button
              title="View Task"
              onPress={() => {
                setSelectedTask(null);
                navigation.navigate('TaskDetails', { taskId: selectedTask.id, task: selectedTask });
              }}
              variant="outlined"
              style={styles.selectedTaskButton}
            />
          </View>
        </View>
      </Card>
    );
  };

  const renderMapControls = () => (
    <View style={styles.mapControls}>
      <Button
        title={routeOptimized ? "🚀 Route Optimized" : "⚡ Optimize Route"}
        onPress={handleOptimizeRoute}
        variant={routeOptimized ? "filled" : "outlined"}
        style={[
          styles.controlButton,
          routeOptimized && { backgroundColor: colors.secondary }
        ]}
      />
      
      <Button
        title="🎯 Center Map"
        onPress={() => alert('Map centered on current location')}
        variant="outlined"
        style={styles.controlButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Task Map
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Navigate to your assigned locations
        </Text>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MockMapView style={styles.map}>
          {/* Task markers would be rendered here */}
          <View style={styles.markersContainer}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.markerPreview}>
                <PriorityBadge priority={task.priority} size="small" />
              </View>
            ))}
          </View>
        </MockMapView>
        
        {/* Map Controls Overlay */}
        {renderMapControls()}
        
        {/* Selected Task Overlay */}
        {renderSelectedTaskOverlay()}
      </View>

      {/* Task List */}
      <View style={styles.taskListContainer}>
        <View style={styles.taskListHeader}>
          <Text style={[styles.taskListTitle, { color: colors.onSurface }]}>
            Nearby Tasks ({tasks.length})
          </Text>
          <Button
            title="List View"
            onPress={() => navigation.navigate('Tasks')}
            variant="text"
            style={styles.listViewButton}
          />
        </View>
        
        <View style={styles.taskList}>
          {tasks.slice(0, 2).map(renderTaskCard)}
        </View>
      </View>

      {/* Location Info */}
      {renderLocationCard()}
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
    marginBottom: tokens.spacing.xs,
  },
  subtitle: {
    fontSize: tokens.typography.bodyLarge.fontSize,
  },
  mapContainer: {
    flex: 1,
    margin: tokens.spacing.md,
    marginBottom: tokens.spacing.sm,
    position: 'relative',
  },
  map: {
    flex: 1,
    minHeight: height * 0.4,
  },
  mapPlaceholder: {
    fontSize: tokens.typography.headlineMedium.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.sm,
  },
  mapSubtext: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    textAlign: 'center',
  },
  markersContainer: {
    position: 'absolute',
    top: tokens.spacing.lg,
    left: tokens.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  markerPreview: {
    opacity: 0.8,
  },
  mapControls: {
    position: 'absolute',
    top: tokens.spacing.md,
    right: tokens.spacing.md,
    gap: tokens.spacing.sm,
  },
  controlButton: {
    minWidth: 120,
  },
  selectedTaskOverlay: {
    position: 'absolute',
    bottom: tokens.spacing.md,
    left: tokens.spacing.md,
    right: tokens.spacing.md,
  },
  selectedTaskContent: {
    padding: tokens.spacing.lg,
  },
  selectedTaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  closeButton: {
    minWidth: 32,
    padding: 0,
  },
  selectedTaskTitle: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.xs,
  },
  selectedTaskLocation: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    marginBottom: tokens.spacing.sm,
  },
  selectedTaskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.md,
  },
  selectedTaskDistance: {
    fontSize: tokens.typography.labelLarge.fontSize,
    fontWeight: '600',
  },
  selectedTaskTime: {
    fontSize: tokens.typography.labelLarge.fontSize,
    fontWeight: '600',
  },
  selectedTaskActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  selectedTaskButton: {
    flex: 1,
  },
  taskListContainer: {
    paddingHorizontal: tokens.spacing.md,
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  taskListTitle: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: '600',
  },
  listViewButton: {
    paddingHorizontal: 0,
  },
  taskList: {
    gap: tokens.spacing.sm,
  },
  taskCard: {
    marginBottom: tokens.spacing.sm,
  },
  taskContent: {
    padding: tokens.spacing.md,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  taskDistance: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '500',
  },
  taskTitle: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.xs,
  },
  taskLocation: {
    fontSize: tokens.typography.bodySmall.fontSize,
    marginBottom: tokens.spacing.md,
  },
  taskActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  taskActionButton: {
    flex: 1,
  },
  locationCard: {
    margin: tokens.spacing.md,
    marginTop: tokens.spacing.sm,
  },
  locationContent: {
    padding: tokens.spacing.md,
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.xs,
  },
  locationText: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    marginBottom: tokens.spacing.xs,
  },
  coordinatesText: {
    fontSize: tokens.typography.labelSmall.fontSize,
    marginBottom: tokens.spacing.md,
  },
  locationButton: {
    minWidth: 120,
  },
});

export default MapScreen;