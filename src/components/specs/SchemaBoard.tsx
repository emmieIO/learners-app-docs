import React from 'react';
import { Key, Link as LinkIcon, Type, Hash, Calendar, MapPin} from 'lucide-react';

export interface Field {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  description?: string;
}

export interface EntityProps {
  name: string;
  description?: string;
  category: string;
  fields: Field[];
}

const getIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('uuid') || t.includes('bigint')) return <Key className="size-3.5" />;
  if (t.includes('datetime') || t.includes('date')) return <Calendar className="size-3.5" />;
  if (t.includes('decimal') || t.includes('integer') || t.includes('float') || t.includes('number')) return <Hash className="size-3.5" />;
  if (t.includes('point')) return <MapPin className="size-3.5" />;
  return <Type className="size-3.5" />;
};

const EntityCard: React.FC<EntityProps> = ({ name, description, category, fields }) => {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
      <div className="p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 transition-colors">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-display text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">{name}</h3>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-widest">
            {category}
          </span>
        </div>
        {description && <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{description}</p>}
      </div>
      
      <div className="flex-1 overflow-y-auto max-h-[400px] p-2">
        {fields.map((field, idx) => (
          <div key={idx} className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/row`}>
            <div className="flex items-center gap-x-3">
              <span className={`flex-shrink-0 ${field.isPK ? 'text-amber-500' : field.isFK ? 'text-indigo-500' : 'text-slate-300 dark:text-slate-600'}`}>
                {field.isPK ? <Key className="size-3.5" /> : 
                 field.isFK ? <LinkIcon className="size-3.5" /> : 
                 getIcon(field.type)}
              </span>
              <span className={`font-medium ${field.isPK || field.isFK ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                {field.name}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
               {field.description && (
                 <span className="hidden group-hover/row:block text-[9px] text-slate-400 italic truncate max-w-[80px]">
                   {field.description}
                 </span>
               )}
               <span className="text-[9px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                 {field.type}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SchemaBoard: React.FC<{ data: EntityProps[] }> = ({ data }) => {
  return (
    <div className="space-y-10 py-12">
      <div className="max-w-xl">
        <h2 className="font-display text-[28px] font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Relational Schema</h2>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
          The normalization strategy for the Learners platform, detailing entities for Identity, Marketplace, and Real-time Safety.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((entity, idx) => (
          <EntityCard key={idx} {...entity} />
        ))}
      </div>
    </div>
  );
};
