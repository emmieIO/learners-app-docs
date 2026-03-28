import type { Sprint } from '../components/specs/SprintPlan';

export const sprintData: Record<string, Sprint[]> = {
  auth: [
    {
      id: 'Sprint 1',
      title: 'Identity & Access Management',
      description: 'Core registration and multi-role RBAC implementation.',
      tasks: [
        { task: 'JWT Dual-token strategy', status: 'completed' },
        { task: 'Role-based access (Learner, Guardian, School, Admin)', status: 'completed' },
        { task: 'Email/Phone OTP registration', status: 'in-progress' },
        { task: 'NDPR-compliant consent management', status: 'todo' }
      ]
    },
    {
      id: 'Sprint 2',
      title: 'FRSC Verification Pipeline',
      description: 'The rigorous onboarding flow for driving schools.',
      tasks: [
        { task: 'FRSC Approval Number validation', status: 'todo' },
        { task: 'Business address & License verification', status: 'todo' },
        { task: 'Instructor license manual review queue', status: 'todo' }
      ]
    }
  ],
  student: [
    {
      id: 'Sprint 2',
      title: 'Discovery & Search',
      description: 'Lagos-focused map-based school discovery.',
      tasks: [
        { task: 'Google Maps / Mapbox integration', status: 'completed' },
        { task: 'Distance, Price, & Gear-type filters', status: 'in-progress' },
        { task: 'School profiles with vehicle images/specs', status: 'todo' }
      ]
    },
    {
      id: 'Sprint 3',
      title: 'Booking & Scheduling',
      description: 'Individual and bundled lesson management.',
      tasks: [
        { task: 'Instructor availability calendar', status: 'todo' },
        { task: 'Automated booking confirmations', status: 'todo' },
        { task: 'Vehicle verification display (Plate #, Roadworthiness)', status: 'todo' }
      ]
    }
  ],
  instructor: [
    {
      id: 'Sprint 4',
      title: 'Core Tracking Engine',
      description: 'Real-time session management and safety metrics.',
      tasks: [
        { task: 'Start/End session with vehicle validation', status: 'in-progress' },
        { task: 'Guardian real-time tracking link', status: 'todo' },
        { task: 'Speed (basic) and Route logging', status: 'todo' }
      ]
    }
  ],
  tracking: [
    {
      id: 'Sprint 4',
      title: 'Safety & Guardian Portal',
      description: 'Real-time visibility for third-party guardians.',
      tasks: [
        { task: 'WebSocket telemetry broadcasting', status: 'completed' },
        { task: 'Guardian live-route view', status: 'in-progress' },
        { task: 'Push notifications for start/stop events', status: 'todo' }
      ]
    }
  ],
  payment: [
    {
      id: 'Sprint 3',
      title: 'Escrow & Settlement',
      description: 'Financial flows ensuring session completion before payout.',
      tasks: [
        { task: 'In-app payment gateway (Stripe/Paystack)', status: 'completed' },
        { task: 'Escrow holding logic', status: 'in-progress' },
        { task: 'Post-session automated payout', status: 'todo' }
      ]
    }
  ],
  architecture: [
    {
      id: 'Milestone 1',
      title: 'Lagos MVP Foundation',
      description: 'Baseline infrastructure for the Lagos launch.',
      tasks: [
        { task: 'NestJS / PostgreSQL Core', status: 'completed' },
        { task: 'WebSocket Gateway for tracking', status: 'completed' },
        { task: 'AWS/GCP infrastructure setup', status: 'completed' }
      ]
    }
  ],
  admin: [
    {
      id: 'Sprint 6',
      title: 'Compliance & Governance',
      description: 'Tools for platform integrity and dispute resolution.',
      tasks: [
        { task: 'School approval/rejection dashboard', status: 'completed' },
        { task: 'Live session monitoring', status: 'in-progress' },
        { task: 'Incident report escalation', status: 'todo' }
      ]
    }
  ]
};
