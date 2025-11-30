import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { View } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faRocket,
  faServer,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

interface OverviewProps {
  onChangeView: (view: View) => void;
  theme: "light" | "dark";
}

const TEXT = {
  label: "AGENT RUNTIME · ARKSPHERE",
  heroTitle: "Build AI Systems Together",
  subtitle: "A system we develop, verify, and evolve collectively.",
  ctaStart: "Explore Agent Runtime",
  ctaArch: "Explore OSS Hub",
  stackSummary: "Runtime · Infra · OSS hub.",
  hubSummary: "Runtime, infra, and OSS mapped into one concise catalog.",
};

const problemBullets = [
  "LLM calls → agent processes",
  "Scripts → schedulable workflows",
  "Black-box runs → observable systems",
];

const personas = [
  {
    title: "Runtime + Infra builders",
    bullets: ["Operating GPUs and clusters", "Predictable agent workloads"],
  },
  {
    title: "Agent workflow + serving contributors",
    bullets: ["Production-grade agents", "Scheduling + observability"],
  },
  {
    title: "OSS Hub maintainers + reviewers",
    bullets: ["Integrating runtimes & workflows", "Clear role in the stack"],
  },
];

const MotionKeyframes: React.FC = () => (
  <style>{`
    @keyframes pulseLine { 0% { opacity: 0.2; } 50% { opacity: 0.9; } 100% { opacity: 0.2; } }
    @keyframes flowDot { 0% { transform: translateX(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
    @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes bounceSmall { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes growBar { 0% { height: 20%; } 50% { height: 80%; } 100% { height: 30%; } }
    @keyframes queueGlow { 0% { transform: scaleX(0.2); opacity: 0.2; } 40% { transform: scaleX(1); opacity: 0.7; } 80% { transform: scaleX(0.4); opacity: 0.25; } 100% { transform: scaleX(0.2); opacity: 0.2; } }
    @keyframes dispatchMove { 0% { transform: translateX(-80%); opacity: 0; } 20% { opacity: 1; } 50% { transform: translateX(0%); opacity: 1; } 70% { opacity: 1; } 100% { transform: translateX(90%); opacity: 0; } }
    @keyframes dispatchPulse { 0% { opacity: 0.2; } 25% { opacity: 0.55; } 50% { opacity: 0.3; } 75% { opacity: 0.6; } 100% { opacity: 0.2; } }
    @keyframes finishFade { 0% { opacity: 0.2; transform: translateY(4px); } 40% { opacity: 0.6; transform: translateY(0); } 80% { opacity: 0.85; } 100% { opacity: 0.25; transform: translateY(-2px); } }
    @keyframes edgeGrow { 0% { stroke-dasharray: 0 100; opacity: 0; } 20% { opacity: 0.9; } 60% { stroke-dasharray: 100 0; } 100% { opacity: 0.4; }
    }
    @keyframes nodeBlink { 0% { transform: scale(0.9); opacity: 0.2; } 25% { opacity: 1; transform: scale(1); } 60% { opacity: 0.85; } 100% { opacity: 0.4; transform: scale(0.96); } }
    @keyframes nodeBreath { 0% { opacity: 0.2; } 25% { opacity: 0.55; } 60% { opacity: 0.85; } 100% { opacity: 0.25; } }
    @keyframes rippleExpand { 0% { opacity: 0; transform: scale(0.6); } 30% { opacity: 0.35; } 60% { opacity: 0.12; transform: scale(1.12); } 100% { opacity: 0; transform: scale(1.2); } }
    @keyframes sweepRight { 0% { transform: translateX(-80%); opacity: 0; } 25% { opacity: 0.5; } 60% { transform: translateX(80%); opacity: 0.35; } 100% { opacity: 0; transform: translateX(100%); } }
    @keyframes coreGlow { 0% { opacity: 0.2; } 30% { opacity: 0.5; } 60% { opacity: 0.3; } 100% { opacity: 0.2; } }
    @keyframes traceToCore { 0% { transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(120px) scale(1); opacity: 0; } 20% { opacity: 0.9; } 60% { transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(20px) scale(0.8); opacity: 0.6; } 100% { transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(0px) scale(0.6); opacity: 0; } }
    @keyframes ringScan { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes envelopePulse { 0% { transform: scale(0.95); opacity: 0.3; } 40% { transform: scale(1); opacity: 0.55; } 80% { transform: scale(1.03); opacity: 0.32; } 100% { transform: scale(0.95); opacity: 0.25; } }
    @keyframes entityPulse { 0% { opacity: 0.3; transform: scale(1); } 25% { opacity: 0.85; transform: scale(1.02); } 60% { opacity: 0.45; transform: scale(1.01); } 100% { opacity: 0.3; transform: scale(1); } }
    @keyframes entityLine { 0% { opacity: 0.15; transform: scale(0.94); } 25% { opacity: 0.9; transform: scale(1); } 60% { opacity: 0.35; transform: scale(0.98); } 100% { opacity: 0.15; transform: scale(0.94); } }
    @keyframes lineGlowForward { 0% { background-position: 0% 50%; opacity: 0.2; } 30% { background-position: 120% 50%; opacity: 0.9; } 60% { opacity: 0.4; } 100% { opacity: 0.1; } }
    @keyframes lineGlowReverse { 0% { background-position: 120% 50%; opacity: 0.2; } 30% { background-position: 0% 50%; opacity: 0.9; } 60% { opacity: 0.4; } 100% { opacity: 0.1; } }
    @keyframes nodeFlash { 0% { opacity: 0.45; box-shadow: 0 0 0 rgba(59,130,246,0); } 30% { opacity: 1; box-shadow: 0 0 12px rgba(59,130,246,0.35); } 60% { opacity: 0.5; box-shadow: 0 0 0 rgba(59,130,246,0); } 100% { opacity: 0.4; }
    }
  `}</style>
);

const EntityVisual: React.FC = () => {
  const ports = [
    {
      label: "Execution",
      position: "top-4 md:top-6 left-1/2 -translate-x-1/2",
      orientation: "vertical" as const,
      align: "top" as const,
    },
    {
      label: "Interface",
      position: "right-2 md:right-6 top-1/2 -translate-y-1/2",
      orientation: "horizontal" as const,
      align: "right" as const,
    },
    {
      label: "Observability",
      position: "left-2 md:left-6 top-1/2 -translate-y-1/2",
      orientation: "horizontal" as const,
      align: "left" as const,
    },
    {
      label: "Lifecycle",
      position: "bottom-4 md:bottom-6 left-1/2 -translate-x-1/2",
      orientation: "vertical" as const,
      align: "bottom" as const,
    },
  ];

  const forwardSeq = [
    "Execution",
    "Interface",
    "Observability",
    "Lifecycle",
  ] as const;
  const reverseSeq = [
    "Lifecycle",
    "Observability",
    "Interface",
    "Execution",
  ] as const;

  return (
    <div className="relative w-full max-w-[calc(100vw-2rem)] md:max-w-3xl mx-auto aspect-[4/3] md:aspect-video rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50 to-white dark:from-[#0b1020] dark:to-[#0a0f1a] overflow-hidden shadow-sm px-1 md:px-0">
      <div className="absolute inset-0 pointer-events-none">
        {ports.map((port, idx) => (
          <React.Fragment key={port.label}>
            {port.orientation === "horizontal" ? (
              <div
                className={`absolute inset-y-1/2 -translate-y-1/2 ${
                  port.align === "right" ? "right-[12%]" : "left-[12%]"
                } h-[2px] w-[52%] bg-gradient-to-r from-blue-400/0 via-blue-500/70 to-blue-400/0 animate-[entityLine_5.5s_ease-in-out_infinite] origin-left`}
                style={{ animationDelay: `${idx * 0.8}s` }}
              />
            ) : (
              <div
                className={`absolute inset-x-1/2 -translate-x-1/2 ${
                  port.align === "top" ? "top-[10%]" : "bottom-[10%]"
                } w-[2px] h-[46%] bg-gradient-to-b from-blue-400/0 via-blue-500/70 to-blue-400/0 animate-[entityLine_5.5s_ease-in-out_infinite] origin-top`}
                style={{ animationDelay: `${idx * 0.8}s` }}
              />
            )}
            {/* Decorative port dots removed per request */}
            <div
              className={`absolute ${port.position} px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full bg-white/80 dark:bg-white/10 border border-blue-500/20 text-[9px] md:text-[12px] text-blue-700 dark:text-blue-200 shadow-sm whitespace-nowrap`}
            >
              {port.label}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-20 md:w-52 md:h-32 rounded-2xl border border-blue-500/40 bg-white/85 dark:bg-white/10 backdrop-blur-sm shadow-lg animate-[entityPulse_5.5s_ease-in-out_infinite] text-center flex flex-col items-center justify-center text-blue-800 dark:text-blue-100 text-xs md:text-sm font-semibold">
          AI Agent
          <span className="text-[9px] md:text-[12px] font-medium text-blue-600/80 dark:text-blue-200/80">
            (Engineering Entity)
          </span>
        </div>
      </div>
    </div>
  );
};

const ExecutionVisual: React.FC = () => {
  const slots = new Array(5).fill(0);
  const outgoing = [0, 1, 2];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-emerald-500/8 rounded-xl" />
      <div className="relative w-full h-full px-4 flex items-center">
        <div className="flex flex-col gap-3 w-1/3">
          {slots.map((_, idx) => (
            <div
              key={`slot-${idx}`}
              className="h-8 rounded-lg border border-blue-400/25 bg-blue-500/10 overflow-hidden"
            >
              <div
                className="h-full w-full bg-blue-400/40 animate-[queueGlow_4s_ease-in-out_infinite]"
                style={{ animationDelay: `${idx * 0.35}s` }}
              />
            </div>
          ))}
        </div>
        <div className="relative w-1/3 h-32 flex items-center justify-center">
          <div className="absolute inset-y-0 left-0 right-0 flex items-center">
            <div className="h-1 w-full bg-gradient-to-r from-blue-400/0 via-blue-500/60 to-emerald-400/0 rounded-full animate-[dispatchPulse_4s_ease-in-out_infinite]" />
          </div>
          {slots.map((_, idx) => (
            <div
              key={`dot-${idx}`}
              className="absolute w-3 h-3 rounded-full bg-blue-400 shadow-md animate-[dispatchMove_4s_ease-in-out_infinite]"
              style={{ animationDelay: `${idx * 0.35}s` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/3 items-start">
          {outgoing.map((i) => (
            <div
              key={`finish-${i}`}
              className="h-9 w-full max-w-[120px] rounded-lg bg-emerald-400/20 border border-emerald-500/30 animate-[finishFade_4s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkflowVisual: React.FC = () => {
  const dagNodes = [
    { id: "A", top: "18%", left: "18%" },
    { id: "B", top: "42%", left: "35%" },
    { id: "C", top: "65%", left: "30%" },
    { id: "D", top: "32%", left: "60%" },
    { id: "E", top: "58%", left: "62%" },
    { id: "F", top: "48%", left: "80%" },
  ];

  const edges = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "E" },
    { from: "D", to: "F" },
    { from: "E", to: "F" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-blue-500/10 rounded-xl" />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wf-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {edges.map((edge, idx) => (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={dagNodes.find((n) => n.id === edge.from)?.left.replace("%", "")}
            y1={dagNodes.find((n) => n.id === edge.from)?.top.replace("%", "")}
            x2={dagNodes.find((n) => n.id === edge.to)?.left.replace("%", "")}
            y2={dagNodes.find((n) => n.id === edge.to)?.top.replace("%", "")}
            stroke="url(#wf-line)"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="animate-[edgeGrow_4.5s_ease-in-out_infinite]"
            style={{ animationDelay: `${idx * 0.25}s` }}
          />
        ))}
      </svg>
      {dagNodes.map((node, idx) => (
        <div
          key={node.id}
          className="absolute w-9 h-9 rounded-xl bg-white/85 dark:bg-[#0b0b0b] border border-emerald-400/40 shadow-md flex items-center justify-center text-xs font-semibold text-emerald-600 animate-[nodeBlink_4.5s_ease-in-out_infinite]"
          style={{
            top: node.top,
            left: node.left,
            animationDelay: `${idx * 0.35}s`,
          }}
        >
          {node.id}
        </div>
      ))}
      <div className="absolute bottom-3 left-3 text-[10px] text-emerald-600/70 font-medium">
        DAG activation · retries
      </div>
    </div>
  );
};

const ServingVisual: React.FC = () => {
  const nodes = new Array(12).fill(0);
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-indigo-500/10 rounded-xl" />
      <div className="relative grid grid-cols-4 grid-rows-3 gap-3 w-full h-full px-3 py-3 min-h-[150px] md:min-h-[180px]">
        {nodes.map((_, idx) => (
          <div
            key={idx}
            className="relative rounded-lg border border-purple-400/20 bg-purple-500/10 overflow-hidden"
          >
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-500/25 animate-[nodeBreath_4s_ease-in-out_infinite]"
              style={{ animationDelay: `${idx * 0.18}s` }}
            />
            <div
              className="absolute inset-0 rounded-lg border border-purple-400/40 animate-[rippleExpand_4s_ease-in-out_infinite]"
              style={{ animationDelay: `${idx * 0.18}s` }}
            />
          </div>
        ))}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-purple-500/20 blur-3xl animate-[coreGlow_4s_ease-in-out_infinite]" />
          <div className="absolute inset-y-6 left-[-60%] right-[-60%] bg-gradient-to-r from-transparent via-purple-400/25 to-transparent animate-[sweepRight_4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

const ControlVisual: React.FC = () => {
  const traces = [
    { angle: -70 },
    { angle: -35 },
    { angle: -5 },
    { angle: 25 },
    { angle: 45 },
    { angle: 70 },
    { angle: 110 },
    { angle: 145 },
    { angle: 185 },
    { angle: 215 },
  ];
  const ringDots = new Array(3).fill(0);
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-slate-500/10 rounded-xl" />
      <div className="relative w-52 h-52 rounded-full border border-cyan-500/25 flex items-center justify-center bg-white/10 dark:bg-[#0c0c0c]/60">
        <div className="absolute inset-4 rounded-full border border-cyan-400/25" />
        <div className="absolute inset-8 rounded-full border border-blue-400/25" />
        {ringDots.map((_, idx) => (
          <div
            key={idx}
            className="absolute inset-0 flex items-center justify-center animate-[ringScan_6s_linear_infinite]"
            style={{ animationDelay: `${idx * 1.4}s` }}
          >
            <div
              className="w-2 h-2 rounded-full bg-cyan-300"
              style={{ transform: "translateX(90px)" }}
            />
          </div>
        ))}
        {traces.map((pos, idx) => (
          <div
            key={idx}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/80 animate-[traceToCore_6s_ease-in-out_infinite]"
            style={{
              animationDelay: `${idx * 0.45}s`,
              ["--angle" as any]: `${pos.angle}deg`,
              top: "50%",
              left: "50%",
            }}
          />
        ))}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[envelopePulse_6s_ease-in-out_infinite]" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-[11px] font-semibold shadow-lg text-center">
          Observability
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] text-cyan-500/80 font-medium">
          traces · metrics · logs
        </div>
      </div>
    </div>
  );
};

const storySteps = [
  {
    title: "01 / Execution Layer",
    summary: "Runs agents like workloads — scheduled, observed, and swappable.",
    keywords: ["long-lived agents", "queues", "event logs"],
    visual: <ExecutionVisual />,
  },
  {
    title: "02 / Workflows",
    summary:
      "Graphs and stateful flows with explicit contracts and recoverability.",
    keywords: ["DAGs", "durable state", "retries"],
    visual: <WorkflowVisual />,
  },
  {
    title: "03 / Serving + Compute",
    summary:
      "Distributed serving and autoscaling that power the runtime layer.",
    keywords: ["inference routing", "GPU pools", "scaling"],
    visual: <ServingVisual />,
  },
  {
    title: "04 / Control Plane",
    summary:
      "Traces, metrics, audit logs — everything observable and explainable.",
    keywords: ["logs", "metrics", "debugging"],
    visual: <ControlVisual />,
  },
];

const stackLayers = [
  {
    title: "Agent Runtime",
    desc: "Execute agents, built openly by the community",
    ctaText: "Explore runtime",
    link: "/architecture",
  },
  {
    title: "AI Native Infra",
    desc: "Serve & scale, evolving with shared practice",
    ctaText: "View infra",
    link: "/stack",
  },
  {
    title: "AI OSS Hub",
    desc: "Map the ecosystem, curated by contributors",
    ctaText: "Browse hub",
    link: "/osshub",
  },
];

const stackCards = [
  {
    tag: "RT",
    title: "Agent Runtime",
    role: "Execution + Scheduling",
    desc: "Run and schedule agents.",
  },
  {
    tag: "WF",
    title: "LangGraph",
    role: "Agent Workflows",
    desc: "Stateful graph workflows.",
  },
  {
    tag: "SR",
    title: "vLLM / TensorRT",
    role: "Inference Layer",
    desc: "Fast inference engines.",
  },
  {
    tag: "IN",
    title: "Ray + K8s + KServe",
    role: "Compute Orchestration",
    desc: "Autoscale distributed compute.",
  },
  {
    tag: "HB",
    title: "OSS Hub",
    role: "Ecosystem",
    desc: "Mapped OSS by runtime role.",
  },
];

const hubSnapshot = [
  { name: "LangGraph", role: "Runtime -> Workflows" },
  { name: "vLLM", role: "Infra -> Serving" },
  { name: "Ray", role: "Infra -> Distributed Compute" },
  { name: "Ragas", role: "Ops -> Evaluation" },
];

export const Overview: React.FC<OverviewProps> = ({ onChangeView, theme }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#050505] text-gray-900 dark:text-white w-full overflow-x-hidden font-sans transition-colors duration-500">
      <Helmet>
        <title>ArkSphere - Agent Runtime and AI Native Infra</title>
        <meta
          name="description"
          content="Run AI agents as engineering entities. Agent Runtime with scheduling and observability, powered by AI Native Infra and connected to the OSS Hub."
        />
      </Helmet>

      <Hero navigate={navigate} />
      <MotionKeyframes />

      {/* Section 2: Why + Who */}
      <section className="relative z-10 mt-12 md:mt-24 pt-16 md:pt-28 pb-12 md:pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          <div className="flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-medium">
              Why We Build the Runtime
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              What we refine together as a runtime standard: components,
              contracts, lifecycle, observability.
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
              Agents need guarantees, visibility, and interchangeable parts.
            </h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {problemBullets.map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 pt-1">
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700">
                Processes over prompts
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700">
                Schedulable workloads
              </span>
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700">
                Observable loops
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-medium">
              Who joins this community
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {personas.map((persona) => (
                <div
                  key={persona.title}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0d0d0d] p-3 md:p-4 shadow-sm space-y-2"
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {persona.title}
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {persona.bullets.slice(0, 2).map((b) => (
                      <li key={b} className="flex gap-2 items-start">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Agent Runtime scroll story */}
      <section className="relative z-10 pt-12 md:pt-28 pb-12 md:pb-24 px-4 md:px-8 max-w-6xl mx-auto space-y-6 md:space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-medium">
            Agent Runtime, step by step
          </p>
        </div>
        <div className="space-y-6">
          {storySteps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0d0d0d] p-4 md:p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <p className="text-sm font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  {step.title}
                </p>
                <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-snug font-normal">
                  {step.summary}
                </p>
                <div className="flex flex-wrap gap-2 text-[12px] text-gray-600 dark:text-gray-400">
                  {step.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700 font-normal"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-full min-h-[160px] md:min-h-[180px] rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0b0b] flex items-center justify-center overflow-hidden p-4">
                  {step.visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: ArkSphere Stack */}
      <section className="relative z-10 pt-12 md:pt-28 pb-12 md:pb-24 px-4 md:px-8 max-w-6xl mx-auto space-y-8 md:space-y-12">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-medium">
            The ArkSphere Stack
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white">
            Three Layers of ArkSphere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stackLayers.map((layer) => (
            <div
              key={layer.title}
              className="rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#0d0d0d] p-4 md:p-6 flex flex-col gap-2 md:gap-3 shadow-sm"
            >
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  {layer.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                  {layer.desc}
                </p>
              </div>
              <button
                onClick={() => navigate(layer.link)}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-auto"
              >
                {layer.ctaText}
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {stackCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b0b0b] p-3 md:p-4 shadow-sm hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-[10px] md:text-xs font-medium">
                  {card.tag}
                </span>
                <span className="text-[9px] md:text-[11px] text-gray-500 dark:text-gray-500 font-medium hidden sm:block">
                  {card.role}
                </span>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-2 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: OSS Hub snapshot */}
      <section className="relative z-10 pt-12 md:pt-28 pb-16 md:pb-24 px-4 md:px-8 max-w-6xl mx-auto space-y-6 md:space-y-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          <div className="flex-1 space-y-3 md:space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-medium">
              Agent Runtime + Infra + OSS Hub
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white">
              AI OSS Hub
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed max-w-xl">
              {TEXT.hubSummary}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Curated projects mapped to runtime, infra, orchestration,
              retrieval, and ops roles.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate("/osshub")}
                className="px-5 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white text-sm md:text-base rounded-full font-semibold hover:bg-blue-700 transition-colors shadow"
              >
                Explore the OSS Hub
              </button>
              <button
                onClick={() => navigate("/docs")}
                className="px-5 md:px-6 py-2.5 md:py-3 bg-gray-100 dark:bg-[#0d0d0d] text-gray-900 dark:text-white text-sm md:text-base rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                Read the design docs
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hubSnapshot.map((project) => (
                <div
                  key={project.name}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] p-3 shadow-sm flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/25 flex items-center justify-center text-xs font-semibold text-blue-700 dark:text-blue-200">
                    {project.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                      {project.name}
                    </div>
                    <div className="text-[12px] text-gray-600 dark:text-gray-400 leading-tight">
                      {project.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center pt-10 pb-4 space-y-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            Join ArkSphere Community to build the runtime, infra, and OSS map
            together.
          </p>
          <button
            onClick={() => navigate("/community")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
            Join the Community
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

const Hero: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-visible bg-white dark:bg-[#050505] transition-colors duration-500 py-12 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:hidden [background-size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>
      <div className="z-20 text-center px-4 space-y-4 md:space-y-6 max-w-7xl">
        <div className="hero-reveal overflow-visible">
          <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
            {TEXT.label}
          </span>
        </div>
        <div className="hero-reveal overflow-visible">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05] md:leading-[1.08] lg:leading-[1.05] pb-1">
            {TEXT.heroTitle}
          </h1>
        </div>
        <div className="hero-reveal overflow-visible">
          <EntityVisual />
        </div>
        <div className="hero-reveal overflow-visible">
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-normal max-w-3xl mx-auto leading-relaxed">
            {TEXT.subtitle}
          </p>
        </div>
        <div className="hero-reveal overflow-visible">
          <div className="flex flex-wrap justify-center gap-2 text-[12px] text-gray-600 dark:text-gray-400">
            {["Execution", "Interface", "Lifecycle", "Observability"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700 font-normal"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center pt-6 hero-reveal w-full max-w-sm md:max-w-none mx-auto px-4 md:px-0">
          <button
            onClick={() => navigate("/community")}
            className="hero-btn w-full md:w-64 px-6 md:px-6 py-2.5 bg-blue-600 text-white rounded-full font-semibold text-sm md:text-base hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25 inline-flex items-center justify-center gap-2"
          >
            Join the Community
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/osshub")}
            className="hero-btn w-full md:w-64 px-6 md:px-6 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white rounded-full font-semibold text-sm md:text-base hover:bg-gray-200 dark:hover:bg-white/20 transition-colors backdrop-blur-sm shadow-lg inline-flex items-center justify-center gap-2"
          >
            Explore the OSS Hub
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 md:bottom-10 w-full flex justify-center z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
};
