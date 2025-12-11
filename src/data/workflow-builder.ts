import { CapabilityType } from "../domain/workflow/types";

export const workflowBuilderResponsibilities = [
  "Ingest business-first AI app intents via presets or freeform text.",
  "Reason from use case to capability needs, to component selection, to runtime topology.",
  "Return structured artefacts (capability graph, stack, Mermaid diagrams, Workflow DAG, Dev Plan) ready for AI coding tools.",
];

export const workflowBuilderBoundaries = [
  "No direct deployment or infra provisioning; artifacts stop at plan and topology.",
  "No vendor lock-in; frameworks like LangChain, LangGraph, Dify, AgentOps stay as candidates, not mandates.",
  "Infra automation (Terraform/Helm) is out-of-scope for this entry point but can be layered later.",
];

export const workflowBuilderOutputs = [
  {
    title: "Capability Graph",
    description: "Prioritized capability nodes with dependencies mapped to ArkSphere layers.",
  },
  {
    title: "Tech Stack Recommendation",
    description: "Components mapped to capabilities with rationale and ecosystem score from OSS Hub.",
  },
  {
    title: "Architecture Diagram",
    description: "Mermaid definition plus logical nodes/edges for API, runtime, data, and observability planes.",
  },
  {
    title: "Workflow DAG",
    description: "Step-level flow with bindings to services/agents and retry policy hints.",
  },
  {
    title: "Dev Plan",
    description: "Task list (backend API, scaffolds, infra config, observability, docs) ready for AI coding tools.",
  },
];

export type PipelineStageKey =
  | "useCase"
  | "capabilities"
  | "components"
  | "architecture"
  | "workflow"
  | "devPlan"
  | "response";

export interface PipelineStage {
  key: PipelineStageKey;
  title: string;
  summary: string;
  outputs: string[];
}

export const workflowBuilderPipeline: PipelineStage[] = [
  {
    key: "useCase",
    title: "UseCase parsing & classification",
    summary:
      "Infer UseCaseCategory if missing, normalize constraints, and derive initial capability hints via rules + LLM.",
    outputs: ["UseCaseInput", "CapabilityType[] seeds"],
  },
  {
    key: "capabilities",
    title: "CapabilityGraph construction",
    summary:
      "Generate CapabilityNode list with dependency edges (e.g., rag → llm_core, multi_agent_coordination → workflow_orchestration + state_management).",
    outputs: ["CapabilityGraph"],
  },
  {
    key: "components",
    title: "Component selection",
    summary:
      "Query OSS Hub metadata, filter by constraints/license, rank by ecosystemScore, and pick primary/alternative per capability.",
    outputs: ["SelectedComponent[]"],
  },
  {
    key: "architecture",
    title: "Architecture topology",
    summary:
      "Template + LLM blend to emit service/agent/data/observability nodes and edges plus Mermaid graph.",
    outputs: ["Architecture nodes/edges", "architecture.mermaidDefinition"],
  },
  {
    key: "workflow",
    title: "Workflow DAG",
    summary:
      "Compose ingest/retrieve/plan/act/reflect style steps, bind to services or agents, and emit Mermaid flow.",
    outputs: ["WorkflowStep[]", "workflow.mermaidDefinition"],
  },
  {
    key: "devPlan",
    title: "DevPlan generation",
    summary:
      "Walk architecture + workflow to yield 1–3 actionable DevTask items per critical node, with acceptance criteria.",
    outputs: ["DevPlan.tasks"],
  },
  {
    key: "response",
    title: "Plan response",
    summary: "Bundle WorkflowPlan + DevPlan for downstream AI coding tools or export flows.",
    outputs: ["WorkflowPlanResponse"],
  },
];

export interface CapabilityCard {
  capability: CapabilityType;
  title: string;
  description: string;
}

export const workflowBuilderCapabilityAnchors: CapabilityCard[] = [
  {
    capability: "llm_core",
    title: "LLM Core",
    description: "Model serving and prompt safety foundation.",
  },
  {
    capability: "rag",
    title: "RAG & Retrieval",
    description: "Chunking, indexing, retrieval, and routing choices.",
  },
  {
    capability: "workflow_orchestration",
    title: "Workflow Orchestration",
    description: "Deterministic planning with hooks for agents and tools.",
  },
  {
    capability: "sandbox_isolation",
    title: "Sandbox & Safety",
    description: "Execution isolation for tools, evaluation, and rollout.",
  },
  {
    capability: "observability",
    title: "Observability",
    description: "Tracing and cost monitors aligned with runtime topology.",
  },
  {
    capability: "frontend_integration",
    title: "Frontend Integration",
    description: "SDK/adapter guidance for client delivery.",
  },
];

export const workflowBuilderExports = [
  "JSON export: WorkflowPlan + DevPlan (save to plans/workflow-plan-*.json).",
  "Markdown export: architecture + workflow narrative plus Mermaid blocks.",
  "Mermaid export: standalone mermaidDefinition for architecture/workflow.",
  "OpenAPI / JSON Schema for /api/workflow/plan to auto-generate clients.",
];

export const workflowBuilderRepoConventions = [
  "Domain types live in src/domain/workflow/types.ts.",
  "Future backend entrypoint: src/app/api/workflow/plan/route.ts.",
  "Frontend builder components: src/components/workflow-builder/.",
  "Persisted plans: plans/workflow-plan-*.json for AI coding tools to consume.",
];

export const workflowBuilderDomainModelSnippet = String.raw`export type UseCaseCategory =
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

export interface DevTask {
  id: string;
  type:
    | "backend_api"
    | "service_scaffold"
    | "infra_config"
    | "frontend_component"
    | "integration_test"
    | "observability"
    | "docs";
  title: string;
  description: string;
  relatedNodes: string[];
  acceptanceCriteria: string[];
}

export interface WorkflowPlanResponse {
  plan: WorkflowPlan;
  devPlan: DevPlan;
}`;
