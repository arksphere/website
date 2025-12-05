import React from "react";
import { Activity, GitBranch, Cpu, Terminal } from "lucide-react";
import { StatusBadge, MetricCard } from "./EngineeringWidgets";

export const HeroSection: React.FC = () => {
  return (
    <div className="relative border-b border-dark-border bg-dark-bg pb-8 mb-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <StatusBadge status="active" label="v2.4-stable" />
            <StatusBadge status="healthy" label="Cluster: Ready" />
            <span className="text-slate-500 text-xs font-mono">
              Last deploy: 2m ago
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Agentic Runtime{" "}
              <span className="text-brand-400">Orchestration</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              A Kubernetes-native platform for deploying, scaling, and observing
              autonomous agents as first-class engineering entities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card border border-dark-border rounded text-xs text-slate-300 font-mono">
              <Terminal size={14} className="text-brand-400" />
              <span>kubectl get agents</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card border border-dark-border rounded text-xs text-slate-300 font-mono">
              <GitBranch size={14} className="text-purple-400" />
              <span>gitops-enabled</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card border border-dark-border rounded text-xs text-slate-300 font-mono">
              <Cpu size={14} className="text-green-400" />
              <span>gpu-slicing</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto min-w-[300px]">
          <MetricCard
            label="Active Agents"
            value="128"
            trend="+12%"
            trendUp={true}
          />
          <MetricCard label="Token/s" value="4.2k" trend="+5%" trendUp={true} />
          <MetricCard
            label="Avg Latency"
            value="45ms"
            trend="-2ms"
            trendUp={true}
          />
          <MetricCard
            label="Error Rate"
            value="0.01%"
            trend="stable"
            trendUp={true}
          />
        </div>
      </div>
    </div>
  );
};
