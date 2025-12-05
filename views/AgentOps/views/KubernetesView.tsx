import React from 'react';
import { Container, FileJson, Settings, Boxes, Cpu, Network, Layers } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export const KubernetesView: React.FC = () => {
  const agentCrd = `apiVersion: kagent.io/v1alpha1
kind: Agent
metadata:
  name: it-support-bot
spec:
  model: "llama-3-70b-vllm"
  memory: "redis-persistent"
  tools:
    - "jira-integration"
    - "confluence-rag"
  policy:
    maxSteps: 10
    humanInTheLoop: false`;

  return (
    <div className="h-full overflow-y-auto pr-2">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          <Layers className="text-blue-500" /> AI-Native Infrastructure
        </h2>
        <p className="text-slate-400">
          The platform treats Agents as first-class citizens using Custom Resource Definitions (CRDs).
        </p>
      </div>

      {/* Visual CRD Hierarchy */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Network size={200} />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-6">KAgent Controller Topology</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
           {/* Controller */}
           <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-600 flex items-center justify-center shadow-2xl relative">
                 <div className="absolute inset-0 border-2 border-dashed border-slate-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                 <Settings size={40} className="text-slate-300" />
              </div>
              <div className="mt-4 text-center">
                <div className="font-bold text-slate-200">KAgent Operator</div>
                <div className="text-xs text-slate-500">Manager</div>
              </div>
           </div>

           {/* Arrows */}
           <div className="h-1 w-16 bg-gradient-to-r from-slate-600 to-brand-600 rounded hidden md:block"></div>

           {/* Agent CRD */}
           <div className="flex flex-col items-center">
              <div className="w-28 h-28 bg-brand-900/50 rounded-xl border-2 border-brand-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                 <Boxes size={40} className="text-brand-400" />
              </div>
              <div className="mt-4 text-center">
                 <div className="font-bold text-brand-400">Agent CRD</div>
                 <div className="text-xs text-slate-500">State Machine Definition</div>
              </div>
           </div>
           
           {/* Children */}
           <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 bg-dark-bg px-4 py-2 rounded border border-dark-border">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-xs font-mono text-slate-300">Run CRD (History)</span>
              </div>
              <div className="flex items-center gap-3 bg-dark-bg px-4 py-2 rounded border border-dark-border">
                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                 <span className="text-xs font-mono text-slate-300">Tool CRD (Binding)</span>
              </div>
              <div className="flex items-center gap-3 bg-dark-bg px-4 py-2 rounded border border-dark-border">
                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                 <span className="text-xs font-mono text-slate-300">ModelRouter (vLLM)</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Definition</h3>
          <p className="text-sm text-slate-400">
             Instead of managing Deployments and Services manually, developers define the high-level Agent intent. 
             The Operator creates the underlying Pods, Services, and HPA rules.
          </p>
          <CodeBlock code={agentCrd} language="yaml" filename="agent.yaml" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">GPU Scheduling Visualization</h3>
          <div className="bg-dark-bg border border-dark-border rounded-xl p-4">
             <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-mono text-slate-500">Node Pool: gpu-large</span>
               <span className="text-xs text-green-400 flex items-center gap-1"><Cpu size={12}/> High Efficiency</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               {/* Node 1 */}
               <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-slate-300">gke-gpu-node-1</span>
                     <span className="text-[10px] bg-brand-900 text-brand-300 px-1 rounded">A100</span>
                  </div>
                  <div className="space-y-2">
                     <div className="h-8 bg-purple-900/50 border border-purple-500/30 rounded flex items-center justify-center text-[10px] text-purple-300 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-purple-500/20 w-3/4"></div>
                        <span className="relative z-10">vLLM (Llama-3) - 75% VRAM</span>
                     </div>
                     <div className="h-6 bg-slate-900 rounded border border-slate-700/50"></div>
                  </div>
               </div>
               
               {/* Node 2 */}
               <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-slate-300">gke-gpu-node-2</span>
                     <span className="text-[10px] bg-brand-900 text-brand-300 px-1 rounded">A100</span>
                  </div>
                  <div className="space-y-2">
                     <div className="h-8 bg-purple-900/50 border border-purple-500/30 rounded flex items-center justify-center text-[10px] text-purple-300 relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-purple-500/20 w-1/2"></div>
                        <span className="relative z-10">vLLM (Mistral) - 50% VRAM</span>
                     </div>
                     <div className="h-6 bg-brand-900/30 border border-brand-500/20 rounded flex items-center justify-center text-[10px] text-brand-400">
                        Embedding Service
                     </div>
                  </div>
               </div>
             </div>
             
             <div className="mt-4 p-2 bg-yellow-900/10 border border-yellow-700/20 rounded text-[10px] text-yellow-500 flex gap-2 items-start">
               <Cpu size={14} className="mt-0.5 shrink-0" />
               KV-Cache Aware Routing: Requests for "Session A" are routed to Node 1 to reuse cached prefixes.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
