import React, { useState } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const VoiceNote = ({ 
  voiceNote,
  isCurrentUser = false,
  onPlay,
  onDelete,
  showControls = true 
}) => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate audio playback
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          if (newTime >= voiceNote.duration) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    
    if (onPlay) {
      onPlay(voiceNote, !isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWaveformData = () => {
    // Generate mock waveform data
    return Array.from({ length: 20 }, () => Math.random() * 40 + 10);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isCurrentUser ? theme?.colors?.primary || '#2979ff' : theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      padding: theme?.spacing?.md || 16,
      marginVertical: theme?.spacing?.xs || 4,
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 200,
    },
    playButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme?.spacing?.md || 16,
    },
    playIcon: {
      color: isCurrentUser ? theme?.colors?.primary || '#2979ff' : tokens.colors.onPrimary,
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme?.spacing?.xs || 4,
    },
    senderName: {
      fontSize: tokens.typography.labelSmall.fontSize,
      fontWeight: tokens.typography.labelSmall.fontWeight,
      color: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000',
    },
    timestamp: {
      fontSize: tokens.typography.caption.fontSize,
      color: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000',
      opacity: 0.7,
    },
    waveformContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 30,
      marginBottom: theme?.spacing?.xs || 4,
    },
    waveformBar: {
      width: 2,
      backgroundColor: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000',
      marginHorizontal: 1,
      opacity: 0.7,
    },
    waveformBarActive: {
      opacity: 1,
      backgroundColor: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.primary || '#2979ff',
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timeText: {
      fontSize: tokens.typography.caption.fontSize,
      color: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000',
    },
    controlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    controlButton: {
      marginLeft: theme?.spacing?.sm || 8,
    },
  });

  const waveformData = getWaveformData();
  const progressIndex = Math.floor((currentTime / voiceNote.duration) * waveformData.length);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
        <MaterialIcons 
          name={isPlaying ? "pause" : "play-arrow"} 
          size={20} 
          style={styles.playIcon}
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        {!isCurrentUser && (
          <View style={styles.header}>
            <Text style={styles.senderName}>{voiceNote.sender.name}</Text>
            <Text style={styles.timestamp}>
              {new Date(voiceNote.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        )}
        
        <View style={styles.waveformContainer}>
          {waveformData.map((height, index) => (
            <View
              key={index}
              style={[
                styles.waveformBar,
                { height },
                index <= progressIndex && styles.waveformBarActive,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(currentTime)} / {formatTime(voiceNote.duration)}
          </Text>
          
          {showControls && (
            <View style={styles.controlsContainer}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => {
                  Alert.alert(
                    'Delete Voice Note',
                    'Are you sure you want to delete this voice note?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { 
                        text: 'Delete', 
                        style: 'destructive',
                        onPress: () => onDelete && onDelete(voiceNote.id)
                      },
                    ]
                  );
                }}
              >
                <MaterialIcons 
                  name="delete" 
                  size={16} 
                  color={isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000'}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export const VoiceRecorder = ({ onRecordingComplete, isVisible = true }) => {
  const { theme } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState(true);

  const startRecording = () => {
    if (!hasPermission) {
      Alert.alert(
        'Microphone Permission',
        'Please allow microphone access to record voice notes.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsRecording(true);
    setRecordingTime(0);

    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 0.1);
    }, 100);

    // Auto-stop after 60 seconds
    setTimeout(() => {
      stopRecording();
      clearInterval(timer);
    }, 60000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (recordingTime > 0.5) {
      const voiceNote = {
        id: Math.random().toString(36).substr(2, 9),
        duration: recordingTime,
        timestamp: new Date().toISOString(),
        fileSize: Math.floor(recordingTime * 1024 * 8), // Approximate file size
      };
      
      if (onRecordingComplete) {
        onRecordingComplete(voiceNote);
      }
    }
    
    setRecordingTime(0);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
  };

  if (!isVisible) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      padding: theme?.spacing?.md || 16,
    },
    title: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginBottom: theme?.spacing?.md || 16,
    },
    recordingContainer: {
      alignItems: 'center',
      marginBottom: theme?.spacing?.lg || 24,
    },
    recordingIndicator: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: isRecording ? theme?.colors?.error || '#F44336' : theme?.colors?.surface || '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme?.spacing?.md || 16,
      borderWidth: isRecording ? 3 : 1,
      borderColor: isRecording ? theme?.colors?.error || '#F44336' : theme?.colors?.outline || '#E0E0E0',
    },
    recordingIcon: {
      color: isRecording ? tokens.colors.onError : theme?.colors?.onSurface || '#000000',
    },
    recordingTime: {
      fontSize: tokens.typography.titleLarge.fontSize,
      fontWeight: tokens.typography.titleLarge.fontWeight,
      color: isRecording ? theme?.colors?.error || '#F44336' : theme?.colors?.onSurface || '#000000',
    },
    recordingStatus: {
      fontSize: tokens.typography.bodyMedium.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      marginTop: theme?.spacing?.xs || 4,
    },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: theme?.spacing?.md || 16,
    },
    recordButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: isRecording ? theme?.colors?.error || '#F44336' : theme?.colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    stopButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>Record Voice Note</Text>
        
        <View style={styles.recordingContainer}>
          <View style={styles.recordingIndicator}>
            <MaterialIcons 
              name="mic" 
              size={40} 
              style={styles.recordingIcon}
            />
          </View>
          
          <Text style={styles.recordingTime}>
            {formatTime(recordingTime)}
          </Text>
          
          <Text style={styles.recordingStatus}>
            {isRecording ? 'Recording...' : 'Ready to record'}
          </Text>
        </View>
        
        <View style={styles.controlsContainer}>
          {isRecording ? (
            <>
              <TouchableOpacity style={styles.stopButton} onPress={cancelRecording}>
                <MaterialIcons 
                  name="close" 
                  size={24} 
                  color={theme?.colors?.onSurface || '#000000'}
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.recordButton} onPress={stopRecording}>
                <MaterialIcons 
                  name="stop" 
                  size={32} 
                  color={tokens.colors.onError}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
              <MaterialIcons 
                name="mic" 
                size={32} 
                color={tokens.colors.onPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};