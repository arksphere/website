import React from "react";
import {
  Layout,
  BrainCircuit,
  Database,
  Server,
  ArrowRight,
} from "lucide-react";

interface TechItemProps {
  name: string;
  version?: string;
}

const TechItem: React.FC<TechItemProps> = ({ name, version }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-dark-border/50 last:border-0 group cursor-default">
    <span className="text-sm text-slate-300 font-mono group-hover:text-brand-300 transition-colors">
      {name}
    </span>
    {version && (
      <span className="text-xs text-slate-600 font-mono">{version}</span>
    )}
  </div>
);

export const TechStackGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* L1: Interface */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-purple-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Layout size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">L1: Interface</h3>
              <div className="text-[10px] text-purple-400 font-mono uppercase tracking-wider">
                Gateway Layer
              </div>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-purple-400" />
          </div>
        </div>
        <div className="space-y-1">
          <TechItem name="React" version="19.0" />
          <TechItem name="Next.js" version="14.1" />
          <TechItem name="Tailwind" version="3.4" />
          <TechItem name="tRPC" version="10.x" />
        </div>
      </div>

      {/* L2: Runtime */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-brand-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-brand-500/10 flex items-center justify-center text-brand-400">
              <BrainCircuit size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">L2: Runtime</h3>
              <div className="text-[10px] text-brand-400 font-mono uppercase tracking-wider">
                Orchestration
              </div>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-brand-400" />
          </div>
        </div>
        <div className="space-y-1">
          <TechItem name="LangGraph" version="0.1" />
          <TechItem name="Temporal" version="1.2" />
          <TechItem name="LiteLLM" version="1.3" />
          <TechItem name="Pydantic" version="2.6" />
        </div>
      </div>

      {/* L3: Data */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-green-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-400">
              <Database size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">L3: Data</h3>
              <div className="text-[10px] text-green-400 font-mono uppercase tracking-wider">
                Memory & RAG
              </div>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-green-400" />
          </div>
        </div>
        <div className="space-y-1">
          <TechItem name="Milvus" version="2.3" />
          <TechItem name="Redis" version="7.2" />
          <TechItem name="Postgres" version="16" />
          <TechItem name="MinIO" version="RELEASE" />
        </div>
      </div>

      {/* L4: Infra */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-slate-500/30 transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-500/10 flex items-center justify-center text-slate-400">
              <Server size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">L4: Infra</h3>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                Compute & GPU
              </div>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="space-y-1">
          <TechItem name="Kubernetes" version="1.29" />
          <TechItem name="Ray" version="2.9" />
          <TechItem name="vLLM" version="0.3" />
          <TechItem name="NVIDIA" version="535" />
        </div>
      </div>
    </div>
  );
};
