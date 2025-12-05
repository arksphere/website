import React from "react";
import { CheckCircle2, AlertCircle, Activity, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "yaml",
  filename,
}) => (
  <div className="rounded-lg overflow-hidden border border-dark-border bg-[#0d1117] font-mono text-xs my-4">
    {filename && (
      <div className="flex items-center gap-2 px-3 py-2 border-b border-dark-border bg-dark-card/50 text-slate-400">
        <Terminal size={12} />
        <span>{filename}</span>
      </div>
    )}
    <div className="p-3 overflow-x-auto">
      <pre className="text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

interface StatusBadgeProps {
  status: "healthy" | "warning" | "error" | "active";
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const colors = {
    healthy: "text-green-400 bg-green-900/20 border-green-900/30",
    warning: "text-yellow-400 bg-yellow-900/20 border-yellow-900/30",
    error: "text-red-400 bg-red-900/20 border-red-900/30",
    active: "text-brand-400 bg-brand-900/20 border-brand-900/30",
  };

  const icons = {
    healthy: CheckCircle2,
    warning: AlertCircle,
    error: AlertCircle,
    active: Activity,
  };

  const Icon = icons[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider ${colors[status]}`}
    >
      <Icon size={12} />
      <span>{label}</span>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendUp,
}) => (
  <div className="bg-dark-card border border-dark-border p-4 rounded-lg">
    <div className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">
      {label}
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-mono text-white font-bold">{value}</div>
      {trend && (
        <div
          className={`text-xs font-mono ${
            trendUp ? "text-green-400" : "text-red-400"
          }`}
        >
          {trend}
        </div>
      )}
    </div>
  </div>
);
