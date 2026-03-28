import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const trackingModuleData = {
  overview: `# Tracking & Safety Module

## Module Overview

This module provides real-time GPS tracking during driving sessions, enabling student safety monitoring, route recording, and emergency response capabilities. It includes live location sharing with guardians, SOS alerts, and session data analytics.

## Key Features

- **Live GPS Tracking**: Real-time location streaming during active sessions
- **Route Recording**: Complete route history for each session
- **Guardian Sharing**: Time-limited tracking links for parents/guardians
- **SOS Emergency Button**: Instant alert to platform admins and emergency contacts
- **Speed Monitoring**: Track and alert excessive speed during lessons
- **Geofencing**: Define approved training areas with boundary alerts
- **Session Analytics**: Distance covered, duration, routes taken

## Tech Stack

- **Backend**: NestJS with WebSockets (Socket.io) for real-time data
- **Mobile**: React Native with expo-location, react-native-background-geolocation
- **Maps**: Google Maps API for visualization and geocoding
- **Database**: PostgreSQL with PostGIS for location data
- **Caching**: Redis for real-time location buffering
`,

  entities: [
    {
      name: 'sessions',
      description: 'Active and completed driving sessions with tracking data',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'bookingId', type: 'UUID', isFK: true, description: 'References bookings.id' },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'studentId', type: 'UUID', isFK: true, description: 'References students.id' },
        { name: 'sessionNumber', type: 'INTEGER', description: 'Lesson X of Y' },
        { name: 'scheduledDate', type: 'TIMESTAMP' },
        { name: 'actualStartTime', type: 'TIMESTAMP', isNullable: true },
        { name: 'actualEndTime', type: 'TIMESTAMP', isNullable: true },
        { name: 'duration', type: 'INTEGER', description: 'Minutes driven' },
        { name: 'status', type: 'ENUM', description: 'scheduled|active|completed|cancelled' },
        { name: 'startLocation', type: 'VARCHAR(500)' },
        { name: 'startLatitude', type: 'DECIMAL(10,8)', isNullable: true },
        { name: 'startLongitude', type: 'DECIMAL(11,8)', isNullable: true },
        { name: 'endLocation', type: 'VARCHAR(500)', isNullable: true },
        { name: 'endLatitude', type: 'DECIMAL(10,8)', isNullable: true },
        { name: 'endLongitude', type: 'DECIMAL(11,8)', isNullable: true },
        { name: 'totalDistance', type: 'DECIMAL(8,2)', isNullable: true, description: 'Kilometers' },
        { name: 'maxSpeed', type: 'DECIMAL(5,2)', isNullable: true, description: 'km/h' },
        { name: 'avgSpeed', type: 'DECIMAL(5,2)', isNullable: true, description: 'km/h' },
        { name: 'trackingEnabled', type: 'BOOLEAN', description: 'GPS tracking active' },
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
        { name: 'latitude', type: 'DECIMAL(10,8)', description: 'GPS latitude' },
        { name: 'longitude', type: 'DECIMAL(11,8)', description: 'GPS longitude' },
        { name: 'altitude', type: 'DECIMAL(10,2)', isNullable: true, description: 'Meters' },
        { name: 'speed', type: 'DECIMAL(5,2)', isNullable: true, description: 'km/h' },
        { name: 'heading', type: 'INTEGER', isNullable: true, description: 'Degrees 0-360' },
        { name: 'accuracy', type: 'DECIMAL(5,2)', isNullable: true, description: 'Meters' },
        { name: 'batteryLevel', type: 'INTEGER', isNullable: true, description: 'Phone battery %' },
        { name: 'timestamp', type: 'TIMESTAMP', description: 'Recording time' },
      ],
    },
    {
      name: 'tracking_shares',
      description: 'Shared tracking links for guardians to view live sessions',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'sessionId', type: 'UUID', isFK: true, description: 'References sessions.id' },
        { name: 'studentId', type: 'UUID', isFK: true, description: 'References students.id' },
        { name: 'shareToken', type: 'VARCHAR(100)', isUnique: true, description: 'Unique share link token' },
        { name: 'guardianName', type: 'VARCHAR(255)', isNullable: true, description: 'Optional guardian name' },
        { name: 'guardianPhone', type: 'VARCHAR(20)', isNullable: true },
        { name: 'expiresAt', type: 'TIMESTAMP', description: 'Link expiry (session end + 1hr)' },
        { name: 'isActive', type: 'BOOLEAN', description: 'Link still valid' },
        { name: 'viewCount', type: 'INTEGER', description: 'Times link was viewed' },
        { name: 'lastViewedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'safety_alerts',
      description: 'Emergency SOS alerts and safety incidents',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'sessionId', type: 'UUID', isFK: true, description: 'References sessions.id' },
        { name: 'triggeredBy', type: 'UUID', isFK: true, description: 'User who triggered' },
        { name: 'triggerType', type: 'ENUM', description: 'sos_button|speed_violation|geofence_breach|manual' },
        { name: 'alertType', type: 'ENUM', description: 'emergency|warning|info' },
        { name: 'latitude', type: 'DECIMAL(10,8)', description: 'Alert location' },
        { name: 'longitude', type: 'DECIMAL(11,8)', description: 'Alert location' },
        { name: 'message', type: 'TEXT', isNullable: true },
        { name: 'status', type: 'ENUM', description: 'active|acknowledged|resolved|false_alarm' },
        { name: 'acknowledgedBy', type: 'UUID', isFK: true, isNullable: true, description: 'Admin who acknowledged' },
        { name: 'acknowledgedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'resolvedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'resolutionNotes', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'emergency_contacts',
      description: 'Student emergency contacts for SOS alerts',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'studentId', type: 'UUID', isFK: true, description: 'References students.id' },
        { name: 'name', type: 'VARCHAR(255)' },
        { name: 'relationship', type: 'VARCHAR(100)', description: 'Parent, Guardian, etc' },
        { name: 'phone', type: 'VARCHAR(20)' },
        { name: 'email', type: 'VARCHAR(255)', isNullable: true },
        { name: 'priority', type: 'INTEGER', description: '1 = first to contact' },
        { name: 'notifyOnSOS', type: 'BOOLEAN', description: 'Send SMS on SOS' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'geofences',
      description: 'Approved training areas with boundaries',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'name', type: 'VARCHAR(255)', description: 'Area name' },
        { name: 'description', type: 'TEXT', isNullable: true },
        { name: 'centerLatitude', type: 'DECIMAL(10,8)' },
        { name: 'centerLongitude', type: 'DECIMAL(11,8)' },
        { name: 'radiusMeters', type: 'INTEGER', description: 'Coverage radius' },
        { name: 'polygon', type: 'GEOMETRY(POLYGON)', isNullable: true, description: 'Custom boundary' },
        { name: 'isActive', type: 'BOOLEAN' },
        { name: 'alertOnExit', type: 'BOOLEAN', description: 'Alert if student exits' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'speed_violations',
      description: 'Recorded speed limit violations during sessions',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'sessionId', type: 'UUID', isFK: true, description: 'References sessions.id' },
        { name: 'latitude', type: 'DECIMAL(10,8)' },
        { name: 'longitude', type: 'DECIMAL(11,8)' },
        { name: 'recordedSpeed', type: 'DECIMAL(5,2)', description: 'Actual speed km/h' },
        { name: 'speedLimit', type: 'INTEGER', description: 'Area speed limit km/h' },
        { name: 'excessSpeed', type: 'DECIMAL(5,2)', description: 'Amount over limit' },
        { name: 'duration', type: 'INTEGER', description: 'Seconds over limit' },
        { name: 'acknowledged', type: 'BOOLEAN', description: 'Instructor acknowledged' },
        { name: 'timestamp', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'session_analytics',
      description: 'Aggregated analytics for completed sessions',
      category: 'tracking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'sessionId', type: 'UUID', isFK: true, isUnique: true },
        { name: 'totalDistance', type: 'DECIMAL(8,2)', description: 'Kilometers' },
        { name: 'totalDuration', type: 'INTEGER', description: 'Minutes' },
        { name: 'avgSpeed', type: 'DECIMAL(5,2)', description: 'km/h' },
        { name: 'maxSpeed', type: 'DECIMAL(5,2)', description: 'km/h' },
        { name: 'stopsCount', type: 'INTEGER', description: 'Number of stops' },
        { name: 'harshBrakingCount', type: 'INTEGER', description: 'Safety events' },
        { name: 'rapidAccelerationCount', type: 'INTEGER', description: 'Safety events' },
        { name: 'routeScore', type: 'INTEGER', description: '0-100 driving score' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'sessions', to: 'bookings', type: 'many-to-one', label: 'from' },
    { from: 'sessions', to: 'tracking_points', type: 'one-to-many', label: 'generates' },
    { from: 'sessions', to: 'tracking_shares', type: 'one-to-many', label: 'shared via' },
    { from: 'sessions', to: 'safety_alerts', type: 'one-to-many', label: 'triggers' },
    { from: 'sessions', to: 'session_analytics', type: 'one-to-one', label: 'analyzed in' },
    { from: 'students', to: 'emergency_contacts', type: 'one-to-many', label: 'has' },
    { from: 'driving_schools', to: 'geofences', type: 'one-to-many', label: 'defines' },
    { from: 'sessions', to: 'speed_violations', type: 'one-to-many', label: 'records' },
  ] as ERRelationship[],

  trackingFlow: {
    title: 'Live Session Tracking Flow',
    description: 'Complete flow from session start to tracking data collection',
    nodes: [
      {
        id: 'start',
        type: 'start',
        label: 'Instructor Starts Session',
        description: 'Tap Start Session button in app',
      },
      {
        id: 'validate',
        type: 'process',
        label: 'Validate Session',
        description: 'Verify booking, instructor, and student',
      },
      {
        id: 'request_permission',
        type: 'decision',
        label: 'Location Permission Granted?',
        description: 'Check/request GPS permission from OS',
        next: { yes: 'start_tracking', no: 'show_error' },
      },
      {
        id: 'show_error',
        type: 'endpoint',
        label: 'Show Permission Error',
        description: 'Guide user to enable location in settings',
      },
      {
        id: 'start_tracking',
        type: 'process',
        label: 'Start GPS Tracking',
        description: 'Begin background location updates',
      },
      {
        id: 'stream_location',
        type: 'process',
        label: 'Stream Location Data',
        description: 'Send coordinates to server every 5 seconds',
      },
      {
        id: 'store_points',
        type: 'process',
        label: 'Store Tracking Points',
        description: 'Save to database with timestamp',
      },
      {
        id: 'check_speed',
        type: 'decision',
        label: 'Speed Limit Exceeded?',
        description: 'Compare with area speed limit',
        next: { yes: 'log_violation', no: 'continue_tracking' },
      },
      {
        id: 'log_violation',
        type: 'process',
        label: 'Log Speed Violation',
        description: 'Record violation for session analytics',
      },
      {
        id: 'continue_tracking',
        type: 'process',
        label: 'Continue Tracking',
        description: 'Monitor location and speed',
      },
      {
        id: 'check_geofence',
        type: 'decision',
        label: 'Outside Approved Area?',
        description: 'Check if outside geofence boundary',
        next: { yes: 'send_alert', no: 'continue_tracking' },
      },
      {
        id: 'send_alert',
        type: 'process',
        label: 'Send Geofence Alert',
        description: 'Notify instructor and school admin',
      },
      {
        id: 'instructor_ends',
        type: 'decision',
        label: 'Instructor Ends Session?',
        description: 'Wait for end session action',
        next: { yes: 'stop_tracking', no: 'continue_tracking' },
      },
      {
        id: 'stop_tracking',
        type: 'process',
        label: 'Stop GPS Tracking',
        description: 'End location updates',
      },
      {
        id: 'calculate_analytics',
        type: 'process',
        label: 'Calculate Session Analytics',
        description: 'Distance, duration, speed, score',
      },
      {
        id: 'end',
        type: 'endpoint',
        label: 'Session Complete',
        description: 'Save analytics, notify parties',
      },
    ],
  },

  guardianTrackingJourney: {
    title: 'Guardian Live Tracking Journey',
    description: 'How guardians monitor their student during driving sessions',
    platform: 'web',
    steps: [
      {
        id: 'step1',
        title: 'Receive Tracking Link',
        description: 'Guardian gets SMS/WhatsApp with tracking link',
        actor: 'system',
        ui: {
          screen: 'SMS Notification',
          component: 'React Native',
          description: 'SMS with live tracking URL',
        },
      },
      {
        id: 'step2',
        title: 'Open Tracking Link',
        description: 'Tap link to open live tracking page',
        actor: 'school',
        ui: {
          screen: 'Tracking Landing',
          component: 'React Web',
          description: 'Loading screen with session info',
        },
        api: {
          endpoint: '/api/v1/tracking/share/:token',
          method: 'GET',
          description: 'Validate share token',
        },
      },
      {
        id: 'step3',
        title: 'View Live Location',
        description: 'See student location on map in real-time',
        actor: 'school',
        ui: {
          screen: 'Live Tracking Map',
          component: 'React Web',
          description: 'Map with car icon and route trace',
        },
        api: {
          endpoint: '/api/v1/tracking/live/:sessionId',
          method: 'GET',
          description: 'Get current session location',
        },
      },
      {
        id: 'step4',
        title: 'Monitor Session Progress',
        description: 'View duration, distance, and route',
        actor: 'school',
        ui: {
          screen: 'Session Stats',
          component: 'React Web',
          description: 'Stats overlay with timer and distance',
        },
      },
      {
        id: 'step5',
        title: 'Receive Session End Notification',
        description: 'Get notified when session completes',
        actor: 'system',
        ui: {
          screen: 'Session Complete',
          component: 'React Web',
          description: 'Summary screen with route replay',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'POST',
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
      method: 'POST',
      path: '/api/v1/sessions/:id/location',
      description: 'Stream location update during session',
      auth: true,
      params: 'id (path param), latitude, longitude, speed, heading',
      requestExample: `{
  "latitude": 6.5244,
  "longitude": 3.3792,
  "speed": 35.5,
  "heading": 45,
  "accuracy": 10
}`,
      responseExample: `{
  "success": true
}`,
    },
    {
      method: 'POST',
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
      "duration": 120,
      "distanceCovered": 25.5
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/tracking/live/:sessionId',
      description: 'Get live session location for guardians',
      auth: false,
      params: 'sessionId (path param), token (query)',
      responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "studentName": "John Doe",
      "instructorName": "Adamu Ibrahim",
      "startTime": "2024-02-01T10:30:00Z",
      "status": "active"
    },
    "location": {
      "latitude": 6.5244,
      "longitude": 3.3792,
      "speed": 35.5,
      "heading": 45,
      "timestamp": "2024-02-01T11:15:00Z"
    },
    "route": [
      {"latitude": 6.5244, "longitude": 3.3792, "timestamp": "2024-02-01T10:30:00Z"}
    ]
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/sessions/:id/share',
      description: 'Generate tracking share link',
      auth: true,
      params: 'id (path param), guardianPhone (optional)',
      requestExample: `{
  "guardianPhone": "+2348012345679"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "shareToken": "abc123xyz",
    "shareUrl": "https://track.drivingschool.com/live/abc123xyz",
    "expiresAt": "2024-02-01T13:30:00Z"
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/sessions/:id/sos',
      description: 'Trigger SOS emergency alert',
      auth: true,
      params: 'id (path param), message (optional)',
      requestExample: `{
  "message": "Student feeling unwell during lesson"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "alert": {
      "id": "uuid",
      "status": "active",
      "triggeredAt": "2024-02-01T11:20:00Z"
    },
    "notifiedContacts": [
      { "name": "Jane Doe", "relationship": "Mother", "phone": "+234..." },
      { "name": "Platform Admin", "type": "admin" }
    ]
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/sessions/:id/route',
      description: 'Get complete route for session',
      auth: true,
      params: 'id (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "route": [
      {
        "latitude": 6.5244,
        "longitude": 3.3792,
        "speed": 0,
        "timestamp": "2024-02-01T10:30:00Z"
      },
      {
        "latitude": 6.5254,
        "longitude": 3.3802,
        "speed": 35.5,
        "timestamp": "2024-02-01T10:35:00Z"
      }
    ],
    "totalDistance": 25.5,
    "duration": 120
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/sessions/:id/analytics',
      description: 'Get session analytics',
      auth: true,
      params: 'id (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "analytics": {
      "totalDistance": 25.5,
      "totalDuration": 120,
      "avgSpeed": 32.5,
      "maxSpeed": 55.0,
      "stopsCount": 3,
      "routeScore": 85
    }
  }
}`,
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'Active Session Tracking Screen',
      purpose: 'Display live tracking during active driving session',
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
    const subscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        const { latitude, longitude, speed } = location.coords;
        const newPoint = { latitude, longitude, speed, timestamp: Date.now() };
        setRoute(prev => [...prev, newPoint]);
        
        // Stream to server
        socket.emit('locationUpdate', { sessionId, ...newPoint });
      }
    );

    const timer = setInterval(() => setSessionTime(t => t + 1), 1000);

    return () => {
      subscription.then(s => s.remove());
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
        <Polyline
          coordinates={route}
          strokeColor="#10b981"
          strokeWidth={4}
        />
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
          description: 'Start/End session with SOS button',
          platform: 'react-native',
          code: `const SessionControls: React.FC<{
  status: 'pending' | 'active' | 'completed';
  onStart: () => void;
  onEnd: () => void;
  onSOS: () => void;
}> = ({ status, onStart, onEnd, onSOS }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (status === 'active') {
    return (
      <View style={styles.activeControls}>
        <TouchableOpacity style={styles.sosButton} onPress={onSOS}>
          <Text style={styles.sosText}>🆘 SOS</Text>
        </TouchableOpacity>
        <Button
          title="End Session"
          onPress={() => setShowConfirm(true)}
          variant="danger"
          size="large"
        />
        <Modal visible={showConfirm}>
          <Text>End this session?</Text>
          <Button title="Confirm" onPress={() => { onEnd(); setShowConfirm(false); }} />
          <Button title="Cancel" onPress={() => setShowConfirm(false)} variant="outline" />
        </Modal>
      </View>
    );
  }

  return (
    <Button
      title="Start Session"
      onPress={onStart}
      variant="primary"
      size="large"
    />
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/sessions/:id/start',
        method: 'POST',
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
      screenName: 'Guardian Live Tracking Page',
      purpose: 'Allow guardians to view student location in real-time',
      platform: 'react-web',
      components: [
        {
          name: 'ShareTrackingMap',
          description: 'Public map view for guardians',
          platform: 'react-web',
          code: `const ShareTrackingMap: React.FC<{ token: string }> = ({ token }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [route, setRoute] = useState<Coordinate[]>([]);

  useEffect(() => {
    // Validate token
    validateShareToken(token).then(data => {
      if (data.valid) {
        setSession(data.session);
        connectToTracking(data.sessionId);
      }
    });

    const socket = io('wss://api.drivingschool.com');
    socket.on('locationUpdate', (data) => {
      setLocation(data.location);
      setRoute(prev => [...prev, data.location]);
    });

    return () => socket.disconnect();
  }, [token]);

  return (
    <div className="h-screen w-screen">
      <Header session={session} />
      <GoogleMap
        center={location}
        zoom={15}
        markers={[{ position: location, icon: 'car' }]}
        polylines={[{ path: route, color: '#10b981' }]}
      />
      <StatsOverlay location={location} route={route} />
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/tracking/live/:sessionId',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "session": {
      "id": "uuid",
      "studentName": "John Doe",
      "instructorName": "Adamu Ibrahim",
      "startTime": "2024-02-01T10:30:00Z",
      "status": "active"
    },
    "location": {
      "latitude": 6.5244,
      "longitude": 3.3792,
      "speed": 35.5,
      "heading": 45,
      "timestamp": "2024-02-01T11:15:00Z"
    },
    "route": [...]
  }
}`,
      },
    },
    {
      screenName: 'SOS Alert Screen',
      purpose: 'Trigger emergency alert during sessions',
      platform: 'react-native',
      components: [
        {
          name: 'SOSModal',
          description: 'Emergency alert dialog',
          platform: 'react-native',
          code: `const SOSModal: React.FC<{
  visible: boolean;
  onConfirm: (message: string) => void;
  onCancel: () => void;
}> = ({ visible, onConfirm, onCancel }) => {
  const [message, setMessage] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <AlertTriangle size={48} color="#ef4444" />
          <Text style={styles.title}>Emergency Alert</Text>
          <Text style={styles.subtitle}>
            This will notify emergency contacts and platform admins
          </Text>
          <TextInput
            placeholder="Optional: Describe emergency"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Button
            title="Send SOS Alert"
            onPress={() => onConfirm(message)}
            variant="danger"
            size="large"
          />
          <Button title="Cancel" onPress={onCancel} variant="outline" />
        </View>
      </View>
    </Modal>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/sessions/:id/sos',
        method: 'POST',
        requestExample: `{
  "message": "Student feeling unwell during lesson"
}`,
        responseExample: `{
  "success": true,
  "data": {
    "alert": {
      "id": "uuid",
      "status": "active",
      "triggeredAt": "2024-02-01T11:20:00Z"
    },
    "notifiedContacts": [
      { "name": "Jane Doe", "relationship": "Mother", "phone": "+234..." },
      { "name": "Platform Admin", "type": "admin" }
    ]
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
