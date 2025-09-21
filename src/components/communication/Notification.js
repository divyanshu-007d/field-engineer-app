import React, { useState } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const NotificationItem = ({ 
  notification,
  onPress,
  onMarkRead,
  onDelete,
  showActions = true 
}) => {
  const { theme } = useTheme();

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'task_assigned':
        return { name: 'assignment', color: theme?.colors?.primary || '#2979ff' };
      case 'task_completed':
        return { name: 'check-circle', color: theme?.colors?.success || '#4CAF50' };
      case 'urgent':
        return { name: 'priority-high', color: theme?.colors?.error || '#F44336' };
      case 'message':
        return { name: 'message', color: theme?.colors?.secondary || '#03DAC6' };
      case 'system':
        return { name: 'info', color: tokens.colors.tertiary };
      default:
        return { name: 'notifications', color: theme?.colors?.onSurface || '#000000' };
    }
  };

  const getTimeAgo = () => {
    const now = new Date();
    const notificationTime = new Date(notification.timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const icon = getNotificationIcon();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: theme?.spacing?.md || 16,
      backgroundColor: notification.read ? 'transparent' : theme?.colors?.primary || '#2979ff',
      borderRadius: theme?.borderRadius?.sm || 4,
      marginBottom: theme?.spacing?.xs || 4,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: icon.color,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme?.spacing?.md || 16,
    },
    iconStyle: {
      color: tokens.colors.onPrimary,
    },
    contentContainer: {
      flex: 1,
      marginRight: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: tokens.typography.bodyLarge.fontSize,
      fontWeight: tokens.typography.bodyLarge.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.xs || 4,
    },
    message: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      lineHeight: 20,
      marginBottom: theme?.spacing?.xs || 4,
    },
    metaContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timeText: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    priorityBadge: {
      paddingHorizontal: theme?.spacing?.sm || 8,
      paddingVertical: 2,
      borderRadius: theme?.borderRadius?.xs || 2,
      backgroundColor: theme?.colors?.error || '#F44336',
    },
    priorityText: {
      fontSize: tokens.typography.caption.fontSize,
      color: tokens.colors.onError,
      fontWeight: 'bold',
    },
    actionsContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    actionButton: {
      padding: theme?.spacing?.xs || 4,
      marginVertical: 2,
    },
    unreadIndicator: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme?.colors?.primary || '#2979ff',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        {!notification.read && <View style={styles.unreadIndicator} />}
        
        <View style={styles.iconContainer}>
          <MaterialIcons 
            name={icon.name} 
            size={20} 
            style={styles.iconStyle}
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {notification.message}
          </Text>
          
          <View style={styles.metaContainer}>
            <Text style={styles.timeText}>{getTimeAgo()}</Text>
            
            {notification.priority === 'high' && (
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>URGENT</Text>
              </View>
            )}
          </View>
        </View>
        
        {showActions && (
          <View style={styles.actionsContainer}>
            {!notification.read && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => onMarkRead && onMarkRead(notification.id)}
              >
                <MaterialIcons 
                  name="mark-email-read" 
                  size={16} 
                  color={theme?.colors?.onSurface || '#000000'}
                />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onDelete && onDelete(notification.id)}
            >
              <MaterialIcons 
                name="delete" 
                size={16} 
                color={theme?.colors?.onSurface || '#000000'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const NotificationCenter = ({ 
  notifications = [],
  onNotificationPress,
  onMarkRead,
  onMarkAllRead,
  onDelete,
  title = "Notifications",
  isVisible = true 
}) => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');

  if (!isVisible) return null;

  const filters = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'urgent', label: 'Urgent', count: notifications.filter(n => n.priority === 'high').length },
  ];

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'urgent':
        return notifications.filter(n => n.priority === 'high');
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
    },
    unreadBadge: {
      marginLeft: theme?.spacing?.sm || 8,
      backgroundColor: theme?.colors?.error || '#F44336',
      borderRadius: tokens.borderRadius.full,
      paddingHorizontal: theme?.spacing?.sm || 8,
      paddingVertical: 2,
      minWidth: 20,
      alignItems: 'center',
    },
    unreadBadgeText: {
      fontSize: tokens.typography.caption.fontSize,
      color: tokens.colors.onError,
      fontWeight: 'bold',
    },
    markAllButton: {
      padding: theme?.spacing?.xs || 4,
    },
    filtersContainer: {
      flexDirection: 'row',
      marginBottom: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
      padding: 2,
    },
    filterButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme?.spacing?.sm || 8,
      borderRadius: theme?.borderRadius?.xs || 2,
    },
    filterButtonActive: {
      backgroundColor: theme?.colors?.primary || '#2979ff',
    },
    filterText: {
      fontSize: tokens.typography.labelMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    filterTextActive: {
      color: tokens.colors.onPrimary,
      fontWeight: 'bold',
    },
    filterCount: {
      marginLeft: theme?.spacing?.xs || 4,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: theme?.borderRadius?.xs || 2,
      paddingHorizontal: 6,
      paddingVertical: 1,
    },
    filterCountText: {
      fontSize: tokens.typography.caption.fontSize,
      color: tokens.colors.onPrimary,
      fontWeight: 'bold',
    },
    notificationsList: {
      maxHeight: 400,
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: theme?.spacing?.xl || 32,
    },
    emptyIcon: {
      marginBottom: theme?.spacing?.md || 16,
    },
    emptyText: {
      fontSize: tokens.typography.bodyLarge.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          
          {unreadCount > 0 && (
            <Button
              variant="text"
              onPress={onMarkAllRead}
              style={styles.markAllButton}
            >
              <MaterialIcons 
                name="done-all" 
                size={20} 
                color={theme?.colors?.primary || '#2979ff'}
              />
            </Button>
          )}
        </View>
        
        <View style={styles.filtersContainer}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.filterButton,
                filter === f.value && styles.filterButtonActive
              ]}
              onPress={() => setFilter(f.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f.value && styles.filterTextActive
                ]}
              >
                {f.label}
              </Text>
              {filter === f.value && f.count > 0 && (
                <View style={styles.filterCount}>
                  <Text style={styles.filterCountText}>{f.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <ScrollView 
          style={styles.notificationsList} 
          showsVerticalScrollIndicator={false}
        >
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons 
                name="notifications-none" 
                size={48} 
                color={theme?.colors?.onSurface || '#000000'}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
              </Text>
            </View>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onPress={() => onNotificationPress && onNotificationPress(notification)}
                onMarkRead={onMarkRead}
                onDelete={onDelete}
                showActions={true}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Card>
  );
};