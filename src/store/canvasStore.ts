// FILE: src/store/canvasStore.ts

import { create } from 'zustand';

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
  type?: string;
}

interface CanvasState {
  nodes: AgentNode[];
  edges: AgentEdge[];
  selectedNode: AgentNode | null;
  
  addNode: (node: AgentNode) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  deleteNode: (id: string) => void;
  
  addEdge: (edge: AgentEdge) => void;
  deleteEdge: (id: string) => void;
  
  setSelectedNode: (node: AgentNode | null) => void;
  setNodes: (nodes: AgentNode[]) => void;
  setEdges: (edges: AgentEdge[]) => void;
  
  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    )
  })),
  
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    selectedNode: state.selectedNode?.id === id ? null : state.selectedNode
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),
  
  deleteEdge: (id) => set((state) => ({
    edges: state.edges.filter((edge) => edge.id !== id)
  })),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  clearCanvas: () => set({
    nodes: [],
    edges: [],
    selectedNode: null
  })
}));