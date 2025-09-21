import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../design-system/ThemeProvider';
import tokens from '../../../design-system/tokens';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  required = false,
  disabled = false,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  leftIcon,
  rightIcon,
  style,
  inputStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const { colors } = theme || {};
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const hasValue = internalValue.length > 0;
  const hasError = !!error;

  const getBorderColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return colors.primary;
    return colors.outline;
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme?.spacing?.md || 16,
    },
    label: {
      marginBottom: theme?.spacing?.xs || 4,
      marginLeft: theme?.spacing?.xs || 4,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderWidth: 1,
      borderRadius: theme?.componentTokens?.input?.borderRadius || 8,
      paddingHorizontal: theme?.componentTokens?.input?.paddingHorizontal || 12,
      paddingVertical: theme?.componentTokens?.input?.paddingVertical || 8,
    },
    input: {
      flex: 1,
      margin: 0,
      padding: 0,
    },
    leftIcon: {
      marginRight: theme?.spacing?.xs || 4,
      justifyContent: 'center',
    },
    rightIcon: {
      marginLeft: theme?.spacing?.xs || 4,
      justifyContent: 'center',
    },
    helperText: {
      marginTop: theme?.spacing?.xs || 4,
      marginLeft: theme?.spacing?.xs || 4,
    },
  });

  const getLabelColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return colors.primary;
    return colors.onSurfaceVariant;
  };

  const handleChangeText = (text) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[
          styles.label,
          theme?.typography?.bodySmall || tokens.typography.bodySmall,
          { color: getLabelColor() }
        ]}>
          {label}{required && '*'}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        {
          borderColor: getBorderColor(),
          backgroundColor: disabled ? colors.surfaceVariant : colors.surfaceContainerHighest,
          minHeight: multiline ? 80 : (theme?.componentTokens?.input?.height || 48),
        }
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            theme?.typography?.bodyLarge || tokens.typography.bodyLarge,
            {
              color: disabled ? colors.onSurfaceVariant : colors.onSurface,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          value={internalValue}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {(error || helperText) && (
        <Text style={[
          styles.helperText,
          theme?.typography?.bodySmall || tokens.typography.bodySmall,
          { color: hasError ? colors.error : colors.onSurfaceVariant }
        ]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

export default Input;