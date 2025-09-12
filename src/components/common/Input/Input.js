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
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');

  const hasValue = internalValue.length > 0;
  const hasError = !!error;

  const getBorderColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return colors.primary;
    return colors.outline;
  };

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
          tokens.typography.bodySmall,
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
          minHeight: multiline ? 80 : tokens.componentTokens.input.height,
        }
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            tokens.typography.bodyLarge,
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
          tokens.typography.bodySmall,
          { color: hasError ? colors.error : colors.onSurfaceVariant }
        ]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing.md,
  },
  label: {
    marginBottom: tokens.spacing.xs,
    marginLeft: tokens.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: tokens.componentTokens.input.borderRadius,
    paddingHorizontal: tokens.componentTokens.input.paddingHorizontal,
    paddingVertical: tokens.componentTokens.input.paddingVertical,
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  leftIcon: {
    marginRight: tokens.spacing.xs,
    justifyContent: 'center',
  },
  rightIcon: {
    marginLeft: tokens.spacing.xs,
    justifyContent: 'center',
  },
  helperText: {
    marginTop: tokens.spacing.xs,
    marginLeft: tokens.spacing.xs,
  },
});

export default Input;