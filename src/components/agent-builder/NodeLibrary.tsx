// FILE: src/components/agent-builder/NodeLibrary.tsx

import React from 'react';
import { Zap, Play, GitBranch, Database, Mail, Calendar, Globe, FileText } from 'lucide-react';

interface NodeTemplate {
  type: 'trigger' | 'action' | 'condition' | 'data';
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    type: 'trigger',
    label: 'Schedule Trigger',
    description: 'Run on a schedule',
    icon: <Calendar className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-green-500 to-emerald-600'
  },
  {
    type: 'trigger',
    label: 'Webhook Trigger',
    description: 'Trigger via HTTP',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-green-500 to-emerald-600'
  },
  {
    type: 'action',
    label: 'Send Email',
    description: 'Send an email',
    icon: <Mail className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    type: 'action',
    label: 'API Call',
    description: 'Call external API',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    type: 'action',
    label: 'AI Process',
    description: 'Process with AI',
    icon: <Play className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    type: 'condition',
    label: 'If/Else',
    description: 'Conditional logic',
    icon: <GitBranch className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-yellow-500 to-orange-600'
  },
  {
    type: 'data',
    label: 'Database Query',
    description: 'Fetch from database',
    icon: <Database className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-purple-500 to-pink-600'
  },
  {
    type: 'data',
    label: 'Get Spreadsheet',
    description: 'Read from sheet',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-gradient-to-br from-purple-500 to-pink-600'
  },
];

export const NodeLibrary: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeTemplate: NodeTemplate) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeTemplate));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-4">Node Library</h2>
      
      <div className="space-y-6">
        {['trigger', 'action', 'condition', 'data'].map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">
              {category}s
            </h3>
            <div className="space-y-2">
              {nodeTemplates
                .filter((template) => template.type === category)
                .map((template, index) => (
                  <div
                    key={`${template.type}-${index}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, template)}
                    className={`
                      ${template.color} 
                      p-3 rounded-lg cursor-move
                      hover:scale-105 transition-transform
                      shadow-lg
                    `}
                  >
                    <div className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        {template.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{template.label}</div>
                        <div className="text-xs text-white/80">{template.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};