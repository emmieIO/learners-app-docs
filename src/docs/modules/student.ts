import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const learnerModuleData = {
  overview: `# Learner Module

## Module Overview

This module enables learners to find driving schools, browse packages, book lessons, make payments, and track their learning progress. It serves as the core consumer-facing functionality of the platform.

## Key Features

- **Map-Based Discovery**: Search driving schools by location with filters
- **School Profiles**: View detailed school information, packages, and instructor listings
- **Booking System**: Schedule lessons with preferred instructors and time slots
- **Payment Integration**: Secure checkout with Paystack
- **Session History**: Track completed, upcoming, and cancelled lessons
- **Progress Tracking**: View learning milestones and download certificates
- **Guardian Link**: Share live session tracking with guardians

## Tech Stack

- **Backend**: NestJS with TypeORM for database operations
- **Mobile**: React Native with react-native-maps, react-native-calendars
- **Payments**: Paystack SDK for Nigerian market
- **Maps**: Google Maps API for location services
`,

  entities: [
    {
      name: 'learners',
      description: 'Extended learner profile with learning progress',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'firstName', type: 'VARCHAR(100)' },
        { name: 'lastName', type: 'VARCHAR(100)' },
        { name: 'dateOfBirth', type: 'DATE', description: 'Must be 16+' },
        { name: 'profilePhotoUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'licenseNumber', type: 'VARCHAR(100)', isNullable: true, description: 'Learner permit' },
        { name: 'totalLessonsBooked', type: 'INTEGER', description: 'Total bookings count' },
        { name: 'totalLessonsCompleted', type: 'INTEGER', description: 'Completed lessons' },
        { name: 'averageRating', type: 'DECIMAL(3,2)', description: 'Learner rating from instructors' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'packages',
      description: 'Driving lesson packages offered by schools',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'name', type: 'VARCHAR(255)', description: 'e.g., "10 Lessons Basic"' },
        { name: 'description', type: 'TEXT' },
        { name: 'numberOfLessons', type: 'INTEGER' },
        { name: 'price', type: 'DECIMAL(10,2)', description: 'Package price in NGN' },
        { name: 'duration', type: 'INTEGER', description: 'Validity in days' },
        { name: 'vehicleType', type: 'ENUM', description: 'manual|automatic|both' },
        { name: 'isActive', type: 'BOOLEAN', description: 'Available for booking' },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'bookings',
      description: 'Learner lesson bookings with payment status',
      category: 'booking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'learnerId', type: 'UUID', isFK: true, description: 'References learners.id' },
        { name: 'packageId', type: 'UUID', isFK: true, description: 'References packages.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'instructorId', type: 'UUID', isFK: true, isNullable: true, description: 'Assigned instructor' },
        { name: 'status', type: 'ENUM', description: 'pending|confirmed|active|completed|cancelled|refunded' },
        { name: 'totalPrice', type: 'DECIMAL(10,2)' },
        { name: 'amountPaid', type: 'DECIMAL(10,2)' },
        { name: 'paymentStatus', type: 'ENUM', description: 'unpaid|partial|paid|refunded' },
        { name: 'startDate', type: 'TIMESTAMP', description: 'First lesson date' },
        { name: 'completedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'cancelledAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'cancellationReason', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'sessions',
      description: 'Individual driving lessons within a booking',
      category: 'booking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'bookingId', type: 'UUID', isFK: true, description: 'References bookings.id' },
        { name: 'sessionNumber', type: 'INTEGER', description: 'Lesson 1 of 10' },
        { name: 'instructorId', type: 'UUID', isFK: true },
        { name: 'learnerId', type: 'UUID', isFK: true },
        { name: 'scheduledDate', type: 'TIMESTAMP' },
        { name: 'startTime', type: 'TIME' },
        { name: 'endTime', type: 'TIME' },
        { name: 'actualStartTime', type: 'TIMESTAMP', isNullable: true },
        { name: 'actualEndTime', type: 'TIMESTAMP', isNullable: true },
        { name: 'status', type: 'ENUM', description: 'scheduled|active|completed|cancelled|no_show' },
        { name: 'location', type: 'VARCHAR(500)', description: 'Pickup/meeting point' },
        { name: 'latitude', type: 'DECIMAL(10,8)', isNullable: true },
        { name: 'longitude', type: 'DECIMAL(11,8)', isNullable: true },
        { name: 'instructorNotes', type: 'TEXT', isNullable: true },
        { name: 'learnerRating', type: 'INTEGER', isNullable: true, description: '1-5 rating' },
        { name: 'learnerFeedback', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'reviews',
      description: 'Learner reviews and ratings for schools/instructors',
      category: 'booking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'learnerId', type: 'UUID', isFK: true, description: 'References learners.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, isNullable: true },
        { name: 'instructorId', type: 'UUID', isFK: true, isNullable: true },
        { name: 'sessionId', type: 'UUID', isFK: true, isNullable: true, description: 'Optional session-specific' },
        { name: 'rating', type: 'INTEGER', description: '1-5 stars' },
        { name: 'reviewText', type: 'TEXT', isNullable: true },
        { name: 'isVerified', type: 'BOOLEAN', description: 'From completed booking' },
        { name: 'adminResponse', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'favorites',
      description: 'Learner saved/favorited schools',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'learnerId', type: 'UUID', isFK: true, description: 'References learners.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'search_history',
      description: 'Learner search queries for recommendations',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'learnerId', type: 'UUID', isFK: true, description: 'References learners.id' },
        { name: 'searchQuery', type: 'VARCHAR(255)' },
        { name: 'location', type: 'VARCHAR(255)', isNullable: true },
        { name: 'filters', type: 'JSONB', isNullable: true, description: 'Applied filters' },
        { name: 'resultsCount', type: 'INTEGER' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'learners', to: 'bookings', type: 'one-to-many', label: 'makes' },
    { from: 'learners', to: 'reviews', type: 'one-to-many', label: 'writes' },
    { from: 'learners', to: 'favorites', type: 'one-to-many', label: 'saves' },
    { from: 'driving_schools', to: 'packages', type: 'one-to-many', label: 'offers' },
    { from: 'packages', to: 'bookings', type: 'one-to-many', label: 'purchased in' },
    { from: 'bookings', to: 'sessions', type: 'one-to-many', label: 'contains' },
    { from: 'instructors', to: 'sessions', type: 'one-to-many', label: 'conducts' },
    { from: 'sessions', to: 'reviews', type: 'one-to-one', label: 'reviewed in' },
  ] as ERRelationship[],

  bookingFlow: {
    title: 'Lesson Booking Flow',
    description: 'Complete flow from school discovery to booking confirmation',
    nodes: [
      {
        id: 'start',
        type: 'start',
        label: 'Student Opens Search',
        description: 'Navigate to Discover screen with map view',
      },
      {
        id: 'search',
        type: 'process',
        label: 'Apply Filters & Search',
        description: 'Filter by location, price, vehicle type, availability',
      },
      {
        id: 'view_results',
        type: 'process',
        label: 'View School Results',
        description: 'Browse schools on map or list view with ratings',
      },
      {
        id: 'select_school',
        type: 'decision',
        label: 'Select School?',
        description: 'Student clicks on a school to view details',
        next: { yes: 'view_details', no: 'continue_search' },
      },
      {
        id: 'continue_search',
        type: 'process',
        label: 'Continue Browsing',
        description: 'Refine search or scroll for more options',
      },
      {
        id: 'view_details',
        type: 'process',
        label: 'View School Profile',
        description: 'See packages, instructors, reviews, and photos',
      },
      {
        id: 'select_package',
        type: 'decision',
        label: 'Select Package?',
        description: 'Choose a driving package to book',
        next: { yes: 'check_availability', no: 'view_details' },
      },
      {
        id: 'check_availability',
        type: 'process',
        label: 'Check Instructor Availability',
        description: 'Query available time slots for preferred instructor',
      },
      {
        id: 'select_slot',
        type: 'process',
        label: 'Select Time Slot',
        description: 'Choose preferred date and time for first lesson',
      },
      {
        id: 'review_booking',
        type: 'process',
        label: 'Review Booking Details',
        description: 'Confirm package, instructor, schedule, and total price',
      },
      {
        id: 'proceed_payment',
        type: 'decision',
        label: 'Proceed to Payment?',
        description: 'Continue to checkout or cancel',
        next: { yes: 'initialize_payment', no: 'save_draft' },
      },
      {
        id: 'save_draft',
        type: 'endpoint',
        label: 'Save as Draft',
        description: 'Booking saved for later, no payment initiated',
      },
      {
        id: 'initialize_payment',
        type: 'process',
        label: 'Initialize Paystack Payment',
        description: 'Create payment session and get authorization URL',
      },
      {
        id: 'payment_success',
        type: 'decision',
        label: 'Payment Successful?',
        description: 'Verify payment webhook confirmation',
        next: { yes: 'confirm_booking', no: 'payment_failed' },
      },
      {
        id: 'payment_failed',
        type: 'endpoint',
        label: 'Payment Failed',
        description: 'Show error, allow retry or cancel',
      },
      {
        id: 'confirm_booking',
        type: 'process',
        label: 'Confirm Booking',
        description: 'Update booking status to confirmed, notify school',
      },
      {
        id: 'send_confirmation',
        type: 'process',
        label: 'Send Confirmation',
        description: 'Email/SMS to student, notification to school',
      },
      {
        id: 'end',
        type: 'endpoint',
        label: 'Booking Complete',
        description: 'Redirect to My Bookings screen with confirmation',
      },
    ],
  },

  schoolDiscoveryJourney: {
    title: 'Learner School Discovery & Booking Journey',
    description: 'Learner journey from searching for schools to completing a booking',
    platform: 'mobile',
    steps: [
      {
        id: 'step1',
        title: 'Open Discover Screen',
        description: 'Learner launches app and navigates to Discover tab',
        actor: 'student',
        ui: {
          screen: 'Discover Home',
          component: 'React Native',
          description: 'Map view with school pins and search bar at top',
        },
        api: {
          endpoint: '/api/v1/schools/search',
          method: 'GET',
          description: 'Fetch schools near user location',
        },
      },
      {
        id: 'step2',
        title: 'Apply Search Filters',
        description: 'Filter by distance, price range, vehicle type, rating',
        actor: 'student',
        ui: {
          screen: 'Filter Modal',
          component: 'React Native',
          description: 'Bottom sheet with filter options and apply button',
        },
      },
      {
        id: 'step3',
        title: 'Browse School Results',
        description: 'Scroll through list or pan map to explore options',
        actor: 'student',
        ui: {
          screen: 'Search Results',
          component: 'React Native',
          description: 'List view toggle with school cards showing rating and distance',
        },
      },
      {
        id: 'step4',
        title: 'View School Profile',
        description: 'Tap school to see full details, packages, and reviews',
        actor: 'student',
        ui: {
          screen: 'School Detail',
          component: 'React Native',
          description: 'Tabbed view: Overview, Packages, Instructors, Reviews',
        },
        api: {
          endpoint: '/api/v1/schools/:id',
          method: 'GET',
          description: 'Fetch complete school profile',
        },
      },
      {
        id: 'step5',
        title: 'Select Driving Package',
        description: 'Choose package based on lessons needed and budget',
        actor: 'student',
        ui: {
          screen: 'Package Selection',
          component: 'React Native',
          description: 'Package cards with price, lessons, and features',
        },
      },
      {
        id: 'step6',
        title: 'Choose Instructor (Optional)',
        description: 'View instructor profiles and select preferred one',
        actor: 'student',
        ui: {
          screen: 'Instructor Selection',
          component: 'React Native',
          description: 'Instructor cards with photo, rating, and experience',
        },
        api: {
          endpoint: '/api/v1/schools/:id/instructors',
          method: 'GET',
          description: 'Fetch school instructors with availability',
        },
      },
      {
        id: 'step7',
        title: 'Select Time Slot',
        description: 'Pick preferred date and time from available slots',
        actor: 'student',
        ui: {
          screen: 'Calendar & Time Picker',
          component: 'React Native',
          description: 'Calendar view with available dates and time chips',
        },
        api: {
          endpoint: '/api/v1/instructors/:id/availability',
          method: 'GET',
          description: 'Fetch instructor available slots',
        },
      },
      {
        id: 'step8',
        title: 'Review Booking Summary',
        description: 'Confirm all details before payment',
        actor: 'student',
        ui: {
          screen: 'Booking Review',
          component: 'React Native',
          description: 'Summary card with package, instructor, schedule, total',
        },
      },
      {
        id: 'step9',
        title: 'Complete Payment',
        description: 'Pay with card, bank transfer, or USSD via Paystack',
        actor: 'student',
        ui: {
          screen: 'Payment Checkout',
          component: 'React Native',
          description: 'Paystack WebView or native payment options',
        },
        api: {
          endpoint: '/api/v1/payments/initialize',
          method: 'POST',
          description: 'Initialize Paystack transaction',
        },
      },
      {
        id: 'step10',
        title: 'Booking Confirmed',
        description: 'Success screen with booking reference and next steps',
        actor: 'system',
        ui: {
          screen: 'Booking Confirmation',
          component: 'React Native',
          description: 'Success animation with booking details and CTA',
        },
        api: {
          endpoint: '/api/v1/bookings/:id',
          method: 'GET',
          description: 'Fetch confirmed booking details',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'GET',
      path: '/api/v1/schools/search',
      description: 'Search driving schools with filters',
      auth: true,
      params: 'lat, lng, radius, minPrice, maxPrice, vehicleType, rating',
      responseExample: `{
  "success": true,
  "data": {
    "schools": [
      {
        "id": "uuid",
        "name": "Safe Drive Academy",
        "rating": 4.5,
        "reviewCount": 128,
        "distance": 2.3,
        "priceRange": "₦80,000 - ₦150,000",
        "latitude": 6.5244,
        "longitude": 3.3792,
        "verified": true
      }
    ],
    "total": 15,
    "hasMore": true
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/schools/:id',
      description: 'Get detailed school profile',
      auth: true,
      params: 'id (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "school": {
      "id": "uuid",
      "name": "Safe Drive Academy",
      "description": "FRSC-approved driving school...",
      "rating": 4.5,
      "reviewCount": 128,
      "verified": true,
      "address": "123 Main St, Lagos",
      "logoUrl": "https://..."
    },
    "packages": [
      {
        "id": "uuid",
        "name": "10 Lessons Basic",
        "numberOfLessons": 10,
        "price": 150000,
        "vehicleType": "manual"
      }
    ],
    "instructors": [
      {
        "id": "uuid",
        "name": "Adamu Ibrahim",
        "rating": 4.8,
        "totalLessons": 342
      }
    ]
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/bookings',
      description: 'Create a new booking',
      auth: true,
      params: 'packageId, instructorId (optional), startDate, location',
      requestExample: `{
  "packageId": "550e8400-e29b-41d4-a716-446655440001",
  "instructorId": "550e8400-e29b-41d4-a716-446655440002",
  "startDate": "2024-02-01T09:00:00Z",
  "location": {
    "address": "123 Main St, Lagos",
    "latitude": 6.5244,
    "longitude": 3.3792
  }
}`,
      responseExample: `{
  "success": true,
  "data": {
    "booking": {
      "id": "booking-uuid",
      "status": "pending_payment",
      "totalPrice": 150000
    },
    "requiresPayment": true,
    "paymentDeadline": "2024-01-25T12:00:00Z"
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/learner/bookings',
      description: 'Get all bookings for current learner',
      auth: true,
      params: 'status (optional), page, limit',
      responseExample: `{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "schoolName": "Safe Drive Academy",
        "packageName": "10 Lessons Basic",
        "status": "active",
        "startDate": "2024-02-01",
        "lessonsCompleted": 3,
        "totalLessons": 10
      }
    ],
    "total": 5
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/bookings/:id/cancel',
      description: 'Cancel a booking',
      auth: true,
      params: 'id (path param), reason',
      requestExample: `{
  "reason": "Schedule conflict"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "status": "cancelled",
      "cancelledAt": "2024-01-20T10:00:00Z"
    },
    "refundStatus": "processing",
    "refundAmount": 150000
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/learner/sessions',
      description: 'Get all sessions for current learner',
      auth: true,
      params: 'status (optional), upcoming | past',
      responseExample: `{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "uuid",
        "sessionNumber": 4,
        "scheduledDate": "2024-02-05T10:00:00Z",
        "instructorName": "Adamu Ibrahim",
        "status": "upcoming",
        "location": "123 Main St, Lagos"
      }
    ]
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/sessions/:id/rate',
      description: 'Rate and review a completed session',
      auth: true,
      params: 'id (path param), rating, feedback',
      requestExample: `{
  "rating": 5,
  "feedback": "Excellent instructor, very patient and professional"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "review": {
      "id": "uuid",
      "rating": 5,
      "feedback": "Excellent instructor...",
      "createdAt": "2024-01-20T10:00:00Z"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/learner/progress',
      description: 'Get learning progress and statistics',
      auth: true,
      params: 'None',
      responseExample: `{
  "success": true,
  "data": {
    "totalLessons": 10,
    "completedLessons": 6,
    "hoursDriven": 12,
    "nextLessonDate": "2024-02-05",
    "certificates": []
  }
}`,
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'Discover Schools Screen',
      purpose: 'Allow students to search and browse driving schools on a map',
      platform: 'react-native',
      components: [
        {
          name: 'SchoolMapView',
          description: 'Interactive map with school location pins',
          platform: 'react-native',
          code: `const SchoolMapView: React.FC<{ schools: School[] }> = ({ schools }) => {
  const mapRef = useRef<MapView>(null);
  const { location } = useLocation();

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {schools.map((school) => (
        <Marker
          key={school.id}
          coordinate={{
            latitude: school.latitude,
            longitude: school.longitude,
          }}
          onPress={() => selectSchool(school)}
        >
          <SchoolPin school={school} />
        </Marker>
      ))}
    </MapView>
  );
};`,
        },
        {
          name: 'SearchFilters',
          description: 'Filter schools by price, rating, vehicle type, distance',
          platform: 'react-native',
          code: `const SearchFilters: React.FC<{ onApply: (filters: Filters) => void }> = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [vehicleType, setVehicleType] = useState<'manual' | 'automatic' | 'both'>('both');
  const [maxDistance, setMaxDistance] = useState(10);

  const handleApply = () => {
    onApply({ priceRange, minRating, vehicleType, maxDistance });
  };

  return (
    <BottomSheet>
      <Slider
        label="Max Price (NGN)"
        value={priceRange}
        onValueChange={setPriceRange}
        min={0}
        max={500000}
      />
      <RatingPicker value={minRating} onChange={setMinRating} />
      <SegmentedControl
        options={['Manual', 'Automatic', 'Both']}
        value={vehicleType}
        onChange={setVehicleType}
      />
      <Slider
        label="Max Distance (km)"
        value={maxDistance}
        onValueChange={setMaxDistance}
        min={1}
        max={50}
      />
      <Button title="Apply Filters" onPress={handleApply} />
    </BottomSheet>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/schools/search',
        method: 'GET',
        requestExample: `GET /api/v1/schools/search?lat=6.5244&lng=3.3792&radius=10&minPrice=50000&maxPrice=200000&vehicleType=manual&minRating=4`,
        responseExample: `{
  "success": true,
  "data": {
    "schools": [
      {
        "id": "uuid",
        "name": "Safe Drive Academy",
        "rating": 4.5,
        "distance": 2.3,
        "priceRange": "₦80,000 - ₦150,000",
        "latitude": 6.5244,
        "longitude": 3.3792
      }
    ],
    "total": 15,
    "hasMore": true
  }
}`,
      },
    },
    {
      screenName: 'School Detail Screen',
      purpose: 'Display comprehensive school information with packages and instructors',
      platform: 'react-native',
      components: [
        {
          name: 'SchoolProfile',
          description: 'School header with logo, rating, and key info',
          platform: 'react-native',
          code: `const SchoolProfile: React.FC<{ school: School }> = ({ school }) => {
  return (
    <View>
      <Image source={{ uri: school.logoUrl }} style={styles.logo} />
      <Text style={styles.name}>{school.name}</Text>
      <View style={styles.stats}>
        <Rating stars={school.rating} count={school.reviewCount} />
        <Text>{school.verified ? '✓ Verified' : 'Unverified'}</Text>
        <Text>{school.distance} km away</Text>
      </View>
      <Text>{school.address}</Text>
    </View>
  );
};`,
        },
        {
          name: 'PackageList',
          description: 'List of available driving packages',
          platform: 'react-native',
          code: `const PackageList: React.FC<{ packages: Package[]; onSelect: (pkg: Package) => void }> = ({ packages, onSelect }) => {
  return (
    <FlatList
      data={packages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.numberOfLessons} lessons</Text>
            <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
            <Badge>{item.vehicleType}</Badge>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/schools/:id',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "school": {
      "id": "uuid",
      "name": "Safe Drive Academy",
      "description": "...",
      "rating": 4.5,
      "reviewCount": 128,
      "verified": true,
      "address": "123 Main St, Lagos",
      "logoUrl": "https://..."
    },
    "packages": [...],
    "instructors": [...],
    "reviews": [...]
  }
}`,
      },
    },
    {
      screenName: 'Booking Screen',
      purpose: 'Allow students to select instructor, time slot, and confirm booking',
      platform: 'react-native',
      components: [
        {
          name: 'InstructorSelector',
          description: 'Choose preferred instructor or skip for auto-assignment',
          platform: 'react-native',
          code: `const InstructorSelector: React.FC<{ instructors: Instructor[]; selected: string; onSelect: (id: string) => void }> = ({ instructors, selected, onSelect }) => {
  return (
    <View>
      <Text style={styles.label}>Select Instructor (Optional)</Text>
      <TouchableOpacity
        style={!selected && styles.selected}
        onPress={() => onSelect('')}
      >
        <Text>Auto-assign (Any available)</Text>
      </TouchableOpacity>
      {instructors.map((instructor) => (
        <TouchableOpacity
          key={instructor.id}
          style={selected === instructor.id && styles.selected}
          onPress={() => onSelect(instructor.id)}
        >
          <Image source={{ uri: instructor.photo }} style={styles.photo} />
          <View>
            <Text>{instructor.name}</Text>
            <Text>⭐ {instructor.rating} ({instructor.totalLessons} lessons)</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};`,
        },
        {
          name: 'TimeSlotPicker',
          description: 'Calendar with available time slots',
          platform: 'react-native',
          code: `const TimeSlotPicker: React.FC<{ slots: TimeSlot[]; onSelect: (slot: Date) => void }> = ({ slots, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View>
      <Calendar
        selected={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date()}
        markedDates={getAvailableDates(slots)}
      />
      <ScrollView horizontal>
        {getSlotsForDate(slots, selectedDate).map((slot) => (
          <Chip
            key={slot.time}
            label={formatTime(slot.time)}
            onPress={() => onSelect(slot.dateTime)}
          />
        ))}
      </ScrollView>
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/bookings',
        method: 'POST',
        requestExample: `{
  "packageId": "uuid",
  "instructorId": "uuid",
  "startDate": "2024-02-01T09:00:00Z",
  "location": {
    "address": "123 Main St, Lagos",
    "latitude": 6.5244,
    "longitude": 3.3792
  }
}`,
        responseExample: `{
  "success": true,
  "data": {
    "booking": {
      "id": "booking-uuid",
      "status": "pending_payment",
      "totalPrice": 150000
    },
    "requiresPayment": true,
    "paymentDeadline": "2024-01-25T12:00:00Z"
  }
}`,
      },
    },
    {
      screenName: 'My Bookings Screen',
      purpose: 'Display all student bookings with status and actions',
      platform: 'both',
      components: [
        {
          name: 'BookingsList',
          description: 'List of bookings with status badges and actions',
          platform: 'react-native',
          code: `const BookingsList: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  const grouped = groupByStatus(bookings);

  return (
    <View>
      <SegmentedControl
        tabs={['Upcoming', 'Active', 'Completed', 'Cancelled']}
        onChange={(tab) => setFilter(tab)}
      />
      <FlatList
        data={grouped[filter]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onViewDetails={() => navigation.navigate('BookingDetail', { id: item.id })}
            onCancel={() => handleCancel(item.id)}
          />
        )}
      />
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/student/bookings',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "schoolName": "Safe Drive Academy",
        "packageName": "10 Lessons Basic",
        "status": "active",
        "startDate": "2024-02-01",
        "lessonsCompleted": 3,
        "totalLessons": 10
      }
    ],
    "total": 5
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
