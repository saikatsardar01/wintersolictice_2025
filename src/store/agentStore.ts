import { create } from 'zustand';

type NodeType = 'trigger' | 'action' | 'condition' | 'data';

interface NodeData {
  label: string;
  type: NodeType;
  config?: { [key: string]: any };
  description?: string;
}

interface AgentNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

interface AgentEdge {
  id: string;
  source: string;
  target: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  nodes: AgentNode[];
  edges: AgentEdge[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'paused';
}

interface AgentState {
  agents: Agent[];
  currentAgent: Agent | null;
  
  loadAgents: () => void;
  saveAgent: (agent: Agent) => void;
  deleteAgent: (id: string) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  createNewAgent: () => Agent;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: [],
  currentAgent: null,
  
  loadAgents: () => {
    const stored = localStorage.getItem('agents');
    if (stored) {
      set({ agents: JSON.parse(stored) });
    }
  },
  
  saveAgent: (agent) => {
    const agents = get().agents;
    const existing = agents.findIndex(a => a.id === agent.id);
    
    let newAgents;
    if (existing >= 0) {
      newAgents = [...agents];
      newAgents[existing] = { ...agent, updatedAt: new Date().toISOString() };
    } else {
      newAgents = [...agents, agent];
    }
    
    localStorage.setItem('agents', JSON.stringify(newAgents));
    set({ agents: newAgents });
  },
  
  deleteAgent: (id) => {
    const agents = get().agents.filter(a => a.id !== id);
    localStorage.setItem('agents', JSON.stringify(agents));
    set({ agents });
  },
  
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  
  createNewAgent: () => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}`,
      name: 'Untitled Agent',
      description: '',
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };
    return newAgent;
  }
}));