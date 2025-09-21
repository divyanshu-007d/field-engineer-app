import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTheme } from '../../design-system/ThemeProvider';
import tokens from '../../design-system/tokens';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { AuthContext } from '../../contexts/AuthContext';

const ProfileSetupScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { colors } = theme || {};
  const { signIn } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    
    // Professional Information
    position: '',
    experience: '',
    skills: [],
    certifications: [],
    
    // Preferences
    language: 'english',
    workShift: '',
    emergencyContact: '',
    
    // Profile
    profilePhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const positions = [
    'Field Engineer',
    'Senior Technician',
    'Maintenance Specialist',
    'Supervisor',
    'Team Lead',
    'Inspector',
    'Equipment Operator',
  ];

  const skillsOptions = [
    'Electrical Systems',
    'Plumbing & Water',
    'Road Maintenance',
    'Equipment Repair',
    'Safety Inspection',
    'Emergency Response',
    'Construction',
    'Environmental',
  ];

  const shiftOptions = [
    'Day Shift (6:00 AM - 2:00 PM)',
    'Evening Shift (2:00 PM - 10:00 PM)',
    'Night Shift (10:00 PM - 6:00 AM)',
    'Rotating Shifts',
    'On-Call',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        break;
        
      case 2: // Professional Information
        if (!formData.position) newErrors.position = 'Position is required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience level is required';
        if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
        break;
        
      case 3: // Preferences
        if (!formData.workShift) newErrors.workShift = 'Work shift preference is required';
        if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create complete user data and sign in
      const userData = {
        id: 1,
        name: `${formData.firstName} ${formData.lastName}`,
        employeeId: 'ENG001',
        department: 'Public Works',
        email: formData.email,
        phone: formData.phoneNumber,
        position: formData.position,
        skills: formData.skills,
        experience: formData.experience,
        workShift: formData.workShift,
        profileComplete: true,
      };
      
      await signIn(userData);
      
      Alert.alert(
        'Profile Setup Complete',
        'Welcome to the Field Engineer App! You are now ready to start managing your tasks.',
        [{ text: 'Get Started' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalInformation = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: colors.onSurface }]}>
        Personal Information
      </Text>
      
      <View style={styles.form}>
        <Input
          label="First Name *"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
          placeholder="Enter your first name"
          error={errors.firstName}
          autoCapitalize="words"
        />
        
        <Input
          label="Last Name *"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
          placeholder="Enter your last name"
          error={errors.lastName}
          autoCapitalize="words"
        />
        
        <Input
          label="Phone Number *"
          value={formData.phoneNumber}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          placeholder="(555) 123-4567"
          error={errors.phoneNumber}
          keyboardType="phone-pad"
        />
        
        <Input
          label="Email Address *"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="your.email@city.gov"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </View>
  );

  const renderProfessionalInformation = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: colors.onSurface }]}>
        Professional Information
      </Text>
      
      <View style={styles.form}>
        <Input
          label="Position *"
          value={formData.position}
          onChangeText={(value) => handleInputChange('position', value)}
          placeholder="Select your position"
          error={errors.position}
          editable={false}
          onPress={() => {
            // Show position picker
            Alert.alert('Position selection will be implemented');
          }}
        />
        
        <Input
          label="Years of Experience *"
          value={formData.experience}
          onChangeText={(value) => handleInputChange('experience', value)}
          placeholder="e.g., 5 years"
          error={errors.experience}
          keyboardType="numeric"
        />
        
        <View style={styles.skillsSection}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>
            Skills & Specializations *
          </Text>
          {errors.skills && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.skills}
            </Text>
          )}
          <View style={styles.skillsGrid}>
            {skillsOptions.map((skill) => (
              <Button
                key={skill}
                title={skill}
                onPress={() => handleSkillToggle(skill)}
                variant={formData.skills.includes(skill) ? 'filled' : 'outlined'}
                style={styles.skillChip}
                titleStyle={styles.skillChipText}
              />
            ))}
          </View>
        </View>
        
        <Input
          label="Certifications (Optional)"
          value={formData.certifications.join(', ')}
          onChangeText={(value) => handleInputChange('certifications', value.split(', ').filter(Boolean))}
          placeholder="Enter certifications separated by commas"
          multiline
        />
      </View>
    </View>
  );

  const renderPreferences = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: colors.onSurface }]}>
        Work Preferences
      </Text>
      
      <View style={styles.form}>
        <Input
          label="Preferred Work Shift *"
          value={formData.workShift}
          onChangeText={(value) => handleInputChange('workShift', value)}
          placeholder="Select your preferred shift"
          error={errors.workShift}
          editable={false}
          onPress={() => {
            // Show shift picker
            Alert.alert('Shift selection will be implemented');
          }}
        />
        
        <Input
          label="Emergency Contact *"
          value={formData.emergencyContact}
          onChangeText={(value) => handleInputChange('emergencyContact', value)}
          placeholder="Name and phone number"
          error={errors.emergencyContact}
        />
        
        <Input
          label="Preferred Language"
          value={formData.language}
          onChangeText={(value) => handleInputChange('language', value)}
          placeholder="Select language"
          editable={false}
          onPress={() => {
            // Show language picker
            Alert.alert('Language selection will be implemented');
          }}
        />
      </View>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        {[1, 2, 3].map((step) => (
          <View
            key={step}
            style={[
              styles.progressStep,
              {
                backgroundColor: step <= currentStep ? colors.primary : colors.surfaceVariant,
              },
            ]}
          >
            <Text
              style={[
                styles.progressStepText,
                {
                  color: step <= currentStep ? colors.onPrimary : colors.onSurfaceVariant,
                },
              ]}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>
      <Text style={[styles.progressLabel, { color: colors.onSurfaceVariant }]}>
        Step {currentStep} of 3
      </Text>
    </View>
  );

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
            Complete Your Profile
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Set up your field engineer profile
          </Text>
        </View>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Content Card */}
        <Card variant="elevated" style={styles.contentCard}>
          {currentStep === 1 && renderPersonalInformation()}
          {currentStep === 2 && renderProfessionalInformation()}
          {currentStep === 3 && renderPreferences()}
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {currentStep > 1 && (
            <Button
              title="Previous"
              onPress={handlePrevious}
              variant="outlined"
              style={styles.actionButton}
            />
          )}
          
          {currentStep < 3 ? (
            <Button
              title="Next"
              onPress={handleNext}
              variant="filled"
              style={[styles.actionButton, { flex: 1 }]}
            />
          ) : (
            <Button
              title={loading ? "Creating Profile..." : "Complete Setup"}
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              variant="filled"
              style={[styles.actionButton, { flex: 1 }]}
            />
          )}
        </View>

        {/* Skip for Now */}
        {currentStep < 3 && (
          <Button
            title="Skip for Now"
            onPress={() => navigation.navigate('MainApp')}
            variant="text"
            style={styles.skipButton}
          />
        )}
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
    padding: theme?.spacing?.lg || 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme?.spacing?.lg || 24,
  },
  title: {
    fontSize: tokens.typography.headlineMedium.fontSize,
    fontWeight: '600',
    lineHeight: tokens.typography.headlineMedium.lineHeight,
    textAlign: 'center',
    marginBottom: theme?.spacing?.xs || 4,
  },
  subtitle: {
    fontSize: tokens.typography.bodyLarge.fontSize,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: theme?.spacing?.xl || 32,
  },
  progressBar: {
    flexDirection: 'row',
    gap: theme?.spacing?.md || 16,
    marginBottom: theme?.spacing?.sm || 8,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepText: {
    fontSize: tokens.typography.labelMedium.fontSize,
    fontWeight: '600',
  },
  progressLabel: {
    fontSize: tokens.typography.bodySmall.fontSize,
  },
  contentCard: {
    marginBottom: theme?.spacing?.lg || 24,
  },
  stepContent: {
    padding: theme?.spacing?.xl || 32,
  },
  stepTitle: {
    fontSize: tokens.typography.headlineSmall.fontSize,
    fontWeight: '600',
    marginBottom: theme?.spacing?.lg || 24,
    textAlign: 'center',
  },
  form: {
    gap: theme?.spacing?.lg || 24,
  },
  skillsSection: {
    gap: theme?.spacing?.sm || 8,
  },
  inputLabel: {
    fontSize: theme?.typography?.labelLarge?.fontSize || 14,
    fontWeight: '600',
    marginBottom: theme?.spacing?.xs || 4,
  },
  errorText: {
    fontSize: tokens.typography.bodySmall.fontSize,
    marginBottom: theme?.spacing?.xs || 4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme?.spacing?.sm || 8,
  },
  skillChip: {
    flex: 0,
    paddingHorizontal: theme?.spacing?.md || 16,
    paddingVertical: theme?.spacing?.sm || 8,
  },
  skillChipText: {
    fontSize: tokens.typography.labelMedium.fontSize,
  },
  actions: {
    flexDirection: 'row',
    gap: theme?.spacing?.md || 16,
    marginBottom: theme?.spacing?.md || 16,
  },
  actionButton: {
    flex: 1,
  },
  skipButton: {
    alignSelf: 'center',
  },
});

export default ProfileSetupScreen;