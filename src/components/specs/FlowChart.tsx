import React from 'react';
import { ArrowRight, GitBranch, Circle, Square, Diamond, Play, StopCircle, CheckCircle, XCircle } from 'lucide-react';

interface FlowNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'endpoint' | 'merge';
  label: string;
  description?: string;
  next?: string | { yes?: string; no?: string };
}

interface FlowChartProps {
  title: string;
  description?: string;
  nodes: FlowNode[];
}

const getNodeIcon = (type: FlowNode['type']) => {
  switch (type) {
    case 'start': return <Play className="size-4" />;
    case 'process': return <Square className="size-4" />;
    case 'decision': return <Diamond className="size-4" />;
    case 'endpoint': return <StopCircle className="size-4" />;
    case 'merge': return <GitBranch className="size-4" />;
    default: return <Circle className="size-4" />;
  }
};

const getNodeColor = (type: FlowNode['type']) => {
  const colors: Record<FlowNode['type'], string> = {
    start: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    process: 'bg-blue-50 border-blue-300 text-blue-800',
    decision: 'bg-amber-50 border-amber-300 text-amber-800',
    endpoint: 'bg-gray-100 border-gray-300 text-gray-800',
    merge: 'bg-purple-50 border-purple-300 text-purple-800',
  };
  return colors[type];
};

export const FlowChart: React.FC<FlowChartProps> = ({ title, description, nodes }) => {
  return (
    <div className="border-2 border-gray-300">
      <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50">
        <div className="flex items-center gap-2">
          <GitBranch className="size-4 text-primary" />
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">{title}</h3>
        </div>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </div>

      <div className="p-4">
        <div className="relative">
          <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-300"></div>
          
          <div className="space-y-3">
            {nodes.map((node, idx) => (
              <div key={node.id} className="relative flex items-start gap-3 pl-8">
                <div className={`absolute left-0 top-0 w-6 h-6 flex items-center justify-center border-2 bg-white z-10 ${getNodeColor(node.type)}`}>
                  {getNodeIcon(node.type)}
                </div>

                <div className="flex-1 bg-white border-2 border-gray-300 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono font-bold text-gray-500">{String(idx + 1).padStart(2, '0')}</span>
                    <h4 className="font-bold text-xs text-gray-900 uppercase">{node.label}</h4>
                  </div>
                  {node.description && (
                    <p className="text-xs text-gray-600">{node.description}</p>
                  )}
                  
                  {typeof node.next === 'object' && (
                    <div className="flex gap-2 mt-2">
                      {node.next.yes && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200">
                          <CheckCircle className="size-3 text-emerald-700" />
                          <span className="text-[9px] font-bold text-emerald-800 uppercase">Yes</span>
                        </div>
                      )}
                      {node.next.no && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50 border border-rose-200">
                          <XCircle className="size-3 text-rose-700" />
                          <span className="text-[9px] font-bold text-rose-800 uppercase">No</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {idx < nodes.length - 1 && (
                  <div className="absolute left-2 top-12 text-gray-400">
                    <ArrowRight className="size-3 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 bg-gray-50 border-t-2 border-gray-300">
        <div className="flex flex-wrap gap-2">
          {[
            { type: 'start', label: 'Start' },
            { type: 'process', label: 'Process' },
            { type: 'decision', label: 'Decision' },
            { type: 'endpoint', label: 'End' },
          ].map((item) => (
            <div
              key={item.type}
              className={`inline-flex items-center gap-1.5 px-2 py-1 border-2 ${getNodeColor(item.type as FlowNode['type'])}`}
            >
              {getNodeIcon(item.type as FlowNode['type'])}
              <span className="text-[9px] font-bold uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export type { FlowChartProps, FlowNode };
