import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const CommunicationScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('messages'); // messages, broadcasts, contacts
  const [refreshing, setRefreshing] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const mockMessages = [
    {
      id: 1,
      type: 'admin',
      sender: 'Sarah Johnson',
      role: 'Supervisor',
      avatar: '👩‍💼',
      message: 'Please prioritize the traffic light repair on Main St. City council is asking for updates.',
      timestamp: '2025-09-13T10:30:00Z',
      urgent: true,
      read: false,
    },
    {
      id: 2,
      type: 'citizen',
      sender: 'Michael Chen',
      role: 'Citizen',
      avatar: '👨',
      message: 'Thank you for fixing the pothole on Central Ave so quickly! The road is much safer now.',
      timestamp: '2025-09-13T09:15:00Z',
      urgent: false,
      read: true,
      taskId: 2,
    },
    {
      id: 3,
      type: 'team',
      sender: 'David Wilson',
      role: 'Senior Engineer',
      avatar: '👨‍🔧',
      message: 'I have extra materials for the Oak Street water leak if you need them. Located at warehouse B.',
      timestamp: '2025-09-13T08:45:00Z',
      urgent: false,
      read: true,
    },
    {
      id: 4,
      type: 'system',
      sender: 'System',
      role: 'Automated Alert',
      avatar: '🤖',
      message: 'Weather alert: Heavy rain expected this afternoon. Consider postponing outdoor electrical work.',
      timestamp: '2025-09-13T08:00:00Z',
      urgent: true,
      read: false,
    },
  ];

  const mockBroadcasts = [
    {
      id: 1,
      title: 'Department Meeting - Friday 2PM',
      content: 'Monthly safety meeting scheduled for Friday at 2PM in Conference Room A. Attendance mandatory.',
      sender: 'HR Department',
      timestamp: '2025-09-13T07:00:00Z',
      priority: 'high',
    },
    {
      id: 2,
      title: 'New Equipment Available',
      content: 'New hydraulic repair tools are now available for checkout at the main depot. Training session scheduled for next week.',
      sender: 'Equipment Manager',
      timestamp: '2025-09-12T16:30:00Z',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Road Closure Notice',
      content: 'Main Street will be closed for construction from 6AM-4PM tomorrow. Plan alternate routes for scheduled tasks.',
      sender: 'Traffic Management',
      timestamp: '2025-09-12T14:20:00Z',
      priority: 'high',
    },
  ];

  const mockContacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Supervisor',
      department: 'Public Works',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@city.gov',
      avatar: '👩‍💼',
      status: 'online',
    },
    {
      id: 2,
      name: 'David Wilson',
      role: 'Senior Engineer',
      department: 'Public Works',
      phone: '(555) 234-5678',
      email: 'david.wilson@city.gov',
      avatar: '👨‍🔧',
      status: 'away',
    },
    {
      id: 3,
      name: 'Emergency Dispatch',
      role: 'Emergency Services',
      department: 'Emergency Response',
      phone: '(555) 911-0000',
      email: 'dispatch@city.gov',
      avatar: '🚨',
      status: 'online',
    },
    {
      id: 4,
      name: 'Equipment Manager',
      role: 'Equipment Coordinator',
      department: 'Operations',
      phone: '(555) 345-6789',
      email: 'equipment@city.gov',
      avatar: '🔧',
      status: 'offline',
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return colors.primary;
      case 'away': return colors.secondary;
      case 'busy': return colors.error;
      default: return colors.onSurfaceVariant;
    }
  };

  const renderTabButtons = () => (
    <View style={styles.tabContainer}>
      <Button
        title="Messages"
        onPress={() => setActiveTab('messages')}
        variant={activeTab === 'messages' ? 'filled' : 'outlined'}
        style={styles.tabButton}
      />
      <Button
        title="Broadcasts"
        onPress={() => setActiveTab('broadcasts')}
        variant={activeTab === 'broadcasts' ? 'filled' : 'outlined'}
        style={styles.tabButton}
      />
      <Button
        title="Contacts"
        onPress={() => setActiveTab('contacts')}
        variant={activeTab === 'contacts' ? 'filled' : 'outlined'}
        style={styles.tabButton}
      />
    </View>
  );

  const renderMessage = (message) => (
    <Card 
      key={message.id} 
      variant={message.read ? "outlined" : "elevated"} 
      style={[
        styles.messageCard,
        !message.read && { borderColor: colors.primary, borderWidth: 2 }
      ]}
    >
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <View style={styles.senderInfo}>
            <Text style={styles.avatar}>{message.avatar}</Text>
            <View style={styles.senderDetails}>
              <Text style={[styles.senderName, { color: colors.onSurface }]}>
                {message.sender}
              </Text>
              <Text style={[styles.senderRole, { color: colors.onSurfaceVariant }]}>
                {message.role}
              </Text>
            </View>
          </View>
          <View style={styles.messageMetadata}>
            {message.urgent && (
              <View style={[styles.urgentBadge, { backgroundColor: colors.error }]}>
                <Text style={[styles.urgentText, { color: colors.onError }]}>
                  URGENT
                </Text>
              </View>
            )}
            <Text style={[styles.timestamp, { color: colors.onSurfaceVariant }]}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.messageText, { color: colors.onSurface }]}>
          {message.message}
        </Text>
        
        <View style={styles.messageActions}>
          <Button
            title="Reply"
            onPress={() => alert(`Reply to ${message.sender}`)}
            variant="text"
            style={styles.messageActionButton}
          />
          {message.taskId && (
            <Button
              title="View Task"
              onPress={() => navigation.navigate('TaskDetails', { taskId: message.taskId })}
              variant="text"
              style={styles.messageActionButton}
            />
          )}
        </View>
      </View>
    </Card>
  );

  const renderBroadcast = (broadcast) => (
    <Card key={broadcast.id} variant="filled" style={styles.broadcastCard}>
      <View style={styles.broadcastContent}>
        <View style={styles.broadcastHeader}>
          <Text style={[styles.broadcastTitle, { color: colors.onSurface }]}>
            {broadcast.title}
          </Text>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: broadcast.priority === 'high' ? colors.secondary : colors.tertiary }
          ]}>
            <Text style={[
              styles.priorityText,
              { color: broadcast.priority === 'high' ? colors.onSecondary : colors.onTertiary }
            ]}>
              {broadcast.priority.toUpperCase()}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.broadcastContent, { color: colors.onSurface }]}>
          {broadcast.content}
        </Text>
        
        <View style={styles.broadcastFooter}>
          <Text style={[styles.broadcastSender, { color: colors.onSurfaceVariant }]}>
            From: {broadcast.sender}
          </Text>
          <Text style={[styles.timestamp, { color: colors.onSurfaceVariant }]}>
            {formatTime(broadcast.timestamp)}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderContact = (contact) => (
    <Card key={contact.id} variant="outlined" style={styles.contactCard}>
      <View style={styles.contactContent}>
        <View style={styles.contactHeader}>
          <View style={styles.contactInfo}>
            <Text style={styles.avatar}>{contact.avatar}</Text>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactName, { color: colors.onSurface }]}>
                {contact.name}
              </Text>
              <Text style={[styles.contactRole, { color: colors.onSurfaceVariant }]}>
                {contact.role} • {contact.department}
              </Text>
            </View>
          </View>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(contact.status) }]} />
        </View>
        
        <View style={styles.contactActions}>
          <Button
            title="📞 Call"
            onPress={() => alert(`Calling ${contact.phone}`)}
            variant="outlined"
            style={styles.contactActionButton}
          />
          <Button
            title="💬 Message"
            onPress={() => alert(`Message ${contact.name}`)}
            variant="outlined"
            style={styles.contactActionButton}
          />
          <Button
            title="📧 Email"
            onPress={() => alert(`Email ${contact.email}`)}
            variant="text"
            style={styles.contactActionButton}
          />
        </View>
      </View>
    </Card>
  );

  const renderComposeMessage = () => (
    <Card variant="elevated" style={styles.composeCard}>
      <View style={styles.composeContent}>
        <Text style={[styles.composeTitle, { color: colors.onSurface }]}>
          Quick Message
        </Text>
        
        <Input
          label="Message"
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          multiline
          numberOfLines={3}
          style={styles.messageInput}
        />
        
        <View style={styles.composeActions}>
          <Button
            title="📷 Photo"
            onPress={() => alert('Camera functionality')}
            variant="outlined"
            style={styles.composeActionButton}
          />
          <Button
            title="📞 Emergency"
            onPress={() => alert('Emergency call functionality')}
            variant="filled"
            style={[styles.composeActionButton, { backgroundColor: colors.error }]}
          />
          <Button
            title="Send"
            onPress={() => {
              if (newMessage.trim()) {
                alert(`Message sent: ${newMessage}`);
                setNewMessage('');
              }
            }}
            variant="filled"
            style={styles.composeActionButton}
            disabled={!newMessage.trim()}
          />
        </View>
      </View>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return (
          <View style={styles.content}>
            {renderComposeMessage()}
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Recent Messages
            </Text>
            {mockMessages.map(renderMessage)}
          </View>
        );
      
      case 'broadcasts':
        return (
          <View style={styles.content}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Department Broadcasts
            </Text>
            {mockBroadcasts.map(renderBroadcast)}
          </View>
        );
      
      case 'contacts':
        return (
          <View style={styles.content}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Team Contacts
            </Text>
            {mockContacts.map(renderContact)}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Communication
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Stay connected with your team
        </Text>
      </View>

      {/* Tab Navigation */}
      {renderTabButtons()}

      {/* Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
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
        {renderContent()}
      </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: tokens.spacing.md,
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
  },
  tabButton: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: tokens.spacing.xl,
  },
  content: {
    paddingHorizontal: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.typography.titleLarge.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.md,
    marginTop: tokens.spacing.sm,
  },
  composeCard: {
    marginBottom: tokens.spacing.lg,
  },
  composeContent: {
    padding: tokens.spacing.lg,
  },
  composeTitle: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.md,
  },
  messageInput: {
    marginBottom: tokens.spacing.md,
  },
  composeActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  composeActionButton: {
    flex: 1,
  },
  messageCard: {
    marginBottom: tokens.spacing.md,
  },
  messageContent: {
    padding: tokens.spacing.lg,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.md,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    fontSize: 32,
    marginRight: tokens.spacing.md,
  },
  senderDetails: {
    flex: 1,
  },
  senderName: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
  },
  senderRole: {
    fontSize: tokens.typography.bodySmall.fontSize,
  },
  messageMetadata: {
    alignItems: 'flex-end',
    gap: tokens.spacing.xs,
  },
  urgentBadge: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.borderRadius.xs,
  },
  urgentText: {
    fontSize: tokens.typography.labelSmall.fontSize,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: tokens.typography.labelSmall.fontSize,
  },
  messageText: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    lineHeight: tokens.typography.bodyMedium.lineHeight,
    marginBottom: tokens.spacing.md,
  },
  messageActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  messageActionButton: {
    flex: 1,
  },
  broadcastCard: {
    marginBottom: tokens.spacing.md,
  },
  broadcastContent: {
    padding: tokens.spacing.lg,
  },
  broadcastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.md,
  },
  broadcastTitle: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    flex: 1,
    marginRight: tokens.spacing.md,
  },
  priorityBadge: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.borderRadius.xs,
  },
  priorityText: {
    fontSize: tokens.typography.labelSmall.fontSize,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  broadcastFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: tokens.spacing.md,
  },
  broadcastSender: {
    fontSize: tokens.typography.bodySmall.fontSize,
  },
  contactCard: {
    marginBottom: tokens.spacing.md,
  },
  contactContent: {
    padding: tokens.spacing.lg,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
  },
  contactRole: {
    fontSize: tokens.typography.bodySmall.fontSize,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  contactActions: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  contactActionButton: {
    flex: 1,
  },
});

export default CommunicationScreen;