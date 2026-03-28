import React, { useState } from 'react';
import { Terminal, ShieldCheck, Zap, Copy, Check } from 'lucide-react';

export interface Endpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  description: string;
  params?: string;
  requestExample?: string;
  responseExample?: string;
  auth?: boolean;
}

const MethodBadge: React.FC<{ method: string }> = ({ method }) => {
  const colors: Record<string, string> = {
    GET: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    POST: 'bg-blue-50 text-blue-800 border-blue-300',
    PATCH: 'bg-amber-50 text-amber-800 border-amber-300',
    DELETE: 'bg-rose-50 text-rose-800 border-rose-300',
    PUT: 'bg-indigo-50 text-indigo-800 border-indigo-300',
  };
  return (
    <span className={`px-1.5 py-0.5 font-mono text-[9px] font-bold border-2 uppercase ${colors[method] || 'bg-gray-50 text-gray-700 border-gray-300'}`}>
      {method}
    </span>
  );
};

const CodeBlock: React.FC<{ code: string; label?: string }> = ({ code, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-2">
      {label && <p className="text-[9px] font-bold text-gray-700 uppercase mb-1">{label}</p>}
      <pre className="bg-gray-900 text-gray-100 p-3 text-xs font-mono overflow-x-auto border-2 border-gray-700 rounded-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-6 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-white text-[9px] uppercase font-bold"
        title="Copy to clipboard"
      >
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      </button>
    </div>
  );
};

const ApiSpec: React.FC<{ title: string; endpoints: Endpoint[] }> = ({ title, endpoints }) => {
  const [expandedEndpoint, setExpandedEndpoint] = useState<number | null>(null);

  return (
    <div className="border-2 border-gray-300 shadow-sm">
      <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-x-2">
          <Terminal className="size-4 text-blue-900" />
          <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wide">{title}</h3>
        </div>
        <div className="flex items-center gap-x-1.5 px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 text-[9px] font-bold uppercase tracking-wider">
          <ShieldCheck className="size-3" />
          API Specification
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="p-3 pl-4 text-[10px] font-bold text-gray-700 uppercase tracking-wider">Method & Path</th>
              <th className="p-4 text-[10px] font-bold text-gray-700 uppercase tracking-wider">Description</th>
              <th className="p-3 pr-4 text-[10px] font-bold text-gray-700 uppercase tracking-wider text-right">Auth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {endpoints.map((ep, idx) => (
              <React.Fragment key={idx}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer ${expandedEndpoint === idx ? 'bg-blue-50' : ''}`}
                  onClick={() => setExpandedEndpoint(expandedEndpoint === idx ? null : idx)}
                >
                  <td className="p-3 pl-4">
                    <div className="flex items-center gap-x-2 mb-1">
                      <MethodBadge method={ep.method} />
                      <span className="font-mono text-xs font-semibold text-gray-900">{ep.path}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-700">{ep.description}</td>
                  <td className="p-3 pr-4 text-right">
                    {ep.auth ? (
                      <div className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 bg-emerald-50 border border-emerald-200">
                        <ShieldCheck className="size-3" />
                        Required
                      </div>
                    ) : (
                      <span className="text-gray-400 font-semibold text-[9px] uppercase tracking-wider">Public</span>
                    )}
                  </td>
                </tr>
                {expandedEndpoint === idx && (ep.requestExample || ep.responseExample || ep.params) && (
                  <tr>
                    <td colSpan={3} className="p-4 bg-gray-50 border-b-2 border-gray-300">
                      <div className="space-y-3">
                        {ep.params && (
                          <div>
                            <p className="text-[9px] font-bold text-gray-700 uppercase mb-1">Parameters</p>
                            <p className="text-xs text-gray-700 font-mono bg-white border border-gray-300 p-2">{ep.params}</p>
                          </div>
                        )}
                        {ep.requestExample && (
                          <CodeBlock code={ep.requestExample} label="Request Body" />
                        )}
                        {ep.responseExample && (
                          <CodeBlock code={ep.responseExample} label="Response" />
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t-2 border-gray-300">
        <div className="flex items-start gap-3">
          <Zap className="size-4 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Implementation Requirements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                <div className="size-1.5 bg-emerald-600"></div>
                CRUD Operations with ORM integration
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                <div className="size-1.5 bg-emerald-600"></div>
                Request validation & type-safe responses
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                <div className="size-1.5 bg-emerald-600"></div>
                API Documentation (Swagger/OpenAPI)
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                <div className="size-1.5 bg-emerald-600"></div>
                Test coverage (&gt; 80%) for service logic
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ApiSpec };
