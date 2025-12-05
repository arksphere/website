import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllProjects, getProjectBySlug } from "../src/data/projects-index";
import {
  ArrowRight,
  Layers,
  Cpu,
  Database,
  Activity,
  Users,
  Box,
  Network,
  Server,
  Globe,
} from "lucide-react";

const TEXT = {
  title: "AI Native Stack",
  subtitle:
    "From Semantics to Execution: The complete hierarchy of the Agentic Era.",
  intro:
    "AI Native Infra is the execution substrate for the Agentic Runtime. We map the ecosystem from abstract semantics down to hardware execution.",
};

type ItemLink = { label: string; slug?: string; desc?: string };

const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}> = ({ title, subtitle, icon }) => (
  <div className="flex items-start gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
    {icon && (
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300">
        {icon}
      </div>
    )}
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

const StackCard: React.FC<{
  title: string;
  items: ItemLink[];
  desc?: string;
  color?: string;
  compact?: boolean;
}> = ({
  title,
  items,
  desc,
  color = "bg-gray-100 dark:bg-gray-800",
  compact,
}) => (
  <div
    className={`rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] hover:shadow-md transition-shadow ${
      compact ? "h-full" : ""
    }`}
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
      <div className={`w-2 h-6 rounded-full ${color}`}></div>
      {title}
    </h3>
    {desc && (
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
    )}
    <div className="flex flex-wrap gap-2">
      {items.map((item) =>
        item.slug ? (
          <Link
            key={item.label}
            to={item.slug.startsWith("/") ? item.slug : `/osshub/${item.slug}`}
            className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#252525] text-gray-700 dark:text-gray-300 font-mono border border-gray-200 dark:border-gray-700 hover:border-brand-500/50 hover:text-brand-500 transition-colors flex items-center gap-1"
          >
            {item.label}
          </Link>
        ) : (
          <span
            key={item.label}
            className="px-3 py-1.5 bg-gray-50 dark:bg-[#252525] text-gray-500 dark:text-gray-400 rounded-lg text-xs font-mono border border-gray-200 dark:border-gray-700 cursor-default"
          >
            {item.label}
          </span>
        )
      )}
    </div>
  </div>
);

export const Stack: React.FC = () => {
  const mapSlugs = (slugs: string[]) =>
    slugs.map((s) => {
      const p = getProjectBySlug(s);
      return p
        ? { label: p.title, slug: p.slug }
        : { label: s, slug: undefined };
    });

  // 1. Runtime Layer
  const runtimeSemantics = [
    { label: "Execution Model" },
    { label: "State Management" },
    { label: "Workflow DAG" },
    { label: "Sandboxing" },
  ];
  const runtimeTools = [
    { label: "MCP Server" },
    { label: "MCP Tools" },
    { label: "MCP Hub" },
  ];
  const runtimeRef = [
    { label: "McKinsey ARK", slug: "agents-at-scale-ark" }, // Assuming slug exists or placeholder
    { label: "AutoGPT" },
    { label: "BabyAGI" },
  ];

  // 2. Infra Layer
  const servingItems = mapSlugs(["vllm", "tensorrt-llm", "triton", "lmcache"]);
  const gatewayItems = [
    { label: "LLM Gateway" },
    { label: "OpenAI-Compatible" },
    { label: "Inference Router" },
  ];

  const computeItems = mapSlugs(["ray", "kuberay", "kueue", "volcano"]);
  const computeConcepts = [
    { label: "GPU Scheduling" },
    { label: "Quota & Fairness" },
    { label: "Heterogeneous Cluster" },
  ];

  const controlItems = mapSlugs(["kserve", "seldon-core", "kagent"]);

  const dataPipeline = [
    { label: "RAGFlow", slug: "ragflow" },
    { label: "Unstructured" },
    { label: "LlamaIndex", slug: "llama-index" },
  ];
  const vectorStore = mapSlugs(["milvus", "chroma", "qdrant", "pgvector"]);

  const observabilityItems = mapSlugs([
    "openllmetry",
    "langfuse",
    "arize-phoenix",
  ]);

  // 4. Roles
  const roles = [
    {
      label: "AgentOps Architect",
      slug: "/agentops-architect",
      desc: "Design the end-to-end agentic system.",
    },
    { label: "AI Engineer", desc: "Develop agents and workflows." },
    { label: "Platform Engineer", desc: "Manage the AI Native Infra." },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20 animate-fade-in px-4 sm:px-6">
      <Helmet>
        <title>AI Native Stack - ArkSphere</title>
        <meta
          name="description"
          content="The complete hierarchy of the Agentic Era: From Runtime Semantics to AI Native Infrastructure."
        />
      </Helmet>

      {/* Intro */}
      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {TEXT.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {TEXT.subtitle}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4 max-w-2xl mx-auto">
          {TEXT.intro}
        </p>
      </div>

      {/* Section 1: Runtime Layer (Semantics) */}
      <section>
        <SectionHeader
          title="1. Agentic Runtime (Semantics)"
          subtitle="The abstract definition of how agents think, plan, and act."
          icon={<Box size={24} />}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StackCard
            title="Core Semantics"
            desc="Execution model, state, and workflow definitions."
            color="bg-purple-500"
            items={runtimeSemantics}
          />
          <StackCard
            title="Tooling Layer"
            desc="Model Context Protocol (MCP) and sandbox environments."
            color="bg-purple-500"
            items={runtimeTools}
          />
          <StackCard
            title="Reference Implementations"
            desc="Validating runtime semantics in practice."
            color="bg-purple-500"
            items={runtimeRef}
          />
        </div>
      </section>

      {/* Section 2: AI Native Infra (Execution) */}
      <section>
        <SectionHeader
          title="2. AI Native Infra (Execution)"
          subtitle="The high-performance substrate that powers the runtime."
          icon={<Server size={24} />}
        />

        <div className="space-y-8">
          {/* A. Serving */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pl-2 border-l-2 border-blue-500">
              A. Serving Layer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StackCard
                title="Inference Engines"
                desc="High-throughput LLM serving."
                color="bg-blue-500"
                items={servingItems}
              />
              <StackCard
                title="Gateway & Routing"
                desc="Multi-model routing, fallback, and QoS."
                color="bg-blue-500"
                items={gatewayItems}
              />
            </div>
          </div>

          {/* B. Distributed Compute */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pl-2 border-l-2 border-green-500">
              B. Distributed Compute
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StackCard
                title="Compute Frameworks"
                desc="Ray, KubeRay, and workflow backends."
                color="bg-green-500"
                items={computeItems}
              />
              <StackCard
                title="Scheduling & Placement"
                desc="GPU placement, fairness, and binpacking."
                color="bg-green-500"
                items={computeConcepts}
              />
            </div>
          </div>

          {/* C. Control Plane */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pl-2 border-l-2 border-indigo-500">
              C. Control Plane
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <StackCard
                title="Workload Controllers"
                desc="KServe, Seldon, and autonomous scaling agents."
                color="bg-indigo-500"
                items={controlItems}
              />
            </div>
          </div>

          {/* D. Data Layer */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pl-2 border-l-2 border-orange-500">
              D. Data Layer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StackCard
                title="Retrieval Pipelines"
                desc="RAG pipelines, document ingestion, and transformation."
                color="bg-orange-500"
                items={dataPipeline}
              />
              <StackCard
                title="Vector Store"
                desc="Vector databases and ANN indexing."
                color="bg-orange-500"
                items={vectorStore}
              />
            </div>
          </div>

          {/* E. Observability */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pl-2 border-l-2 border-yellow-500">
              E. Observability
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <StackCard
                title="LLM Observability"
                desc="Tracing, evaluation, and telemetry."
                color="bg-yellow-500"
                items={observabilityItems}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: OSS Hub */}
      <section>
        <SectionHeader
          title="3. OSS Hub (Supply)"
          subtitle="The ecosystem of open source tools and platforms."
          icon={<Globe size={24} />}
        />
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Explore the AI OSS Hub
          </h3>
          <p className="text-gray-400 mb-6">
            A curated collection of the best open source AI tools.
          </p>
          <Link
            to="/osshub"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors"
          >
            Browse OSS Hub <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Section 4: Roles & Practices */}
      <section>
        <SectionHeader
          title="4. Roles & Practices"
          subtitle="Who builds, operates, and architects these systems?"
          icon={<Users size={24} />}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/agentops" className="group block h-full">
            <div className="h-full rounded-xl p-6 border border-brand-500/30 bg-brand-900/10 hover:bg-brand-900/20 transition-colors">
              <h3 className="text-lg font-bold text-brand-400 mb-2 flex items-center gap-2">
                AgentOps Architect{" "}
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </h3>
              <p className="text-sm text-gray-400">
                Design the end-to-end agentic system. Define the runtime
                semantics and infrastructure requirements.
              </p>
            </div>
          </Link>

          <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] opacity-75">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              AI Engineer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Develop agents, workflows, and tools using the runtime primitives.
            </p>
          </div>

          <div className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] opacity-75">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Platform Engineer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage the AI Native Infra, ensuring scalability, reliability, and
              efficiency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
