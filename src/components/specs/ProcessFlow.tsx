import React from 'react';
import { ShoppingCart, CreditCard, Play, MapPin, CheckCircle, Wallet } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  status: 'pending' | 'active' | 'completed';
}

const FlowStep: React.FC<Step & { isLast?: boolean }> = ({ id, title, description, icon, status, isLast }) => (
  <div className="flex gap-x-10 relative group">
    {!isLast && (
      <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-slate-100 dark:bg-white/5 transition-colors"></div>
    )}
    
    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all ${
      status === 'completed' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 
      status === 'active' ? 'bg-indigo-600 shadow-lg shadow-indigo-500/20 animate-pulse' : 
      'bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5'
    }`}>
      {React.cloneElement(icon, { 
        className: `size-5 ${status === 'completed' || status === 'active' ? 'text-white' : 'text-slate-400'}` 
      } as React.SVGProps<SVGSVGElement>)}
    </div>
    
    <div className="pb-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest">{id}</span>
        <h4 className="font-display text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h4>
      </div>
      <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export const ProcessFlow: React.FC<{ type: 'booking' | 'session' }> = ({ type }) => {
  const flows: Record<string, Step[]> = {
    booking: [
      { id: 'Phase 1', title: 'Package Marketplace', description: 'Student browses available school packages and chooses a bundle.', icon: <ShoppingCart />, status: 'completed' },
      { id: 'Phase 2', title: 'Payment Collection', description: 'Real-time billing with automated split for fee calculation.', icon: <CreditCard />, status: 'completed' },
      { id: 'Phase 3', title: 'Credit Management', description: 'Allocation of digital credits to the student wallet.', icon: <Wallet />, status: 'active' },
    ],
    session: [
      { id: 'Phase 1', title: 'Operational Start', description: 'Instructor initiates with QR validation for the student booking.', icon: <Play />, status: 'active' },
      { id: 'Phase 2', title: 'Live Telemetry', description: 'Pushing coordinate point data every 5 seconds to the gateway.', icon: <MapPin />, status: 'pending' },
      { id: 'Phase 3', title: 'Final Settlement', description: 'Automatic credit deduction and data persistence.', icon: <CheckCircle />, status: 'pending' },
    ]
  };

  return (
    <div className="p-8 sm:p-12 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-[32px] my-12 max-w-2xl shadow-sm">
      <h3 className="font-display text-[22px] font-bold text-slate-900 dark:text-white mb-10 pb-6 border-b border-slate-100 dark:border-white/5 tracking-tight">
        {type === 'booking' ? 'The Purchase Lifecycle' : 'The Mission Session Flow'}
      </h3>
      <div className="ps-4">
        {flows[type]?.map((s, idx) => (
          <FlowStep key={s.id} {...s} isLast={idx === flows[type].length - 1} />
        ))}
      </div>
    </div>
  );
};
