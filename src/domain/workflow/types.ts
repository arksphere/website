// Domain model for the AI Workflow Builder planning pipeline.
export type UseCaseCategory =
  | "customer_support"
  | "knowledge_assistant"
  | "data_pipeline"
  | "code_assistant"
  | "ai_ops"
  | "multi_agent_orchestration"
  | "other";

export interface UseCaseInput {
  id?: string;
  title: string;
  description: string;
  category?: UseCaseCategory;
  scale: "prototype" | "team" | "enterprise";
  modalities: ("text" | "code" | "image" | "audio" | "video")[];
  latency?: "realtime" | "interactive" | "batch";
  budget?: "low" | "medium" | "high";
  dataSensitivity?: "public" | "internal" | "secret";
  constraints?: string[];
  preferredStacks?: string[];
}

export type CapabilityType =
  | "llm_core"
  | "rag"
  | "tool_use"
  | "workflow_orchestration"
  | "state_management"
  | "sandbox_isolation"
  | "cost_control"
  | "observability"
  | "multi_agent_coordination"
  | "deterministic_execution"
  | "frontend_integration"
  | "auth_governance";

export interface CapabilityNode {
  id: string;
  type: CapabilityType;
  required: boolean;
  description: string;
  priority: 1 | 2 | 3;
  dependsOn: string[];
}

export interface CapabilityGraph {
  useCaseId: string;
  nodes: CapabilityNode[];
}

export type ComponentCategory =
  | "agentic_runtime"
  | "ai_infra_serving"
  | "rag_retrieval"
  | "tooling_mcp"
  | "workflow_engine"
  | "sandbox_runtime"
  | "observability"
  | "frontend_sdk"
  | "auth_governance";

export interface ComponentMeta {
  id: string;
  name: string;
  repoUrl: string;
  homepage?: string;
  category: ComponentCategory;
  supportedCapabilities: CapabilityType[];
  ecosystemScore: number;
  tags: string[];
  license: string;
}

export interface SelectedComponent {
  capability: CapabilityType;
  component: ComponentMeta;
  rationale: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  kind: "service" | "database" | "queue" | "agent" | "gateway" | "frontend";
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  description?: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  input: string;
  output: string;
  implementedBy: string;
  canFail: boolean;
  retryPolicy?: string;
}

export interface WorkflowPlan {
  useCase: UseCaseInput;
  capabilities: CapabilityGraph;
  components: SelectedComponent[];
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    mermaidDefinition: string;
  };
  workflow: {
    steps: WorkflowStep[];
    mermaidDefinition: string;
  };
}

export type TaskType =
  | "backend_api"
  | "service_scaffold"
  | "infra_config"
  | "frontend_component"
  | "integration_test"
  | "observability"
  | "docs";

export interface DevTask {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  relatedNodes: string[];
  acceptanceCriteria: string[];
}

export interface DevPlan {
  workflowPlanId: string;
  tasks: DevTask[];
}

export interface WorkflowPlanRequest {
  useCase: UseCaseInput;
}

export interface WorkflowPlanResponse {
  plan: WorkflowPlan;
  devPlan: DevPlan;
}
