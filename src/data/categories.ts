export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Agentic Runtimes & Frameworks",
    slug: "agentic-runtimes-frameworks",
    description: "Execution and workflow engines for agents as processes. Contracts, state, and orchestration around the runtime.",
    color: "blue",
  },
  {
    name: "AI Native Infra & Serving",
    slug: "ai-native-infra-serving",
    description: "Inference engines, GPU optimization, serving gateways, and distributed compute that power the runtime layer.",
    color: "indigo",
  },
  {
    name: "Orchestration & Scheduling",
    slug: "orchestration-scheduling",
    description: "Schedulers, queues, and control planes that route agent work with guarantees and priorities.",
    color: "orange",
  },
  {
    name: "RAG & Retrieval",
    slug: "rag-retrieval",
    description: "Retrievers, vector stores, rerankers, and pipelines that feed context into agent workflows.",
    color: "purple",
  },
  {
    name: "Observability & Ops",
    slug: "observability-ops",
    description: "Metrics, tracing, evaluation, and interface layers that keep the runtime understandable and debuggable.",
    color: "green",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find((c) => c.slug === slug);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return CATEGORIES.find((c) => c.name === name);
};
