import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllProjects, getProjectBySlug } from "../src/data/projects-index";

const TEXT = {
  title: "AI Native Infra",
  subtitle: "The substrate that powers the Agentic Runtime.",
  runtime:
    "Serving layer for the runtime. Inference engines (vLLM, TensorRT-LLM) and accelerators that keep agents fast and efficient.",
  orchestration:
    "Distributed compute and workflow control. Ray, queueing, and orchestration that back the runtime's scheduling layer.",
  infra:
    "Kubernetes-native control plane: KServe, Kueue, and autoscaling to place runtime workloads on GPUs with guarantees.",
  system:
    "System and observability layer. APIs, dashboards, and telemetry to keep runtime and infra understandable.",
  roles: {
    label: "Role in stack",
    runtime: "Infra -> Serving",
    orchestration: "Infra -> Distributed Compute",
    infra: "Infra -> Control Plane",
    system: "Ops -> Observability",
  },
};

const RoleIcon: React.FC<{
  type: "model" | "app" | "platform" | "fullstack";
}> = ({ type }) => {
  const className = "w-4 h-4";
  switch (type) {
    case "model":
      // Chip / AI Icon
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      );
    case "app":
      // Code / Terminal
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      );
    case "platform":
      // Server / Cube
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      );
    case "fullstack":
      // Layout / Window
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      );
  }
};

type ItemLink = { label: string; slug?: string };

const StackCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  color: string;
  items: ItemLink[];
  desc: string;
  role: string;
  roleType: "model" | "app" | "platform" | "fullstack";
  roleLabel: string;
}> = ({ icon, title, color, items, desc, role, roleType, roleLabel }) => (
  <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-8 transition-colors duration-300 hover:shadow-md group">
    <div
      className={`flex-shrink-0 w-20 h-20 rounded-2xl ${color} flex items-center justify-center text-4xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}
    >
      {icon}
    </div>
    <div className="flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>

        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-[#151515] rounded-xl border border-gray-100 dark:border-gray-800 self-start md:self-auto">
          <div className="p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-gray-600 dark:text-gray-300">
            <RoleIcon type={roleType} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-500 font-semibold leading-none mb-1">
              {roleLabel}
            </span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-none">
              {role}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed border-l-4 border-gray-100 dark:border-gray-800 pl-4">
        {desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {items.map((item) =>
          item.slug ? (
            <Link
              key={item.label}
              to={`/osshub/${item.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 font-mono border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              key={item.label}
              className="px-3 py-1.5 bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-mono border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-default"
            >
              {item.label}
            </span>
          )
        )}
      </div>
    </div>
  </div>
);

export const Stack: React.FC = () => {
  const t = TEXT;
  // Manual selection: explicit slugs from src/data/projects (no duplicates)
  const servingSlugs = [
    "vllm",
    "tensorrt-llm",
    "triton",
    "dynamo",
    "lmcache",
    "llm-d",
  ];
  const computeSlugs = [
    "kuberay",
    "openrlhf",
    "verl",
    "llama-factory",
    "minference",
  ];
  const controlSlugs = ["kserve", "seldon-core", "kagent"];
  const observabilitySlugs = [
    "openllmetry",
    "langfuse",
    "lorax",
    "lm-evaluation-harness",
  ];

  const mapSlugs = (slugs: string[]) =>
    slugs.map((s) => {
      const p = getProjectBySlug(s);
      return p
        ? { label: p.title, slug: p.slug }
        : { label: s, slug: undefined };
    });

  const servingItems = useMemo(() => mapSlugs(servingSlugs), []);
  const computeItems = useMemo(() => mapSlugs(computeSlugs), []);
  const controlItems = useMemo(() => mapSlugs(controlSlugs), []);
  const observabilityItems = useMemo(() => mapSlugs(observabilitySlugs), []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      <Helmet>
        <title>AI Native Infra - ArkSphere</title>
        <meta
          name="description"
          content="AI Native Infra that powers the ArkSphere Agentic Runtime: serving, compute, control plane, and observability layers."
        />
      </Helmet>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      <StackCard
        icon={
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        }
        title="Serving Layer"
        color="bg-blue-600"
        desc={t.runtime}
        items={
          servingItems.length
            ? servingItems
            : [
                { label: "vLLM" },
                { label: "TensorRT-LLM" },
                { label: "SGLang" },
                { label: "Ray Serve" },
                { label: "TGI" },
              ]
        }
        role={t.roles.runtime}
        roleType="model"
        roleLabel={t.roles.label}
      />

      <StackCard
        icon={
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        }
        title="Distributed Compute"
        color="bg-green-600"
        desc={t.orchestration}
        items={
          computeItems.length
            ? computeItems
            : [
                { label: "Ray" },
                { label: "Temporal" },
                { label: "LiteLLM" },
                { label: "Batch queues" },
                { label: "GPU schedulers" },
              ]
        }
        role={t.roles.orchestration}
        roleType="app"
        roleLabel={t.roles.label}
      />

      <StackCard
        icon={
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        }
        title="Control Plane"
        color="bg-indigo-600"
        desc={t.infra}
        items={
          controlItems.length
            ? controlItems
            : [
                { label: "KServe" },
                { label: "Kueue" },
                { label: "Volcano" },
                { label: "NVIDIA GPU Operator" },
                { label: "Autoscaler" },
              ]
        }
        role={t.roles.infra}
        roleType="platform"
        roleLabel={t.roles.label}
      />

      <StackCard
        icon={
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        }
        title="Observability & Interfaces"
        color="bg-yellow-600"
        desc={t.system}
        items={
          observabilityItems.length
            ? observabilityItems
            : [
                { label: "OpenTelemetry" },
                { label: "Grafana" },
                { label: "Prometheus" },
                { label: "APIs/UI" },
                { label: "GitOps" },
              ]
        }
        role={t.roles.system}
        roleType="fullstack"
        roleLabel={t.roles.label}
      />
    </div>
  );
};
