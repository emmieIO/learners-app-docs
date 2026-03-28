import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const instructorModuleData = {
  overview: `# Instructor Module

## Module Overview

This module enables driving instructors to manage their availability, handle lesson bookings, conduct driving sessions with live tracking, and track their earnings and performance.

## Key Features

- **Availability Management**: Set working hours and time slots
- **Session Management**: View, accept, and conduct scheduled lessons
- **Live Tracking**: Start/stop session tracking for student safety
- **Student Notes**: Record progress and feedback for each lesson
- **Earnings Dashboard**: Track income, ratings, and performance metrics
- **Schedule Calendar**: Visual calendar with all upcoming sessions

## Tech Stack

- **Backend**: NestJS with WebSockets (Socket.io) for real-time tracking
- **Mobile**: React Native with expo-location, react-native-maps, react-native-calendars
- **Maps**: Google Maps API for route tracking
- **Real-time**: Socket.io for live location streaming
`,

  entities: [
    {
      name: 'instructors',
      description: 'Driving instructor profiles with performance metrics',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'firstName', type: 'VARCHAR(100)' },
        { name: 'lastName', type: 'VARCHAR(100)' },
        { name: 'licenseNumber', type: 'VARCHAR(100)', description: 'Driver license number' },
        { name: 'yearsExperience', type: 'INTEGER', isNullable: true },
        { name: 'profilePhotoUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'bio', type: 'TEXT', isNullable: true },
        { name: 'status', type: 'ENUM', description: 'pending|active|suspended|inactive' },
        { name: 'ratingAverage', type: 'DECIMAL(3,2)', description: 'Average rating 0-5' },
        { name: 'totalLessons', type: 'INTEGER', description: 'Total completed lessons' },
        { name: 'totalEarnings', type: 'DECIMAL(12,2)', description: 'Lifetime earnings' },
        { name: 'commissionRate', type: 'DECIMAL(5,2)', description: 'Percentage of lesson fee' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'instructor_availability',
      description: 'Instructor working hours and available time slots',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'dayOfWeek', type: 'INTEGER', description: '0-6 (Sunday-Saturday)' },
        { name: 'startTime', type: 'TIME', description: 'Work start time' },
        { name: 'endTime', type: 'TIME', description: 'Work end time' },
        { name: 'isWorkingDay', type: 'BOOLEAN', description: 'True if works this day' },
        { name: 'breakStartTime', type: 'TIME', isNullable: true },
        { name: 'breakEndTime', type: 'TIME', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'session_bookings',
      description: 'Individual lesson bookings assigned to instructors',
      category: 'booking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'studentId', type: 'UUID', isFK: true, description: 'References students.id' },
        { name: 'sessionId', type: 'UUID', isFK: true, description: 'References sessions.id' },
        { name: 'scheduledDate', type: 'TIMESTAMP' },
        { name: 'startTime', type: 'TIME' },
        { name: 'endTime', type: 'TIME' },
        { name: 'status', type: 'ENUM', description: 'pending|accepted|rejected|completed|cancelled|no_show' },
        { name: 'location', type: 'VARCHAR(500)', description: 'Pickup point' },
        { name: 'latitude', type: 'DECIMAL(10,8)', isNullable: true },
        { name: 'longitude', type: 'DECIMAL(11,8)', isNullable: true },
        { name: 'assignedAt', type: 'TIMESTAMP' },
        { name: 'acceptedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'rejectedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'rejectionReason', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'sessions',
      description: 'Completed driving lessons with tracking data',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'bookingId', type: 'UUID', isFK: true, description: 'References session_bookings.id' },
        { name: 'instructorId', type: 'UUID', isFK: true },
        { name: 'studentId', type: 'UUID', isFK: true },
        { name: 'sessionNumber', type: 'INTEGER', description: 'Lesson X of Y' },
        { name: 'scheduledDate', type: 'TIMESTAMP' },
        { name: 'actualStartTime', type: 'TIMESTAMP', isNullable: true },
        { name: 'actualEndTime', type: 'TIMESTAMP', isNullable: true },
        { name: 'duration', type: 'INTEGER', description: 'Minutes driven' },
        { name: 'status', type: 'ENUM', description: 'scheduled|active|completed|cancelled' },
        { name: 'startLocation', type: 'VARCHAR(500)' },
        { name: 'endLocation', type: 'VARCHAR(500)', isNullable: true },
        { name: 'routeData', type: 'JSONB', isNullable: true, description: 'GPS track points' },
        { name: 'distanceCovered', type: 'DECIMAL(8,2)', isNullable: true, description: 'Kilometers' },
        { name: 'instructorNotes', type: 'TEXT', isNullable: true },
        { name: 'skillsCovered', type: 'JSONB', isNullable: true, description: 'Skills practiced' },
        { name: 'studentPerformance', type: 'INTEGER', isNullable: true, description: '1-5 rating' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'tracking_points',
      description: 'GPS coordinates recorded during active sessions',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'sessionId', type: 'UUID', isFK: true, description: 'References sessions.id' },
        { name: 'latitude', type: 'DECIMAL(10,8)' },
        { name: 'longitude', type: 'DECIMAL(11,8)' },
        { name: 'speed', type: 'DECIMAL(5,2)', isNullable: true, description: 'km/h' },
        { name: 'heading', type: 'INTEGER', isNullable: true, description: 'Degrees 0-360' },
        { name: 'accuracy', type: 'DECIMAL(5,2)', isNullable: true, description: 'Meters' },
        { name: 'timestamp', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'instructor_earnings',
      description: 'Instructor earnings from completed sessions',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'sessionId', type: 'UUID', isFK: true, description: 'References sessions.id' },
        { name: 'lessonFee', type: 'DECIMAL(10,2)', description: 'Total lesson cost' },
        { name: 'commissionRate', type: 'DECIMAL(5,2)', description: 'Instructor percentage' },
        { name: 'earnings', type: 'DECIMAL(10,2)', description: 'Instructor earnings' },
        { name: 'status', type: 'ENUM', description: 'pending|paid' },
        { name: 'paidAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'periodStart', type: 'DATE', description: 'Weekly period start' },
        { name: 'periodEnd', type: 'DATE', description: 'Weekly period end' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'time_off_requests',
      description: 'Instructor requests for time off from regular schedule',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'startDate', type: 'DATE' },
        { name: 'endDate', type: 'DATE' },
        { name: 'reason', type: 'TEXT', isNullable: true },
        { name: 'status', type: 'ENUM', description: 'pending|approved|rejected' },
        { name: 'reviewedBy', type: 'UUID', isFK: true, isNullable: true },
        { name: 'reviewedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'instructors', to: 'instructor_availability', type: 'one-to-many', label: 'has' },
    { from: 'instructors', to: 'session_bookings', type: 'one-to-many', label: 'receives' },
    { from: 'instructors', to: 'sessions', type: 'one-to-many', label: 'conducts' },
    { from: 'instructors', to: 'instructor_earnings', type: 'one-to-many', label: 'earns' },
    { from: 'instructors', to: 'time_off_requests', type: 'one-to-many', label: 'requests' },
    { from: 'sessions', to: 'tracking_points', type: 'one-to-many', label: 'generates' },
    { from: 'sessions', to: 'instructor_earnings', type: 'one-to-one', label: 'generates' },
    { from: 'session_bookings', to: 'sessions', type: 'one-to-one', label: 'becomes' },
  ] as ERRelationship[],

  sessionFlow: {
    title: 'Session Management Flow',
    description: 'Complete flow from session assignment to completion with tracking',
    nodes: [
      {
        id: 'start',
        type: 'start',
        label: 'Session Assigned',
        description: 'School admin or system assigns booking to instructor',
      },
      {
        id: 'notify',
        type: 'process',
        label: 'Send Notification',
        description: 'Push notification and in-app alert for new booking',
      },
      {
        id: 'view_booking',
        type: 'process',
        label: 'View Booking Details',
        description: 'Instructor reviews student info, location, time',
      },
      {
        id: 'accept_decision',
        type: 'decision',
        label: 'Accept Booking?',
        description: 'Instructor accepts or rejects the assignment',
        next: { yes: 'accept_booking', no: 'reject_booking' },
      },
      {
        id: 'reject_booking',
        type: 'process',
        label: 'Reject with Reason',
        description: 'Provide reason for rejection, school reassigns',
      },
      {
        id: 'accept_booking',
        type: 'process',
        label: 'Accept Booking',
        description: 'Status updated to accepted, student notified',
      },
      {
        id: 'prepare_session',
        type: 'process',
        label: 'Prepare for Session',
        description: 'Review student history, plan lesson route',
      },
      {
        id: 'arrive_location',
        type: 'process',
        label: 'Arrive at Pickup Point',
        description: 'Instructor arrives, marks arrival',
      },
      {
        id: 'verify_student',
        type: 'decision',
        label: 'Student Present?',
        description: 'Check if student is at location',
        next: { yes: 'start_session', no: 'wait_or_report' },
      },
      {
        id: 'wait_or_report',
        type: 'process',
        label: 'Wait or Report No-Show',
        description: 'Wait 15 mins, then report no-show to school',
      },
      {
        id: 'start_session',
        type: 'process',
        label: 'Start Session',
        description: 'Tap Start button, begin GPS tracking',
      },
      {
        id: 'track_location',
        type: 'process',
        label: 'Stream Location Data',
        description: 'Send GPS coordinates every 5 seconds to server',
      },
      {
        id: 'conduct_lesson',
        type: 'process',
        label: 'Conduct Driving Lesson',
        description: 'Teach planned skills, monitor student progress',
      },
      {
        id: 'end_session',
        type: 'process',
        label: 'End Session',
        description: 'Tap End button, stop tracking',
      },
      {
        id: 'add_notes',
        type: 'process',
        label: 'Add Session Notes',
        description: 'Record student performance, skills covered',
      },
      {
        id: 'submit_session',
        type: 'process',
        label: 'Submit Session Data',
        description: 'Save notes, route data, calculate earnings',
      },
      {
        id: 'notify_complete',
        type: 'endpoint',
        label: 'Notify Completion',
        description: 'Student and school notified, session marked complete',
      },
    ],
  },

  instructorJourney: {
    title: 'Instructor Daily Workflow Journey',
    description: 'Complete journey from login to completing daily sessions',
    platform: 'mobile',
    steps: [
      {
        id: 'step1',
        title: 'Login & View Dashboard',
        description: 'Instructor opens app and sees today schedule',
        actor: 'instructor',
        ui: {
          screen: 'Instructor Dashboard',
          component: 'React Native',
          description: 'Today sessions count, earnings, and upcoming schedule',
        },
        api: {
          endpoint: '/api/v1/instructor/dashboard',
          method: 'GET',
          description: 'Fetch dashboard summary',
        },
      },
      {
        id: 'step2',
        title: 'Review Today Schedule',
        description: 'Check all sessions for the day with times and locations',
        actor: 'instructor',
        ui: {
          screen: 'Schedule View',
          component: 'React Native',
          description: 'Timeline view of sessions with student details',
        },
        api: {
          endpoint: '/api/v1/instructor/schedule/today',
          method: 'GET',
          description: 'Get today schedule',
        },
      },
      {
        id: 'step3',
        title: 'Navigate to First Student',
        description: 'Open maps for route to pickup location',
        actor: 'instructor',
        ui: {
          screen: 'Session Detail',
          component: 'React Native',
          description: 'Student info, location with Navigate button',
        },
      },
      {
        id: 'step4',
        title: 'Arrive & Mark Arrival',
        description: 'Tap Arrived button when at pickup point',
        actor: 'instructor',
        ui: {
          screen: 'Session Check-in',
          component: 'React Native',
          description: 'Arrival confirmation with student wait timer',
        },
        api: {
          endpoint: '/api/v1/sessions/:id/arrive',
          method: 'PATCH',
          description: 'Mark arrival at location',
        },
      },
      {
        id: 'step5',
        title: 'Start Session & Tracking',
        description: 'Begin lesson and activate live GPS tracking',
        actor: 'instructor',
        ui: {
          screen: 'Active Session',
          component: 'React Native',
          description: 'Live map with tracking indicator and timer',
        },
        api: {
          endpoint: '/api/v1/sessions/:id/start',
          method: 'PATCH',
          description: 'Start session and tracking',
        },
      },
      {
        id: 'step6',
        title: 'Conduct Lesson',
        description: 'Teach driving skills while tracking runs',
        actor: 'instructor',
        ui: {
          screen: 'Live Tracking Map',
          component: 'React Native',
          description: 'Real-time location with route trace',
        },
      },
      {
        id: 'step7',
        title: 'End Session',
        description: 'Stop tracking when lesson completes',
        actor: 'instructor',
        ui: {
          screen: 'Session Completion',
          component: 'React Native',
          description: 'End button with duration summary',
        },
        api: {
          endpoint: '/api/v1/sessions/:id/end',
          method: 'PATCH',
          description: 'End session and stop tracking',
        },
      },
      {
        id: 'step8',
        title: 'Add Session Notes',
        description: 'Record student performance and skills covered',
        actor: 'instructor',
        ui: {
          screen: 'Session Notes',
          component: 'React Native',
          description: 'Form with skills checklist and notes field',
        },
        api: {
          endpoint: '/api/v1/sessions/:id/notes',
          method: 'PATCH',
          description: 'Submit session notes',
        },
      },
      {
        id: 'step9',
        title: 'Repeat for All Sessions',
        description: 'Continue with remaining students for the day',
        actor: 'instructor',
      },
      {
        id: 'step10',
        title: 'View Daily Summary',
        description: 'Check completed sessions and earnings for the day',
        actor: 'instructor',
        ui: {
          screen: 'Daily Summary',
          component: 'React Native',
          description: 'Sessions completed, total earnings, hours worked',
        },
        api: {
          endpoint: '/api/v1/instructor/earnings/daily',
          method: 'GET',
          description: 'Get daily earnings summary',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'GET',
      path: '/api/v1/instructor/dashboard',
      description: 'Get instructor dashboard summary',
      auth: true,
      params: 'None',
      responseExample: `{
  "success": true,
  "data": {
    "todaySessions": 4,
    "upcomingSessions": 2,
    "todayEarnings": 24000,
    "rating": 4.8,
    "totalLessons": 342,
    "completionRate": 98.5
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/instructor/schedule',
      description: 'Get instructor schedule',
      auth: true,
      params: 'date, view (day|week|month)',
      responseExample: `{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "uuid",
        "studentName": "John Doe",
        "startTime": "10:00",
        "endTime": "12:00",
        "location": "123 Main St, Lagos",
        "status": "scheduled"
      }
    ]
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/instructor/bookings/:id/accept',
      description: 'Accept a booking',
      auth: true,
      params: 'id (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "status": "accepted",
      "acceptedAt": "2024-01-20T10:00:00Z"
    }
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/instructor/availability',
      description: 'Update availability schedule',
      auth: true,
      params: 'availability: [{ day, startTime, endTime, isWorking }]',
      requestExample: `{
  "availability": [
    { "day": 1, "startTime": "08:00", "endTime": "17:00", "isWorking": true },
    { "day": 2, "startTime": "08:00", "endTime": "17:00", "isWorking": true },
    { "day": 0, "isWorking": false }
  ]
}`,
      responseExample: `{
  "success": true,
  "data": {
    "availability": [
      { "day": 1, "startTime": "08:00", "endTime": "17:00", "isWorking": true }
    ]
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/sessions/:id/start',
      description: 'Start session and begin tracking',
      auth: true,
      params: 'id (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "status": "active",
      "startTime": "2024-02-01T10:30:00Z"
    },
    "trackingUrl": "wss://api.drivingschool.com/tracking/session-uuid"
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/sessions/:id/end',
      description: 'End session and stop tracking',
      auth: true,
      params: 'id (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "status": "completed",
      "endTime": "2024-02-01T12:30:00Z",
      "duration": 120
    }
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/sessions/:id/notes',
      description: 'Add session notes and student performance',
      auth: true,
      params: 'id (path param), notes, skillsCovered, studentPerformance',
      requestExample: `{
  "notes": "Student showed improvement in parallel parking. Needs more practice with highway merging.",
  "skillsCovered": {
    "parking": true,
    "turning": true,
    "highwayDriving": false,
    "emergencyBraking": true
  },
  "studentPerformance": 4
}`,
      responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "status": "completed",
      "instructorNotes": "Student showed improvement...",
      "studentPerformance": 4
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/instructor/earnings',
      description: 'Get earnings history and summary',
      auth: true,
      params: 'period (week|month|year), startDate, endDate',
      responseExample: `{
  "success": true,
  "data": {
    "earnings": [
      {
        "id": "uuid",
        "date": "2024-01-20",
        "studentName": "John Doe",
        "duration": 120,
        "lessonFee": 15000,
        "earnings": 7500,
        "status": "paid"
      }
    ],
    "total": 150000,
    "pending": 22500,
    "paid": 127500
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/instructor/performance',
      description: 'Get performance metrics and ratings',
      auth: true,
      params: 'None',
      responseExample: `{
  "success": true,
  "data": {
    "totalLessons": 342,
    "averageRating": 4.8,
    "completionRate": 98.5,
    "studentFeedback": [
      { "rating": 5, "comment": "Excellent instructor" }
    ]
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/instructor/students',
      description: 'Get list of current and past students',
      auth: true,
      params: 'status (active|completed)',
      responseExample: `{
  "success": true,
  "data": {
    "students": [
      {
        "id": "uuid",
        "name": "John Doe",
        "lessonsCompleted": 6,
        "progress": "60%"
      }
    ]
  }
}`,
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'Instructor Dashboard',
      purpose: 'Display daily overview, upcoming sessions, and quick stats',
      platform: 'react-native',
      components: [
        {
          name: 'DashboardHeader',
          description: 'Welcome message with today stats',
          platform: 'react-native',
          code: `const DashboardHeader: React.FC<{ stats: DashboardStats }> = ({ stats }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Good Morning, {stats.instructorName}</Text>
      <View style={styles.statsRow}>
        <StatCard
          icon={<Calendar />}
          label="Today's Sessions"
          value={stats.todaySessions}
        />
        <StatCard
          icon={<DollarSign />}
          label="Today's Earnings"
          value={formatCurrency(stats.todayEarnings)}
        />
        <StatCard
          icon={<Star />}
          label="Rating"
          value={stats.rating.toFixed(1)}
        />
      </View>
    </View>
  );
};`,
        },
        {
          name: 'UpcomingSessionsList',
          description: 'Timeline of today sessions',
          platform: 'react-native',
          code: `const UpcomingSessionsList: React.FC<{ sessions: Session[] }> = ({ sessions }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Upcoming Today</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SessionCard
            session={item}
            time={formatTime(item.startTime)}
            student={item.student.name}
            location={item.location}
            status={item.status}
            onPress={() => navigation.navigate('SessionDetail', { id: item.id })}
          />
        )}
      />
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/instructor/dashboard',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "todaySessions": 4,
    "upcomingSessions": 2,
    "todayEarnings": 24000,
    "rating": 4.8,
    "totalLessons": 342,
    "completionRate": 98.5
  }
}`,
      },
    },
    {
      screenName: 'Schedule Management Screen',
      purpose: 'View and manage availability and working hours',
      platform: 'react-native',
      components: [
        {
          name: 'WeeklySchedule',
          description: 'Weekly view of working hours',
          platform: 'react-native',
          code: `const WeeklySchedule: React.FC<{ availability: Availability[] }> = ({ availability }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View>
      {days.map((day, index) => {
        const dayAvailability = availability.find(a => a.dayOfWeek === index);
        return (
          <View key={day} style={styles.dayRow}>
            <Text>{day}</Text>
            <ToggleSwitch
              value={dayAvailability?.isWorkingDay}
              onToggle={() => setWorkingDay(index)}
            />
            {dayAvailability?.isWorkingDay && (
              <Text>
                {formatTime(dayAvailability.startTime)} - {formatTime(dayAvailability.endTime)}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/instructor/availability',
        method: 'PATCH',
        requestExample: `{
  "availability": [
    { "day": 1, "startTime": "08:00", "endTime": "17:00", "isWorking": true },
    { "day": 2, "startTime": "08:00", "endTime": "17:00", "isWorking": true },
    { "day": 0, "isWorking": false }
  ]
}`,
        responseExample: `{
  "success": true,
  "data": {
    "availability": [...]
  }
}`,
      },
    },
    {
      screenName: 'Active Session Screen',
      purpose: 'Track live session with GPS and session controls',
      platform: 'react-native',
      components: [
        {
          name: 'LiveTrackingMap',
          description: 'Real-time map with location streaming',
          platform: 'react-native',
          code: `const LiveTrackingMap: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const mapRef = useRef<MapView>(null);
  const [route, setRoute] = useState<Coordinate[]>([]);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    // Start location tracking
    const subscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setRoute(prev => [...prev, { latitude, longitude }]);
        socket.emit('locationUpdate', { sessionId, latitude, longitude });
      }
    );

    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => {
      subscription.then(sub => sub.remove());
      clearInterval(timer);
    };
  }, [sessionId]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        followsUserLocation
      >
        <Polyline coordinates={route} strokeColor="#10b981" strokeWidth={4} />
      </MapView>
      <View style={styles.overlay}>
        <Text style={styles.timer}>{formatDuration(sessionTime)}</Text>
        <Text>Session in Progress</Text>
      </View>
    </View>
  );
};`,
        },
        {
          name: 'SessionControls',
          description: 'Start/End session buttons with confirmation',
          platform: 'react-native',
          code: `const SessionControls: React.FC<{
  status: 'pending' | 'active' | 'completed';
  onStart: () => void;
  onEnd: () => void;
}> = ({ status, onStart, onEnd }) => {
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  if (status === 'active') {
    return (
      <View>
        <Button
          title="End Session"
          onPress={() => setShowEndConfirm(true)}
          variant="danger"
        />
        <Modal visible={showEndConfirm}>
          <Text>End this session?</Text>
          <Button title="Confirm" onPress={() => { onEnd(); setShowEndConfirm(false); }} />
          <Button title="Cancel" onPress={() => setShowEndConfirm(false)} />
        </Modal>
      </View>
    );
  }

  return (
    <Button
      title="Start Session"
      onPress={onStart}
      variant="primary"
    />
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/sessions/:id/start',
        method: 'PATCH',
        responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "status": "active",
      "startTime": "2024-02-01T10:30:00Z"
    },
    "trackingUrl": "wss://api.drivingschool.com/tracking/session-uuid"
  }
}`,
      },
    },
    {
      screenName: 'Session Notes Screen',
      purpose: 'Record student performance and skills covered',
      platform: 'react-native',
      components: [
        {
          name: 'SkillsChecklist',
          description: 'Checklist of driving skills practiced',
          platform: 'react-native',
          code: `const SkillsChecklist: React.FC<{
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}> = ({ skills, onChange }) => {
  const toggleSkill = (skillId: string) => {
    const updated = skills.map(s =>
      s.id === skillId ? { ...s, covered: !s.covered } : s
    );
    onChange(updated);
  };

  return (
    <View>
      <Text style={styles.label}>Skills Covered</Text>
      {skills.map(skill => (
        <CheckBox
          key={skill.id}
          title={skill.name}
          checked={skill.covered}
          onChange={() => toggleSkill(skill.id)}
        />
      ))}
    </View>
  );
};`,
        },
        {
          name: 'PerformanceRating',
          description: 'Rate student performance 1-5',
          platform: 'react-native',
          code: `const PerformanceRating: React.FC<{
  rating: number;
  onChange: (rating: number) => void;
}> = ({ rating, onChange }) => {
  return (
    <View>
      <Text style={styles.label}>Student Performance</Text>
      <Rating
        type="star"
        rating={rating}
        onFinishRating={onChange}
        imageSize={40}
      />
      <Text style={styles.hint}>
        {getRatingLabel(rating)}
      </Text>
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/sessions/:id/notes',
        method: 'PATCH',
        requestExample: `{
  "notes": "Student showed improvement in parallel parking. Needs more practice with highway merging.",
  "skillsCovered": {
    "parking": true,
    "turning": true,
    "highwayDriving": false,
    "emergencyBraking": true
  },
  "studentPerformance": 4
}`,
        responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "status": "completed",
      "instructorNotes": "...",
      "studentPerformance": 4
    }
  }
}`,
      },
    },
    {
      screenName: 'Earnings Dashboard',
      purpose: 'View earnings history, pending payouts, and performance',
      platform: 'both',
      components: [
        {
          name: 'EarningsSummary',
          description: 'Total earnings with period filter',
          platform: 'react-web',
          code: `const EarningsSummary: React.FC<{ earnings: EarningsData }> = ({ earnings }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard
        title="Total Earnings"
        value={formatCurrency(earnings.total)}
        trend={earnings.growth}
      />
      <StatCard
        title="Pending Payout"
        value={formatCurrency(earnings.pending)}
      />
      <StatCard
        title="Paid This Month"
        value={formatCurrency(earnings.paid)}
      />
    </div>
  );
};`,
        },
        {
          name: 'EarningsTable',
          description: 'Detailed earnings by session',
          platform: 'react-web',
          code: `const EarningsTable: React.FC<{ earnings: Earning[] }> = ({ earnings }) => {
  return (
    <Table>
      <TableHeader>
        <Column>Date</Column>
        <Column>Student</Column>
        <Column>Duration</Column>
        <Column>Lesson Fee</Column>
        <Column>Your Earnings</Column>
        <Column>Status</Column>
      </TableHeader>
      <TableBody>
        {earnings.map(earning => (
          <TableRow key={earning.id}>
            <Cell>{formatDate(earning.date)}</Cell>
            <Cell>{earning.studentName}</Cell>
            <Cell>{earning.duration} min</Cell>
            <Cell>₦{earning.lessonFee.toLocaleString()}</Cell>
            <Cell className="font-bold">₦{earning.earnings.toLocaleString()}</Cell>
            <Cell><Badge status={earning.status}>{earning.status}</Badge></Cell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/instructor/earnings',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "earnings": [
      {
        "id": "uuid",
        "date": "2024-01-20",
        "studentName": "John Doe",
        "duration": 120,
        "lessonFee": 15000,
        "earnings": 7500,
        "status": "paid"
      }
    ],
    "total": 150000,
    "pending": 22500,
    "paid": 127500
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
