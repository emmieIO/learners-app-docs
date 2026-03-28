import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const drivingSchoolModuleData = {
  overview: `# Driving School Module

## Module Overview

This module enables driving schools to manage their business profile, instructors, lesson packages, bookings, and earnings. It serves as the business management hub for driving school operators on the platform.

## Key Features

- **School Profile Management**: Update business details, logo, and verification documents
- **Instructor Management**: Invite, assign, and manage instructors
- **Package Creation**: Create and manage driving lesson packages with pricing
- **Booking Management**: View and assign incoming student bookings to instructors
- **Earnings Dashboard**: Track revenue, payouts, and financial analytics
- **Document Verification**: Upload and manage business verification documents

## Tech Stack

- **Backend**: NestJS with TypeORM for database operations
- **Web**: React with Tailwind CSS for dashboard UI
- **Mobile**: React Native for on-the-go management
- **Storage**: AWS S3 for document and image storage
`,

  entities: [
    {
      name: 'driving_schools',
      description: 'Registered driving school businesses on the platform',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'name', type: 'VARCHAR(255)', description: 'Business name' },
        { name: 'businessRegistrationNumber', type: 'VARCHAR(100)', description: 'FRSC/RC number' },
        { name: 'taxId', type: 'VARCHAR(50)', isNullable: true },
        { name: 'email', type: 'VARCHAR(255)' },
        { name: 'phone', type: 'VARCHAR(20)' },
        { name: 'address', type: 'VARCHAR(500)' },
        { name: 'city', type: 'VARCHAR(100)' },
        { name: 'state', type: 'VARCHAR(100)' },
        { name: 'country', type: 'VARCHAR(100)', description: 'Default: Nigeria' },
        { name: 'logoUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'verificationStatus', type: 'ENUM', description: 'pending|verified|rejected' },
        { name: 'verifiedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'rejectionReason', type: 'TEXT', isNullable: true },
        { name: 'ratingAverage', type: 'DECIMAL(3,2)', description: '0.00-5.00' },
        { name: 'totalReviews', type: 'INTEGER', description: 'Review count' },
        { name: 'totalInstructors', type: 'INTEGER' },
        { name: 'totalStudents', type: 'INTEGER' },
        { name: 'totalLessons', type: 'INTEGER', description: 'Completed lessons' },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'school_admins',
      description: 'Administrators managing driving school operations',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'firstName', type: 'VARCHAR(100)' },
        { name: 'lastName', type: 'VARCHAR(100)' },
        { name: 'phone', type: 'VARCHAR(20)' },
        { name: 'isOwner', type: 'BOOLEAN', description: 'True if school owner' },
        { name: 'permissions', type: 'JSONB', isNullable: true, description: 'Admin permissions' },
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
        { name: 'lessonDuration', type: 'INTEGER', description: 'Minutes per lesson' },
        { name: 'maxBookingsPerSlot', type: 'INTEGER', description: 'Capacity per slot' },
        { name: 'isActive', type: 'BOOLEAN', description: 'Available for booking' },
        { name: 'features', type: 'JSONB', isNullable: true, description: 'Package features' },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'instructor_assignments',
      description: 'Link between schools and instructors with status',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'status', type: 'ENUM', description: 'pending|active|suspended|removed' },
        { name: 'assignedAt', type: 'TIMESTAMP' },
        { name: 'removedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'removalReason', type: 'TEXT', isNullable: true },
        { name: 'assignedBy', type: 'UUID', isFK: true, description: 'Admin who assigned' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'school_documents',
      description: 'Verification documents for driving schools',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'type', type: 'ENUM', description: 'business_license|insurance|tax_certificate|frsc_approval|facility_photos' },
        { name: 'documentUrl', type: 'VARCHAR(500)', description: 'S3 storage URL' },
        { name: 'documentName', type: 'VARCHAR(255)' },
        { name: 'status', type: 'ENUM', description: 'pending|approved|rejected' },
        { name: 'rejectionReason', type: 'TEXT', isNullable: true },
        { name: 'expiryDate', type: 'DATE', isNullable: true },
        { name: 'reviewedBy', type: 'UUID', isFK: true, isNullable: true },
        { name: 'reviewedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'uploadedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'school_bookings',
      description: 'All bookings for a driving school',
      category: 'booking',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'studentId', type: 'UUID', isFK: true, description: 'References students.id' },
        { name: 'packageId', type: 'UUID', isFK: true, description: 'References packages.id' },
        { name: 'instructorId', type: 'UUID', isFK: true, isNullable: true },
        { name: 'status', type: 'ENUM', description: 'pending|assigned|active|completed|cancelled' },
        { name: 'totalPrice', type: 'DECIMAL(10,2)' },
        { name: 'platformFee', type: 'DECIMAL(10,2)', description: 'Platform commission' },
        { name: 'schoolRevenue', type: 'DECIMAL(10,2)', description: 'School earnings' },
        { name: 'startDate', type: 'TIMESTAMP' },
        { name: 'assignedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'completedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'school_payouts',
      description: 'Payouts to driving schools from platform',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'amount', type: 'DECIMAL(12,2)' },
        { name: 'currency', type: 'VARCHAR(3)', description: 'NGN' },
        { name: 'status', type: 'ENUM', description: 'pending|processing|completed|failed' },
        { name: 'periodStart', type: 'DATE', description: 'Week start date' },
        { name: 'periodEnd', type: 'DATE', description: 'Week end date' },
        { name: 'totalBookings', type: 'INTEGER', description: 'Bookings in period' },
        { name: 'platformFees', type: 'DECIMAL(12,2)', description: 'Fees deducted' },
        { name: 'payoutMethod', type: 'ENUM', description: 'bank_transfer|wallet' },
        { name: 'bankAccountNumber', type: 'VARCHAR(10)', isNullable: true },
        { name: 'bankCode', type: 'VARCHAR(10)', isNullable: true },
        { name: 'processedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'failureReason', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'school_analytics',
      description: 'Aggregated analytics data for schools',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, isUnique: true },
        { name: 'totalRevenue', type: 'DECIMAL(12,2)', description: 'Lifetime revenue' },
        { name: 'monthlyRevenue', type: 'DECIMAL(12,2)' },
        { name: 'weeklyRevenue', type: 'DECIMAL(12,2)' },
        { name: 'totalBookings', type: 'INTEGER' },
        { name: 'activeBookings', type: 'INTEGER' },
        { name: 'completedBookings', type: 'INTEGER' },
        { name: 'cancelledBookings', type: 'INTEGER' },
        { name: 'conversionRate', type: 'DECIMAL(5,2)', description: 'View to booking %' },
        { name: 'averageRating', type: 'DECIMAL(3,2)' },
        { name: 'responseTime', type: 'INTEGER', description: 'Avg response in minutes' },
        { name: 'lastUpdated', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'driving_schools', to: 'school_admins', type: 'one-to-many', label: 'has' },
    { from: 'driving_schools', to: 'packages', type: 'one-to-many', label: 'offers' },
    { from: 'driving_schools', to: 'instructor_assignments', type: 'one-to-many', label: 'assigns' },
    { from: 'driving_schools', to: 'school_documents', type: 'one-to-many', label: 'uploads' },
    { from: 'driving_schools', to: 'school_bookings', type: 'one-to-many', label: 'receives' },
    { from: 'driving_schools', to: 'school_payouts', type: 'one-to-many', label: 'receives' },
    { from: 'driving_schools', to: 'school_analytics', type: 'one-to-one', label: 'has' },
    { from: 'instructors', to: 'instructor_assignments', type: 'one-to-many', label: 'assigned to' },
    { from: 'packages', to: 'school_bookings', type: 'one-to-many', label: 'purchased in' },
  ] as ERRelationship[],

  managementFlow: {
    title: 'School Booking Management Flow',
    description: 'Complete flow from receiving booking to instructor assignment',
    nodes: [
      {
        id: 'start',
        type: 'start',
        label: 'New Booking Received',
        description: 'Student completes payment for a package',
      },
      {
        id: 'notify',
        type: 'process',
        label: 'Notify School Admin',
        description: 'Push notification and email about new booking',
      },
      {
        id: 'review',
        type: 'process',
        label: 'Review Booking Details',
        description: 'Admin views student info, package, preferred schedule',
      },
      {
        id: 'check_instructors',
        type: 'decision',
        label: 'Instructors Available?',
        description: 'Check if any instructor has availability for the slot',
        next: { yes: 'assign_instructor', no: 'contact_student' },
      },
      {
        id: 'contact_student',
        type: 'process',
        label: 'Contact Student',
        description: 'Request alternative time slot or offer refund',
      },
      {
        id: 'assign_instructor',
        type: 'process',
        label: 'Assign Instructor',
        description: 'Select best available instructor for the booking',
      },
      {
        id: 'notify_instructor',
        type: 'process',
        label: 'Notify Instructor',
        description: 'Send booking assignment to instructor',
      },
      {
        id: 'instructor_accept',
        type: 'decision',
        label: 'Instructor Accepts?',
        description: 'Wait for instructor confirmation',
        next: { yes: 'confirm_booking', no: 'reassign' },
      },
      {
        id: 'reassign',
        type: 'process',
        label: 'Reassign to Another Instructor',
        description: 'Find alternative instructor for the booking',
      },
      {
        id: 'confirm_booking',
        type: 'process',
        label: 'Confirm Booking',
        description: 'Update booking status to confirmed',
      },
      {
        id: 'notify_student',
        type: 'process',
        label: 'Notify Student',
        description: 'Send confirmation with instructor details',
      },
      {
        id: 'end',
        type: 'endpoint',
        label: 'Booking Ready',
        description: 'Booking confirmed and ready for session start',
      },
    ],
  },

  schoolAdminJourney: {
    title: 'School Admin Daily Management Journey',
    description: 'Complete journey of a school admin managing daily operations',
    platform: 'web',
    steps: [
      {
        id: 'step1',
        title: 'Login to Dashboard',
        description: 'School admin logs into the management dashboard',
        actor: 'school',
        ui: {
          screen: 'School Dashboard',
          component: 'React Web',
          description: 'Overview with key metrics and pending actions',
        },
        api: {
          endpoint: '/api/v1/school/dashboard',
          method: 'GET',
          description: 'Fetch dashboard summary',
        },
      },
      {
        id: 'step2',
        title: 'Review New Bookings',
        description: 'Check pending bookings that need instructor assignment',
        actor: 'school',
        ui: {
          screen: 'Bookings Management',
          component: 'React Web',
          description: 'Table of bookings with assign instructor action',
        },
        api: {
          endpoint: '/api/v1/school/bookings/pending',
          method: 'GET',
          description: 'Get pending bookings',
        },
      },
      {
        id: 'step3',
        title: 'Assign Instructor to Booking',
        description: 'Select available instructor for a booking',
        actor: 'school',
        ui: {
          screen: 'Instructor Assignment Modal',
          component: 'React Web',
          description: 'Modal with instructor list and availability',
        },
        api: {
          endpoint: '/api/v1/school/bookings/:id/assign',
          method: 'PATCH',
          description: 'Assign instructor to booking',
        },
      },
      {
        id: 'step4',
        title: 'Manage Instructor Availability',
        description: 'Review and adjust instructor schedules if needed',
        actor: 'school',
        ui: {
          screen: 'Instructor Schedule',
          component: 'React Web',
          description: 'Calendar view of all instructor availability',
        },
      },
      {
        id: 'step5',
        title: 'Update Package Pricing',
        description: 'Adjust package prices or create new packages',
        actor: 'school',
        ui: {
          screen: 'Package Management',
          component: 'React Web',
          description: 'List of packages with edit/create actions',
        },
        api: {
          endpoint: '/api/v1/school/packages',
          method: 'POST',
          description: 'Create new package',
        },
      },
      {
        id: 'step6',
        title: 'Review Earnings',
        description: 'Check revenue and pending payouts',
        actor: 'school',
        ui: {
          screen: 'Financial Dashboard',
          component: 'React Web',
          description: 'Revenue charts and payout history',
        },
        api: {
          endpoint: '/api/v1/school/earnings',
          method: 'GET',
          description: 'Get earnings and payout data',
        },
      },
      {
        id: 'step7',
        title: 'Upload Documents',
        description: 'Upload or renew verification documents',
        actor: 'school',
        ui: {
          screen: 'Document Management',
          component: 'React Web',
          description: 'Document upload with status indicators',
        },
        api: {
          endpoint: '/api/v1/school/documents',
          method: 'POST',
          description: 'Upload verification document',
        },
      },
      {
        id: 'step8',
        title: 'Invite New Instructor',
        description: 'Send invitation to potential instructor',
        actor: 'school',
        ui: {
          screen: 'Instructor Invitation',
          component: 'React Web',
          description: 'Form to send instructor invitation',
        },
        api: {
          endpoint: '/api/v1/school/instructors/invite',
          method: 'POST',
          description: 'Send instructor invitation',
        },
      },
      {
        id: 'step9',
        title: 'Respond to Reviews',
        description: 'Reply to student reviews and feedback',
        actor: 'school',
        ui: {
          screen: 'Reviews Management',
          component: 'React Web',
          description: 'List of reviews with reply functionality',
        },
        api: {
          endpoint: '/api/v1/school/reviews/:id/respond',
          method: 'POST',
          description: 'Respond to review',
        },
      },
      {
        id: 'step10',
        title: 'View Analytics Report',
        description: 'Review weekly/monthly performance metrics',
        actor: 'school',
        ui: {
          screen: 'Analytics Dashboard',
          component: 'React Web',
          description: 'Charts and graphs for business metrics',
        },
        api: {
          endpoint: '/api/v1/school/analytics',
          method: 'GET',
          description: 'Get analytics data',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'GET',
      path: '/api/v1/school/dashboard',
      description: 'Get school dashboard summary',
      auth: true,
      params: 'None',
      responseExample: `{
  "success": true,
  "data": {
    "activeBookings": 24,
    "monthlyRevenue": 2450000,
    "totalInstructors": 12,
    "averageRating": 4.6,
    "pendingBookings": 5,
    "pendingDocuments": 2
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/school/bookings',
      description: 'Get all school bookings',
      auth: true,
      params: 'status, startDate, endDate, page, limit',
      responseExample: `{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "studentName": "John Doe",
        "packageName": "10 Lessons Basic",
        "instructorName": null,
        "status": "pending",
        "startDate": "2024-02-01",
        "totalPrice": 150000
      }
    ],
    "total": 48
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/school/bookings/:id/assign',
      description: 'Assign instructor to booking',
      auth: true,
      params: 'id (path param), instructorId',
      requestExample: `{
  "instructorId": "550e8400-e29b-41d4-a716-446655440002"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "status": "assigned",
      "instructorId": "550e8400-e29b-41d4-a716-446655440002",
      "assignedAt": "2024-01-20T10:00:00Z"
    }
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/school/packages',
      description: 'Create new package',
      auth: true,
      params: 'name, description, numberOfLessons, price, vehicleType',
      requestExample: `{
  "name": "15 Lessons Premium",
  "description": "Comprehensive driving course with highway training",
  "numberOfLessons": 15,
  "price": 225000,
  "duration": 60,
  "vehicleType": "automatic",
  "lessonDuration": 120,
  "features": ["Pickup service", "Flexible scheduling", "Certificate"]
}`,
      responseExample: `{
  "success": true,
  "data": {
    "package": {
      "id": "uuid",
      "name": "15 Lessons Premium",
      "isActive": true
    }
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/school/instructors/invite',
      description: 'Invite new instructor',
      auth: true,
      params: 'email, phone, firstName, lastName',
      requestExample: `{
  "email": "instructor@example.com",
  "phone": "+2348012345678",
  "firstName": "Adamu",
  "lastName": "Ibrahim"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "invitation": {
      "id": "uuid",
      "email": "instructor@example.com",
      "status": "pending",
      "expiresAt": "2024-01-27T10:00:00Z"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/school/earnings',
      description: 'Get earnings and payout history',
      auth: true,
      params: 'period (week|month|year)',
      responseExample: `{
  "success": true,
  "data": {
    "earnings": {
      "total": 15750000,
      "monthly": 2450000,
      "weekly": 625000
    },
    "payouts": [
      {
        "id": "uuid",
        "amount": 580000,
        "status": "completed",
        "periodStart": "2024-01-15",
        "periodEnd": "2024-01-21",
        "processedAt": "2024-01-22"
      }
    ],
    "pendingAmount": 125000
  }
}`,
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'School Dashboard',
      purpose: 'Display overview of school operations, metrics, and pending actions',
      platform: 'react-web',
      components: [
        {
          name: 'DashboardStats',
          description: 'Key metrics cards with trends',
          platform: 'react-web',
          code: `const DashboardStats: React.FC<{ stats: SchoolStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        title="Active Bookings"
        value={stats.activeBookings}
        trend={stats.bookingsTrend}
        icon={<Calendar />}
      />
      <StatCard
        title="Monthly Revenue"
        value={formatCurrency(stats.monthlyRevenue)}
        trend={stats.revenueTrend}
        icon={<DollarSign />}
      />
      <StatCard
        title="Total Instructors"
        value={stats.totalInstructors}
        icon={<Users />}
      />
      <StatCard
        title="Average Rating"
        value={stats.rating.toFixed(1)}
        icon={<Star />}
      />
    </div>
  );
};`,
        },
        {
          name: 'PendingActionsList',
          description: 'List of actions requiring attention',
          platform: 'react-web',
          code: `const PendingActionsList: React.FC<{ actions: PendingAction[] }> = ({ actions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h3 className="text-lg font-bold mb-4">Pending Actions</h3>
      {actions.map(action => (
        <div key={action.id} className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium">{action.title}</p>
            <p className="text-sm text-gray-500">{action.description}</p>
          </div>
          <Button onClick={action.onAction}>
            {action.actionLabel}
          </Button>
        </div>
      ))}
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/school/dashboard',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "activeBookings": 24,
    "monthlyRevenue": 2450000,
    "totalInstructors": 12,
    "averageRating": 4.6,
    "pendingBookings": 5,
    "pendingDocuments": 2
  }
}`,
      },
    },
    {
      screenName: 'Booking Management Screen',
      purpose: 'View and manage all school bookings with instructor assignment',
      platform: 'react-web',
      components: [
        {
          name: 'BookingsTable',
          description: 'Table of bookings with filters and actions',
          platform: 'react-web',
          code: `const BookingsTable: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Tabs value={filter} onChange={setFilter}>
          <Tab value="all">All</Tab>
          <Tab value="pending">Pending</Tab>
          <Tab value="active">Active</Tab>
          <Tab value="completed">Completed</Tab>
        </Tabs>
        <DatePicker />
      </div>
      <Table>
        <TableHeader>
          <Column>Student</Column>
          <Column>Package</Column>
          <Column>Instructor</Column>
          <Column>Status</Column>
          <Column>Date</Column>
          <Column>Actions</Column>
        </TableHeader>
        <TableBody>
          {bookings.map(booking => (
            <TableRow key={booking.id}>
              <Cell>{booking.studentName}</Cell>
              <Cell>{booking.packageName}</Cell>
              <Cell>
                {booking.instructorName || (
                  <Button size="sm" onClick={() => assignInstructor(booking.id)}>
                    Assign
                  </Button>
                )}
              </Cell>
              <Cell><Badge status={booking.status}>{booking.status}</Badge></Cell>
              <Cell>{formatDate(booking.startDate)}</Cell>
              <Cell>
                <Dropdown>
                  <MenuItem>View Details</MenuItem>
                  <MenuItem>Reassign</MenuItem>
                  <MenuItem variant="danger">Cancel</MenuItem>
                </Dropdown>
              </Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/school/bookings',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "studentName": "John Doe",
        "packageName": "10 Lessons Basic",
        "instructorName": null,
        "status": "pending",
        "startDate": "2024-02-01",
        "totalPrice": 150000
      }
    ],
    "total": 48
  }
}`,
      },
    },
    {
      screenName: 'Package Management Screen',
      purpose: 'Create and manage driving lesson packages',
      platform: 'react-web',
      components: [
        {
          name: 'PackageList',
          description: 'List of packages with edit/delete actions',
          platform: 'react-web',
          code: `const PackageList: React.FC<{ packages: Package[] }> = ({ packages }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {packages.map(pkg => (
        <div key={pkg.id} className="border rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge variant={pkg.isActive ? 'success' : 'secondary'}>
              {pkg.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Dropdown>
              <MenuItem onClick={() => editPackage(pkg.id)}>Edit</MenuItem>
              <MenuItem onClick={() => togglePackage(pkg.id)}>
                {pkg.isActive ? 'Deactivate' : 'Activate'}
              </MenuItem>
            </Dropdown>
          </div>
          <h3 className="text-lg font-bold">{pkg.name}</h3>
          <p className="text-gray-500 text-sm">{pkg.numberOfLessons} lessons</p>
          <p className="text-2xl font-bold mt-2">₦{pkg.price.toLocaleString()}</p>
          <div className="mt-4 flex gap-2">
            <Badge>{pkg.vehicleType}</Badge>
            <Badge>{pkg.duration} days validity</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/school/packages',
        method: 'POST',
        requestExample: `{
  "name": "15 Lessons Premium",
  "description": "Comprehensive driving course with highway training",
  "numberOfLessons": 15,
  "price": 225000,
  "duration": 60,
  "vehicleType": "automatic",
  "lessonDuration": 120,
  "features": ["Pickup service", "Flexible scheduling", "Certificate"]
}`,
        responseExample: `{
  "success": true,
  "data": {
    "package": {
      "id": "uuid",
      "name": "15 Lessons Premium",
      "isActive": true
    }
  }
}`,
      },
    },
    {
      screenName: 'Earnings Dashboard',
      purpose: 'View revenue, payouts, and financial analytics',
      platform: 'react-web',
      components: [
        {
          name: 'RevenueChart',
          description: 'Revenue trend chart over time',
          platform: 'react-web',
          code: `const RevenueChart: React.FC<{ data: RevenueData[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Revenue Overview</h3>
        <Select defaultValue="month">
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
      </div>
      <LineChart data={data} height={300}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="revenue" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </div>
  );
};`,
        },
        {
          name: 'PayoutHistory',
          description: 'Table of payout history',
          platform: 'react-web',
          code: `const PayoutHistory: React.FC<{ payouts: Payout[] }> = ({ payouts }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h3 className="text-lg font-bold mb-4">Payout History</h3>
      <Table>
        <TableHeader>
          <Column>Period</Column>
          <Column>Amount</Column>
          <Column>Status</Column>
          <Column>Processed</Column>
          <Column>Actions</Column>
        </TableHeader>
        <TableBody>
          {payouts.map(payout => (
            <TableRow key={payout.id}>
              <Cell>{payout.periodStart} - {payout.periodEnd}</Cell>
              <Cell className="font-bold">₦{payout.amount.toLocaleString()}</Cell>
              <Cell><Badge status={payout.status}>{payout.status}</Badge></Cell>
              <Cell>{formatDate(payout.processedAt)}</Cell>
              <Cell>
                <Button variant="outline" size="sm">View Details</Button>
              </Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/school/earnings',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "earnings": {
      "total": 15750000,
      "monthly": 2450000,
      "weekly": 625000
    },
    "payouts": [
      {
        "id": "uuid",
        "amount": 580000,
        "status": "completed",
        "periodStart": "2024-01-15",
        "periodEnd": "2024-01-21",
        "processedAt": "2024-01-22"
      }
    ],
    "pendingAmount": 125000
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
