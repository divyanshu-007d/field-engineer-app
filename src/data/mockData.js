// Mock data for Field Engineer App prototype

export const mockTasks = [
  {
    id: 'TSK-001',
    title: 'Water Main Inspection',
    description: 'Inspect water main on Main Street for potential leaks and pressure issues. Document findings with photos and GPS coordinates.',
    priority: 'high',
    status: 'assigned',
    assignedTo: 'ENG001',
    assignedBy: 'Michael Chen',
    dueDate: '2024-01-20T14:00:00Z',
    estimatedDuration: 120,
    location: {
      address: '123 Main Street, Downtown',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
    },
    equipment: ['Pressure gauge', 'Leak detector', 'Camera'],
    skills: ['Water Systems', 'Safety Protocols'],
    tags: ['water', 'inspection', 'infrastructure'],
    attachments: [
      { type: 'pdf', name: 'inspection_checklist.pdf', size: '245 KB' },
      { type: 'image', name: 'location_map.jpg', size: '1.2 MB' }
    ],
  },
  {
    id: 'TSK-002',
    title: 'Street Light Repair',
    description: 'Replace faulty LED bulbs and check electrical connections for street lights on Oak Avenue.',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'ENG001',
    assignedBy: 'Sarah Wilson',
    dueDate: '2024-01-21T16:00:00Z',
    estimatedDuration: 90,
    location: {
      address: '456 Oak Avenue, Residential District',
      coordinates: { latitude: 40.7140, longitude: -74.0070 },
    },
    equipment: ['LED bulbs', 'Multimeter', 'Ladder'],
    skills: ['Electrical Systems', 'Height Work'],
    tags: ['electrical', 'lighting', 'maintenance'],
    progress: 45,
    timeSpent: 40,
  },
  {
    id: 'TSK-003',
    title: 'Pothole Assessment',
    description: 'Survey and document potholes on Central Boulevard for upcoming repair schedule.',
    priority: 'low',
    status: 'completed',
    assignedTo: 'ENG001',
    assignedBy: 'David Rodriguez',
    dueDate: '2024-01-19T12:00:00Z',
    completedDate: '2024-01-19T11:30:00Z',
    estimatedDuration: 60,
    actualDuration: 55,
    location: {
      address: 'Central Boulevard, Business District',
      coordinates: { latitude: 40.7150, longitude: -74.0080 },
    },
    equipment: ['Measuring tape', 'Camera', 'GPS device'],
    skills: ['Road Assessment', 'Documentation'],
    tags: ['roads', 'assessment', 'safety'],
    rating: 5,
    feedback: 'Excellent documentation and thorough assessment.',
  },
  {
    id: 'TSK-004',
    title: 'Emergency Water Valve Repair',
    description: 'URGENT: Water valve malfunction causing flooding on Pine Street. Immediate response required.',
    priority: 'urgent',
    status: 'assigned',
    assignedTo: 'ENG001',
    assignedBy: 'Emergency Dispatch',
    dueDate: '2024-01-20T09:00:00Z',
    estimatedDuration: 180,
    location: {
      address: '789 Pine Street, Emergency Zone',
      coordinates: { latitude: 40.7160, longitude: -74.0090 },
    },
    equipment: ['Valve wrench', 'Emergency kit', 'Radio'],
    skills: ['Water Systems', 'Emergency Response'],
    tags: ['emergency', 'water', 'urgent'],
    isEmergency: true,
  },
  {
    id: 'TSK-005',
    title: 'Traffic Signal Maintenance',
    description: 'Routine maintenance check for traffic signals at the intersection of 1st and Broadway.',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'ENG001',
    assignedBy: 'Lisa Kim',
    dueDate: '2024-01-22T10:00:00Z',
    estimatedDuration: 150,
    location: {
      address: '1st Street & Broadway, City Center',
      coordinates: { latitude: 40.7170, longitude: -74.0100 },
    },
    equipment: ['Signal tester', 'Replacement bulbs', 'Tools'],
    skills: ['Traffic Systems', 'Electrical Safety'],
    tags: ['traffic', 'signals', 'maintenance'],
  }
];

export const mockUsers = [
  {
    id: 'ENG001',
    name: 'John Anderson',
    email: 'j.anderson@cityworks.gov',
    phone: '+1 (555) 123-4567',
    employeeId: 'ENG001',
    position: 'Senior Field Engineer',
    department: 'Public Works',
    supervisor: 'Michael Chen',
    workShift: 'Day Shift (8 AM - 4 PM)',
    experience: 'Expert',
    skills: [
      { id: 1, name: 'Water Systems', level: 'expert', verified: true, icon: 'water-drop' },
      { id: 2, name: 'Electrical Systems', level: 'advanced', verified: true, icon: 'electrical-services' },
      { id: 3, name: 'Road Maintenance', level: 'intermediate', verified: true, icon: 'road' },
      { id: 4, name: 'Emergency Response', level: 'expert', verified: true, icon: 'local-fire-department' },
      { id: 5, name: 'Safety Protocols', level: 'expert', verified: true, icon: 'security' },
    ],
    certifications: [
      {
        id: 'CERT-001',
        name: 'Water System Operator License',
        issuer: 'State Water Authority',
        issueDate: '2022-03-15',
        expiryDate: '2025-03-15',
        status: 'valid',
      },
      {
        id: 'CERT-002',
        name: 'Electrical Safety Certification',
        issuer: 'OSHA',
        issueDate: '2023-01-10',
        expiryDate: '2024-01-10',
        status: 'expiring',
      },
      {
        id: 'CERT-003',
        name: 'First Aid & CPR',
        issuer: 'Red Cross',
        issueDate: '2023-06-01',
        expiryDate: '2025-06-01',
        status: 'valid',
      },
    ],
    achievements: [
      {
        id: 1,
        title: 'Task Master',
        description: 'Completed 100 tasks successfully',
        icon: 'emoji-events',
        tier: 'gold',
        unlocked: true,
        unlockedDate: '2024-01-15',
      },
      {
        id: 2,
        title: 'Safety Champion',
        description: 'Zero safety incidents for 6 months',
        icon: 'security',
        tier: 'silver',
        unlocked: true,
        unlockedDate: '2024-01-01',
      },
      {
        id: 3,
        title: 'Speed Demon',
        description: 'Complete tasks 20% faster than average',
        icon: 'speed',
        tier: 'bronze',
        unlocked: false,
        progress: 75,
        maxProgress: 100,
      },
    ],
    stats: {
      tasksCompleted: 247,
      score: 15680,
      currentStreak: 12,
      maxStreak: 28,
      averageRating: 4.8,
      onTimePercentage: 94,
    },
  }
];

export const mockLeaderboard = [
  {
    id: 'ENG001',
    name: 'John Anderson',
    department: 'Public Works',
    score: 15680,
    tasksCompleted: 247,
  },
  {
    id: 'ENG002',
    name: 'Sarah Martinez',
    department: 'Water Management',
    score: 14920,
    tasksCompleted: 231,
  },
  {
    id: 'ENG003',
    name: 'David Kim',
    department: 'Transportation',
    score: 14750,
    tasksCompleted: 225,
  },
  {
    id: 'ENG004',
    name: 'Lisa Thompson',
    department: 'Public Works',
    score: 13890,
    tasksCompleted: 208,
  },
  {
    id: 'ENG005',
    name: 'Michael Rodriguez',
    department: 'Electrical',
    score: 13560,
    tasksCompleted: 195,
  },
];

export const mockNotifications = [
  {
    id: 'NOT-001',
    type: 'urgent',
    title: 'Emergency Task Assigned',
    message: 'Water valve malfunction on Pine Street requires immediate attention.',
    timestamp: '2024-01-20T08:30:00Z',
    read: false,
    priority: 'high',
    relatedTaskId: 'TSK-004',
  },
  {
    id: 'NOT-002',
    type: 'task_assigned',
    title: 'New Task Assignment',
    message: 'You have been assigned to inspect water main on Main Street.',
    timestamp: '2024-01-20T08:00:00Z',
    read: false,
    priority: 'normal',
    relatedTaskId: 'TSK-001',
  },
  {
    id: 'NOT-003',
    type: 'task_completed',
    title: 'Task Completed Successfully',
    message: 'Pothole assessment on Central Boulevard has been marked as completed.',
    timestamp: '2024-01-19T11:35:00Z',
    read: true,
    priority: 'normal',
    relatedTaskId: 'TSK-003',
  },
  {
    id: 'NOT-004',
    type: 'system',
    title: 'Certification Expiring Soon',
    message: 'Your Electrical Safety Certification expires in 30 days. Please renew.',
    timestamp: '2024-01-19T09:00:00Z',
    read: true,
    priority: 'normal',
  },
  {
    id: 'NOT-005',
    type: 'message',
    title: 'Message from Supervisor',
    message: 'Great work on the recent projects! Keep up the excellent performance.',
    timestamp: '2024-01-18T16:00:00Z',
    read: true,
    priority: 'normal',
  },
];

export const mockChatMessages = [
  {
    id: 'MSG-001',
    text: 'Good morning team! Ready for another productive day.',
    sender: { id: 'SUP-001', name: 'Michael Chen' },
    timestamp: '2024-01-20T08:00:00Z',
  },
  {
    id: 'MSG-002',
    text: 'Morning Mike! Just reviewed the tasks for today.',
    sender: { id: 'ENG001', name: 'John Anderson' },
    timestamp: '2024-01-20T08:05:00Z',
  },
  {
    id: 'MSG-003',
    text: "There's an urgent water valve issue on Pine Street that needs immediate attention.",
    sender: { id: 'SUP-001', name: 'Michael Chen' },
    timestamp: '2024-01-20T08:30:00Z',
  },
  {
    id: 'MSG-004',
    text: 'On my way there now. ETA 10 minutes.',
    sender: { id: 'ENG001', name: 'John Anderson' },
    timestamp: '2024-01-20T08:32:00Z',
  },
  {
    id: 'MSG-005',
    text: 'Voice message',
    sender: { id: 'ENG002', name: 'Sarah Martinez' },
    timestamp: '2024-01-20T08:35:00Z',
    type: 'voice',
    attachment: {
      type: 'audio',
      name: 'Voice message',
      duration: 12,
    },
  },
];

export const mockContacts = [
  {
    id: 'SUP-001',
    name: 'Michael Chen',
    role: 'Supervisor',
    department: 'Public Works',
    phone: '+1 (555) 234-5678',
    email: 'm.chen@cityworks.gov',
    status: 'available',
    isEmergencyContact: true,
  },
  {
    id: 'ENG002',
    name: 'Sarah Martinez',
    role: 'Field Engineer',
    department: 'Water Management',
    phone: '+1 (555) 345-6789',
    email: 's.martinez@cityworks.gov',
    status: 'busy',
  },
  {
    id: 'ENG003',
    name: 'David Kim',
    role: 'Senior Engineer',
    department: 'Transportation',
    phone: '+1 (555) 456-7890',
    email: 'd.kim@cityworks.gov',
    status: 'available',
  },
  {
    id: 'DISP-001',
    name: 'Emergency Dispatch',
    role: 'Dispatcher',
    department: 'Emergency Services',
    phone: '+1 (555) 911-0000',
    email: 'dispatch@cityworks.gov',
    status: 'available',
    isEmergencyContact: true,
  },
  {
    id: 'MGR-001',
    name: 'Lisa Wilson',
    role: 'Department Manager',
    department: 'Public Works',
    phone: '+1 (555) 567-8901',
    email: 'l.wilson@cityworks.gov',
    status: 'away',
  },
];

export const mockProgressData = [
  {
    id: 1,
    title: 'Weekly Goals',
    subtitle: '8 of 10 tasks',
    progress: 80,
    maxProgress: 100,
    color: '#4CAF50',
    size: 100,
  },
  {
    id: 2,
    title: 'Efficiency',
    subtitle: 'vs average',
    progress: 115,
    maxProgress: 100,
    color: '#FF9800',
    size: 100,
  },
  {
    id: 3,
    title: 'Safety Score',
    subtitle: 'this month',
    progress: 98,
    maxProgress: 100,
    color: '#2196F3',
    size: 100,
  },
];

export const mockStreakData = [
  { date: '2024-01-01' },
  { date: '2024-01-02' },
  { date: '2024-01-03' },
  { date: '2024-01-05' },
  { date: '2024-01-06' },
  { date: '2024-01-08' },
  { date: '2024-01-09' },
  { date: '2024-01-10' },
  { date: '2024-01-11' },
  { date: '2024-01-12' },
  { date: '2024-01-15' },
  { date: '2024-01-16' },
  { date: '2024-01-17' },
  { date: '2024-01-18' },
  { date: '2024-01-19' },
  { date: '2024-01-20' },
];

// Helper functions for mock data
export const getCurrentUser = () => mockUsers[0];

export const getTasksByStatus = (status) => {
  return mockTasks.filter(task => task.status === status);
};

export const getUnreadNotifications = () => {
  return mockNotifications.filter(notification => !notification.read);
};

export const getHighPriorityTasks = () => {
  return mockTasks.filter(task => task.priority === 'high' || task.priority === 'urgent');
};

export const getTasksForToday = () => {
  const today = new Date().toDateString();
  return mockTasks.filter(task => {
    const taskDate = new Date(task.dueDate).toDateString();
    return taskDate === today;
  });
};