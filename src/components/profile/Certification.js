import React from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const CertificationCard = ({ 
  certification,
  onRenew,
  onDownload,
  showActions = true 
}) => {
  const { theme } = useTheme();

  const getStatusColor = () => {
    switch (certification.status) {
      case 'valid':
        return theme?.colors?.success || '#4CAF50';
      case 'expiring':
        return theme?.colors?.warning || '#FF9800';
      case 'expired':
        return theme?.colors?.error || '#F44336';
      default:
        return theme?.colors?.outline || '#E0E0E0';
    }
  };

  const getStatusIcon = () => {
    switch (certification.status) {
      case 'valid':
        return 'verified';
      case 'expiring':
        return 'schedule';
      case 'expired':
        return 'error';
      default:
        return 'help';
    }
  };

  const getDaysUntilExpiry = () => {
    const expiryDate = new Date(certification.expiryDate);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpiry = getDaysUntilExpiry();
  const statusColor = getStatusColor();
  const statusIcon = getStatusIcon();

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      marginBottom: theme?.spacing?.md || 16,
      borderLeftWidth: 4,
      borderLeftColor: statusColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme?.spacing?.md || 16,
    },
    titleContainer: {
      flex: 1,
      marginRight: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: tokens.typography.titleSmall.fontSize,
      fontWeight: tokens.typography.titleSmall.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.xs || 4,
    },
    issuer: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.xs || 4,
    },
    certId: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      fontFamily: 'monospace',
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: statusColor,
      paddingHorizontal: theme?.spacing?.sm || 8,
      paddingVertical: theme?.spacing?.xs || 4,
      borderRadius: theme?.borderRadius?.sm || 4,
    },
    statusIcon: {
      color: tokens.colors.onPrimary,
      marginRight: theme?.spacing?.xs || 4,
    },
    statusText: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: tokens.colors.onPrimary,
      fontWeight: 'bold',
    },
    datesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme?.spacing?.md || 16,
    },
    dateItem: {
      flex: 1,
    },
    dateLabel: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: 2,
    },
    dateValue: {
      fontSize: tokens.typography.bodySmall.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    expiryWarning: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme?.colors?.error || '#F44336',
      padding: theme?.spacing?.sm || 8,
      borderRadius: theme?.borderRadius?.sm || 4,
      marginBottom: theme?.spacing?.md || 16,
    },
    warningIcon: {
      color: tokens.colors.onErrorContainer,
      marginRight: theme?.spacing?.sm || 8,
    },
    warningText: {
      flex: 1,
      fontSize: tokens.typography.bodySmall.fontSize,
      color: tokens.colors.onErrorContainer,
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: theme?.spacing?.sm || 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{certification.name}</Text>
          <Text style={styles.issuer}>{certification.issuer}</Text>
          <Text style={styles.certId}>ID: {certification.id}</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <MaterialIcons 
            name={statusIcon} 
            size={14} 
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>
            {certification.status.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.datesContainer}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Issued</Text>
          <Text style={styles.dateValue}>
            {new Date(certification.issueDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Expires</Text>
          <Text style={styles.dateValue}>
            {new Date(certification.expiryDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
      
      {(certification.status === 'expiring' || certification.status === 'expired') && (
        <View style={styles.expiryWarning}>
          <MaterialIcons 
            name="warning" 
            size={20} 
            style={styles.warningIcon}
          />
          <Text style={styles.warningText}>
            {certification.status === 'expired' 
              ? 'This certification has expired and needs renewal.'
              : `This certification expires in ${daysUntilExpiry} days.`
            }
          </Text>
        </View>
      )}
      
      {showActions && (
        <View style={styles.actionsContainer}>
          <Button
            variant="outlined"
            onPress={() => onDownload && onDownload(certification)}
            style={{ flex: 1 }}
          >
            Download
          </Button>
          
          {(certification.status === 'expiring' || certification.status === 'expired') && (
            <Button
              variant="filled"
              onPress={() => onRenew && onRenew(certification)}
              style={{ flex: 1 }}
            >
              Renew
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

export const CertificationsList = ({ 
  certifications = [],
  title = "Certifications & Licenses",
  isVisible = true 
}) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  const handleRenew = (certification) => {
    // Handle certification renewal
    console.log('Renewing certification:', certification.name);
  };

  const handleDownload = (certification) => {
    // Handle certification download
    console.log('Downloading certification:', certification.name);
  };

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.md || 16,
      textAlign: 'center',
    },
    summary: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme?.spacing?.lg || 24,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      padding: theme?.spacing?.md || 16,
    },
    summaryItem: {
      alignItems: 'center',
    },
    summaryNumber: {
      fontSize: tokens.typography.titleLarge.fontSize,
      fontWeight: tokens.typography.titleLarge.fontWeight,
      color: theme?.colors?.onSurface || '#000000',
    },
    summaryLabel: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginTop: theme?.spacing?.xs || 4,
    },
    certificationsList: {
      maxHeight: 400,
    },
  });

  const validCount = certifications.filter(cert => cert.status === 'valid').length;
  const expiringCount = certifications.filter(cert => cert.status === 'expiring').length;
  const expiredCount = certifications.filter(cert => cert.status === 'expired').length;

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: theme?.colors?.success || '#4CAF50' }]}>
              {validCount}
            </Text>
            <Text style={styles.summaryLabel}>Valid</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: theme?.colors?.warning || '#FF9800' }]}>
              {expiringCount}
            </Text>
            <Text style={styles.summaryLabel}>Expiring</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: theme?.colors?.error || '#F44336' }]}>
              {expiredCount}
            </Text>
            <Text style={styles.summaryLabel}>Expired</Text>
          </View>
        </View>
        
        <View style={styles.certificationsList}>
          {certifications.map((certification) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              onRenew={handleRenew}
              onDownload={handleDownload}
              showActions={true}
            />
          ))}
        </View>
      </View>
    </Card>
  );
};