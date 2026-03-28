import React from 'react';
import { Lock, Key, RefreshCcw, ShieldCheck, LogOut, Terminal } from 'lucide-react';

interface AuthStepProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  isLast?: boolean;
}

const AuthStep: React.FC<AuthStepProps> = ({ id, title, description, icon, isLast }) => (
  <div className="flex gap-x-8 relative group">
    {!isLast && (
      <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-slate-100 dark:bg-white/5 transition-colors"></div>
    )}
    
    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm flex items-center justify-center z-10 group-hover:border-indigo-500/50 transition-all">
      {React.cloneElement(icon, { 
        className: "size-5 text-indigo-600 dark:text-indigo-400" 
      } as React.SVGProps<SVGSVGElement>)}
    </div>
    
    <div className="pb-10">
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest">{id}</span>
        <h4 className="font-display text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h4>
      </div>
      <p className="text-[13px] text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">{description}</p>
    </div>
  </div>
);

export const AuthFlow: React.FC = () => {
  const steps = [
    {
      id: "Step 01",
      title: "Initial Authentication",
      description: "User submits credentials. Server validates and issues a short-lived Access Token (JWT) and a long-lived Refresh Token (Secure HttpOnly cookie).",
      icon: <Lock />
    },
    {
      id: "Step 02",
      title: "Bearer Authorization",
      description: "Client stores Access Token in memory and attaches it to every request header: Authorization: Bearer <token>.",
      icon: <ShieldCheck />
    },
    {
      id: "Step 03",
      title: "Token Expiry & Interception",
      description: "When the Access Token expires (1hr), the server returns 401. Client Axios/Fetch interceptor catches this event.",
      icon: <Terminal />
    },
    {
      id: "Step 04",
      title: "Silent Token Refresh",
      description: "Client calls /auth/refresh. Server verifies the Refresh Token, rotates it if enabled, and issues a fresh Access Token.",
      icon: <RefreshCcw />
    },
    {
      id: "Step 05",
      title: "Session Termination",
      description: "Logout deletes the Refresh Token from the database and clears the secure cookie, preventing any further session extension.",
      icon: <LogOut />
    }
  ];

  return (
    <div className="p-8 sm:p-12 bg-slate-50/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-[48px] my-12 max-w-3xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <Key size={300} strokeWidth={1} />
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="text-white size-6" />
            </div>
            <div>
                <h3 className="font-display text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
                    JWT Lifecycle Protocol
                </h3>
                <p className="text-[13px] text-slate-400 font-medium">Dual-token Security Architecture</p>
            </div>
        </div>

        <div className="ps-2">
            {steps.map((step, idx) => (
            <AuthStep 
                key={step.id} 
                {...step} 
                isLast={idx === steps.length - 1} 
            />
            ))}
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-3xl shadow-sm">
            <div className="flex gap-4 items-start">
                <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                    <Key className="text-amber-500 size-4" />
                </div>
                <div>
                    <h5 className="text-[14px] font-bold text-slate-900 dark:text-white mb-1">Security Best Practice: HttpOnly</h5>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                        "Refresh tokens should NEVER be accessible via JavaScript. Always store them in HttpOnly, Secure, SameSite=Strict cookies to mitigate XSS-based token theft."
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
