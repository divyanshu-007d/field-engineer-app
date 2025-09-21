import React, { useState } from 'react';
import tokens from '../../design-system/tokens';
import { View, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tokens from '../../design-system/tokens';
import { Button } from '../common/Button';
import tokens from '../../design-system/tokens';
import { Card } from '../common/Card';
import tokens from '../../design-system/tokens';
import { useTheme } from '../../design-system';
import tokens from '../../design-system/tokens';
import { MaterialIcons } from '@expo/vector-icons';
import tokens from '../../design-system/tokens';

export const ChatMessage = ({ 
  message, 
  isCurrentUser = false,
  showAvatar = true,
  showTimestamp = true 
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: theme?.spacing?.md || 16,
      paddingHorizontal: theme?.spacing?.md || 16,
    },
    messageContainer: {
      maxWidth: '75%',
      alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      marginLeft: isCurrentUser ? 'auto' : (showAvatar ? 40 : 0),
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme?.colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme?.spacing?.sm || 8,
    },
    avatarText: {
      color: tokens.colors.onPrimary,
      fontSize: tokens.typography.labelSmall.fontSize,
      fontWeight: 'bold',
    },
    messageBubble: {
      backgroundColor: isCurrentUser ? theme?.colors?.primary || '#2979ff' : theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.md || 8,
      padding: theme?.spacing?.md || 16,
      borderBottomRightRadius: isCurrentUser ? 4 : theme?.borderRadius?.md || 8,
      borderBottomLeftRadius: isCurrentUser ? theme?.borderRadius?.md || 8 : 4,
    },
    messageText: {
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000',
      lineHeight: 20,
    },
    messageHeader: {
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
    attachment: {
      marginTop: theme?.spacing?.sm || 8,
      padding: theme?.spacing?.sm || 8,
      backgroundColor: isCurrentUser ? 'rgba(255,255,255,0.1)' : theme?.colors?.surface || '#FFFFFF',
      borderRadius: theme?.borderRadius?.sm || 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    attachmentIcon: {
      marginRight: theme?.spacing?.xs || 4,
    },
    attachmentText: {
      fontSize: tokens.typography.labelSmall.fontSize,
      color: isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000',
    },
  });

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <View style={styles.container}>
      {!isCurrentUser && showAvatar && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(message.sender.name)}
          </Text>
        </View>
      )}
      
      <View style={styles.messageContainer}>
        <View style={styles.messageBubble}>
          {(!isCurrentUser || showTimestamp) && (
            <View style={styles.messageHeader}>
              {!isCurrentUser && (
                <Text style={styles.senderName}>{message.sender.name}</Text>
              )}
              {showTimestamp && (
                <Text style={styles.timestamp}>
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              )}
            </View>
          )}
          
          <Text style={styles.messageText}>{message.text}</Text>
          
          {message.attachment && (
            <View style={styles.attachment}>
              <MaterialIcons 
                name={message.attachment.type === 'image' ? 'image' : 'attach-file'} 
                size={16} 
                color={isCurrentUser ? tokens.colors.onPrimary : theme?.colors?.onSurface || '#000000'}
                style={styles.attachmentIcon}
              />
              <Text style={styles.attachmentText}>
                {message.attachment.name}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export const ChatInput = ({ onSendMessage, placeholder = "Type a message..." }) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    onSendMessage({
      text: message,
      timestamp: new Date().toISOString(),
      type: 'text',
    });
    
    setMessage('');
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // Simulate voice message
      onSendMessage({
        text: "Voice message",
        timestamp: new Date().toISOString(),
        type: 'voice',
        attachment: {
          type: 'audio',
          name: 'Voice message',
          duration: Math.floor(Math.random() * 30) + 5,
        },
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: theme?.colors?.outline || '#E0E0E0',
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderRadius: tokens.borderRadius.full,
      paddingHorizontal: theme?.spacing?.md || 16,
      marginRight: theme?.spacing?.sm || 8,
    },
    textInput: {
      flex: 1,
      fontSize: theme?.typography?.body?.fontSize || 16,
      color: theme?.colors?.onSurface || '#000000',
      paddingVertical: theme?.spacing?.md || 16,
      maxHeight: 100,
    },
    attachButton: {
      marginLeft: theme?.spacing?.sm || 8,
    },
    voiceButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isRecording ? theme?.colors?.error || '#F44336' : theme?.colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme?.colors?.primary || '#2979ff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={theme?.colors?.onSurface || '#000000'}
          multiline
          textAlignVertical="center"
        />
        
        <Button
          variant="text"
          onPress={() => {}}
          style={styles.attachButton}
        >
          <MaterialIcons 
            name="attach-file" 
            size={20} 
            color={theme?.colors?.onSurface || '#000000'} 
          />
        </Button>
      </View>
      
      {message.trim() === '' ? (
        <Button
          variant="text"
          onPress={handleVoiceRecord}
          style={styles.voiceButton}
        >
          <MaterialIcons 
            name={isRecording ? "stop" : "mic"} 
            size={24} 
            color={tokens.colors.onPrimary}
          />
        </Button>
      ) : (
        <Button
          variant="text"
          onPress={handleSend}
          style={styles.sendButton}
        >
          <MaterialIcons 
            name="send" 
            size={24} 
            color={tokens.colors.onPrimary}
          />
        </Button>
      )}
    </KeyboardAvoidingView>
  );
};

export const ChatRoom = ({ 
  messages = [], 
  currentUserId,
  onSendMessage,
  title = "Team Chat",
  isVisible = true 
}) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.background,
    },
    header: {
      padding: theme?.spacing?.md || 16,
      backgroundColor: theme?.colors?.surface || '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: theme?.colors?.outline || '#E0E0E0',
    },
    headerTitle: {
      fontSize: theme?.typography?.titleMedium?.fontSize || 18,
      fontWeight: theme?.typography?.titleMedium?.fontWeight || '500',
      color: theme?.colors?.onSurface || '#000000',
      textAlign: 'center',
    },
    messagesContainer: {
      flex: 1,
    },
    messagesList: {
      paddingVertical: theme?.spacing?.md || 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id || index}
            message={message}
            isCurrentUser={message.sender.id === currentUserId}
            showAvatar={true}
            showTimestamp={true}
          />
        ))}
      </ScrollView>
      
      <ChatInput onSendMessage={onSendMessage} />
    </View>
  );
};