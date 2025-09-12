import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const departments = [
    'Public Works',
    'Water & Sewerage',
    'Roads & Transportation',
    'Parks & Recreation',
    'Building & Safety',
    'Environmental Services',
    'Emergency Services',
    'Engineering',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (formData.employeeId.length < 4) {
      newErrors.employeeId = 'Employee ID must be at least 4 characters';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For prototype, just navigate to profile setup
      navigation.navigate('ProfileSetup');
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    // Placeholder for biometric authentication
    alert('Biometric authentication will be implemented');
  };

  const handleForgotCredentials = () => {
    // Placeholder for forgot credentials flow
    alert('Password reset will be implemented');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Field Engineer
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Municipal Services Portal
          </Text>
        </View>

        {/* Login Card */}
        <Card variant="elevated" style={styles.loginCard}>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
              Employee Login
            </Text>

            {errors.general && (
              <View style={[styles.errorContainer, { backgroundColor: `${colors.error}15` }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors.general}
                </Text>
              </View>
            )}

            <View style={styles.form}>
              <Input
                label="Employee ID"
                value={formData.employeeId}
                onChangeText={(value) => handleInputChange('employeeId', value)}
                placeholder="Enter your employee ID"
                autoCapitalize="characters"
                autoCorrect={false}
                error={errors.employeeId}
                maxLength={10}
              />

              <Input
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password}
                autoCorrect={false}
              />

              <Input
                label="Department"
                value={formData.department}
                onChangeText={(value) => handleInputChange('department', value)}
                placeholder="Select your department"
                error={errors.department}
                // This would be a picker in a real implementation
                editable={false}
                onPress={() => {
                  // Show department picker
                  alert('Department picker will be implemented');
                }}
              />
            </View>

            <View style={styles.actions}>
              <Button
                title={loading ? "Signing In..." : "Sign In"}
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                variant="filled"
                style={styles.loginButton}
              />

              <View style={styles.alternativeActions}>
                <Button
                  title="Use Biometric Login"
                  onPress={handleBiometricLogin}
                  variant="outlined"
                  style={styles.biometricButton}
                />

                <Button
                  title="Forgot Credentials?"
                  onPress={handleForgotCredentials}
                  variant="text"
                  style={styles.forgotButton}
                />
              </View>
            </View>
          </View>
        </Card>

        {/* Emergency Contact */}
        <Card variant="outlined" style={styles.emergencyCard}>
          <View style={styles.emergencyContent}>
            <Text style={[styles.emergencyTitle, { color: colors.error }]}>
              Emergency Contact
            </Text>
            <Text style={[styles.emergencyText, { color: colors.onSurfaceVariant }]}>
              For urgent issues or login problems:
            </Text>
            <Text style={[styles.emergencyPhone, { color: colors.primary }]}>
              📞 (555) 123-4567
            </Text>
            <Text style={[styles.emergencyHours, { color: colors.onSurfaceVariant }]}>
              Available 24/7 for field engineers
            </Text>
          </View>
        </Card>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
            Field Engineer App v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
            Municipal Services Department
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.typography.headlineLarge.fontSize,
    fontWeight: '700',
    lineHeight: tokens.typography.headlineLarge.lineHeight,
    textAlign: 'center',
    marginBottom: tokens.spacing.xs,
  },
  subtitle: {
    fontSize: tokens.typography.titleMedium.fontSize,
    textAlign: 'center',
    fontWeight: '400',
  },
  loginCard: {
    marginBottom: tokens.spacing.lg,
  },
  cardContent: {
    padding: tokens.spacing.xl,
  },
  cardTitle: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: tokens.spacing.lg,
  },
  errorContainer: {
    padding: tokens.spacing.md,
    borderRadius: tokens.borderRadius.sm,
    marginBottom: tokens.spacing.md,
  },
  errorText: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    textAlign: 'center',
    fontWeight: '500',
  },
  form: {
    gap: tokens.spacing.lg,
    marginBottom: tokens.spacing.xl,
  },
  actions: {
    gap: tokens.spacing.md,
  },
  loginButton: {
    marginBottom: tokens.spacing.md,
  },
  alternativeActions: {
    gap: tokens.spacing.sm,
    alignItems: 'center',
  },
  biometricButton: {
    width: '100%',
  },
  forgotButton: {
    alignSelf: 'center',
  },
  emergencyCard: {
    marginBottom: tokens.spacing.lg,
  },
  emergencyContent: {
    padding: tokens.spacing.lg,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: tokens.typography.titleMedium.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.sm,
  },
  emergencyText: {
    fontSize: tokens.typography.bodyMedium.fontSize,
    textAlign: 'center',
    marginBottom: tokens.spacing.xs,
  },
  emergencyPhone: {
    fontSize: tokens.typography.titleSmall.fontSize,
    fontWeight: '600',
    marginBottom: tokens.spacing.xs,
  },
  emergencyHours: {
    fontSize: tokens.typography.bodySmall.fontSize,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: tokens.spacing.lg,
  },
  footerText: {
    fontSize: tokens.typography.labelSmall.fontSize,
    textAlign: 'center',
    lineHeight: tokens.typography.labelSmall.lineHeight,
  },
});

export default LoginScreen;