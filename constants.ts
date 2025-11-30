import { View, NavItem, OssProject } from './types';

export const NAV_LABELS: Record<string, string> = {
  Overview: 'Overview',
  AgentRuntime: 'Agent Runtime',
  AiInfra: 'AI Native Infra',
  OssHub: 'AI OSS Hub',
  Community: 'Community'
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', view: View.OVERVIEW },
  { label: 'AgentRuntime', view: View.AGENT_RUNTIME },
  { label: 'AiInfra', view: View.AI_INFRA },
  { label: 'OssHub', view: View.OSS_HUB },
  { label: 'Community', view: View.COMMUNITY },
];

export const OSS_PROJECTS: OssProject[] = [
  {
    name: "vLLM",
    description: "High-throughput inference that powers the execution layer of the Agent Runtime.",
    tags: ["Inference", "Serving", "CUDA"],
    stars: "28k+",
    url: "https://github.com/vllm-project/vllm",
    category: "AI Native Infra & Serving",
    roleInStack: "Infra -> Serving"
  },
  {
    name: "LangGraph",
    description: "Stateful agent workflows with explicit graphs and durable state.",
    tags: ["Agent", "Workflow"],
    stars: "5k+",
    url: "https://github.com/langchain-ai/langgraph",
    category: "Agent Runtimes & Frameworks",
    roleInStack: "Runtime -> Workflows"
  },
  {
    name: "KServe",
    description: "Standardized serverless inference on Kubernetes for runtimes and models.",
    tags: ["Kubernetes", "Serving"],
    stars: "3k+",
    url: "https://github.com/kserve/kserve",
    category: "AI Native Infra & Serving",
    roleInStack: "Infra -> Serving Gateway"
  },
  {
    name: "Ray",
    description: "Distributed compute substrate for scaling inference, tools, and workflows.",
    tags: ["Distributed", "Compute"],
    stars: "32k+",
    url: "https://github.com/ray-project/ray",
    category: "Orchestration & Scheduling",
    roleInStack: "Infra -> Distributed Compute"
  },
  {
    name: "SGLang",
    description: "Structured generation runtime optimized for agent-style prompts and tool use.",
    tags: ["Inference", "Serving"],
    stars: "2.5k+",
    url: "https://github.com/sgl-project/sglang",
    category: "AI Native Infra & Serving",
    roleInStack: "Infra -> Inference Engine"
  },
  {
    name: "Dify",
    description: "LLM application builder that can target the Agent Runtime for execution.",
    tags: ["Platform", "Agent"],
    stars: "40k+",
    url: "https://github.com/langgenius/dify",
    category: "Agent Runtimes & Frameworks",
    roleInStack: "Hub -> Application Layer"
  },
  {
    name: "Open WebUI",
    description: "Interface layer for interacting with deployed agents and runtimes.",
    tags: ["UI", "Chat"],
    stars: "30k+",
    url: "https://github.com/open-webui/open-webui",
    category: "Observability & Ops",
    roleInStack: "Ops -> Interface"
  },
  {
    name: "Ragas",
    description: "Evaluation toolkit for RAG-heavy agents and retrieval steps.",
    tags: ["Evaluation", "RAG"],
    stars: "8k+",
    url: "https://github.com/explodinggradients/ragas",
    category: "RAG & Retrieval",
    roleInStack: "Ops -> Evaluation"
  },
  {
    name: "TensorRT-LLM",
    description: "GPU-optimized inference kernels that accelerate the runtime serving layer.",
    tags: ["Inference", "NVIDIA"],
    stars: "9k+",
    url: "https://github.com/NVIDIA/TensorRT-LLM",
    category: "AI Native Infra & Serving",
    roleInStack: "Infra -> GPU Optimization"
  }
];



export const SYSTEM_INFO = `
ArkSphere is an Agent Runtime plus the AI Native Infra that powers it, with an OSS Hub that catalogs the ecosystem.
- Agent Runtime: execution, scheduling, state, and observability for agents as engineering entities.
- AI Native Infra: GPU serving, orchestration, distributed systems (vLLM, TensorRT-LLM, Ray, KServe, Kubernetes).
- OSS Hub: curated projects with their position in the runtime and infra stack.
`;
