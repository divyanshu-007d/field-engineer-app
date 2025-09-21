import React, { useState, useContext, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { AuthContext } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme || {};
  const { signIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Animation values for floating elements
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation for background elements
    const createFloatingAnimation = (animatedValue, duration) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createFloatingAnimation(float1, 8000);
    const animation2 = createFloatingAnimation(float2, 6000);
    const animation3 = createFloatingAnimation(float3, 7000);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

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
      
      // For prototype, create user data and sign in
      const userData = {
        id: 1,
        name: 'John Smith',
        employeeId: formData.employeeId,
        department: formData.department,
        email: 'john.smith@city.gov',
      };
      
      await signIn(userData);
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
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          theme.colors.primary + '20',
          theme.colors.secondary + '15',
          theme.colors.tertiary + '10',
          theme.colors.background
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradientBackground}
      >
        {/* Animated Floating Elements for Visual Interest */}
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element1,
            {
              transform: [{
                translateY: float1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              }],
              opacity: float1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element2,
            {
              transform: [{
                translateY: float2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 25],
                }),
              }],
              opacity: float2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 0.5],
              }),
            }
          ]}
        />
        <Animated.View 
          style={[
            styles.floatingElement, 
            styles.element3,
            {
              transform: [{
                translateY: float3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              }],
              opacity: float3.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.7],
              }),
            }
          ]}
        />
        
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Modern Header */}
              <View style={styles.header}>
                <Text style={[styles.title, { color: colors.onSurface }]}>
                  Field Engineer
                </Text>
                <Text style={[styles.subtitle, { color: colors.primary }]}>
                  Municipal Services Portal
                </Text>
                <Text style={[styles.description, { color: colors.onSurfaceVariant }]}>
                  Manage civic infrastructure with professional tools
                </Text>
              </View>

              {/* Glassmorphism Login Card */}
              <BlurView intensity={80} tint="light" style={styles.glassCard}>
                <View style={styles.cardOverlay}>
                  <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                    Employee Access
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
                    Secure login to field services
                  </Text>

                  {errors.general && (
                    <BlurView intensity={40} tint="light" style={styles.errorContainer}>
                      <View style={[styles.errorInner, { backgroundColor: `${colors.error}15` }]}>
                        <Text style={[styles.errorText, { color: colors.error }]}>
                          {errors.general}
                        </Text>
                      </View>
                    </BlurView>
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
                      style={styles.glassInput}
                    />

                    <Input
                      label="Password"
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      placeholder="Enter your password"
                      secureTextEntry
                      error={errors.password}
                      autoCorrect={false}
                      style={styles.glassInput}
                    />

                    <TouchableOpacity
                      style={styles.departmentSelector}
                      onPress={() => {
                        // Show department picker
                        alert('Department picker will be implemented');
                      }}
                    >
                      <BlurView intensity={30} tint="light" style={styles.departmentBlur}>
                        <Text style={[styles.departmentLabel, { color: colors.onSurfaceVariant }]}>
                          Department
                        </Text>
                        <Text style={[styles.departmentValue, { 
                          color: formData.department ? colors.onSurface : colors.onSurfaceVariant 
                        }]}>
                          {formData.department || 'Select your department'}
                        </Text>
                      </BlurView>
                      {errors.department && (
                        <Text style={[styles.fieldError, { color: colors.error }]}>
                          {errors.department}
                        </Text>
                      )}
                    </TouchableOpacity>

                    <Button
                      title={loading ? "Signing In..." : "Sign In"}
                      onPress={handleLogin}
                      loading={loading}
                      disabled={loading}
                      variant="filled"
                      style={styles.primaryButton}
                    />

                    <View style={styles.alternativeActions}>
                      <TouchableOpacity
                        onPress={handleBiometricLogin}
                        style={styles.biometricButton}
                      >
                        <BlurView intensity={60} tint="light" style={styles.biometricBlur}>
                          <Text style={[styles.biometricText, { color: colors.primary }]}>
                            🔒 Use Biometric Login
                          </Text>
                        </BlurView>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleForgotCredentials}
                        style={styles.forgotButton}
                      >
                        <BlurView intensity={30} tint="light" style={styles.forgotBlur}>
                          <Text style={[styles.forgotText, { color: colors.onSurfaceVariant }]}>
                            Forgot Credentials?
                          </Text>
                        </BlurView>
                      </TouchableOpacity>
                    </View>
                    </View>
                </View>
              </BlurView>

              {/* Emergency Contact */}
              <BlurView intensity={60} tint="light" style={styles.emergencyCard}>
                <View style={styles.emergencyOverlay}>
                  <Text style={[styles.emergencyTitle, { color: colors.error }]}>
                    🚨 Emergency Contact
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
              </BlurView>

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
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

  // Create styles function that uses theme
  const createStyles = (theme) => StyleSheet.create({
    container: {
      flex: 1,
    },
    gradientBackground: {
      flex: 1,
      position: 'relative',
    },
    
    // Floating background elements
    floatingElement: {
      position: 'absolute',
      borderRadius: theme.borderRadius.full,
      opacity: 0.1,
    },
    element1: {
      width: 200,
      height: 200,
      backgroundColor: theme.colors.primary,
      top: height * 0.1,
      right: -50,
    },
    element2: {
      width: 150,
      height: 150,
      backgroundColor: theme.colors.tertiary,
      top: height * 0.6,
      left: -30,
    },
    element3: {
      width: 100,
      height: 100,
      backgroundColor: theme.colors.secondary,
      top: height * 0.8,
      right: width * 0.3,
    },
    
    safeArea: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: theme.spacing.screenPadding,
      justifyContent: 'center',
    },
    
    // Modern Header
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing.xxl,
      paddingTop: theme.spacing.xl,
    },
    title: {
      ...theme.typography.displayMedium,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
      letterSpacing: -1,
    },
    subtitle: {
      ...theme.typography.titleMedium,
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
      fontWeight: '600',
    },
    description: {
      ...theme.typography.bodyLarge,
      textAlign: 'center',
      lineHeight: 22,
      paddingHorizontal: theme.spacing.lg,
    },
    
    // Glassmorphism Card
    glassCard: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      marginBottom: theme.spacing.xxl,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    cardOverlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: theme.spacing.xl,
      backdropFilter: 'blur(20px)',
    },
    cardTitle: {
      ...theme.typography.headlineMedium,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
    },
    cardSubtitle: {
      ...theme.typography.bodyMedium,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    
    // Error handling with glassmorphism
    errorContainer: {
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    errorInner: {
      padding: theme.spacing.md,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    errorText: {
      ...theme.typography.bodyMedium,
      textAlign: 'center',
      fontWeight: '500',
    },
    
    // Form styles
    form: {
      gap: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
    },
    glassInput: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    
    // Department selector with glassmorphism
    departmentSelector: {
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    departmentBlur: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: theme.spacing.md,
    },
    departmentLabel: {
      ...theme.typography.bodySmall,
      marginBottom: theme.spacing.xs,
      fontWeight: '500',
    },
    departmentValue: {
      ...theme.typography.bodyLarge,
    },
    fieldError: {
      ...theme.typography.bodySmall,
      marginTop: theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
    },
    
    // Buttons
    primaryButton: {
      width: '100%',
      marginTop: theme.spacing.sm,
      borderRadius: theme.borderRadius.xl,
      ...theme.elevation.level2,
    },
    
    alternativeActions: {
      gap: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    
    biometricButton: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    biometricBlur: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      alignItems: 'center',
    },
    biometricText: {
      ...theme.typography.labelLarge,
      fontWeight: '600',
    },
    
    forgotButton: {
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    forgotBlur: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    forgotText: {
      ...theme.typography.labelMedium,
      fontWeight: '500',
    },
    
    // Emergency card with glassmorphism
    emergencyCard: {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    emergencyOverlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: theme.spacing.lg,
      alignItems: 'center',
    },
    emergencyTitle: {
      ...theme.typography.titleMedium,
      fontWeight: '600',
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    emergencyText: {
      ...theme.typography.bodyMedium,
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
    },
    emergencyPhone: {
      ...theme.typography.titleSmall,
      fontWeight: '600',
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
    },
    emergencyHours: {
      ...theme.typography.bodySmall,
      textAlign: 'center',
    },
    
    // Footer
    footer: {
      alignItems: 'center',
      marginTop: theme.spacing.lg,
      gap: theme.spacing.xs,
    },
    footerText: {
      ...theme.typography.labelSmall,
      textAlign: 'center',
      lineHeight: tokens.typography.labelSmall.lineHeight,
    },
  });

  const styles = createStyles(theme);

export default LoginScreen;