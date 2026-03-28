import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocPageProps {
  content?: string;
  children?: React.ReactNode;
}

const DocPage: React.FC<DocPageProps> = ({ content, children }) => {
  return (
    <div className="doc-content-wrapper space-y-12">
      {content && (
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-balance" {...props} />,
            h2: ({node, ...props}) => <h2 className="group flex items-center gap-3" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 py-4 px-6 rounded-r-2xl italic text-indigo-900 dark:text-indigo-200" {...props} />
            ),
            table: ({node, ...props}) => (
              <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                <table className="w-full text-sm text-left" {...props} />
              </div>
            ),
            th: ({node, ...props}) => <th className="bg-slate-50 dark:bg-white/5 px-4 py-3 font-bold text-slate-900 dark:text-white" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-3 border-t border-slate-100 dark:border-white/5" {...props} />,
            code: ({node, ...props}) => {
              const isInline = !node?.position?.start.line || node.position.start.line === node.position.end.line;
              return isInline 
                ? <code className="bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-medium" {...props} />
                : <code {...props} />;
            }
          }}
        >
          {content}
        </ReactMarkdown>
      )}
      {children}
    </div>
  );
};

export default DocPage;
