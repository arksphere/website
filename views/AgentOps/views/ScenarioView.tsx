import React from "react";
import { Bot, Target, ArrowRight } from "lucide-react";
import { HeroSection } from "../components/HeroSection";
import { TechStackGrid } from "../components/TechStackGrid";
import { CodeBlock } from "../components/EngineeringWidgets";

export const ScenarioView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <HeroSection />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
            Architecture Stack
          </h2>
          <button className="text-xs text-brand-400 hover:text-brand-300 font-mono flex items-center gap-1 transition-colors">
            View Full Spec <ArrowRight size={12} />
          </button>
        </div>
        <TechStackGrid />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Use Case Card */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-brand-900/20 flex items-center justify-center text-brand-400 border border-brand-500/20">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Use Case: IT Support Agent
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Level 3 Autonomous Agent
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              A fully autonomous agent residing in the cluster. It solves
              problems by navigating internal APIs rather than just answering
              questions.
            </p>

            <CodeBlock
              filename="agent-manifest.yaml"
              code={`apiVersion: agents.arksphere.io/v1alpha1
kind: Agent
metadata:
  name: it-support-bot
spec:
  model: gpt-4-turbo
  tools:
    - jira-api
    - confluence-rag
  memory:
    type: redis
    retention: 24h`}
            />
          </div>
        </div>

        {/* Goal Card */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-900/20 flex items-center justify-center text-green-400 border border-green-500/20">
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Goal: Production Grade
              </h3>
              <div className="text-xs text-slate-400 font-mono">
                Enterprise Readiness
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              Shift from "Notebook Demo" to "Enterprise Runtime" by enforcing
              strict engineering standards.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Immutable Infrastructure
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Agents packaged as containers, deployed via GitOps.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Semantic Observability
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tracing thought processes, tool usage, and hallucinations.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Policy Enforcement
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Guardrails for tool access and data privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
