# Field Engineer App - Folder Structure

Based on the project requirements for the **Field Engineer Mobile App** component of the Crowdsourced Civic Issue Reporting and Resolution System.

## Root Structure
```
field-engineer-app/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── LoadingSpinner/
│   │   │   ├── Toast/
│   │   │   └── index.js
│   │   ├── task/
│   │   │   ├── TaskCard/
│   │   │   ├── TaskList/
│   │   │   ├── TaskDetails/
│   │   │   ├── TaskFilters/
│   │   │   ├── PriorityBadge/
│   │   │   └── index.js
│   │   ├── map/
│   │   │   ├── MapView/
│   │   │   ├── TaskMarker/
│   │   │   ├── RouteOptimizer/
│   │   │   ├── LocationTracker/
│   │   │   └── index.js
│   │   ├── verification/
│   │   │   ├── BeforeAfterComparison/
│   │   │   ├── PhotoCapture/
│   │   │   ├── AIVerificationResult/
│   │   │   ├── ResolutionForm/
│   │   │   └── index.js
│   │   ├── gamification/
│   │   │   ├── Leaderboard/
│   │   │   ├── BadgeDisplay/
│   │   │   ├── PerformanceMetrics/
│   │   │   ├── AchievementBanner/
│   │   │   └── index.js
│   │   ├── communication/
│   │   │   ├── ChatInterface/
│   │   │   ├── MessageList/
│   │   │   ├── ContactCard/
│   │   │   ├── StatusBroadcast/
│   │   │   └── index.js
│   │   └── profile/
│   │       ├── EngineerProfile/
│   │       ├── PerformanceStats/
│   │       ├── TrainingModules/
│   │       ├── ResourceTracker/
│   │       └── index.js
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── index.js
│   │   ├── dashboard/
│   │   │   ├── DashboardScreen.js
│   │   │   ├── TaskOverviewScreen.js
│   │   │   └── index.js
│   │   ├── tasks/
│   │   │   ├── TaskListScreen.js
│   │   │   ├── TaskDetailsScreen.js
│   │   │   ├── TaskMapScreen.js
│   │   │   ├── TaskAssignmentScreen.js
│   │   │   └── index.js
│   │   ├── verification/
│   │   │   ├── VerificationScreen.js
│   │   │   ├── PhotoCaptureScreen.js
│   │   │   ├── ResolutionScreen.js
│   │   │   └── index.js
│   │   ├── communication/
│   │   │   ├── MessagesScreen.js
│   │   │   ├── ChatScreen.js
│   │   │   ├── ContactsScreen.js
│   │   │   └── index.js
│   │   ├── profile/
│   │   │   ├── ProfileScreen.js
│   │   │   ├── PerformanceScreen.js
│   │   │   ├── TrainingScreen.js
│   │   │   ├── SettingsScreen.js
│   │   │   └── index.js
│   │   ├── gamification/
│   │   │   ├── LeaderboardScreen.js
│   │   │   ├── BadgesScreen.js
│   │   │   ├── AchievementsScreen.js
│   │   │   └── index.js
│   │   └── map/
│   │       ├── MapScreen.js
│   │       ├── RouteScreen.js
│   │       ├── LocationScreen.js
│   │       └── index.js
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   ├── TabNavigator.js
│   │   ├── StackNavigator.js
│   │   ├── DrawerNavigator.js
│   │   └── index.js
│   ├── design-system/ (existing)
│   │   ├── index.js
│   │   ├── README.md
│   │   ├── responsive.js
│   │   ├── ThemeProvider.js
│   │   └── tokens.js
├── assets/
│   ├── images/
│   │   ├── icons/
│   │   │   ├── task-icons/
│   │   │   ├── navigation-icons/
│   │   │   ├── gamification-icons/
│   │   │   └── common-icons/
│   │   ├── backgrounds/
│   │   ├── splash/
│   │   ├── placeholders/
│   │   └── badges/
│   ├── fonts/
│   │   ├── primary/
│   │   └── secondary/
│   ├── animations/
│   │   ├── lottie/
│   │   └── gifs/
│   └── sounds/
│       ├── notifications/
│       └── feedback/
├── .expo/
├── .git/
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── metro.config.js
├── package.json
├── package-lock.json
├── app.json
├── App.js
├── index.js
├── README.md
├── field-engineer-app-requirements.md
├── Project Report.md
├── Technical Architecture.md
└── folder-structure.md
```

## Key Features Addressed:

### 1. Task Management Dashboard
- `src/screens/dashboard/` - Main dashboard screens
- `src/components/task/` - Task-related components
- `src/services/api/taskAPI.js` - Task management APIs

### 2. Interactive Map Interface
- `src/screens/map/` - Map-related screens
- `src/components/map/` - Map components
- `src/services/location/` - GPS and route optimization services

### 3. AI-Powered Resolution Verification
- `src/screens/verification/` - Verification workflow screens
- `src/components/verification/` - Before/after comparison components
- `src/services/ai/` - AI services for image comparison

### 4. Gamification for Engineers
- `src/screens/gamification/` - Leaderboards and achievements
- `src/components/gamification/` - Gamification UI components
- `src/services/api/gamificationAPI.js` - Gamification APIs

### 5. Communication Hub
- `src/screens/communication/` - Messaging interfaces
- `src/components/communication/` - Chat and communication components
- `src/services/api/communicationAPI.js` - Communication APIs

### 6. Additional Features
- `src/services/storage/` - Secure and async storage
- `src/services/camera/` - Camera and image processing
- `src/services/sync/` - Offline synchronization
- `src/utils/hooks/` - Custom React hooks
- `src/store/` - Redux state management

This structure supports all the core features mentioned in the project report including task management, AI verification, gamification, real-time communication, and performance tracking for field engineers.