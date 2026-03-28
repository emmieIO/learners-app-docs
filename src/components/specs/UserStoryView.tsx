import React from 'react';
import { User, CheckCircle2, Zap } from 'lucide-react';

interface Story {
  id: string;
  role: string;
  action: string;
  reason: string;
  ac: string[];
  techImpact: string;
}

const StoryCard: React.FC<Story> = ({ id, role, action, reason, ac, techImpact }) => (
  <div className="bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-[32px] p-8 sm:p-10 hover:shadow-md transition-all group">
    <div className="flex items-center gap-x-4 mb-8">
      <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400">
        <User className="size-6" />
      </div>
      <div>
        <span className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest">{id}</span>
        <h4 className="font-display text-[20px] font-bold text-slate-900 dark:text-white tracking-tight">{role}</h4>
      </div>
    </div>

    <div className="space-y-6 mb-10">
      <blockquote className="font-display text-[22px] font-medium text-slate-700 dark:text-slate-200 leading-snug">
        "As a {role.toLowerCase()}, I want to {action.toLowerCase()} so that {reason.toLowerCase()}."
      </blockquote>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
      <div>
        <h5 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
          <CheckCircle2 className="size-3.5" /> Acceptance Criteria
        </h5>
        <ul className="space-y-3">
          {ac.map((item, idx) => (
            <li key={idx} className="flex gap-x-3 text-[13px] text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors leading-relaxed">
              <span className="text-indigo-500 mt-0.5 opacity-40">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
          <Zap className="size-3.5" /> Technical Implementation
        </h5>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed italic bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
          {techImpact}
        </p>
      </div>
    </div>
  </div>
);

export const UserStoryView: React.FC<{ type: 'student' | 'instructor' | 'school' }> = ({ type }) => {
  const stories: Record<string, Story[]> = {
    student: [
      {
        id: 'US-ST-01',
        role: 'Student',
        action: 'Purchase a lesson package',
        reason: 'I can start my driving education with a trusted school.',
        ac: [
          'Filter by price, location, and rating.',
          'Secure digital checkout via integrated gateways.',
          'Automatic credit wallet updates after payment.'
        ],
        techImpact: 'Atomic transaction processing with idempotent credit allocation.'
      },
      {
        id: 'US-ST-02',
        role: 'Student',
        action: 'Track my active lesson',
        reason: 'My family can monitor my journey and safety in real-time.',
        ac: [
          'High-precision live instructor map pin.',
          'Public tracking portal for quick family access.',
          'Integrated SOS alerts with high visibility.'
        ],
        techImpact: 'Redis Pub/Sub + WebSocket broadcasting with session validation.'
      }
    ],
    instructor: [
      {
        id: 'US-IN-01',
        role: 'Instructor',
        action: 'Start operational tracking',
        reason: 'The session performance can be validated and revenue split accurately.',
        ac: [
          'One-click session initiation with student QR scan.',
          'Constant GPS telemetry via foreground mobile service.',
          'Completion summary with geo-fenced ending validation.'
        ],
        techImpact: 'Mobile foreground background telemetry + GeoJSON point persistence.'
      }
    ],
    school: [
      {
        id: 'US-SCH-01',
        role: 'School Owner',
        action: 'Analyze instructor throughput',
        reason: 'I can optimize staffing and maximize school revenue.',
        ac: [
          'Review real-time utilization heatmaps.',
          'Analyze revenue shares for each staff member.',
          'Access automated payout status for consolidated earnings.'
        ],
        techImpact: 'Data aggregation pipelines + Multi-tenant role-based dashboards.'
      }
    ]
  };

  return (
    <div className="flex flex-col gap-10 my-12">
      {stories[type]?.map((s) => (
        <StoryCard key={s.id} {...s} />
      ))}
    </div>
  );
};
