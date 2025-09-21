import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { PriorityBadge } from '../../components/task';

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme || {};
  const [refreshing, setRefreshing] = useState(false);
  const [user] = useState({
    name: 'John Smith',
    employeeId: 'ENG001',
    department: 'Public Works',
    position: 'Senior Field Engineer',
    email: 'john.smith@city.gov',
    phone: '(555) 123-4567',
    profilePhoto: '👨‍🔧',
    joinDate: '2023-03-15',
    lastLogin: '2025-09-13T09:30:00Z',
    workShift: 'Day Shift (6:00 AM - 2:00 PM)',
    supervisor: 'Sarah Johnson',
    skills: ['Electrical Systems', 'Road Maintenance', 'Equipment Repair'],
    certifications: ['Safety Certified', 'Electrical License', 'Heavy Equipment Operation'],
  });

  const [performance] = useState({
    totalPoints: 1250,
    level: 'Senior Engineer',
    rank: 3,
    departmentRank: '3 of 24',
    totalTasks: 127,
    completedTasks: 121,
    completionRate: 95.3,
    avgResolutionTime: '2.5 hours',
    qualityScore: 4.8,
    badges: [
      { name: 'Fast Responder', icon: '⚡', earned: '2025-09-10', description: 'Complete 5 tasks in under 1 hour' },
      { name: 'Quality Expert', icon: '⭐', earned: '2025-09-08', description: 'Maintain 4.5+ quality score for 30 days' },
      { name: 'Team Player', icon: '🤝', earned: '2025-09-05', description: 'Help team members 10 times' },
      { name: 'Safety First', icon: '🛡️', earned: '2025-09-01', description: 'Complete safety training and report 3 hazards' },
    ],
    recentAchievements: [
      { title: 'Perfect Week', description: 'Completed all assigned tasks this week', points: 50 },
      { title: 'Citizen Satisfaction', description: 'Received 5-star rating from 3 citizens', points: 30 },
      { title: 'Early Bird', description: 'Started work 30 minutes early for 5 days', points: 25 },
    ],
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would clear auth state and navigate to login
            navigation.navigate('Login');
          }
        },
      ]
    );
  };

  const renderProfileHeader = () => (
    <Card variant="elevated" style={styles.profileCard}>
      <View style={styles.profileContent}>
        <View style={styles.profileHeader}>
          <Text style={styles.profilePhoto}>{user.profilePhoto}</Text>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.onSurface }]}>
              {user.name}
            </Text>
            <Text style={[styles.userPosition, { color: colors.onSurfaceVariant }]}>
              {user.position}
            </Text>
            <Text style={[styles.userDepartment, { color: colors.onSurfaceVariant }]}>
              {user.department} • {user.employeeId}
            </Text>
          </View>
          <PriorityBadge 
            priority="high"
            size="medium"
            style={{ backgroundColor: colors.tertiary }}
          />
        </View>
        
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {performance.totalPoints}
            </Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>
              Points
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.secondary }]}>
              #{performance.rank}
            </Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>
              Rank
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.tertiary }]}>
              {performance.qualityScore}
            </Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>
              Quality
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {performance.completionRate}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>
              Complete
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderPersonalInfo = () => (
    <Card variant="outlined" style={styles.sectionCard}>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Personal Information
        </Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
              Email
            </Text>
            <Text style={[styles.infoValue, { color: colors.onSurface }]}>
              {user.email}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
              Phone
            </Text>
            <Text style={[styles.infoValue, { color: colors.onSurface }]}>
              {user.phone}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
              Work Shift
            </Text>
            <Text style={[styles.infoValue, { color: colors.onSurface }]}>
              {user.workShift}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
              Supervisor
            </Text>
            <Text style={[styles.infoValue, { color: colors.onSurface }]}>
              {user.supervisor}
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
              Join Date
            </Text>
            <Text style={[styles.infoValue, { color: colors.onSurface }]}>
              {formatDate(user.joinDate)}
            </Text>
          </View>
        </View>
        
        <Button
          title="Edit Profile"
          onPress={() => alert('Edit profile functionality')}
          variant="outlined"
          style={styles.editButton}
        />
      </View>
    </Card>
  );

  const renderSkillsCertifications = () => (
    <Card variant="filled" style={styles.sectionCard}>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Skills & Certifications
        </Text>
        
        <View style={styles.skillsSection}>
          <Text style={[styles.subsectionTitle, { color: colors.onSurfaceVariant }]}>
            Skills
          </Text>
          <View style={styles.skillsContainer}>
            {user.skills.map((skill, index) => (
              <View
                key={index}
                style={[
                  styles.skillChip,
                  { backgroundColor: `${colors.primary}15`, borderColor: `${colors.primary}30` }
                ]}
              >
                <Text style={[styles.skillText, { color: colors.primary }]}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.certificationsSection}>
          <Text style={[styles.subsectionTitle, { color: colors.onSurfaceVariant }]}>
            Certifications
          </Text>
          <View style={styles.certificationsContainer}>
            {user.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <Text style={styles.certificationIcon}>🏆</Text>
                <Text style={[styles.certificationText, { color: colors.onSurface }]}>
                  {cert}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Card>
  );

  const renderAchievements = () => (
    <Card variant="elevated" style={styles.sectionCard}>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Achievements & Badges
        </Text>
        
        <View style={styles.badgesGrid}>
          {performance.badges.map((badge, index) => (
            <View key={index} style={styles.badgeItem}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={[styles.badgeName, { color: colors.onSurface }]}>
                {badge.name}
              </Text>
              <Text style={[styles.badgeDate, { color: colors.onSurfaceVariant }]}>
                {formatDate(badge.earned)}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.recentAchievements}>
          <Text style={[styles.subsectionTitle, { color: colors.onSurfaceVariant }]}>
            Recent Achievements
          </Text>
          {performance.recentAchievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementTitle, { color: colors.onSurface }]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, { color: colors.onSurfaceVariant }]}>
                  {achievement.description}
                </Text>
              </View>
              <View style={[styles.pointsBadge, { backgroundColor: colors.tertiary }]}>
                <Text style={[styles.pointsText, { color: colors.onTertiary }]}>
                  +{achievement.points}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );

  const renderQuickActions = () => (
    <Card variant="outlined" style={styles.sectionCard}>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Quick Actions
        </Text>
        
        <View style={styles.actionsGrid}>
          <Button
            title="⚙️ Settings"
            onPress={() => alert('Settings functionality')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="📊 Analytics"
            onPress={() => alert('Analytics functionality')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="🎓 Training"
            onPress={() => alert('Training materials')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="🆘 Help"
            onPress={() => alert('Help & support')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="🔧 Tools"
            onPress={() => alert('Equipment management')}
            variant="outlined"
            style={styles.actionButton}
          />
          
          <Button
            title="🚪 Logout"
            onPress={handleLogout}
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
      {renderProfileHeader()}
      {renderPersonalInfo()}
      {renderSkillsCertifications()}
      {renderAchievements()}
      {renderQuickActions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme?.spacing?.md || 16,
    paddingBottom: theme?.spacing?.xl || 32,
  },
  profileCard: {
    marginBottom: theme?.spacing?.lg || 24,
  },
  profileContent: {
    padding: theme?.spacing?.lg || 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme?.spacing?.lg || 24,
  },
  profilePhoto: {
    fontSize: 64,
    marginRight: theme?.spacing?.lg || 24,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '600',
    marginBottom: theme?.spacing?.xs || 4,
  },
  userPosition: {
    fontSize: tokens.typography.titleSmall.fontSize,
    marginBottom: theme?.spacing?.xs || 4,
  },
  userDepartment: {
    fontSize: tokens.typography.bodyMedium.fontSize,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme?.spacing?.lg || 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: tokens.typography.labelMedium.fontSize,
    marginTop: theme?.spacing?.xs || 4,
  },
  sectionCard: {
    marginBottom: theme?.spacing?.lg || 24,
  },
  sectionContent: {
    padding: theme?.spacing?.lg || 24,
  },
  sectionTitle: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: '600',
    marginBottom: theme?.spacing?.lg || 24,
  },
  infoGrid: {
    gap: theme?.spacing?.md || 16,
    marginBottom: theme?.spacing?.lg || 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    flex: 2,
    textAlign: 'right',
  },
  editButton: {
    alignSelf: 'center',
    minWidth: 120,
  },
  skillsSection: {
    marginBottom: theme?.spacing?.lg || 24,
  },
  subsectionTitle: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
    marginBottom: theme?.spacing?.md || 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme?.spacing?.sm || 8,
  },
  skillChip: {
    paddingHorizontal: theme?.spacing?.md || 16,
    paddingVertical: theme?.spacing?.sm || 8,
    borderRadius: theme?.borderRadius?.xs || 2,
    borderWidth: 1,
  },
  skillText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '500',
  },
  certificationsSection: {
    marginTop: theme?.spacing?.lg || 24,
  },
  certificationsContainer: {
    gap: theme?.spacing?.sm || 8,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme?.spacing?.md || 16,
  },
  certificationIcon: {
    fontSize: 20,
  },
  certificationText: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    fontWeight: '500',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme?.spacing?.md || 16,
    marginBottom: theme?.spacing?.lg || 24,
  },
  badgeItem: {
    alignItems: 'center',
    width: '45%',
    padding: theme?.spacing?.md || 16,
    borderRadius: theme?.borderRadius?.sm || 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: theme?.spacing?.sm || 8,
  },
  badgeName: {
    fontSize: theme?.typography?.labelLarge?.fontSize || 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme?.spacing?.xs || 4,
  },
  badgeDate: {
    fontSize: tokens.typography.labelSmall.fontSize,
    textAlign: 'center',
  },
  recentAchievements: {
    gap: theme?.spacing?.md || 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme?.spacing?.md || 16,
    padding: theme?.spacing?.md || 16,
    borderRadius: theme?.borderRadius?.sm || 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
    marginBottom: theme?.spacing?.xs || 4,
  },
  achievementDescription: {
    fontSize: tokens.typography.bodySmall.fontSize,
  },
  pointsBadge: {
    paddingHorizontal: theme?.spacing?.sm || 8,
    paddingVertical: theme?.spacing?.xs || 4,
    borderRadius: theme?.borderRadius?.xs || 2,
  },
  pointsText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme?.spacing?.sm || 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
  },
});

export default ProfileScreen;