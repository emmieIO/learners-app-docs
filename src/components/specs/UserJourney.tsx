import React from 'react';
import { User, Smartphone, CheckCircle, MessageCircle } from 'lucide-react';

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  actor: 'student' | 'instructor' | 'school' | 'admin' | 'system';
  ui?: {
    screen: string;
    component: 'React Native' | 'React Web';
    description: string;
  };
  api?: {
    endpoint: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    description: string;
  };
}

interface UserJourneyProps {
  title: string;
  description?: string;
  steps: JourneyStep[];
  platform?: 'mobile' | 'web' | 'both';
}

const getActorColor = (actor: string) => {
  const colors: Record<string, string> = {
    student: 'bg-blue-50 text-blue-800 border-blue-300',
    instructor: 'bg-amber-50 text-amber-800 border-amber-300',
    school: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    admin: 'bg-rose-50 text-rose-800 border-rose-300',
    system: 'bg-gray-50 text-gray-800 border-gray-300',
  };
  return colors[actor] || colors.system;
};

const getActorLabel = (actor: string) => {
  const labels: Record<string, string> = {
    student: 'Student',
    instructor: 'Instructor',
    school: 'School',
    admin: 'Admin',
    system: 'System',
  };
  return labels[actor] || actor;
};

const getMethodColor = (method: string) => {
  const colors: Record<string, string> = {
    GET: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    POST: 'bg-blue-50 text-blue-800 border-blue-300',
    PATCH: 'bg-amber-50 text-amber-800 border-amber-300',
    DELETE: 'bg-rose-50 text-rose-800 border-rose-300',
  };
  return colors[method] || 'bg-gray-50 text-gray-800 border-gray-300';
};

export const UserJourney: React.FC<UserJourneyProps> = ({ title, description, steps }) => {
  return (
    <div className="border-2 border-gray-300">
      <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50">
        <div className="flex items-center gap-2">
          <User className="size-4 text-primary" />
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">{title}</h3>
        </div>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={step.id} className="bg-white border-2 border-gray-300">
              <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold text-gray-500">STEP {String(idx + 1).padStart(2, '0')}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 border-2 uppercase ${getActorColor(step.actor)}`}>
                    {getActorLabel(step.actor)}
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <h4 className="font-bold text-sm text-gray-900">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>

                {step.ui && (
                  <div className="bg-blue-50 border-2 border-blue-200 p-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Smartphone className="size-3 text-blue-800" />
                      <span className="text-[9px] font-bold text-blue-900 uppercase">{step.ui.component}</span>
                    </div>
                    <p className="text-xs font-semibold text-blue-900">{step.ui.screen}</p>
                    <p className="text-xs text-blue-700">{step.ui.description}</p>
                  </div>
                )}

                {step.api && (
                  <div className="bg-gray-50 border-2 border-gray-300 p-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageCircle className="size-3 text-gray-600" />
                      <span className="text-[9px] font-bold text-gray-700 uppercase">API Request</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border-2 uppercase ${getMethodColor(step.api.method)}`}>
                        {step.api.method}
                      </span>
                      <span className="text-xs font-mono text-gray-900">{step.api.endpoint}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{step.api.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-emerald-50 border-2 border-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-emerald-700" />
            <p className="text-xs font-bold text-emerald-900 uppercase">Journey Complete</p>
          </div>
          <p className="text-xs text-emerald-700 mt-1">User successfully completes this flow</p>
        </div>
      </div>
    </div>
  );
};

export type { UserJourneyProps, JourneyStep };
