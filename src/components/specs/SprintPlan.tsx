import React from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Flag } from 'lucide-react';

export interface SprintTask {
  task: string;
  status: 'completed' | 'in-progress' | 'todo';
}

export interface Sprint {
  id: string;
  title: string;
  description: string;
  tasks: SprintTask[];
}

const StatusIcon: React.FC<{ status: SprintTask['status'] }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="size-4 text-emerald-500" />;
    case 'in-progress':
      return <Clock className="size-4 text-amber-500 animate-pulse" />;
    case 'todo':
      return <Circle className="size-4 text-slate-300 dark:text-slate-600" />;
  }
};

export const SprintPlan: React.FC<{ sprints: Sprint[] }> = ({ sprints }) => {
  return (
    <div className="space-y-8 my-12">
      <div className="max-w-xl">
        <h2 className="font-display text-[28px] font-bold text-slate-900 dark:text-white mb-3 tracking-tight flex items-center gap-3">
          <Calendar className="text-indigo-600 dark:text-indigo-400" />
          Development Roadmap
        </h2>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Phased execution strategy aligned with the PRD milestones and technical dependencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sprints.map((sprint) => (
          <div key={sprint.id} className="bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-widest">
                  {sprint.id}
                </span>
                <Flag className="size-3.5 text-slate-400" />
              </div>
            </div>
            
            <h3 className="font-display text-[18px] font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              {sprint.title}
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {sprint.description}
            </p>

            <div className="mt-auto space-y-3">
              {sprint.tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 py-1 border-t border-slate-50 dark:border-white/5 first:border-0 pt-2 first:pt-0">
                  <StatusIcon status={task.status} />
                  <span className={`text-[13px] ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
