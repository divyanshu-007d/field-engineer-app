import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { TaskCard, PriorityBadge } from '../../components/task';

const DashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: 'John Smith',
      employeeId: 'ENG001',
      department: 'Public Works',
      badge: 'Senior Engineer',
      points: 1250,
    },
    todaysTasks: {
      total: 8,
      completed: 3,
      inProgress: 2,
      pending: 3,
    },
    priorities: {
      critical: 1,
      high: 2,
      medium: 3,
      low: 2,
    },
    performance: {
      completionRate: 95,
      avgResolutionTime: '2.5 hours',
      qualityScore: 4.8,
      rank: 3,
    },
    weather: {
      temperature: '72°F',
      condition: 'Partly Cloudy',
      humidity: '65%',
      windSpeed: '8 mph',
    },
    upcomingTasks: [
      {
        id: 1,
        title: 'Repair traffic light at Main St & 5th Ave',
        priority: 'critical',
        status: 'pending',
        dueDate: '2025-09-13T14:00:00Z',
        location: 'Main St & 5th Ave',
      },
      {
        id: 2,
        title: 'Fix pothole on Central Avenue',
        priority: 'high',
        status: 'in-progress',
        dueDate: '2025-09-13T16:30:00Z',
        location: 'Central Avenue, Block 200',
      },
    ],
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const renderWelcomeCard = () => (
    <Card variant="filled" style={styles.welcomeCard}>
      <View style={styles.welcomeContent}>
        <View style={styles.welcomeHeader}>
          <View style={styles.userInfo}>
            <Text style={[styles.welcomeTitle, { color: colors.onSurface }]}>
              Good morning, {dashboardData.user.name}!
            </Text>
            <Text style={[styles.employeeId, { color: colors.onSurfaceVariant }]}>
              {dashboardData.user.employeeId} • {dashboardData.user.department}
            </Text>
          </View>
          <View style={styles.badgeContainer}>
            <PriorityBadge 
              priority="high"
              size="medium"
              style={{ backgroundColor: colors.tertiary }}
            />
          </View>
        </View>
        
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsLabel, { color: colors.onSurfaceVariant }]}>
            Performance Points
          </Text>
          <Text style={[styles.pointsValue, { color: colors.primary }]}>
            {dashboardData.user.points.toLocaleString()}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderTaskSummary = () => (
    <Card variant="elevated" style={styles.summaryCard}>
      <View style={styles.summaryContent}>
        <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
          Today's Tasks
        </Text>
        
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.primary }]}>
              {dashboardData.todaysTasks.total}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>
              Total
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.primary }]}>
              {dashboardData.todaysTasks.completed}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>
              Completed
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.secondary }]}>
              {dashboardData.todaysTasks.inProgress}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>
              In Progress
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.tertiary }]}>
              {dashboardData.todaysTasks.pending}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>
              Pending
            </Text>
          </View>
        </View>
        
        <Button
          title="View All Tasks"
          onPress={() => navigation.navigate('Tasks')}
          variant="outlined"
          style={styles.summaryButton}
        />
      </View>
    </Card>
  );

  const renderPriorityBreakdown = () => (
    <Card variant="outlined" style={styles.priorityCard}>
      <View style={styles.priorityContent}>
        <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
          Priority Breakdown
        </Text>
        
        <View style={styles.priorityList}>
          {Object.entries(dashboardData.priorities).map(([priority, count]) => (
            <View key={priority} style={styles.priorityItem}>
              <PriorityBadge priority={priority} size="small" />
              <Text style={[styles.priorityCount, { color: colors.onSurface }]}>
                {count} task{count !== 1 ? 's' : ''}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );

  const renderPerformance = () => (
    <Card variant="filled" style={styles.performanceCard}>
      <View style={styles.performanceContent}>
        <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
          Performance Metrics
        </Text>
        
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: colors.primary }]}>
              {dashboardData.performance.completionRate}%
            </Text>
            <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
              Completion Rate
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: colors.secondary }]}>
              {dashboardData.performance.avgResolutionTime}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
              Avg Resolution
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: colors.tertiary }]}>
              {dashboardData.performance.qualityScore}/5.0
            </Text>
            <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
              Quality Score
            </Text>
          </View>
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: colors.primary }]}>
              #{dashboardData.performance.rank}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.onSurfaceVariant }]}>
              Department Rank
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderWeather = () => (
    <Card variant="outlined" style={styles.weatherCard}>
      <View style={styles.weatherContent}>
        <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
          Current Weather
        </Text>
        
        <View style={styles.weatherMain}>
          <Text style={[styles.temperature, { color: colors.primary }]}>
            {dashboardData.weather.temperature}
          </Text>
          <Text style={[styles.condition, { color: colors.onSurface }]}>
            {dashboardData.weather.condition}
          </Text>
        </View>
        
        <View style={styles.weatherDetails}>
          <Text style={[styles.weatherDetail, { color: colors.onSurfaceVariant }]}>
            Humidity: {dashboardData.weather.humidity}
          </Text>
          <Text style={[styles.weatherDetail, { color: colors.onSurfaceVariant }]}>
            Wind: {dashboardData.weather.windSpeed}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderUpcomingTasks = () => (
    <View style={styles.upcomingSection}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Priority Tasks
        </Text>
        <Button
          title="View All"
          onPress={() => navigation.navigate('Tasks')}
          variant="text"
          style={styles.viewAllButton}
        />
      </View>
      
      {dashboardData.upcomingTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          variant="compact"
          onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })}
        />
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <Card variant="elevated" style={styles.quickActionsCard}>
      <View style={styles.quickActionsContent}>
        <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
          Quick Actions
        </Text>
        
        <View style={styles.actionsGrid}>
          <Button
            title="📍 Check In"
            onPress={() => alert('Check-in functionality')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="📷 Report Issue"
            onPress={() => alert('Report issue functionality')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="🗺️ View Map"
            onPress={() => navigation.navigate('Map')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="🚨 Emergency"
            onPress={() => alert('Emergency contact functionality')}
            variant="filled"
            style={[styles.actionButton, { backgroundColor: colors.error }]}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {renderWelcomeCard()}
      {renderTaskSummary()}
      
      <View style={styles.row}>
        {renderPriorityBreakdown()}
        {renderWeather()}
      </View>
      
      {renderPerformance()}
      {renderUpcomingTasks()}
      {renderQuickActions()}
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
  welcomeCard: {
    marginBottom: tokens.spacing.md,
  },
  welcomeContent: {
    padding: tokens.spacing.lg,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.xs,
  },
  employeeId: {
    fontSize: tokens.typography.bodyMedium.fontSize,
  },
  badgeContainer: {
    marginLeft: tokens.spacing.md,
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '500',
  },
  pointsValue: {
    fontSize: tokens.typography.headlineMedium.fontSize,
    fontWeight: '700',
    marginTop: tokens.spacing.xs,
  },
  summaryCard: {
    marginBottom: tokens.spacing.md,
  },
  summaryContent: {
    padding: tokens.spacing.lg,
  },
  cardTitle: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.lg,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: tokens.typography.labelMedium.fontSize,
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  summaryButton: {
    marginTop: tokens.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  priorityCard: {
    flex: 1,
  },
  priorityContent: {
    padding: tokens.spacing.md,
  },
  priorityList: {
    gap: tokens.spacing.sm,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityCount: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    fontWeight: '500',
  },
  weatherCard: {
    flex: 1,
  },
  weatherContent: {
    padding: tokens.spacing.md,
    alignItems: 'center',
  },
  weatherMain: {
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  temperature: {
    fontSize: tokens.typography.headlineMedium.fontSize,
    fontWeight: '700',
  },
  condition: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    marginTop: tokens.spacing.xs,
  },
  weatherDetails: {
    gap: tokens.spacing.xs,
    alignItems: 'center',
  },
  weatherDetail: {
    fontSize: tokens.typography.bodySmall.fontSize,
  },
  performanceCard: {
    marginBottom: tokens.spacing.md,
  },
  performanceContent: {
    padding: tokens.spacing.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: tokens.spacing.sm,
  },
  metricValue: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: tokens.typography.labelMedium.fontSize,
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  upcomingSection: {
    marginBottom: tokens.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: '600',
  },
  viewAllButton: {
    paddingHorizontal: 0,
  },
  quickActionsCard: {
    marginBottom: tokens.spacing.sm,
  },
  quickActionsContent: {
    padding: tokens.spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
  },
});

export default DashboardScreen;