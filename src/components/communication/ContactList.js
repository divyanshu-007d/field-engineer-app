import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useTheme } from '../../design-system';
import { MaterialIcons } from '@expo/vector-icons';

export const ContactCard = ({ 
  contact,
  onCall,
  onMessage,
  onEmail,
  showActions = true,
  isOnline = false 
}) => {
  const { theme } = useTheme();
  const { colors, typography, spacing, borderRadius } = theme || {};

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getStatusColor = () => {
    switch (contact.status) {
      case 'available':
        return colors?.success || '#4CAF50';
      case 'busy':
        return colors?.error || '#F44336';
      case 'away':
        return colors?.warning || '#FF9800';
      default:
        return colors?.outline || '#E0E0E0';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: spacing?.md || 16,
      backgroundColor: colors?.surface || '#FFFFFF',
      borderRadius: borderRadius?.md || 8,
      marginBottom: spacing?.sm || 8,
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginRight: spacing?.md || 16,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: colors?.onPrimary || '#FFFFFF',
      fontSize: typography?.titleSmall?.fontSize || 14,
      fontWeight: 'bold',
    },
    statusIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: getStatusColor(),
      borderWidth: 2,
      borderColor: colors?.surface || '#FFFFFF',
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: typography?.bodyLarge?.fontSize || 16,
      fontWeight: typography?.bodyLarge?.fontWeight || '400',
      color: colors?.onSurface || '#000000',
      marginBottom: 2,
    },
    role: {
      fontSize: typography?.bodyMedium?.fontSize || 14,
      color: colors?.onSurface || '#000000',
      marginBottom: 2,
    },
    department: {
      fontSize: typography?.bodySmall?.fontSize || 12,
      color: colors?.onSurface || '#000000',
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: spacing?.sm || 8,
    },
    actionButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(contact.name)}
          </Text>
        </View>
        <View style={styles.statusIndicator} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.role}>{contact.role}</Text>
        <Text style={styles.department}>{contact.department}</Text>
      </View>
      
      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onCall && onCall(contact)}
          >
            <MaterialIcons 
              name="phone" 
              size={18} 
              color={colors?.onPrimary || '#FFFFFF'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onMessage && onMessage(contact)}
          >
            <MaterialIcons 
              name="message" 
              size={18} 
              color={colors?.onPrimary || '#FFFFFF'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onEmail && onEmail(contact)}
          >
            <MaterialIcons 
              name="email" 
              size={18} 
              color={colors?.onPrimary || '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export const ContactList = ({ 
  contacts = [],
  onContactPress,
  onCall,
  onMessage,
  onEmail,
  title = "Team Contacts",
  searchable = true,
  groupByDepartment = false,
  isVisible = true 
}) => {
  const { theme } = useTheme();
  const { colors, typography, spacing, borderRadius } = theme || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (!isVisible) return null;

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available' },
    { value: 'supervisors', label: 'Supervisors' },
    { value: 'emergency', label: 'Emergency' },
  ];

  const getFilteredContacts = () => {
    let filtered = contacts;

    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    switch (selectedFilter) {
      case 'available':
        filtered = filtered.filter(contact => contact.status === 'available');
        break;
      case 'supervisors':
        filtered = filtered.filter(contact => 
          contact.role.toLowerCase().includes('supervisor') ||
          contact.role.toLowerCase().includes('manager')
        );
        break;
      case 'emergency':
        filtered = filtered.filter(contact => contact.isEmergencyContact);
        break;
    }

    return filtered;
  };

  const groupContactsByDepartment = (contactList) => {
    return contactList.reduce((groups, contact) => {
      const department = contact.department || 'Other';
      if (!groups[department]) {
        groups[department] = [];
      }
      groups[department].push(contact);
      return groups;
    }, {});
  };

  const filteredContacts = getFilteredContacts();
  const groupedContacts = groupByDepartment ? groupContactsByDepartment(filteredContacts) : null;

  const handleContactAction = (action, contact) => {
    switch (action) {
      case 'call':
        Alert.alert(
          'Call Contact',
          `Call ${contact.name} at ${contact.phone}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Call', onPress: () => onCall && onCall(contact) },
          ]
        );
        break;
      case 'message':
        onMessage && onMessage(contact);
        break;
      case 'email':
        Alert.alert(
          'Send Email',
          `Send email to ${contact.name} at ${contact.email}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Send', onPress: () => onEmail && onEmail(contact) },
          ]
        );
        break;
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: spacing?.md || 16,
    },
    header: {
      marginBottom: spacing?.md || 16,
    },
    title: {
      fontSize: typography?.titleMedium?.fontSize || 18,
      fontWeight: typography?.titleMedium?.fontWeight || '500',
      color: colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: spacing?.md || 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors?.surface || '#FFFFFF',
      borderRadius: borderRadius?.full || 9999,
      paddingHorizontal: spacing?.md || 16,
      marginBottom: spacing?.md || 16,
    },
    searchInput: {
      flex: 1,
      fontSize: typography?.bodyMedium?.fontSize || 14,
      color: colors?.onSurface || '#000000',
      paddingVertical: spacing?.md || 16,
    },
    searchIcon: {
      marginLeft: spacing?.sm || 8,
    },
    filtersContainer: {
      flexDirection: 'row',
      marginBottom: spacing?.md || 16,
      backgroundColor: colors?.surface || '#FFFFFF',
      borderRadius: borderRadius?.sm || 4,
      padding: 2,
    },
    filterButton: {
      flex: 1,
      paddingVertical: spacing?.sm || 8,
      borderRadius: borderRadius?.xs || 2,
      alignItems: 'center',
    },
    filterButtonActive: {
      backgroundColor: colors?.primary || '#2979ff',
    },
    filterText: {
      fontSize: typography?.labelMedium?.fontSize || 12,
      color: colors?.onSurface || '#000000',
    },
    filterTextActive: {
      color: colors?.onPrimary || '#FFFFFF',
      fontWeight: 'bold',
    },
    contactsList: {
      maxHeight: 400,
    },
    departmentHeader: {
      fontSize: typography?.titleSmall?.fontSize || 14,
      fontWeight: typography?.titleSmall?.fontWeight || '500',
      color: colors?.primary || '#2979ff',
      marginTop: spacing?.md || 16,
      marginBottom: spacing?.sm || 8,
      paddingHorizontal: spacing?.md || 16,
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: spacing?.xl || 32,
    },
    emptyIcon: {
      marginBottom: spacing?.md || 16,
    },
    emptyText: {
      fontSize: typography?.bodyLarge?.fontSize || 16,
      color: colors?.onSurface || '#000000',
      textAlign: 'center',
    },
  });

  const renderContacts = () => {
    if (groupByDepartment && groupedContacts) {
      return Object.entries(groupedContacts).map(([department, departmentContacts]) => (
        <View key={department}>
          <Text style={styles.departmentHeader}>{department}</Text>
          {departmentContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onCall={(contact) => handleContactAction('call', contact)}
              onMessage={(contact) => handleContactAction('message', contact)}
              onEmail={(contact) => handleContactAction('email', contact)}
              showActions={true}
            />
          ))}
        </View>
      ));
    } else {
      return filteredContacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onCall={(contact) => handleContactAction('call', contact)}
          onMessage={(contact) => handleContactAction('message', contact)}
          onEmail={(contact) => handleContactAction('email', contact)}
          showActions={true}
        />
      ));
    }
  };

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          
          {searchable && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search contacts..."
                placeholderTextColor={colors?.onSurfaceVariant || '#666666'}
              />
              <MaterialIcons 
                name="search" 
                size={20} 
                color={colors?.onSurfaceVariant || '#666666'}
                style={styles.searchIcon}
              />
            </View>
          )}
          
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.value && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.value)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter.value && styles.filterTextActive
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <ScrollView 
          style={styles.contactsList} 
          showsVerticalScrollIndicator={false}
        >
          {filteredContacts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons 
                name="people-outline" 
                size={48} 
                color={colors?.onSurfaceVariant || '#666666'}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                {searchQuery ? 'No contacts match your search' : 'No contacts available'}
              </Text>
            </View>
          ) : (
            renderContacts()
          )}
        </ScrollView>
      </View>
    </Card>
  );
};