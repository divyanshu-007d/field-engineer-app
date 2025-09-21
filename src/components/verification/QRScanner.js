import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useTheme } from '../../design-system';
import { MaterialIcons } from '@expo/vector-icons';

export const QRScanner = ({ onScan, isVisible = true, title = "Scan QR Code" }) => {
  const { theme } = useTheme();
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR code scanning
    setTimeout(() => {
      const mockQRData = {
        type: 'asset',
        id: 'AST-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        location: 'Main Street & 5th Ave',
        timestamp: new Date().toISOString(),
      };
      
      setLastScan(mockQRData);
      setIsScanning(false);
      
      if (onScan) {
        onScan(mockQRData);
      }
      
      Alert.alert(
        'QR Code Scanned',
        `Asset ID: ${mockQRData.id}\nLocation: ${mockQRData.location}`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  if (!isVisible) return null;

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    scannerArea: {
      height: 200,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      borderWidth: 2,
      borderColor: isScanning ? (theme?.colors?.primary || '#2979ff') : (theme?.colors?.outline || '#E0E0E0'),
      borderStyle: isScanning ? 'dashed' : 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    scannerIcon: {
      marginBottom: theme?.spacing?.sm || 8,
    },
    scannerText: {
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    lastScanContainer: {
      marginTop: theme?.spacing?.md || 16,
      padding: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surfaceVariant || '#F5F5F5',
      borderRadius: theme?.borderRadius?.sm || 4,
    },
    lastScanTitle: {
      fontSize: theme?.typography?.labelLarge?.fontSize || 14,
      fontWeight: theme?.typography?.labelLarge?.fontWeight || '600',
      color: theme?.colors?.onSurfaceVariant || '#666666',
      marginBottom: theme?.spacing?.xs || 4,
    },
    lastScanText: {
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: theme?.colors?.onSurfaceVariant || '#666666',
      lineHeight: 20,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.scannerText}>{title}</Text>
        
        <View style={styles.scannerArea}>
          <MaterialIcons 
            name="qr-code-scanner" 
            size={48} 
            color={isScanning ? (theme?.colors?.primary || '#2979ff') : (theme?.colors?.onSurface || '#000000')}
            style={styles.scannerIcon}
          />
          <Text style={styles.scannerText}>
            {isScanning ? 'Scanning...' : 'Tap button below to scan'}
          </Text>
        </View>

        <Button
          variant={isScanning ? "outlined" : "filled"}
          onPress={handleScan}
          disabled={isScanning}
          fullWidth
        >
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Button>

        {lastScan && (
          <View style={styles.lastScanContainer}>
            <Text style={styles.lastScanTitle}>Last Scan Result:</Text>
            <Text style={styles.lastScanText}>
              Asset ID: {lastScan.id}{'\n'}
              Location: {lastScan.location}{'\n'}
              Time: {new Date(lastScan.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};