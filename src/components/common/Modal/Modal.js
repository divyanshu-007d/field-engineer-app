import React from 'react';
import { 
  Modal as RNModal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar 
} from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';
import Button from '../Button';

const Modal = ({
  visible = false,
  onClose,
  title,
  children,
  actions,
  dismissible = true,
  animationType = 'fade',
  presentationStyle = 'overFullScreen',
  style,
  contentStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors } = theme || {};

  const handleBackdropPress = () => {
    if (dismissible) {
      onClose?.();
    }
  };

  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      presentationStyle={presentationStyle}
      transparent={true}
      statusBarTranslucent={true}
      {...props}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={[styles.overlay, { backgroundColor: colors.scrim + '80' }]}>
          <TouchableWithoutFeedback>
            <View style={[
              styles.modal,
              {
                backgroundColor: colors.surfaceContainerHigh,
              },
              style
            ]}>
              {title && (
                <View style={styles.header}>
                  <Text style={[
                    styles.title,
                    tokens.typography.headlineSmall,
                    { color: colors.onSurface }
                  ]}>
                    {title}
                  </Text>
                  {dismissible && (
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={onClose}
                    >
                      <Text style={[
                        styles.closeText,
                        { color: colors.onSurfaceVariant }
                      ]}>
                        ✕
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              
              <View style={[styles.content, contentStyle]}>
                {children}
              </View>
              
              {actions && actions.length > 0 && (
                <View style={styles.actions}>
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      title={action.title}
                      onPress={action.onPress}
                      variant={action.variant || 'text'}
                      style={[styles.actionButton, action.style]}
                    />
                  ))}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme?.spacing?.lg || 24,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: theme?.borderRadius?.xl || 16,
    maxHeight: '80%',
    ...tokens.elevation.level3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme?.spacing?.lg || 24,
    paddingBottom: theme?.spacing?.md || 16,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: theme?.spacing?.xs || 4,
    marginLeft: theme?.spacing?.md || 16,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: theme?.spacing?.lg || 24,
    paddingBottom: theme?.spacing?.md || 16,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme?.spacing?.lg || 24,
    paddingTop: theme?.spacing?.md || 16,
  },
  actionButton: {
    marginLeft: theme?.spacing?.sm || 8,
  },
});

export default Modal;