import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Cpu,
  Layers,
  Workflow,
  Shield,
  Database,
  Activity,
  GitBranch,
  Box,
  Key,
  Server,
  Brain,
  FileText,
  DollarSign,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";

interface Capability {
  id: string;
  title: string;
  icon: React.ElementType;
  layer: "Runtime Core" | "Enterprise Layer" | "Infra Layer";
  definition: string;
  problems: string[];
  components: string[];
  patterns: string[];
}

const CAPABILITIES: Capability[] = [
  // Runtime Core
  {
    id: "runtime-semantics",
    title: "Runtime Semantics",
    icon: Brain,
    layer: "Runtime Core",
    definition:
      "The fundamental execution model defining how agents perceive time, state, and action.",
    problems: [
      "Inconsistent agent behavior across runs",
      "Lack of deterministic replay",
      "Ambiguous state transitions",
    ],
    components: ["Event Loop", "State Machine", "Time Step Controller"],
    patterns: ["Actor Model", "Finite State Machine (FSM)"],
  },
  {
    id: "tools-registry",
    title: "Tools Registry",
    icon: Box,
    layer: "Runtime Core",
    definition:
      "A centralized catalog of executable capabilities available to agents, with schema validation and access policies.",
    problems: [
      "Tool hallucination",
      "Unsafe tool execution",
      "Discovery of available actions",
    ],
    components: ["OpenAPI Parser", "Schema Validator", "Tool Sandbox"],
    patterns: ["Function Calling", "Plugin Architecture"],
  },
  {
    id: "reasoning-governance",
    title: "Reasoning Governance",
    icon: Shield,
    layer: "Runtime Core",
    definition:
      "Mechanisms to constrain and guide the agent's cognitive process to ensure alignment and safety.",
    problems: [
      "Prompt injection",
      "Unbounded reasoning loops",
      "Policy violation",
    ],
    components: ["Guardrails", "Policy Engine", "Input/Output Filter"],
    patterns: ["Constitutional AI", "Chain of Thought Verification"],
  },
  {
    id: "execution-sandbox",
    title: "Execution Sandbox",
    icon: Cpu,
    layer: "Runtime Core",
    definition:
      "Isolated compute environments for safely running generated code and untrusted tool logic.",
    problems: [
      "System compromise via generated code",
      "Resource exhaustion",
      "Data leakage",
    ],
    components: ["MicroVM / Container", "Network Policy", "Resource Quota"],
    patterns: ["WebAssembly (Wasm)", "Firecracker MicroVMs"],
  },

  // Enterprise Layer
  {
    id: "iam-agents",
    title: "IAM for Agents",
    icon: Key,
    layer: "Enterprise Layer",
    definition:
      "Identity and Access Management specifically designed for autonomous non-human entities.",
    problems: [
      "Agent impersonation",
      "Over-privileged agents",
      "Lack of attribution",
    ],
    components: [
      "Agent Identity Provider",
      "Short-lived Tokens",
      "Permission Scopes",
    ],
    patterns: ["SPIFFE/SPIRE", "OIDC for Machines"],
  },
  {
    id: "model-gateway",
    title: "Model Gateway",
    icon: Server,
    layer: "Enterprise Layer",
    definition:
      "A unified interface for routing, load balancing, and fallback across multiple LLM providers.",
    problems: [
      "Vendor lock-in",
      "Rate limit exhaustion",
      "Inconsistent API surfaces",
    ],
    components: ["Router", "Load Balancer", "Cache", "Rate Limiter"],
    patterns: ["Unified API Gateway", "Semantic Caching"],
  },
  {
    id: "memory-engine",
    title: "Memory Engine",
    icon: Database,
    layer: "Enterprise Layer",
    definition:
      "Systems for managing short-term context, long-term archival, and episodic memory.",
    problems: [
      "Context window overflow",
      "Forgetting critical instructions",
      "Incoherent long-running conversations",
    ],
    components: ["Vector Store", "Key-Value Store", "Graph Database"],
    patterns: ["RAG", "Knowledge Graph"],
  },
  {
    id: "enterprise-rag",
    title: "Enterprise RAG",
    icon: FileText,
    layer: "Enterprise Layer",
    definition:
      "Retrieval-Augmented Generation integrated with enterprise data sources and permission models.",
    problems: [
      "Stale data",
      "Accessing unauthorized documents",
      "Low retrieval relevance",
    ],
    components: ["Document Ingestion Pipeline", "Embedding Model", "Re-ranker"],
    patterns: ["Hybrid Search", "Document Level Security"],
  },
  {
    id: "agent-orchestration",
    title: "Agent Orchestration",
    icon: Workflow,
    layer: "Enterprise Layer",
    definition:
      "Coordinating multi-agent workflows, handoffs, and parallel execution.",
    problems: [
      "Deadlocks between agents",
      "Complex task decomposition",
      "Error propagation",
    ],
    components: ["Workflow Engine", "Message Bus", "State Coordinator"],
    patterns: ["Saga Pattern", "Hierarchical Planning"],
  },
  {
    id: "observability",
    title: "Observability",
    icon: Activity,
    layer: "Enterprise Layer",
    definition:
      "Full-stack visibility into agent execution, from prompt traces to infrastructure metrics.",
    problems: [
      "Black-box failure modes",
      "Difficulty debugging reasoning",
      "Unknown performance bottlenecks",
    ],
    components: ["Distributed Tracer", "Metric Collector", "Log Aggregator"],
    patterns: ["OpenTelemetry", "Semantic Logging"],
  },
  {
    id: "cost-control",
    title: "Cost Control",
    icon: DollarSign,
    layer: "Enterprise Layer",
    definition:
      "Mechanisms to track, attribute, and limit token usage and compute costs.",
    problems: [
      "Runaway costs",
      "Lack of chargeback",
      "Inefficient model usage",
    ],
    components: ["Budget Manager", "Token Counter", "Quota Enforcer"],
    patterns: ["FinOps", "Token Bucket Algorithm"],
  },

  // Infra Layer
  {
    id: "compute-scheduling",
    title: "Compute Scheduling",
    icon: LayoutGrid,
    layer: "Infra Layer",
    definition:
      "Efficient allocation of GPU and CPU resources for agent workloads.",
    problems: [
      "GPU underutilization",
      "High latency for inference",
      "Scaling bottlenecks",
    ],
    components: ["Job Scheduler", "Autoscaler", "Node Pool Manager"],
    patterns: ["Kubernetes Scheduling", "Serverless Functions"],
  },
];

export const Capabilities: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [activeSection, setActiveSection] = useState<string>("");

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Auto-expand the section when scrolling to it
      setExpandedSections((prev) => ({ ...prev, [id]: true }));
      setActiveSection(id);
    }
  };

  // Intersection Observer for Active TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    CAPABILITIES.forEach((cap) => {
      const element = document.getElementById(cap.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in relative">
      <Helmet>
        <title>Agentic Runtime Capabilities - ArkSphere</title>
        <meta
          name="description"
          content="The official ArkSphere 12-block capability model defining the essential primitives of enterprise-grade agent platforms."
        />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-6">
          <Layers size={14} />
          <span>SEMANTIC MODEL SPECIFICATION</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
          Agentic Runtime Capabilities
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The definitive 12-block capability model for enterprise-grade agent
          platforms. This specification defines the standard primitives required
          to build, run, and govern autonomous systems at scale.
        </p>
      </div>

      {/* Capability Map Visualization */}
      <div className="mb-12 p-8 bg-gray-50 dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8 text-center">
          Capability Map
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Runtime Core */}
          <div className="grid grid-cols-4 gap-4">
            {CAPABILITIES.filter((c) => c.layer === "Runtime Core").map((c) => (
              <div
                key={c.id}
                className="bg-blue-600 text-white p-3 rounded-lg text-center text-xs font-bold shadow-lg shadow-blue-600/20"
              >
                {c.title}
              </div>
            ))}
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="h-6 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
          </div>
          {/* Enterprise Layer */}
          <div className="grid grid-cols-4 gap-4">
            {CAPABILITIES.filter((c) => c.layer === "Enterprise Layer")
              .slice(0, 4)
              .map((c) => (
                <div
                  key={c.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg text-center text-xs font-bold text-gray-700 dark:text-gray-200"
                >
                  {c.title}
                </div>
              ))}
            {CAPABILITIES.filter((c) => c.layer === "Enterprise Layer")
              .slice(4)
              .map((c) => (
                <div
                  key={c.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg text-center text-xs font-bold text-gray-700 dark:text-gray-200"
                >
                  {c.title}
                </div>
              ))}
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="h-6 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
          </div>
          {/* Infra Layer */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-800 text-white p-3 rounded-lg text-center text-xs font-bold">
              Compute Scheduling & Infrastructure
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-12 relative">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {CAPABILITIES.map((cap, index) => (
            <section
              key={cap.id}
              id={cap.id}
              className={`scroll-mt-72 rounded-2xl border transition-all duration-300 overflow-hidden ${
                expandedSections[cap.id]
                  ? "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 shadow-lg"
                  : "bg-white dark:bg-[#0a0a0a] border-transparent hover:border-gray-200 dark:hover:border-gray-800"
              }`}
            >
              {/* Header (Always Visible) */}
              <button
                onClick={() => toggleSection(cap.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      expandedSections[cap.id]
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <cap.icon size={20} />
                  </div>
                  <div>
                    <h2
                      className={`text-xl font-bold transition-colors ${
                        expandedSections[cap.id]
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {cap.title}
                    </h2>
                  </div>
                </div>
                {expandedSections[cap.id] ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {expandedSections[cap.id] && (
                <div className="px-6 pb-8 pt-0 border-t border-gray-100 dark:border-gray-800/50 mt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
                    {/* Left Column: Definition & Problems */}
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Definition
                        </h3>
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4">
                          {cap.definition}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Core Problems It Solves
                        </h3>
                        <ul className="space-y-3">
                          {cap.problems.map((prob, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                              <span>{prob}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Components & Patterns */}
                    <div className="space-y-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Required Components
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cap.components.map((comp, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-700 dark:text-gray-300"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Reference Patterns
                        </h3>
                        <ul className="space-y-2">
                          {cap.patterns.map((pat, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <GitBranch size={14} className="text-blue-500" />
                              {pat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Sticky Right TOC */}
        <div className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-48">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 px-3">
              Contents
            </h3>
            <nav className="space-y-1">
              {CAPABILITIES.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => scrollToSection(cap.id)}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeSection === cap.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {cap.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer: Spec & Mission */}
      <div className="mt-32 pt-16 border-t border-gray-200 dark:border-gray-800 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Reference Spec
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For the full technical specification and implementation details,
            please refer to the official documentation.
          </p>
          <a
            href="/specs/agentic-runtime-spec"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-sm hover:underline"
          >
            <span>/specs/agentic-runtime-spec</span>
            <ChevronRight size={14} />
          </a>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            ArkSphere Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            A research-driven community defining the engineering semantics of
            agentic runtime.
            <br />
            <span className="text-gray-500 dark:text-gray-500 italic">
              Never tied to any vendor or implementation.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
