import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  DollarSign,
  Zap,
  AlertTriangle,
  List,
  Search,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { TraceSpan } from "../types";

const MOCK_TRACE: TraceSpan[] = [
  {
    id: "sp-1",
    name: "agent_run",
    type: "agent",
    startTime: 0,
    duration: 2500,
    status: "success",
    metadata: { model: "gpt-4" },
  },
  {
    id: "sp-2",
    name: "retrieve_docs",
    type: "retrieval",
    startTime: 200,
    duration: 400,
    status: "success",
    metadata: { hits: 5 },
  },
  {
    id: "sp-3",
    name: "llm_plan",
    type: "llm",
    startTime: 700,
    duration: 800,
    status: "success",
    metadata: { tokens: 150 },
  },
  {
    id: "sp-4",
    name: "tool_jira",
    type: "tool",
    startTime: 1600,
    duration: 600,
    status: "success",
    metadata: { method: "POST" },
  },
  {
    id: "sp-5",
    name: "llm_final",
    type: "llm",
    startTime: 2300,
    duration: 150,
    status: "success",
    metadata: { tokens: 45 },
  },
];

const COST_DATA = [
  { time: "10:00", gpu: 0.5, token: 0.8 },
  { time: "10:15", gpu: 0.6, token: 0.9 },
  { time: "10:30", gpu: 0.55, token: 1.2 },
  { time: "10:45", gpu: 0.8, token: 1.5 },
];

export const OperationsView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-green-500" /> Semantic Observability
          </h2>
          <p className="text-slate-400">
            Deep introspection into Agent behavior, costs, and traces.
          </p>
        </div>

        {/* Cost Summary Cards */}
        <div className="flex gap-4">
          <div className="bg-dark-card border border-dark-border px-4 py-2 rounded-lg">
            <div className="text-xs text-slate-400 uppercase">
              Est. Hourly Cost
            </div>
            <div className="text-xl font-bold text-white flex items-center gap-1">
              <DollarSign size={16} className="text-green-400" />
              4.25
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border px-4 py-2 rounded-lg">
            <div className="text-xs text-slate-400 uppercase">Avg Token/s</div>
            <div className="text-xl font-bold text-white flex items-center gap-1">
              <Zap size={16} className="text-yellow-400" />
              84
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8 mb-8">
        {/* Trace Waterfall */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 h-[400px] flex flex-col max-w-full overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <List size={18} className="text-purple-400" /> Trace Waterfall
            </h3>
            <span className="text-xs font-mono text-slate-500">
              TraceID: tr_88a91
            </span>
          </div>

          <div className="flex-1 relative border-l border-slate-700 ml-4 space-y-4 scale-95 origin-top-left">
            {MOCK_TRACE.map((span) => (
              <div key={span.id} className="relative pl-6 group">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-slate-800 border-2 border-slate-500 rounded-full group-hover:border-white transition-colors"></div>

                <div
                  className="bg-slate-800/50 border border-slate-700 hover:border-slate-500 rounded p-2 relative overflow-hidden transition-all"
                  style={{
                    width: `${(span.duration / 2500) * 100}%`,
                    marginLeft: `${(span.startTime / 2500) * 100}%`,
                    minWidth: "100px",
                  }}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      span.type === "llm"
                        ? "bg-purple-500"
                        : span.type === "tool"
                        ? "bg-orange-500"
                        : span.type === "retrieval"
                        ? "bg-green-500"
                        : "bg-brand-500"
                    }`}
                  ></div>

                  <div className="pl-3 flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {span.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {span.duration}ms
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {Object.entries(span.metadata || {}).map(([k, v]) => (
                        <span
                          key={k}
                          className="text-[9px] bg-black/30 px-1 rounded text-slate-400 whitespace-nowrap"
                        >
                          {k}:{v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Time Scale */}
          <div className="mt-4 border-t border-slate-800 pt-2 flex justify-between text-[10px] text-slate-500 font-mono pl-10">
            <span>0ms</span>
            <span>1250ms</span>
            <span>2500ms</span>
          </div>
        </div>

        {/* Cost & Quality Dashboard */}
        <div className="space-y-6">
          {/* Cost Chart */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 h-48">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">
              Cost Breakdown (USD)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COST_DATA}>
                <defs>
                  <linearGradient id="colorToken" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="token"
                  stackId="1"
                  stroke="#38bdf8"
                  fill="url(#colorToken)"
                  name="Token Costs"
                />
                <Area
                  type="monotone"
                  dataKey="gpu"
                  stackId="1"
                  stroke="#a855f7"
                  fill="url(#colorGpu)"
                  name="Infrastructure"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex-1">
            <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-500" /> Anomalies
              Detected
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-red-900/10 p-3 rounded border border-red-900/30">
                <div className="mt-0.5">
                  <Clock size={14} className="text-red-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-red-300">
                    Latency Spike (Run #992)
                  </div>
                  <div className="text-[10px] text-red-400/70">
                    Agent loop exceeded 30s. Checkpointer lock contention.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-yellow-900/10 p-3 rounded border border-yellow-900/30">
                <div className="mt-0.5">
                  <Search size={14} className="text-yellow-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-yellow-300">
                    Low Retrieval Score
                  </div>
                  <div className="text-[10px] text-yellow-400/70">
                    RAG similarity below threshold (0.45) for topic "VPN".
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
