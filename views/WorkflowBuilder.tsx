import React from "react";
import { Helmet } from "react-helmet-async";
import {
  workflowBuilderResponsibilities,
  workflowBuilderBoundaries,
  workflowBuilderOutputs,
  workflowBuilderPipeline,
  workflowBuilderExports,
  workflowBuilderRepoConventions,
  workflowBuilderDomainModelSnippet,
  workflowBuilderCapabilityAnchors,
} from "../src/data/workflow-builder";

export const WorkflowBuilder: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto pb-20">
      <Helmet>
        <title>AI Workflow Builder - ArkSphere</title>
        <meta
          name="description"
          content="Plan AI apps into capability graphs, stacks, and DevTasks with structured outputs ready for AI coding tools."
        />
      </Helmet>

      {/* Hero */}
      <section className="mt-4 mb-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-900/30 text-sm font-semibold text-blue-700 dark:text-blue-200">
          🤖 AI Workflow Builder
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            From use case to capability graph, stack, and DevTasks
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            Builder keeps a clear domain model and API boundary, emits artefacts that Cursor, Windsurf, Copilot, or Agentic runtimes can execute directly, and reuses OSS Hub metadata for component selection.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#pipeline"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            View pipeline
          </a>
          <a
            href="#domain"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            Inspect domain types
          </a>
          <a
            href="/osshub"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            Back to OSS Hub
          </a>
        </div>
      </section>

      {/* Capability anchors */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Capability anchors
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Prioritized ArkSphere capabilities
          </span>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workflowBuilderCapabilityAnchors.map((capability) => (
            <div
              key={capability.capability}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60"
            >
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase mb-1">
                {capability.capability.replace(/_/g, " ")}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {capability.title}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsibilities / boundaries / outputs */}
      <section className="mb-12 grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Scope & responsibilities
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {workflowBuilderResponsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Boundaries
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {workflowBuilderBoundaries.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Structured artefacts
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {workflowBuilderOutputs.map((item) => (
              <li key={item.title} className="flex flex-col">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </span>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pipeline */}
      <section id="pipeline" className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Planning pipeline
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            /api/workflow/plan stages
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {workflowBuilderPipeline.map((stage, index) => (
            <div
              key={stage.key}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Step {index + 1}
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-200">
                  {stage.outputs.join(" · ")}
                </div>
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mt-1">
                {stage.title}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {stage.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Domain types */}
      <section id="domain" className="mb-12 grid lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Domain model (TypeScript)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                UseCase → CapabilityGraph → WorkflowPlan → DevPlan.
              </p>
            </div>
            <a
              href="https://github.com/arksphere/website/blob/main/src/domain/workflow/types.ts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline"
            >
              Open file
            </a>
          </div>
          <div className="rounded-lg bg-gray-900 text-gray-100 p-4 text-xs overflow-x-auto max-h-80 border border-gray-800">
            <pre className="whitespace-pre">{workflowBuilderDomainModelSnippet}</pre>
          </div>
        </div>
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Export & handoff
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {workflowBuilderExports.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">
            Repository conventions
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {workflowBuilderRepoConventions.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-gray-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/30 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ready to ship /api/workflow/plan?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Use the domain model, pipeline steps, and exports above to wire the backend route and builder UI. Plans stay consumable by AI coding tools.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#domain"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            View types
          </a>
          <a
            href="#pipeline"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Review pipeline
          </a>
        </div>
      </section>
    </div>
  );
};
