import React, { useState, useEffect } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, Alert } from 'react-native';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const GPSTracker = ({ onLocationUpdate, isVisible = true, autoTrack = false }) => {
  const { theme } = useTheme();
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    if (autoTrack) {
      startTracking();
    }
  }, [autoTrack]);

  const generateMockLocation = () => {
    // Mock GPS coordinates for demonstration
    const baseLat = 40.7128; // New York City area
    const baseLng = -74.0060;
    
    return {
      latitude: baseLat + (Math.random() - 0.5) * 0.01,
      longitude: baseLng + (Math.random() - 0.5) * 0.01,
      accuracy: Math.random() * 10 + 3, // 3-13 meters
      timestamp: new Date().toISOString(),
      altitude: Math.random() * 100 + 10,
      speed: Math.random() * 2,
    };
  };

  const startTracking = () => {
    setIsTracking(true);
    
    const trackLocation = () => {
      const location = generateMockLocation();
      setCurrentLocation(location);
      setAccuracy(location.accuracy);
      
      if (onLocationUpdate) {
        onLocationUpdate(location);
      }
    };

    // Initial location
    trackLocation();
    
    // Update location every 5 seconds while tracking
    const interval = setInterval(trackLocation, 5000);
    
    // Stop tracking after 30 seconds for demo
    setTimeout(() => {
      clearInterval(interval);
      setIsTracking(false);
      Alert.alert('GPS Tracking', 'Location tracking completed.');
    }, 30000);
  };

  const stopTracking = () => {
    setIsTracking(false);
    Alert.alert('GPS Tracking', 'Location tracking stopped.');
  };

  const getAccuracyColor = () => {
    if (!accuracy) return theme?.colors?.outline || '#E0E0E0';
    if (accuracy < 5) return theme?.colors?.success || '#4CAF50';
    if (accuracy < 10) return theme?.colors?.warning || '#FF9800';
    return theme?.colors?.error || '#F44336';
  };

  const getAccuracyText = () => {
    if (!accuracy) return 'Unknown';
    if (accuracy < 5) return 'Excellent';
    if (accuracy < 10) return 'Good';
    return 'Fair';
  };

  if (!isVisible) return null;

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    statusIcon: {
      marginRight: theme?.spacing?.sm || 8,
    },
    statusText: {
      fontSize: theme?.typography?.labelLarge?.fontSize || 14,
      fontWeight: theme?.typography?.labelLarge?.fontWeight || '600',
      color: isTracking ? theme?.colors?.primary || '#2979ff' : theme?.colors?.onSurface || '#000000',
    },
    locationContainer: {
      marginBottom: theme?.spacing?.md || 16,
      padding: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
    },
    locationTitle: {
      fontSize: theme?.typography?.labelLarge?.fontSize || 14,
      fontWeight: theme?.typography?.labelLarge?.fontWeight || '600',
      color: theme?.colors?.onSurface || '#000000',
      marginBottom: theme?.spacing?.xs || 4,
    },
    locationText: {
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: theme?.colors?.onSurface || '#000000',
      lineHeight: 20,
    },
    accuracyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme?.spacing?.sm || 8,
    },
    accuracyDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: theme?.spacing?.xs || 4,
    },
    accuracyText: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: theme?.spacing?.sm || 8,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <MaterialIcons 
            name={isTracking ? "gps-fixed" : "gps-not-fixed"}
            size={24}
            color={isTracking ? theme?.colors?.primary || '#2979ff' : theme?.colors?.onSurface || '#000000'}
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>
            GPS {isTracking ? 'Tracking Active' : 'Tracking Inactive'}
          </Text>
        </View>

        {currentLocation && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Current Location:</Text>
            <Text style={styles.locationText}>
              Latitude: {currentLocation.latitude.toFixed(6)}{'\n'}
              Longitude: {currentLocation.longitude.toFixed(6)}{'\n'}
              Altitude: {currentLocation.altitude.toFixed(1)}m{'\n'}
              Speed: {currentLocation.speed.toFixed(1)} m/s
            </Text>
            
            <View style={styles.accuracyContainer}>
              <View 
                style={[
                  styles.accuracyDot, 
                  { backgroundColor: getAccuracyColor() }
                ]} 
              />
              <Text style={styles.accuracyText}>
                Accuracy: {accuracy?.toFixed(1)}m ({getAccuracyText()})
              </Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            variant="filled"
            onPress={isTracking ? stopTracking : startTracking}
            style={{ flex: 1 }}
          >
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Button>
          
          {currentLocation && (
            <Button
              variant="outlined"
              onPress={() => {
                Alert.alert(
                  'Location Saved',
                  'Current location has been saved to this task.',
                  [{ text: 'OK' }]
                );
              }}
              style={{ flex: 1 }}
            >
              Save Location
            </Button>
          )}
        </View>
      </View>
    </Card>
  );
};