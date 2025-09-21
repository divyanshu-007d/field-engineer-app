import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../design-system/ThemeProvider';
import tokens from '../design-system/tokens';

// Import navigators and screens
import TabNavigator from './TabNavigator';
import { TaskDetails } from '../components/task';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { theme } = useTheme();
  const { colors } = theme || {};

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.onSurface,
        headerTitleStyle: {
          fontSize: tokens.typography.titleLarge.fontSize,
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen 
        name="TaskDetails" 
        component={TaskDetailsScreen}
        options={({ route }) => ({
          title: 'Task Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.surface,
            elevation: 4,
            shadowOpacity: 0.3,
          },
        })}
      />
    </Stack.Navigator>
  );
};

// Create a wrapper component for TaskDetails since we need to handle the component properly
const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId, task } = route.params || {};
  
  return (
    <TaskDetails
      task={task}
      onEdit={() => alert('Edit task functionality')}
      onDelete={() => {
        alert('Delete task functionality');
        navigation.goBack();
      }}
      onUpdateStatus={(newStatus) => {
        alert(`Status updated to: ${newStatus}`);
      }}
      onAssign={() => alert('Assign task functionality')}
      onClose={() => navigation.goBack()}
    />
  );
};

export default MainNavigator;