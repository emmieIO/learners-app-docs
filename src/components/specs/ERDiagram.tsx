import React from 'react';
import { Database, Key, Link as LinkIcon, Type, Calendar, Hash, MapPin, Shield } from 'lucide-react';

export interface ERField {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  isUnique?: boolean;
  isNullable?: boolean;
  description?: string;
}

export interface EREntity {
  name: string;
  description: string;
  category: 'auth' | 'user' | 'school' | 'booking' | 'payment' | 'tracking' | 'admin';
  fields: ERField[];
}

export interface ERRelationship {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  label?: string;
}

interface ERDiagramProps {
  entities: EREntity[];
  relationships?: ERRelationship[];
  title?: string;
  description?: string;
}

const getTypeIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('uuid') || t.includes('bigint')) return <Key className="size-3" />;
  if (t.includes('datetime') || t.includes('date') || t.includes('timestamp')) return <Calendar className="size-3" />;
  if (t.includes('decimal') || t.includes('integer') || t.includes('float') || t.includes('number') || t.includes('boolean')) return <Hash className="size-3" />;
  if (t.includes('point') || t.includes('lat') || t.includes('lng') || t.includes('location')) return <MapPin className="size-3" />;
  return <Type className="size-3" />;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    auth: 'bg-rose-50 text-rose-800 border-rose-300',
    user: 'bg-blue-50 text-blue-800 border-blue-300',
    school: 'bg-amber-50 text-amber-800 border-amber-300',
    booking: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    payment: 'bg-green-50 text-green-800 border-green-300',
    tracking: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    admin: 'bg-purple-50 text-purple-800 border-purple-300',
  };
  return colors[category] || 'bg-gray-50 text-gray-800 border-gray-300';
};

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    auth: 'Authentication',
    user: 'User Profile',
    school: 'School',
    booking: 'Booking',
    payment: 'Payment',
    tracking: 'Tracking',
    admin: 'Admin',
  };
  return labels[category] || category;
};

const EntityTable: React.FC<{ entity: EREntity }> = ({ entity }) => {
  return (
    <div className="bg-white border-2 border-gray-300">
      <div className="px-3 py-2 border-b-2 border-gray-300 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="size-4 text-gray-600" />
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wide">
              {entity.name}
            </h3>
          </div>
          <span className={`text-[9px] font-bold px-2 py-0.5 border-2 uppercase tracking-wider ${getCategoryColor(entity.category)}`}>
            {getCategoryLabel(entity.category)}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {entity.description}
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {entity.fields.map((field, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3 py-1.5 text-xs"
          >
            <div className="flex items-center gap-x-2">
              <span
                className={`flex-shrink-0 ${
                  field.isPK
                    ? 'text-amber-700'
                    : field.isFK
                    ? 'text-blue-700'
                    : 'text-gray-300'
                }`}
              >
                {field.isPK ? (
                  <Key className="size-3" />
                ) : field.isFK ? (
                  <LinkIcon className="size-3" />
                ) : (
                  getTypeIcon(field.type)
                )}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-medium ${
                    field.isPK || field.isFK
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  {field.name}
                </span>
                {field.isUnique && (
                  <Shield className="size-2.5 text-emerald-700" />
                )}
              </div>
            </div>
            <span className="text-[9px] font-mono font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 border border-gray-300 uppercase">
              {field.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ERDiagram: React.FC<ERDiagramProps> = ({
  entities,
  relationships,
  title = 'Entity Relationship Diagram',
  description,
}) => {
  const groupedEntities = entities.reduce((acc, entity) => {
    if (!acc[entity.category]) {
      acc[entity.category] = [];
    }
    acc[entity.category].push(entity);
    return acc;
  }, {} as Record<string, EREntity[]>);

  return (
    <div className="space-y-4">
      <div className="border-l-4 border-primary pl-3">
        <div className="flex items-center gap-2 mb-1">
          <Database className="size-4 text-primary" />
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-xs text-gray-600">
            {description}
          </p>
        )}
      </div>

      {relationships && relationships.length > 0 && (
        <div className="bg-gray-50 border-2 border-gray-300 p-3">
          <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-2 flex items-center gap-2">
            <LinkIcon className="size-3.5 text-primary" />
            Key Relationships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {relationships.map((rel, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs bg-white px-2.5 py-1.5 border-2 border-gray-300"
              >
                <span className="font-mono font-semibold text-gray-900">
                  {rel.from}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-blue-800 px-1.5 py-0.5 bg-blue-50 border border-blue-200">
                  {rel.type.replace('-', ' ')}
                </span>
                <span className="font-mono font-semibold text-gray-900">
                  {rel.to}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.entries(groupedEntities).map(([category, categoryEntities]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-300 pb-1">
            {getCategoryLabel(category)} Tables
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {categoryEntities.map((entity, idx) => (
              <EntityTable key={idx} entity={entity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export type { ERDiagramProps };
