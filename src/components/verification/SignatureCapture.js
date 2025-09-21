import React, { useState, useRef } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, Alert, Dimensions } from 'react-native';
import tokens from '../../design-system/tokens';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import tokens from '../../design-system/tokens';
import Svg, { Path } from 'react-native-svg';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

const { width: screenWidth } = Dimensions.get('window');
const signatureWidth = screenWidth - 64; // Account for padding
const signatureHeight = 200;

export const SignatureCapture = ({ onSignatureCapture, isVisible = true, title = "Digital Signature" }) => {
  const { theme } = useTheme();
  const [pathData, setPathData] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const currentPath = useRef('');

  const onGestureEvent = (event) => {
    const { x, y, state } = event.nativeEvent;
    
    if (state === State.BEGAN) {
      setIsDrawing(true);
      currentPath.current = `M${x},${y}`;
    } else if (state === State.ACTIVE && isDrawing) {
      currentPath.current += ` L${x},${y}`;
      setPathData(currentPath.current);
    } else if (state === State.END) {
      setIsDrawing(false);
      setHasSignature(true);
    }
  };

  const clearSignature = () => {
    setPathData('');
    currentPath.current = '';
    setHasSignature(false);
    setIsDrawing(false);
  };

  const captureSignature = () => {
    if (!hasSignature) {
      Alert.alert('No Signature', 'Please provide your signature before capturing.');
      return;
    }

    const signatureData = {
      id: Math.random().toString(36).substr(2, 9),
      pathData: pathData,
      timestamp: new Date().toISOString(),
      dimensions: {
        width: signatureWidth,
        height: signatureHeight,
      },
      metadata: {
        strokeCount: pathData.split('M').length - 1,
        pathLength: pathData.length,
      },
    };

    if (onSignatureCapture) {
      onSignatureCapture(signatureData);
    }

    Alert.alert(
      'Signature Captured',
      'Your digital signature has been saved and attached to this task.',
      [{ text: 'OK' }]
    );
  };

  if (!isVisible) return null;

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
    signatureArea: {
      width: signatureWidth,
      height: signatureHeight,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      borderWidth: 2,
      borderColor: isDrawing ? theme?.colors?.primary || '#2979ff' : theme?.colors?.outline || '#E0E0E0',
      marginBottom: theme?.spacing?.md || 16,
      position: 'relative',
      alignSelf: 'center',
    },
    signaturePlaceholder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: hasSignature ? -1 : 1,
    },
    placeholderText: {
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      marginTop: theme?.spacing?.sm || 8,
    },
    signatureSvg: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    signatureInfo: {
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
      padding: theme?.spacing?.sm || 8,
      marginBottom: theme?.spacing?.md || 16,
    },
    infoText: {
      fontSize: tokens.typography.caption.fontSize,
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
      lineHeight: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: theme?.spacing?.sm || 8,
    },
  });

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={styles.signatureArea}>
            {!hasSignature && (
              <View style={styles.signaturePlaceholder}>
                <MaterialIcons 
                  name="draw" 
                  size={32} 
                  color={theme?.colors?.onSurface || '#000000'}
                />
                <Text style={styles.placeholderText}>
                  Sign here with your finger
                </Text>
              </View>
            )}
            
            {pathData !== '' && (
              <Svg 
                width={signatureWidth} 
                height={signatureHeight}
                style={styles.signatureSvg}
              >
                <Path
                  d={pathData}
                  stroke={theme?.colors?.primary || '#2979ff'}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            )}
          </View>
        </PanGestureHandler>

        <View style={styles.signatureInfo}>
          <Text style={styles.infoText}>
            Your signature will be digitally timestamped and securely stored.{'\n'}
            This signature confirms completion and approval of the task.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="outlined"
            onPress={clearSignature}
            disabled={!hasSignature}
            style={{ flex: 1 }}
          >
            Clear
          </Button>
          
          <Button
            variant="filled"
            onPress={captureSignature}
            disabled={!hasSignature}
            style={{ flex: 1 }}
          >
            Capture Signature
          </Button>
        </View>
      </View>
    </Card>
  );
};