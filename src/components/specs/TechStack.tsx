import React from 'react';
import { Server, Smartphone, Globe, Database, ShieldCheck, Zap, ShieldAlert, Cpu } from 'lucide-react';

interface TechItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  color: string;
}

const TechCard: React.FC<TechItem> = ({ icon, title, description, category, color }) => (
  <div className="p-6 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-[24px] hover:shadow-md transition-all flex flex-col group">
    <div className={`p-2.5 w-12 h-12 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
      {icon}
    </div>
    <div className="mb-4">
      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{category}</span>
      <h3 className="font-display text-[18px] font-bold text-slate-900 dark:text-white mt-1 tracking-tight">{title}</h3>
    </div>
    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const TechStack: React.FC = () => {
  const stack: TechItem[] = [
    {
      icon: <Server className="size-6 text-rose-600 dark:text-rose-400" />,
      title: 'NestJS Framework',
      description: 'Typed API with modular structure for scalability and safe Dependency Injection.',
      category: 'Backend Architecture',
      color: 'bg-rose-50 dark:bg-rose-500/10'
    },
    {
      icon: <Database className="size-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'PostgreSQL',
      description: 'Relational database providing high ACID consistency across core marketplace transactions.',
      category: 'Data Persistence',
      color: 'bg-indigo-50 dark:bg-indigo-500/10'
    },
    {
      icon: <Zap className="size-6 text-amber-600 dark:text-amber-400" />,
      title: 'Socket.io',
      description: 'Real-time bidirectional communication for live instructor tracking and SOS alerts.',
      category: 'Real-time Transport',
      color: 'bg-amber-50 dark:bg-amber-500/10'
    },
    {
      icon: <Smartphone className="size-6 text-blue-600 dark:text-blue-400" />,
      title: 'React Native',
      description: 'Shared-codebase mobile experience for Students and Instructors across iOS & Android.',
      category: 'Cross-platform Mobile',
      color: 'bg-blue-50 dark:bg-blue-500/10'
    },
    {
      icon: <Globe className="size-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'React Web',
      description: 'Vite-powered single-page application for sophisticated School management dashboards.',
      category: 'Web Interface',
      color: 'bg-emerald-50 dark:bg-emerald-500/10'
    },
    {
      icon: <ShieldCheck className="size-6 text-violet-600 dark:text-violet-400" />,
      title: 'Stripe Connect',
      description: 'Full-stack financial ledger for multi-party settlement and automated revenue allocation.',
      category: 'Financial Settlement',
      color: 'bg-violet-50 dark:bg-violet-500/10'
    }
  ];

  return (
    <section className="space-y-12 py-12">
      <div className="max-w-xl">
        <h2 className="font-display text-[28px] font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Technical Architecture</h2>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Operational infrastructure built for low-latency telemetry and high-integrity financial operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stack.map((item, idx) => (
          <TechCard key={idx} {...item} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-slate-50/50 dark:bg-white/5 p-8 rounded-[32px] border border-slate-200/60 dark:border-white/10">
           <Cpu className="size-8 text-indigo-600 dark:text-indigo-400 mb-6" />
           <h4 className="font-display text-[20px] font-bold text-slate-900 dark:text-white mb-3">Modular Logic Strategy</h4>
           <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
             Common Data Types shared via a unified monorepo to ensure consistency between Native and Web clients.
           </p>
           <div className="flex flex-wrap gap-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
             <span className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-full">Typescript Core</span>
             <span className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-full">Shared DTOS</span>
             <span className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-full">GeoJSON Standards</span>
           </div>
        </div>
        <div className="bg-slate-50/50 dark:bg-white/5 p-8 rounded-[32px] border border-slate-200/60 dark:border-white/10">
           <ShieldAlert className="size-8 text-rose-600 dark:text-rose-400 mb-6" />
           <h4 className="font-display text-[20px] font-bold text-slate-900 dark:text-white mb-3">Multi-Tenant Isolation</h4>
           <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
             Hard boundaries using NestJS Guards and PostgreSQL Row Level Security to protect school-specific data.
           </p>
           <div className="flex flex-wrap gap-2 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">
             <span className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-full">SCHOOL_OWNER</span>
             <span className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-full">STAFF_INSTRUCTOR</span>
             <span className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-full">SYSTEM_ADMIN</span>
           </div>
        </div>
      </div>
    </section>
  );
};
