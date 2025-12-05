import React, { useState, useEffect } from "react";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import {
  Play,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Database,
  Terminal,
  Code2,
  Bot,
  Brain,
} from "lucide-react";
import { SimulationStep } from "../types";

// Helper for typewriter effect
const StreamingText: React.FC<{ text: string; isActive: boolean }> = ({
  text,
  isActive,
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isActive) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <span>
      {displayed}
      {isActive && displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

const SIMULATION_STEPS: SimulationStep[] = [
  {
    id: 0,
    phase: "Input",
    description:
      "User submits a natural language request via the React Frontend.",
    activeNodes: ["user", "gateway"],
    activeEdges: ["user-gateway"],
    internalState: {
      memory: "SessionID: sess_8829\nUser: 'Alice'",
      scratchpad: "Waiting for input...",
      stack: ["main()", "await user_input()"],
    },
    chatMessage: {
      sender: "user",
      text: "The printer in Building B is broken. Can you file a ticket?",
    },
  },
  {
    id: 1,
    phase: "Routing",
    description:
      "AI Gateway routes stream to Agent Runtime. LangGraph initializes state.",
    activeNodes: ["gateway", "agent"],
    activeEdges: ["gateway-agent"],
    internalState: {
      memory: "Conversation History: [...prev]",
      scratchpad: "Graph Node: START -> ROUTER",
      stack: ["graph.run()", "node: router()", "identify_intent()"],
    },
    chatMessage: {
      sender: "system",
      text: "Initializing Agent Run [run_id=trace_01]",
    },
  },
  {
    id: 2,
    phase: "Reasoning",
    description:
      "Agent uses vLLM to reason about the intent. It consults the Tool definitions.",
    activeNodes: ["agent", "llm"],
    activeEdges: ["agent-llm"],
    internalState: {
      scratchpad:
        "Thought: User wants to create a ticket.\nMissing info: Priority?\nDecision: Infer 'Medium' default.",
      toolCall:
        "Proposed: jira_create(summary='Printer Broken', priority='Medium')",
      stack: ["node: router()", "llm.invoke()", "await vllm_response"],
    },
    chatMessage: { sender: "agent", text: "Thinking..." },
  },
  {
    id: 3,
    phase: "Tool Exec",
    description: "Agent executes the 'jira_create' tool via the Tool Proxy.",
    activeNodes: ["agent", "jira"],
    activeEdges: ["agent-jira"],
    internalState: {
      toolCall:
        "POST /api/jira/tickets\nPayload: { summary: 'Printer Broken', ... }",
      toolOutput: "Response: 201 Created\n{ id: 'TICKET-442', link: '...' }",
      stack: [
        "node: ticket_agent()",
        "tool: jira_create()",
        "http_client.post()",
      ],
    },
    chatMessage: { sender: "system", text: "Calling Tool: Jira..." },
  },
  {
    id: 4,
    phase: "Memory",
    description: "Tool result is checkpointed to Postgres for fault tolerance.",
    activeNodes: ["agent", "memory"],
    activeEdges: ["agent-memory"],
    internalState: {
      memory:
        "Graph State Updated:\n- LastToolResult: TICKET-442\n- Status: Success",
      scratchpad: "Checkpoint saved to Redis.",
      stack: ["checkpointer.save()", "db.commit()"],
    },
    chatMessage: { sender: "system", text: "State Checkpointed." },
  },
  {
    id: 5,
    phase: "Response",
    description:
      "Agent streams final natural language response using vLLM back to User.",
    activeNodes: ["agent", "gateway", "user", "llm"],
    activeEdges: ["llm-agent", "agent-gateway", "gateway-user"],
    internalState: {
      scratchpad: "Generating user response based on tool output...",
      toolOutput: "Ticket TICKET-442 created.",
      stack: [
        "node: responder()",
        "llm.stream()",
        "yield chunk",
        "gateway.push_sse()",
      ],
    },
    chatMessage: {
      sender: "agent",
      text: "I've filed ticket TICKET-442 for the printer issue.",
    },
  },
  {
    id: 6,
    phase: "Complete",
    description: "Stream closes. Telemetry spans are flushed to OpenTelemetry.",
    activeNodes: ["agent", "obs"],
    activeEdges: ["agent-obs"],
    internalState: {
      memory: "Run Complete.",
      scratchpad: "TraceID: trace_01 flushed.",
      stack: ["graph.end()", "otel.flush()"],
    },
    chatMessage: { sender: "system", text: "Session closed." },
  },
];

export const WalkthroughView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<"memory" | "stack">(
    "memory"
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoPlay && currentStep < SIMULATION_STEPS.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2500);
    } else {
      setAutoPlay(false);
    }
    return () => clearInterval(interval);
  }, [autoPlay, currentStep]);

  const stepData = SIMULATION_STEPS[currentStep];

  return (
    <div className="h-full flex flex-col xl:flex-row gap-6">
      {/* Left: Interactive Control & Chat */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* Controls */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal size={18} className="text-brand-400" /> Run Simulation
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-1">
              RunID: {`run_${1000 + currentStep}`}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCurrentStep(0);
                setAutoPlay(false);
              }}
              className="p-2 rounded-lg border border-dark-border text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all ${
                autoPlay
                  ? "bg-red-500/20 text-red-400 border border-red-500/50"
                  : "bg-brand-600 text-white shadow-lg shadow-brand-900/50 hover:bg-brand-500"
              }`}
            >
              {autoPlay ? "Pause" : "Auto Play"}{" "}
              <Play size={14} fill={autoPlay ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Chat Log */}
        <div className="flex-1 bg-dark-bg border border-dark-border rounded-xl p-4 overflow-y-auto min-h-[300px] flex flex-col gap-3">
          {SIMULATION_STEPS.slice(0, currentStep + 1).map(
            (step) =>
              step.chatMessage && (
                <div
                  key={step.id}
                  className={`flex ${
                    step.chatMessage.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  } animate-in slide-in-from-bottom-2`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      step.chatMessage.sender === "user"
                        ? "bg-brand-600 text-white rounded-br-none"
                        : step.chatMessage.sender === "agent"
                        ? "bg-slate-700 text-slate-100 rounded-bl-none"
                        : "bg-transparent text-slate-500 font-mono text-xs border border-dashed border-slate-800 w-full"
                    }`}
                  >
                    {step.chatMessage.sender === "agent" && (
                      <Bot size={14} className="mb-1 text-brand-300" />
                    )}
                    {step.chatMessage.sender === "agent" &&
                    step.phase === "Response" ? (
                      <StreamingText
                        text={step.chatMessage.text}
                        isActive={currentStep === step.id}
                      />
                    ) : (
                      step.chatMessage.text
                    )}
                  </div>
                </div>
              )
          )}
          {stepData.phase === "Reasoning" && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-slate-800/50 text-brand-400 text-xs px-3 py-1 rounded-full flex items-center gap-2">
                <Brain size={12} /> Model Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-7 gap-1">
          {SIMULATION_STEPS.map((step) => (
            <div
              key={step.id}
              onClick={() => {
                setCurrentStep(step.id);
                setAutoPlay(false);
              }}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                currentStep >= step.id ? "bg-brand-500" : "bg-slate-800"
              } ${currentStep === step.id ? "ring-2 ring-brand-500/50" : ""}`}
              title={step.phase}
            />
          ))}
        </div>
      </div>

      {/* Middle: Visualization */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex-1 bg-dark-bg border border-dark-border rounded-xl overflow-hidden relative min-h-[400px]">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <div className="px-3 py-1.5 rounded bg-dark-card/90 border border-dark-border backdrop-blur flex items-center gap-2 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-300 uppercase">
                {stepData.phase} Phase
              </span>
            </div>
          </div>
          <ArchitectureDiagram
            activeNodes={stepData.activeNodes}
            activeEdges={stepData.activeEdges}
            showDetails={true}
          />
        </div>

        {/* Bottom: Internal State Inspector */}
        <div className="h-56 bg-[#0d1117] border border-dark-border rounded-xl flex overflow-hidden font-mono text-xs">
          <div className="w-48 bg-dark-card border-r border-dark-border p-3 flex flex-col gap-2">
            <h3 className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-1">
              Inspector
            </h3>
            <button
              onClick={() => setInspectorTab("memory")}
              className={`p-2 rounded text-left flex items-center gap-2 transition-colors ${
                inspectorTab === "memory"
                  ? "bg-brand-900/20 text-brand-300 border border-brand-500/20"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Database size={14} /> Memory
            </button>
            <button
              onClick={() => setInspectorTab("stack")}
              className={`p-2 rounded text-left flex items-center gap-2 transition-colors ${
                inspectorTab === "stack"
                  ? "bg-brand-900/20 text-brand-300 border border-brand-500/20"
                  : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Code2 size={14} /> Stack
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto custom-scrollbar flex gap-6">
            {inspectorTab === "memory" ? (
              <>
                <div className="flex-1">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">
                    Scratchpad / Reasoning
                  </div>
                  <pre className="text-green-400 whitespace-pre-wrap">
                    {stepData.internalState.scratchpad || "-- Empty --"}
                  </pre>
                </div>
                {stepData.internalState.toolCall && (
                  <div className="flex-1 border-l border-slate-800 pl-6">
                    <div className="text-[10px] text-slate-500 uppercase mb-2">
                      Tool Payload
                    </div>
                    <pre className="text-orange-300 whitespace-pre-wrap">
                      {stepData.internalState.toolCall}
                    </pre>
                    {stepData.internalState.toolOutput && (
                      <>
                        <div className="text-[10px] text-slate-500 uppercase mt-4 mb-2">
                          Output
                        </div>
                        <pre className="text-blue-300 whitespace-pre-wrap">
                          {stepData.internalState.toolOutput}
                        </pre>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full">
                <div className="text-[10px] text-slate-500 uppercase mb-2">
                  Runtime Call Stack
                </div>
                <div className="space-y-1">
                  {(stepData.internalState.stack || []).map((frame, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm font-mono text-slate-300 bg-slate-800/30 p-1.5 rounded border border-slate-800"
                    >
                      <span className="text-slate-600 w-6 text-right">
                        {i}:
                      </span>
                      <span className="text-purple-300">{frame}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
