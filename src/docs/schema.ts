import type { EntityProps } from '../components/specs/SchemaBoard';

export const schemaData: EntityProps[] = [
  {
    name: 'User (Identity)',
    category: 'IAM',
    description: 'Central identity table for all platform roles.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'email', type: 'String', description: 'Unique identifier' },
      { name: 'phone', type: 'String', description: 'Lagos-based mobile' },
      { name: 'password_hash', type: 'String' },
      { name: 'role', type: 'Enum', description: 'LEARNER, GUARDIAN, INSTRUCTOR, SCHOOL, ADMIN' },
      { name: 'is_verified', type: 'Boolean' },
      { name: 'created_at', type: 'DateTime' }
    ]
  },
  {
    name: 'Guardian Profile',
    category: 'IAM',
    description: 'Linking guardians to learners for safety monitoring.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'user_id', type: 'UUID', isFK: true, description: 'Ref User' },
      { name: 'learner_id', type: 'UUID', isFK: true, description: 'Ref User (Learner)' },
      { name: 'relationship', type: 'String' }
    ]
  },
  {
    name: 'Driving School',
    category: 'BUSINESS',
    description: 'Business entity representing an FRSC-approved school.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'owner_id', type: 'UUID', isFK: true },
      { name: 'name', type: 'String' },
      { name: 'frsc_number', type: 'String', description: 'Verification ID' },
      { name: 'address', type: 'Text' },
      { name: 'is_approved', type: 'Boolean' },
      { name: 'base_coordinates', type: 'Point' }
    ]
  },
  {
    name: 'Vehicle',
    category: 'BUSINESS',
    description: 'Training vehicles assigned to schools.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'school_id', type: 'UUID', isFK: true },
      { name: 'plate_number', type: 'String' },
      { name: 'make_model', type: 'String' },
      { name: 'gear_type', type: 'Enum', description: 'MANUAL, AUTOMATIC' },
      { name: 'roadworthiness_expiry', type: 'Date' },
      { name: 'image_url', type: 'String' }
    ]
  },
  {
    name: 'Instructor',
    category: 'BUSINESS',
    description: 'Professional driver educators.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'user_id', type: 'UUID', isFK: true },
      { name: 'school_id', type: 'UUID', isFK: true },
      { name: 'license_number', type: 'String' },
      { name: 'rating_avg', type: 'Decimal' }
    ]
  },
  {
    name: 'Booking',
    category: 'MARKETPLACE',
    description: 'Transaction and credit bundle purchase.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'learner_id', type: 'UUID', isFK: true },
      { name: 'school_id', type: 'UUID', isFK: true },
      { name: 'package_type', type: 'Enum', description: 'SINGLE, BUNDLE_5, BUNDLE_10' },
      { name: 'total_amount', type: 'Decimal' },
      { name: 'payment_status', type: 'Enum', description: 'PENDING, ESCROW, SETTLED' },
      { name: 'credits_remaining', type: 'Integer' }
    ]
  },
  {
    name: 'Session',
    category: 'OPERATIONS',
    description: 'A live tracked driving lesson.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'booking_id', type: 'UUID', isFK: true },
      { name: 'instructor_id', type: 'UUID', isFK: true },
      { name: 'vehicle_id', type: 'UUID', isFK: true },
      { name: 'start_time', type: 'DateTime' },
      { name: 'end_time', type: 'DateTime' },
      { name: 'status', type: 'Enum', description: 'ACTIVE, COMPLETED, CANCELLED' }
    ]
  },
  {
    name: 'Telemetry Log',
    category: 'SAFETY',
    description: 'Real-time GPS coordinate history.',
    fields: [
      { name: 'id', type: 'BigInt', isPK: true },
      { name: 'session_id', type: 'UUID', isFK: true },
      { name: 'coordinates', type: 'Point' },
      { name: 'speed', type: 'Decimal' },
      { name: 'captured_at', type: 'DateTime' }
    ]
  },
  {
    name: 'Incident Report',
    category: 'SAFETY',
    description: 'Safety issues reported during or after sessions.',
    fields: [
      { name: 'id', type: 'UUID', isPK: true },
      { name: 'session_id', type: 'UUID', isFK: true },
      { name: 'reported_by', type: 'UUID', isFK: true },
      { name: 'description', type: 'Text' },
      { name: 'severity', type: 'Enum' },
      { name: 'admin_notes', type: 'Text' }
    ]
  }
];
