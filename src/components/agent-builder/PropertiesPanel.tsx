// FILE: src/components/agent-builder/PropertiesPanel.tsx

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';

export const PropertiesPanel: React.FC = () => {
  const { selectedNode, updateNode, setSelectedNode } = useCanvasStore();
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
      setDescription(selectedNode.data.description || '');
      setConfig(selectedNode.data.config || {});
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNode) {
      updateNode(selectedNode.id, {
        label,
        description,
        config,
      });
    }
  };

  if (!selectedNode) {
    return (
      <div className="w-80 bg-slate-900 border-l border-slate-700 p-6 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="text-sm">Select a node to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-700 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Properties</h2>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Node Type Badge */}
        <div>
          <span className={`
            inline-block px-3 py-1 rounded-full text-xs font-semibold
            ${selectedNode.data.type === 'trigger' ? 'bg-green-500/20 text-green-400' : ''}
            ${selectedNode.data.type === 'action' ? 'bg-blue-500/20 text-blue-400' : ''}
            ${selectedNode.data.type === 'condition' ? 'bg-yellow-500/20 text-yellow-400' : ''}
            ${selectedNode.data.type === 'data' ? 'bg-purple-500/20 text-purple-400' : ''}
          `}>
            {selectedNode.data.type.toUpperCase()}
          </span>
        </div>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter node label"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter description"
          />
        </div>

        {/* Type-specific config */}
        {selectedNode.data.type === 'trigger' && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Trigger Type
            </label>
            <select
              value={config.triggerType || 'schedule'}
              onChange={(e) => setConfig({ ...config, triggerType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="schedule">Schedule</option>
              <option value="webhook">Webhook</option>
              <option value="email">Email</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        )}

        {selectedNode.data.type === 'action' && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Action Type
            </label>
            <select
              value={config.actionType || 'api_call'}
              onChange={(e) => setConfig({ ...config, actionType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="api_call">API Call</option>
              <option value="email_send">Send Email</option>
              <option value="database_query">Database Query</option>
              <option value="ai_process">AI Process</option>
              <option value="web_scrape">Web Scrape</option>
            </select>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
};