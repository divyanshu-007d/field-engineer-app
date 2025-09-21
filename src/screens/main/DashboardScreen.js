import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  RefreshControl,
  Animated,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { TaskCard, PriorityBadge } from '../../components/task';

const { width, height } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme || {};
  const [refreshing, setRefreshing] = useState(false);
  
  // Animation values for floating elements
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation for background elements
    const createFloatingAnimation = (animatedValue, duration) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createFloatingAnimation(float1, 10000);
    const animation2 = createFloatingAnimation(float2, 8000);

    animation1.start();
    animation2.start();

    return () => {
      animation1.stop();
      animation2.stop();
    };
  }, []);
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
    <BlurView intensity={80} tint="light" style={styles.welcomeCardBlur}>
      <View style={styles.welcomeCardOverlay}>
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
    </BlurView>
  );

  const renderTaskSummary = () => (
    <BlurView intensity={70} tint="light" style={styles.summaryCardBlur}>
      <View style={styles.summaryCardOverlay}>
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
            <Text style={[styles.summaryNumber, { color: colors.tertiary }]}>
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
            <Text style={[styles.summaryNumber, { color: colors.error }]}>
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
    </BlurView>
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
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          theme.colors.primary + '15',
          theme.colors.secondary + '10',
          theme.colors.background
        ]}
        locations={[0, 0.5, 1]}
        style={styles.gradientBackground}
      >
        {/* Animated Floating Elements */}
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element1,
            {
              transform: [{
                translateY: float1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              }],
              opacity: float1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3],
              }),
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element2,
            {
              transform: [{
                translateY: float2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 15],
                }),
              }],
              opacity: float2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.15, 0.25],
              }),
            }
          ]}
        />
        
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
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
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

  // Create styles function that uses theme
  const createStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
    },
    gradientBackground: {
      flex: 1,
      position: 'relative',
    },
    
    // Floating background elements
    floatingElement: {
      position: 'absolute',
      borderRadius: theme.borderRadius.full,
      opacity: 0.1,
    },
    element1: {
      width: 180,
      height: 180,
      backgroundColor: theme.colors.primary,
      top: height * 0.15,
      right: -60,
    },
    element2: {
      width: 120,
      height: 120,
      backgroundColor: theme.colors.tertiary,
      top: height * 0.7,
      left: -40,
    },
    
    safeArea: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: theme.spacing.screenPadding,
      paddingBottom: theme.spacing.xxl,
    },
    
    // Welcome Card with Glassmorphism
    welcomeCardBlur: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    welcomeCardOverlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: theme.spacing.lg,
    },
    welcomeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.md,
    },
    userInfo: {
      flex: 1,
    },
    welcomeTitle: {
      ...theme.typography.headlineSmall,
      fontWeight: '700',
      marginBottom: theme.spacing.xs,
    },
    employeeId: {
      ...theme.typography.bodyMedium,
    },
    badgeContainer: {
      marginLeft: theme.spacing.md,
    },
    pointsContainer: {
      alignItems: 'center',
    },
    pointsLabel: {
      ...theme.typography.labelMedium,
      fontWeight: '500',
    },
    pointsValue: {
      ...theme.typography.displaySmall,
      fontWeight: '700',
      marginTop: theme.spacing.xs,
    },
    
    // Summary Card with Glassmorphism
    summaryCardBlur: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    summaryCardOverlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      padding: theme.spacing.lg,
    },
    cardTitle: {
      ...theme.typography.titleLarge,
      fontWeight: '600',
      marginBottom: theme.spacing.md,
    },
    summaryGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.lg,
    },
    summaryItem: {
      alignItems: 'center',
      flex: 1,
    },
    summaryNumber: {
      ...theme.typography.displaySmall,
      fontWeight: '700',
    },
    summaryLabel: {
      ...theme.typography.labelMedium,
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
    summaryButton: {
      marginTop: theme.spacing.sm,
    },
    
    row: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    
    priorityCard: {
      flex: 1,
    },
    priorityContent: {
      padding: theme.spacing.md,
    },
    priorityList: {
      gap: theme.spacing.sm,
    },
    priorityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priorityCount: {
      ...theme.typography.bodyMedium,
      fontWeight: '500',
    },
    
    weatherCard: {
      flex: 1,
    },
    weatherContent: {
      padding: theme.spacing.md,
      alignItems: 'center',
    },
    weatherMain: {
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    temperature: {
      ...theme.typography.headlineMedium,
      fontWeight: '700',
    },
    condition: {
      ...theme.typography.bodyMedium,
      marginTop: theme.spacing.xs,
    },
    weatherDetails: {
      gap: theme.spacing.xs,
      alignItems: 'center',
    },
    weatherDetail: {
      ...theme.typography.bodySmall,
    },
    
    performanceCard: {
      marginBottom: theme.spacing.md,
    },
    performanceContent: {
      padding: theme.spacing.lg,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    metricItem: {
      flex: 1,
      minWidth: '45%',
      alignItems: 'center',
      padding: theme.spacing.sm,
    },
    metricValue: {
      ...theme.typography.titleLarge,
      fontWeight: '700',
    },
    metricLabel: {
      ...theme.typography.labelMedium,
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
    
    upcomingSection: {
      marginBottom: theme.spacing.md,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      ...theme.typography.titleLarge,
      fontWeight: '600',
    },
    viewAllButton: {
      paddingHorizontal: 0,
    },
    
    quickActionsCard: {
      marginBottom: theme.spacing.sm,
    },
    quickActionsContent: {
      padding: theme.spacing.lg,
    },
    actionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    actionButton: {
      flex: 1,
      minWidth: '45%',
    },
  });

  const styles = createStyles(theme);

export default DashboardScreen;