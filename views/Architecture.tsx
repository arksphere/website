import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ArksDiagram } from "../components/ArksDiagram";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT = {
  title: "Agentic Runtime",
  desc: "Run and orchestrate AI agents as first-class engineering entities. Execution, scheduling, state, and observability in one runtime layer.",
  section1: "Core Components",
  flow: [
    "Execution Engine: Runs prompts, tools, and model calls with observability hooks.",
    "Orchestrator: Graph-based workflows (LangGraph) with stateful turns and contracts.",
    "Scheduler: Queues, priorities, and rate limits to keep agent workloads predictable.",
    "State & Logs: Durable events and replayable state for agents as processes.",
    "Observability: Metrics, traces, and audits for every action in the agent loop.",
  ],
  section2: "Lifecycle & Integrations",
  ops: [
    "Lifecycle: PLAN -> ACT -> OBSERVE -> UPDATE STATE -> LOOP / EXIT. Agents behave like long-lived processes, not fire-and-forget calls.",
    "Infra Integration: Kubernetes, Ray, and KServe power serving, autoscaling, and distributed compute for runtime workloads.",
    "OSS Integration: LangGraph, RAGFlow, and toolchains plug into the runtime with clear positions in the stack.",
  ],
};

export const Architecture: React.FC = () => {
  const t = TEXT;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".arch-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Diagram Animation
      gsap.from(".arch-diagram", {
        scrollTrigger: {
          trigger: ".arch-diagram",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0.98,
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Staggered Lists
      gsap.from(".role-item", {
        scrollTrigger: {
          trigger: ".role-list",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".interaction-item", {
        scrollTrigger: {
          trigger: ".interaction-list",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-5xl mx-auto space-y-12 pb-20 animate-fade-in"
    >
      <Helmet>
        <title>Agentic Runtime - ArkSphere</title>
        <meta
          name="description"
          content="Run and orchestrate AI agents as first-class engineering entities. Execution, scheduling, observability, and integrations in the ArkSphere Agentic Runtime."
        />
      </Helmet>
      <div className="space-y-4 arch-header max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.desc}
        </p>
      </div>

      {/* Capabilities Info Card */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Agentic Runtime Capabilities
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            A unified capability model defining the essential primitives of
            enterprise-grade agent platforms.
          </p>
        </div>
        <a
          href="/architecture/capabilities"
          className="px-5 py-2.5 bg-white dark:bg-blue-600 text-blue-600 dark:text-white font-medium text-sm rounded-lg shadow-sm border border-gray-200 dark:border-blue-500 hover:bg-gray-50 dark:hover:bg-blue-500 transition-colors whitespace-nowrap"
        >
          Explore Capabilities
        </a>
      </div>

      {/* Diagram Section - Full Width */}
      <div className="arch-diagram w-full bg-white dark:bg-[#0a0a0a] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <ArksDiagram />
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 mt-12 px-2">
        <div className="space-y-8 role-list">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm">
              01
            </span>
            {t.section1}
          </h3>
          <ul className="space-y-6">
            {t.flow.map((item, i) => {
              const parts = item.split(":");
              const title = parts[0];
              const desc = parts.slice(1).join(":");

              return (
                <li
                  key={i}
                  className="role-item relative pl-6 border-l-2 border-gray-200 dark:border-gray-800"
                >
                  <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {desc || item}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-8 interaction-list">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center text-sm">
              02
            </span>
            {t.section2}
          </h3>
          <ul className="space-y-6">
            {t.ops.map((item, i) => {
              const parts = item.split(":");
              const title = parts[0];
              const desc = parts.slice(1).join(":");

              return (
                <li
                  key={i}
                  className="interaction-item relative pl-6 border-l-2 border-gray-200 dark:border-gray-800"
                >
                  <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {desc || item}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
