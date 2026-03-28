import React, { useState } from 'react';
import { Smartphone, Code, Copy, Check } from 'lucide-react';

interface UIComponent {
  name: string;
  description: string;
  platform: 'react-native' | 'react-web';
  code: string;
}

interface ScreenMockup {
  screenName: string;
  purpose: string;
  platform: 'react-native' | 'react-web' | 'both';
  components: UIComponent[];
  apiIntegration?: {
    endpoint: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    requestExample?: string;
    responseExample?: string;
  };
}

interface UIScreensProps {
  moduleName: string;
  screens: ScreenMockup[];
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-gray-900 text-gray-100 p-3 text-xs font-mono overflow-x-auto border-2 border-gray-700">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-white"
      >
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      </button>
    </div>
  );
};

const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const config: Record<string, { label: string; color: string }> = {
    'react-native': {
      label: 'React Native',
      color: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    },
    'react-web': {
      label: 'React Web',
      color: 'bg-blue-50 text-blue-800 border-blue-300',
    },
    both: {
      label: 'Both',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    },
  };

  const { label, color } = config[platform] || config['react-web'];

  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 border-2 uppercase ${color}`}>
      {label}
    </span>
  );
};

const ComponentCard: React.FC<{ component: UIComponent }> = ({ component }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-300">
      <div className="px-3 py-2 border-b-2 border-gray-300 bg-gray-50 flex items-center justify-between">
        <h4 className="font-bold text-xs text-gray-900">{component.name}</h4>
        <PlatformBadge platform={component.platform} />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-600 mb-2">{component.description}</p>
        <button
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-xs font-medium"
        >
          <Code className="size-3.5" />
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
        {showCode && (
          <div className="mt-3">
            <CodeBlock code={component.code} />
          </div>
        )}
      </div>
    </div>
  );
};

const APIMockupCard: React.FC<{ api: NonNullable<ScreenMockup['apiIntegration']> }> = ({ api }) => {
  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      POST: 'bg-blue-50 text-blue-800 border-blue-300',
      PATCH: 'bg-amber-50 text-amber-800 border-amber-300',
      DELETE: 'bg-rose-50 text-rose-800 border-rose-300',
    };
    return colors[method] || 'bg-gray-50 text-gray-800 border-gray-300';
  };

  return (
    <div className="bg-gray-50 border-2 border-gray-300 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Code className="size-3.5 text-primary" />
        <h4 className="font-bold text-xs text-gray-900 uppercase">API Integration</h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border-2 uppercase ${getMethodColor(api.method)}`}>
            {api.method}
          </span>
          <span className="text-xs font-mono font-semibold text-gray-900">{api.endpoint}</span>
        </div>

        {api.requestExample && (
          <div>
            <h5 className="text-[9px] font-bold text-gray-700 uppercase mb-1">Request</h5>
            <CodeBlock code={api.requestExample} />
          </div>
        )}

        {api.responseExample && (
          <div>
            <h5 className="text-[9px] font-bold text-gray-700 uppercase mb-1">Response</h5>
            <CodeBlock code={api.responseExample} />
          </div>
        )}
      </div>
    </div>
  );
};

const ScreenCard: React.FC<{ screen: ScreenMockup }> = ({ screen }) => {
  return (
    <div className="bg-white border-2 border-gray-300 mb-4">
      <div className="px-4 py-3 border-b-2 border-gray-300 bg-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-gray-900 uppercase">{screen.screenName}</h3>
          <p className="text-xs text-gray-600 mt-0.5">{screen.purpose}</p>
        </div>
        <PlatformBadge platform={screen.platform} />
      </div>

      <div className="p-4">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
          UI Components
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          {screen.components.map((component, idx) => (
            <ComponentCard key={idx} component={component} />
          ))}
        </div>

        {screen.apiIntegration && (
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
              Backend Integration
            </h4>
            <APIMockupCard api={screen.apiIntegration} />
          </div>
        )}
      </div>
    </div>
  );
};

export const UIScreens: React.FC<UIScreensProps> = ({ moduleName, screens }) => {
  return (
    <div className="space-y-4">
      <div className="border-l-4 border-primary pl-3">
        <div className="flex items-center gap-2 mb-1">
          <Smartphone className="size-4 text-primary" />
          <h2 className="text-base font-bold text-gray-900 uppercase">
            {moduleName} - UI Implementation
          </h2>
        </div>
        <p className="text-xs text-gray-600">
          React Native and React Web screen implementations
        </p>
      </div>

      {screens.map((screen, idx) => (
        <ScreenCard key={idx} screen={screen} />
      ))}
    </div>
  );
};

export type { UIScreensProps, ScreenMockup, UIComponent };
