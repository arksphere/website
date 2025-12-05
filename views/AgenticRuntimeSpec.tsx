import React from "react";
import { Helmet } from "react-helmet-async";
import { FileText, Code, Terminal, Shield, AlertTriangle } from "lucide-react";

export const AgenticRuntimeSpec: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <Helmet>
        <title>Agentic Runtime Specification - ArkSphere</title>
        <meta
          name="description"
          content="The official engineering specification for the ArkSphere Agentic Runtime. Defines primitives, APIs, lifecycle semantics, and compliance requirements."
        />
      </Helmet>

      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-mono font-medium mb-6">
          <FileText size={14} />
          <span>ENGINEERING SPECIFICATION v1.0</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
          Agentic Runtime Specification
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The technical standard for implementing compliant agentic runtimes.
          This document defines the interfaces, behaviors, and schemas required
          for interoperability.
        </p>
      </div>

      {/* Spec Content Placeholder - Structured as requested */}
      <div className="space-y-16">
        {/* Primitives */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Code className="text-blue-500" />
            Runtime Primitives
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Core data structures and resource models that every runtime must
              support.
            </p>
            <div className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-800 dark:text-gray-300">
                {`type Agent struct {
  ID          string
  Capabilities []Capability
  State       AgentState
  Policy      PolicyRef
}

type AgentState enum {
  PENDING
  RUNNING
  WAITING_INPUT
  COMPLETED
  FAILED
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Lifecycle Semantics */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Terminal className="text-green-500" />
            Lifecycle Semantics
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Strict definitions of state transitions and failure handling.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <strong>Initialization:</strong> Resource allocation and policy
                binding.
              </li>
              <li>
                <strong>Execution Loop:</strong> The atomic unit of agent work
                (Plan -&gt; Act -&gt; Observe).
              </li>
              <li>
                <strong>Suspension:</strong> Persisting state to disk for
                long-running workflows.
              </li>
              <li>
                <strong>Termination:</strong> Cleanup and audit log
                finalization.
              </li>
            </ul>
          </div>
        </section>

        {/* Compliance */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Shield className="text-red-500" />
            Compliance & Security
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mandatory security controls for certified runtimes.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/10">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Isolation
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Runtimes must enforce strict process isolation for tool
                  execution (e.g., gVisor, Firecracker).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10">
                <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                  <Shield size={16} />
                  Identity
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Every agent action must be cryptographically attributable to a
                  specific identity.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
