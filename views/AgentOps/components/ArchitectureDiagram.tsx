import React from "react";
import {
  User,
  Server,
  Cpu,
  Database,
  Activity,
  Globe,
  MessageSquare,
  HardDrive,
} from "lucide-react";

interface ArchitectureDiagramProps {
  activeNodes?: string[];
  activeEdges?: string[];
  showDetails?: boolean;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  activeNodes = [],
  activeEdges = [],
  showDetails = false,
}) => {
  const getNodeStyle = (id: string) => {
    const isActive = activeNodes.includes(id);
    return `flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-500 ${
      isActive
        ? "bg-brand-900/20 border-brand-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105"
        : "bg-dark-card border-dark-border opacity-60"
    }`;
  };

  const getIconStyle = (id: string) => {
    const isActive = activeNodes.includes(id);
    return `mb-2 transition-colors duration-500 ${
      isActive ? "text-brand-400" : "text-slate-500"
    }`;
  };

  const getEdgeStyle = (id: string) => {
    const isActive = activeEdges.includes(id);
    return `stroke-2 transition-all duration-500 ${
      isActive ? "stroke-brand-500 opacity-100" : "stroke-slate-700 opacity-30"
    }`;
  };

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0B0F17] p-8 flex items-center justify-center overflow-hidden select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-slate-500" />
        ))}
      </div>

      <div className="relative w-[800px] h-[500px]">
        {/* Edges (SVG Overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
            </marker>
          </defs>

          {/* User (96, 250) <-> Gateway (250, 250) */}
          <path
            d="M 96 250 L 240 250"
            className={getEdgeStyle("user-gateway")}
            markerEnd={
              activeEdges.includes("user-gateway") ? "url(#arrowhead)" : ""
            }
          />
          <path
            d="M 250 250 L 106 250"
            className={getEdgeStyle("gateway-user")}
            markerEnd={
              activeEdges.includes("gateway-user") ? "url(#arrowhead)" : ""
            }
          />

          {/* Gateway (346, 250) <-> Agent (500, 250) */}
          <path
            d="M 346 250 L 490 250"
            className={getEdgeStyle("gateway-agent")}
            markerEnd={
              activeEdges.includes("gateway-agent") ? "url(#arrowhead)" : ""
            }
          />
          <path
            d="M 500 250 L 356 250"
            className={getEdgeStyle("agent-gateway")}
            markerEnd={
              activeEdges.includes("agent-gateway") ? "url(#arrowhead)" : ""
            }
          />

          {/* Agent (564, 186) <-> LLM (548, 96) - Adjusted for center alignment */}
          <path
            d="M 564 186 L 548 106"
            className={getEdgeStyle("agent-llm")}
            markerEnd={
              activeEdges.includes("agent-llm") ? "url(#arrowhead)" : ""
            }
          />
          <path
            d="M 548 96 L 564 176"
            className={getEdgeStyle("llm-agent")}
            markerEnd={
              activeEdges.includes("llm-agent") ? "url(#arrowhead)" : ""
            }
          />

          {/* Agent (628, 250) <-> Tools (704, 250) */}
          <path
            d="M 628 250 L 694 250"
            className={getEdgeStyle("agent-jira")}
            markerEnd={
              activeEdges.includes("agent-jira") ? "url(#arrowhead)" : ""
            }
          />

          {/* Agent (564, 314) <-> Memory (548, 404) */}
          <path
            d="M 564 314 L 548 394"
            className={getEdgeStyle("agent-memory")}
            markerEnd={
              activeEdges.includes("agent-memory") ? "url(#arrowhead)" : ""
            }
          />

          {/* Agent (500, 314) <-> Obs (398, 404) */}
          <path
            d="M 500 280 L 420 394"
            className={getEdgeStyle("agent-obs")}
            markerEnd={
              activeEdges.includes("agent-obs") ? "url(#arrowhead)" : ""
            }
          />
        </svg>

        {/* Nodes */}

        {/* User */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 ${getNodeStyle(
            "user"
          )}`}
        >
          <User size={32} className={getIconStyle("user")} />
          <span className="text-xs font-bold text-slate-300">User</span>
        </div>

        {/* Gateway */}
        <div
          className={`absolute left-[250px] top-1/2 -translate-y-1/2 w-24 h-24 ${getNodeStyle(
            "gateway"
          )}`}
        >
          <Globe size={32} className={getIconStyle("gateway")} />
          <span className="text-xs font-bold text-slate-300">Gateway</span>
        </div>

        {/* Agent Runtime */}
        <div
          className={`absolute left-[500px] top-1/2 -translate-y-1/2 w-32 h-32 ${getNodeStyle(
            "agent"
          )}`}
        >
          <Cpu size={40} className={getIconStyle("agent")} />
          <span className="text-sm font-bold text-white">Agent Runtime</span>
          <span className="text-[10px] text-slate-400 mt-1">LangGraph</span>
        </div>

        {/* LLM */}
        <div
          className={`absolute left-[500px] top-0 w-24 h-24 ${getNodeStyle(
            "llm"
          )}`}
        >
          <Server size={32} className={getIconStyle("llm")} />
          <span className="text-xs font-bold text-slate-300">vLLM</span>
        </div>

        {/* Tools */}
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 ${getNodeStyle(
            "jira"
          )}`}
        >
          <HardDrive size={32} className={getIconStyle("jira")} />
          <span className="text-xs font-bold text-slate-300">Jira API</span>
        </div>

        {/* Memory */}
        <div
          className={`absolute left-[500px] bottom-0 w-24 h-24 ${getNodeStyle(
            "memory"
          )}`}
        >
          <Database size={32} className={getIconStyle("memory")} />
          <span className="text-xs font-bold text-slate-300">Postgres</span>
        </div>

        {/* Observability */}
        <div
          className={`absolute left-[350px] bottom-0 w-24 h-24 ${getNodeStyle(
            "obs"
          )}`}
        >
          <Activity size={32} className={getIconStyle("obs")} />
          <span className="text-xs font-bold text-slate-300">Otel</span>
        </div>
      </div>
    </div>
  );
};
