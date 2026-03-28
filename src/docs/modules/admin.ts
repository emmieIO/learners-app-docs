import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const adminModuleData = {
  overview: `# Admin Module

## Module Overview

This module provides platform-wide management capabilities for super admins, including user management, school verification, content moderation, financial oversight, and system analytics. It serves as the central command center for the entire driving school platform.

## Key Features

- **User Management**: Manage all user accounts (students, instructors, schools)
- **School Verification**: Review and approve driving school applications
- **Document Review**: Verify uploaded business and instructor documents
- **Financial Oversight**: Monitor transactions, fees, and payouts
- **Analytics Dashboard**: Platform-wide metrics and performance tracking
- **Dispute Resolution**: Handle conflicts between users
- **System Configuration**: Manage platform settings and policies
- **Content Moderation**: Review and manage reviews, reports

## Tech Stack

- **Backend**: NestJS with @nestjs/typeorm for database operations
- **Web**: React with Tailwind CSS for admin dashboard
- **Charts**: Recharts for analytics visualization
- **Tables**: TanStack Table for data management
- **Permissions**: Role-based access control (RBAC)
`,

  entities: [
    {
      name: 'admins',
      description: 'Platform administrator accounts',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'firstName', type: 'VARCHAR(100)' },
        { name: 'lastName', type: 'VARCHAR(100)' },
        { name: 'email', type: 'VARCHAR(255)', isUnique: true },
        { name: 'phone', type: 'VARCHAR(20)' },
        { name: 'role', type: 'ENUM', description: 'super_admin|admin|support|verifier' },
        { name: 'permissions', type: 'JSONB', description: 'Admin permissions' },
        { name: 'department', type: 'VARCHAR(100)', isNullable: true },
        { name: 'lastLoginAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'school_verifications',
      description: 'Driving school verification requests and reviews',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'submittedAt', type: 'TIMESTAMP' },
        { name: 'status', type: 'ENUM', description: 'pending|under_review|approved|rejected' },
        { name: 'reviewedBy', type: 'UUID', isFK: true, isNullable: true, description: 'Admin who reviewed' },
        { name: 'reviewedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'rejectionReason', type: 'TEXT', isNullable: true },
        { name: 'notes', type: 'TEXT', isNullable: true, description: 'Internal notes' },
        { name: 'documentsReviewed', type: 'JSONB', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'instructor_verifications',
      description: 'Instructor verification requests and reviews',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'instructorId', type: 'UUID', isFK: true, description: 'References instructors.id' },
        { name: 'submittedAt', type: 'TIMESTAMP' },
        { name: 'status', type: 'ENUM', description: 'pending|under_review|approved|rejected' },
        { name: 'reviewedBy', type: 'UUID', isFK: true, isNullable: true },
        { name: 'reviewedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'rejectionReason', type: 'TEXT', isNullable: true },
        { name: 'notes', type: 'TEXT', isNullable: true },
        { name: 'backgroundCheckStatus', type: 'ENUM', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'disputes',
      description: 'User disputes and conflict resolution cases',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'bookingId', type: 'UUID', isFK: true, isNullable: true },
        { name: 'sessionId', type: 'UUID', isFK: true, isNullable: true },
        { name: 'raisedBy', type: 'UUID', isFK: true, description: 'User who raised dispute' },
        { name: 'againstUser', type: 'UUID', isFK: true, isNullable: true, description: 'User being reported' },
        { name: 'type', type: 'ENUM', description: 'payment|service|safety|conduct|other' },
        { name: 'category', type: 'ENUM', description: 'refund|no_show|misconduct|damage|complaint' },
        { name: 'description', type: 'TEXT' },
        { name: 'evidence', type: 'JSONB', isNullable: true, description: 'Photos, messages, etc' },
        { name: 'status', type: 'ENUM', description: 'open|under_review|resolved|closed' },
        { name: 'assignedTo', type: 'UUID', isFK: true, isNullable: true, description: 'Admin handling' },
        { name: 'resolution', type: 'TEXT', isNullable: true },
        { name: 'resolvedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'platform_settings',
      description: 'System-wide configuration settings',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'key', type: 'VARCHAR(100)', isUnique: true },
        { name: 'value', type: 'JSONB' },
        { name: 'type', type: 'ENUM', description: 'string|number|boolean|json' },
        { name: 'category', type: 'VARCHAR(100)', description: 'payment|notification|feature|etc' },
        { name: 'description', type: 'TEXT', isNullable: true },
        { name: 'updatedBy', type: 'UUID', isFK: true, isNullable: true },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'platform_fees',
      description: 'Platform commission and fee configuration',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'name', type: 'VARCHAR(100)', description: 'Fee name' },
        { name: 'type', type: 'ENUM', description: 'percentage|fixed' },
        { name: 'value', type: 'DECIMAL(10,2)', description: 'Fee value' },
        { name: 'applicableTo', type: 'ENUM', description: 'booking|payout|refund' },
        { name: 'minAmount', type: 'DECIMAL(10,2)', isNullable: true },
        { name: 'maxAmount', type: 'DECIMAL(10,2)', isNullable: true },
        { name: 'isActive', type: 'BOOLEAN' },
        { name: 'effectiveFrom', type: 'DATE' },
        { name: 'effectiveTo', type: 'DATE', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'audit_logs',
      description: 'System audit trail for admin actions',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'adminId', type: 'UUID', isFK: true, description: 'Admin who performed action' },
        { name: 'action', type: 'VARCHAR(100)', description: 'Action performed' },
        { name: 'entity', type: 'VARCHAR(100)', description: 'Affected entity type' },
        { name: 'entityId', type: 'UUID', isNullable: true, description: 'Affected entity ID' },
        { name: 'changes', type: 'JSONB', isNullable: true, description: 'Before/after values' },
        { name: 'ipAddress', type: 'VARCHAR(45)', isNullable: true },
        { name: 'userAgent', type: 'VARCHAR(500)', isNullable: true },
        { name: 'timestamp', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'reports',
      description: 'Generated platform reports',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'name', type: 'VARCHAR(255)' },
        { name: 'type', type: 'ENUM', description: 'financial|user|booking|safety' },
        { name: 'periodStart', type: 'DATE' },
        { name: 'periodEnd', type: 'DATE' },
        { name: 'generatedBy', type: 'UUID', isFK: true, description: 'Admin who generated' },
        { name: 'status', type: 'ENUM', description: 'pending|completed|failed' },
        { name: 'reportUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'metadata', type: 'JSONB', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'notifications',
      description: 'Platform-wide announcements and notifications',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'title', type: 'VARCHAR(255)' },
        { name: 'message', type: 'TEXT' },
        { name: 'type', type: 'ENUM', description: 'announcement|maintenance|alert|update' },
        { name: 'targetAudience', type: 'ENUM', description: 'all|students|instructors|schools' },
        { name: 'priority', type: 'ENUM', description: 'low|normal|high|urgent' },
        { name: 'scheduledAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'sentAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'expiresAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdBy', type: 'UUID', isFK: true, description: 'Admin who created' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'admins', to: 'school_verifications', type: 'one-to-many', label: 'reviews' },
    { from: 'admins', to: 'instructor_verifications', type: 'one-to-many', label: 'reviews' },
    { from: 'admins', to: 'disputes', type: 'one-to-many', label: 'handles' },
    { from: 'admins', to: 'audit_logs', type: 'one-to-many', label: 'generates' },
    { from: 'driving_schools', to: 'school_verifications', type: 'one-to-one', label: 'has' },
    { from: 'instructors', to: 'instructor_verifications', type: 'one-to-one', label: 'has' },
    { from: 'bookings', to: 'disputes', type: 'one-to-many', label: 'disputed in' },
    { from: 'admins', to: 'reports', type: 'one-to-many', label: 'generates' },
  ] as ERRelationship[],

  verificationFlow: {
    title: 'School Verification Flow',
    description: 'Complete flow for reviewing and approving driving school applications',
    nodes: [
      {
        id: 'start',
        type: 'start',
        label: 'School Submits Application',
        description: 'School completes registration with documents',
      },
      {
        id: 'create_verification',
        type: 'process',
        label: 'Create Verification Record',
        description: 'System creates pending verification entry',
      },
      {
        id: 'notify_admin',
        type: 'process',
        label: 'Notify Admin Team',
        description: 'Email/dashboard notification to verifiers',
      },
      {
        id: 'assign_reviewer',
        type: 'process',
        label: 'Assign Reviewer',
        description: 'Auto or manual assignment to admin',
      },
      {
        id: 'review_documents',
        type: 'process',
        label: 'Review Documents',
        description: 'Admin checks business license, insurance, etc',
      },
      {
        id: 'verify_frsc',
        type: 'process',
        label: 'Verify FRSC Approval',
        description: 'Cross-check with FRSC database if available',
      },
      {
        id: 'documents_valid',
        type: 'decision',
        label: 'Documents Valid?',
        description: 'All required documents authentic and current',
        next: { yes: 'approve_school', no: 'request_more' },
      },
      {
        id: 'request_more',
        type: 'process',
        label: 'Request Additional Documents',
        description: 'Send email to school with requirements',
      },
      {
        id: 'approve_school',
        type: 'process',
        label: 'Approve School',
        description: 'Update school status to verified',
      },
      {
        id: 'notify_approval',
        type: 'process',
        label: 'Send Approval Notification',
        description: 'Email school with onboarding instructions',
      },
      {
        id: 'end',
        type: 'endpoint',
        label: 'Verification Complete',
        description: 'School can now operate on platform',
      },
    ],
  },

  adminDashboardJourney: {
    title: 'Admin Dashboard Daily Workflow',
    description: 'Complete journey of an admin managing the platform',
    platform: 'web',
    steps: [
      {
        id: 'step1',
        title: 'Login to Admin Dashboard',
        description: 'Admin logs into the platform management system',
        actor: 'admin',
        ui: {
          screen: 'Admin Login',
          component: 'React Web',
          description: 'Secure login with 2FA',
        },
      },
      {
        id: 'step2',
        title: 'View Dashboard Overview',
        description: 'Check platform metrics and pending actions',
        actor: 'admin',
        ui: {
          screen: 'Admin Dashboard',
          component: 'React Web',
          description: 'KPIs, charts, and pending items',
        },
        api: {
          endpoint: '/api/v1/admin/dashboard',
          method: 'GET',
          description: 'Get dashboard summary',
        },
      },
      {
        id: 'step3',
        title: 'Review Pending Verifications',
        description: 'Process school and instructor applications',
        actor: 'admin',
        ui: {
          screen: 'Verification Queue',
          component: 'React Web',
          description: 'List of pending verifications',
        },
        api: {
          endpoint: '/api/v1/admin/verifications/pending',
          method: 'GET',
          description: 'Get pending verifications',
        },
      },
      {
        id: 'step4',
        title: 'Review School Documents',
        description: 'Examine uploaded business documents',
        actor: 'admin',
        ui: {
          screen: 'Document Review',
          component: 'React Web',
          description: 'Document viewer with approve/reject',
        },
        api: {
          endpoint: '/api/v1/admin/verifications/:id/review',
          method: 'PATCH',
          description: 'Submit verification decision',
        },
      },
      {
        id: 'step5',
        title: 'Handle Disputes',
        description: 'Review and resolve user disputes',
        actor: 'admin',
        ui: {
          screen: 'Dispute Management',
          component: 'React Web',
          description: 'Dispute details with resolution tools',
        },
        api: {
          endpoint: '/api/v1/admin/disputes/:id/resolve',
          method: 'PATCH',
          description: 'Resolve dispute',
        },
      },
      {
        id: 'step6',
        title: 'Monitor Financial Reports',
        description: 'Review transactions and payouts',
        actor: 'admin',
        ui: {
          screen: 'Financial Dashboard',
          component: 'React Web',
          description: 'Revenue, fees, and payout analytics',
        },
        api: {
          endpoint: '/api/v1/admin/financials',
          method: 'GET',
          description: 'Get financial data',
        },
      },
      {
        id: 'step7',
        title: 'Manage Users',
        description: 'Handle user accounts and suspensions',
        actor: 'admin',
        ui: {
          screen: 'User Management',
          component: 'React Web',
          description: 'User list with actions',
        },
        api: {
          endpoint: '/api/v1/admin/users',
          method: 'GET',
          description: 'List all users',
        },
      },
      {
        id: 'step8',
        title: 'Generate Reports',
        description: 'Create periodic platform reports',
        actor: 'admin',
        ui: {
          screen: 'Report Generator',
          component: 'React Web',
          description: 'Report configuration and export',
        },
        api: {
          endpoint: '/api/v1/admin/reports',
          method: 'POST',
          description: 'Generate report',
        },
      },
      {
        id: 'step9',
        title: 'Send Platform Announcements',
        description: 'Communicate with all users',
        actor: 'admin',
        ui: {
          screen: 'Notification Composer',
          component: 'React Web',
          description: 'Message composer with targeting',
        },
        api: {
          endpoint: '/api/v1/admin/notifications',
          method: 'POST',
          description: 'Send notification',
        },
      },
      {
        id: 'step10',
        title: 'Review Audit Logs',
        description: 'Monitor system activity and changes',
        actor: 'admin',
        ui: {
          screen: 'Audit Log Viewer',
          component: 'React Web',
          description: 'Searchable activity log',
        },
        api: {
          endpoint: '/api/v1/admin/audit-logs',
          method: 'GET',
          description: 'Get audit logs',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'GET',
      path: '/api/v1/admin/dashboard',
      description: 'Get admin dashboard summary',
      auth: true,
      params: 'None',
      responseExample: `{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 5420,
      "activeSchools": 48,
      "monthlyRevenue": 12500000,
      "pendingVerifications": 12
    },
    "pendingActions": [
      {
        "id": "uuid",
        "type": "verification",
        "priority": "high",
        "title": "5 School Applications Pending",
        "actionLabel": "Review"
      }
    ]
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/admin/verifications/pending',
      description: 'Get pending verifications',
      auth: true,
      params: 'type (school|instructor)',
      responseExample: `{
  "success": true,
  "data": {
    "verifications": [
      {
        "id": "uuid",
        "type": "school",
        "schoolName": "Safe Drive Academy",
        "submittedAt": "2024-01-15T10:00:00Z",
        "status": "pending",
        "documentsCount": 4
      }
    ],
    "total": 5
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/admin/verifications/:id/decision',
      description: 'Submit verification decision',
      auth: true,
      params: 'id (path param), decision, reason',
      requestExample: `{
  "decision": "approved",
  "notes": "All documents verified successfully"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "verification": {
      "id": "uuid",
      "status": "approved",
      "reviewedAt": "2024-02-01T14:30:00Z",
      "reviewedBy": "admin-uuid"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/admin/users',
      description: 'List all platform users',
      auth: true,
      params: 'role, status, search, page, limit',
      responseExample: `{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "learner@example.com",
        "role": "learner",
        "status": "active",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 5420
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/admin/users/:id/status',
      description: 'Update user status (suspend/activate)',
      auth: true,
      params: 'id (path param), status, reason',
      requestExample: `{
  "status": "suspended",
  "reason": "Violation of terms of service"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "status": "suspended",
      "suspendedAt": "2024-01-20T10:00:00Z"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/admin/disputes',
      description: 'List all disputes',
      auth: true,
      params: 'status, type, page, limit',
      responseExample: `{
  "success": true,
  "data": {
    "disputes": [
      {
        "id": "uuid",
        "type": "payment",
        "category": "refund",
        "raisedBy": "learner",
        "status": "open",
        "createdAt": "2024-01-18T10:00:00Z"
      }
    ],
    "total": 8
  }
}`,
    },
    {
      method: 'PATCH',
      path: '/api/v1/admin/disputes/:id/resolve',
      description: 'Resolve dispute',
      auth: true,
      params: 'id (path param), resolution, refundAmount',
      requestExample: `{
  "resolution": "Partial refund issued to student",
  "refundAmount": 75000,
  "notes": "Instructor was late, but session was completed"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "dispute": {
      "id": "uuid",
      "status": "resolved",
      "resolvedAt": "2024-02-01T16:00:00Z",
      "resolution": "Partial refund issued"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/admin/financials',
      description: 'Get financial overview',
      auth: true,
      params: 'period (week|month|year)',
      responseExample: `{
  "success": true,
  "data": {
    "revenue": 12500000,
    "platformFees": 1250000,
    "payouts": 11250000,
    "transactions": [
      {
        "id": "uuid",
        "amount": 150000,
        "platformFee": 15000,
        "status": "success",
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ]
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/admin/notifications',
      description: 'Send platform notification',
      auth: true,
      params: 'title, message, type, targetAudience',
      requestExample: `{
  "title": "Scheduled Maintenance",
  "message": "Platform will be down for maintenance on Jan 25, 2-4 AM",
  "type": "maintenance",
  "targetAudience": "all"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "notification": {
      "id": "uuid",
      "title": "Scheduled Maintenance",
      "sentAt": "2024-01-20T10:00:00Z",
      "recipientCount": 5420
    }
  }
}`,
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'Admin Dashboard',
      purpose: 'Display platform overview and key metrics',
      platform: 'react-web',
      components: [
        {
          name: 'DashboardStats',
          description: 'Key platform metrics',
          platform: 'react-web',
          code: `const DashboardStats: React.FC<{ stats: AdminStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        trend={stats.userGrowth}
        icon={<Users />}
      />
      <StatCard
        title="Active Schools"
        value={stats.activeSchools}
        trend={stats.schoolGrowth}
        icon={<Building />}
      />
      <StatCard
        title="Monthly Revenue"
        value={formatCurrency(stats.monthlyRevenue)}
        trend={stats.revenueGrowth}
        icon={<DollarSign />}
      />
      <StatCard
        title="Pending Verifications"
        value={stats.pendingVerifications}
        variant="warning"
        icon={<Clock />}
      />
    </div>
  );
};`,
        },
        {
          name: 'PendingActionsList',
          description: 'Actions requiring admin attention',
          platform: 'react-web',
          code: `const PendingActionsList: React.FC<{ actions: PendingAction[] }> = ({ actions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold">Pending Actions</h3>
      </div>
      <div className="divide-y">
        {actions.map(action => (
          <div key={action.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <Badge variant={action.priority}>{action.type}</Badge>
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
            <Button onClick={action.onAction}>
              {action.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/admin/dashboard',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 5420,
      "activeSchools": 48,
      "monthlyRevenue": 12500000,
      "pendingVerifications": 12
    },
    "pendingActions": [
      {
        "id": "uuid",
        "type": "verification",
        "priority": "high",
        "title": "5 School Applications Pending",
        "actionLabel": "Review"
      }
    ]
  }
}`,
      },
    },
    {
      screenName: 'Verification Review Screen',
      purpose: 'Review and approve/reject school applications',
      platform: 'react-web',
      components: [
        {
          name: 'DocumentViewer',
          description: 'View and verify uploaded documents',
          platform: 'react-web',
          code: `const DocumentViewer: React.FC<{ documents: Document[] }> = ({ documents }) => {
  const [selected, setSelected] = useState<Document | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      {documents.map(doc => (
        <div
          key={doc.id}
          className="border rounded-xl p-4 cursor-pointer hover:border-indigo-500"
          onClick={() => setSelected(doc)}
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="size-5 text-indigo-600" />
            <div>
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.type}</p>
            </div>
          </div>
          <Badge status={doc.status}>{doc.status}</Badge>
        </div>
      ))}
      <Modal
        visible={!!selected}
        onClose={() => setSelected(null)}
        className="max-w-4xl"
      >
        <DocumentPreview document={selected} />
      </Modal>
    </div>
  );
};`,
        },
        {
          name: 'VerificationDecision',
          description: 'Approve or reject with reason',
          platform: 'react-web',
          code: `const VerificationDecision: React.FC<{
  onApprove: () => void;
  onReject: (reason: string) => void;
}> = ({ onApprove, onReject }) => {
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState('');

  return (
    <div className="flex gap-4">
      <Button onClick={onApprove} variant="success" size="lg">
        <CheckCircle className="size-4 mr-2" />
        Approve Application
      </Button>
      <Button onClick={() => setShowReject(true)} variant="danger" size="lg">
        <XCircle className="size-4 mr-2" />
        Reject Application
      </Button>
      <Modal visible={showReject} onClose={() => setShowReject(false)}>
        <h3>Rejection Reason</h3>
        <Textarea
          value={reason}
          onChange={setReason}
          placeholder="Explain why this application is rejected..."
        />
        <Button
          onClick={() => onReject(reason)}
          variant="danger"
          disabled={!reason.trim()}
        >
          Submit Rejection
        </Button>
      </Modal>
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/admin/verifications/:id/decision',
        method: 'PATCH',
        requestExample: `{
  "decision": "approved",
  "notes": "All documents verified successfully"
}`,
        responseExample: `{
  "success": true,
  "data": {
    "verification": {
      "id": "uuid",
      "status": "approved",
      "reviewedAt": "2024-02-01T14:30:00Z",
      "reviewedBy": "admin-uuid"
    }
  }
}`,
      },
    },
    {
      screenName: 'Dispute Resolution Screen',
      purpose: 'Review and resolve user disputes',
      platform: 'react-web',
      components: [
        {
          name: 'DisputeTimeline',
          description: 'View dispute history and messages',
          platform: 'react-web',
          code: `const DisputeTimeline: React.FC<{ dispute: Dispute }> = ({ dispute }) => {
  return (
    <div className="space-y-4">
      <Timeline>
        <TimelineItem
          icon={<User />}
          title="Dispute Raised"
          description={dispute.description}
          timestamp={dispute.createdAt}
        />
        {dispute.evidence.map(item => (
          <TimelineItem
            key={item.id}
            icon={<Paperclip />}
            title="Evidence Added"
            description={item.name}
            attachment={item.url}
          />
        ))}
      </Timeline>
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/admin/disputes/:id/resolve',
        method: 'PATCH',
        requestExample: `{
  "resolution": "Partial refund issued to student",
  "refundAmount": 75000,
  "notes": "Instructor was late, but session was completed"
}`,
        responseExample: `{
  "success": true,
  "data": {
    "dispute": {
      "id": "uuid",
      "status": "resolved",
      "resolvedAt": "2024-02-01T16:00:00Z",
      "resolution": "Partial refund issued"
    }
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
