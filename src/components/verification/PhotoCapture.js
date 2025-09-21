import React, { useState } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const PhotoCapture = ({ onPhotoTaken, maxPhotos = 5, isVisible = true }) => {
  const { theme } = useTheme();
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const generateMockPhoto = () => {
    const photoId = Math.random().toString(36).substr(2, 9);
    return {
      id: photoId,
      uri: `https://picsum.photos/400/300?random=${photoId}`,
      timestamp: new Date().toISOString(),
      location: {
        latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
        longitude: -74.0060 + (Math.random() - 0.5) * 0.01,
      },
      fileSize: Math.floor(Math.random() * 2000000) + 500000, // 0.5-2.5MB
    };
  };

  const capturePhoto = () => {
    if (photos.length >= maxPhotos) {
      Alert.alert('Photo Limit', `You can only capture up to ${maxPhotos} photos.`);
      return;
    }

    setIsCapturing(true);
    
    // Simulate camera capture delay
    setTimeout(() => {
      const newPhoto = generateMockPhoto();
      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      setIsCapturing(false);
      
      if (onPhotoTaken) {
        onPhotoTaken(newPhoto, updatedPhotos);
      }
      
      Alert.alert('Photo Captured', 'Photo has been added to this task.');
    }, 1500);
  };

  const deletePhoto = (photoId) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedPhotos = photos.filter(photo => photo.id !== photoId);
            setPhotos(updatedPhotos);
          },
        },
      ]
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (!isVisible) return null;

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
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
    },
    counter: {
      fontSize: tokens.typography.labelMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    captureArea: {
      height: 120,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      borderWidth: 2,
      borderColor: isCapturing ? theme?.colors?.primary || '#2979ff' : theme?.colors?.outline || '#E0E0E0',
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    captureIcon: {
      marginBottom: theme?.spacing?.xs || 4,
    },
    captureText: {
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
    },
    photoGrid: {
      marginTop: theme?.spacing?.md || 16,
    },
    photoItem: {
      marginBottom: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
      overflow: 'hidden',
    },
    photoHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme?.spacing?.sm || 8,
    },
    photoInfo: {
      flex: 1,
    },
    photoTime: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    photoSize: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
    },
    deleteButton: {
      padding: theme?.spacing?.xs || 4,
    },
    photoImage: {
      width: '100%',
      height: 200,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
    },
    buttonContainer: {
      marginTop: theme?.spacing?.md || 16,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Photo Documentation</Text>
          <Text style={styles.counter}>{photos.length} / {maxPhotos}</Text>
        </View>

        <View style={styles.captureArea}>
          <MaterialIcons 
            name="camera-alt" 
            size={32} 
            color={isCapturing ? theme?.colors?.primary || '#2979ff' : theme?.colors?.onSurface || '#000000'}
            style={styles.captureIcon}
          />
          <Text style={styles.captureText}>
            {isCapturing ? 'Capturing photo...' : 'Tap button below to take photo'}
          </Text>
        </View>

        <Button
          variant="filled"
          onPress={capturePhoto}
          disabled={isCapturing || photos.length >= maxPhotos}
          fullWidth
        >
          {isCapturing ? 'Capturing...' : 'Take Photo'}
        </Button>

        {photos.length > 0 && (
          <ScrollView style={styles.photoGrid} showsVerticalScrollIndicator={false}>
            {photos.map((photo) => (
              <View key={photo.id} style={styles.photoItem}>
                <View style={styles.photoHeader}>
                  <View style={styles.photoInfo}>
                    <Text style={styles.photoTime}>
                      {new Date(photo.timestamp).toLocaleString()}
                    </Text>
                    <Text style={styles.photoSize}>
                      {formatFileSize(photo.fileSize)}
                    </Text>
                  </View>
                  <Button
                    variant="text"
                    onPress={() => deletePhoto(photo.id)}
                    style={styles.deleteButton}
                  >
                    <MaterialIcons name="delete" size={20} color={theme?.colors?.error || '#F44336'} />
                  </Button>
                </View>
                <Image 
                  source={{ uri: photo.uri }} 
                  style={styles.photoImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Card>
  );
};