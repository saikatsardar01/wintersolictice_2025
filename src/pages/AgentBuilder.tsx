import React, { useState, useEffect } from 'react';
import { Save, Play, ArrowLeft, Trash2 } from 'lucide-react';
import { Canvas } from '../components/agent-builder/Canvas';
import { NodeLibrary } from '../components/agent-builder/NodeLibrary';
import { PropertiesPanel } from '../components/agent-builder/PropertiesPanel';
import { useCanvasStore } from '../store/canvasStore';
import { useAgentStore } from '../store/agentStore';

interface AgentBuilderProps {
  agentId?: string;
  onBack: () => void;
}

export const AgentBuilder: React.FC<AgentBuilderProps> = ({ agentId, onBack }) => {
  const [agentName, setAgentName] = useState('Untitled Agent');
  const [agentDescription, setAgentDescription] = useState('');
  const { nodes, edges, clearCanvas, setNodes, setEdges } = useCanvasStore();
  const { agents, saveAgent, createNewAgent } = useAgentStore();

  useEffect(() => {
    if (agentId) {
      const agent = agents.find(a => a.id === agentId);
      if (agent) {
        setAgentName(agent.name);
        setAgentDescription(agent.description);
        setNodes(agent.nodes);
        setEdges(agent.edges);
      }
    } else {
      clearCanvas();
      setAgentName('Untitled Agent');
      setAgentDescription('');
    }
  }, [agentId, agents, setNodes, setEdges, clearCanvas]);

  const handleSave = () => {
    const agent = agentId 
      ? agents.find(a => a.id === agentId)!
      : createNewAgent();

    const updatedAgent = {
      ...agent,
      name: agentName,
      description: agentDescription,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    };

    saveAgent(updatedAgent);
    alert('Agent saved successfully!');
  };

  const handleRun = () => {
    console.log('Running agent:', { name: agentName, nodes, edges });
    alert('Agent execution started! (Backend integration coming soon)');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      clearCanvas();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Top Toolbar */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="text-xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
              />
              <input
                type="text"
                value={agentDescription}
                onChange={(e) => setAgentDescription(e.target.value)}
                placeholder="Add description..."
                className="text-sm text-gray-400 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleRun}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run Agent
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-4 flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{nodes.filter(n => n.data.type === 'trigger').length} Triggers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{nodes.filter(n => n.data.type === 'action').length} Actions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>{nodes.filter(n => n.data.type === 'condition').length} Conditions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>{nodes.filter(n => n.data.type === 'data').length} Data Sources</span>
          </div>
          <div className="ml-auto">
            <span>{edges.length} Connections</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <NodeLibrary />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
};