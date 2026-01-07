// FILE: src/components/agent-builder/nodes/CustomNode.tsx

import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap, Play, GitBranch, Database } from 'lucide-react';

// Inline type definitions
type NodeType = 'trigger' | 'action' | 'condition' | 'data';

interface NodeData {
  label: string;
  type: NodeType;
  config?: {
    [key: string]: any;
  };
  description?: string;
  icon?: string;
}

interface CustomNodeProps {
  data: NodeData;
  id: string;
  selected: boolean;
}

const nodeIcons = {
  trigger: Zap,
  action: Play,
  condition: GitBranch,
  data: Database,
};

const nodeColors = {
  trigger: 'from-green-500 to-emerald-600',
  action: 'from-blue-500 to-indigo-600',
  condition: 'from-yellow-500 to-orange-600',
  data: 'from-purple-500 to-pink-600',
};

export const CustomNode: React.FC<CustomNodeProps> = ({ data, id, selected }) => {
  const Icon = nodeIcons[data.type];
  const colorClass = nodeColors[data.type];

  return (
    <div
      className={`
        relative px-4 py-3 min-w-[200px] rounded-xl
        bg-gradient-to-br ${colorClass}
        shadow-lg transition-all duration-200
        ${selected ? 'ring-4 ring-white/50 scale-105' : 'hover:scale-102'}
      `}
    >
      {/* Input Handle */}
      {data.type !== 'trigger' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-white border-2 border-gray-300"
        />
      )}

      {/* Node Content */}
      <div className="flex items-center gap-3 text-white">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs text-white/80 mt-1">{data.description}</div>
          )}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-white border-2 border-gray-300"
      />
    </div>
  );
};