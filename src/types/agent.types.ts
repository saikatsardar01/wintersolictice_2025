export type NodeType = 'trigger' | 'action' | 'condition' | 'data';

export interface NodeData {
  label: string;
  type: NodeType;
  config?: {
    [key: string]: any;
  };
  description?: string;
  icon?: string;
}

export interface AgentNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface AgentEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}