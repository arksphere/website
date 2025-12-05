import { LucideIcon } from 'lucide-react';

export enum ViewState {
  SCENARIO = 'scenario',
  DEVELOPMENT = 'development',
  KUBERNETES = 'kubernetes',
  OPERATIONS = 'operations',
  WALKTHROUGH = 'walkthrough'
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: LucideIcon;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'service' | 'infrastructure' | 'external' | 'user' | 'data';
  x: number;
  y: number;
  description: string;
  techStack?: string;
  status?: 'idle' | 'active' | 'error' | 'thinking';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  active?: boolean;
  dashed?: boolean;
  animated?: boolean; // For particle flow
}

export interface TraceSpan {
  id: string;
  name: string;
  type: 'llm' | 'tool' | 'retrieval' | 'agent';
  startTime: number;
  duration: number;
  status: 'success' | 'error';
  metadata?: Record<string, string | number>;
}

export interface SimulationStep {
  id: number;
  phase: string;
  description: string;
  activeNodes: string[];
  activeEdges: string[]; // "from-to"
  internalState: {
    memory?: string;
    scratchpad?: string;
    toolCall?: string;
    toolOutput?: string;
    stack?: string[];
  };
  chatMessage?: {
    sender: 'user' | 'agent' | 'system';
    text: string;
  };
}