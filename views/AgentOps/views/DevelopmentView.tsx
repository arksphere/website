import React, { useState } from 'react';
import { FolderTree, Code, Hammer, GitGraph, ArrowRight, Package, Upload, PlayCircle } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { ComparisonCard } from '../components/ComparisonCard';

export const DevelopmentView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structure' | 'tools' | 'graph'>('structure');

  const structureCode = `agent-service/
  app/
    __init__.py
    main.py           # KGateway entry / Edge Func
    graph.py          # LangGraph State Machine
    tools/
      jira.py         # Tool Schema Definition
      rag.py          # Vector Retrieval
    runtime/
      state.py        # Redis/PG Checkpointing
      router.py       # LiteLLM Router
  tests/
  Dockerfile          # Python 3.12
  pyproject.toml`;

  const toolCode = `# app/tools/jira.py
from langchain.tools import tool
from .client import JiraClient

# Tools defined with Pydantic v2 schemas for safe LLM consumption
@tool("create_ticket", args_schema=CreateTicketSchema)
def create_ticket(summary: str, description: str, priority: str = "Medium") -> dict:
    """Create a new support ticket in Jira."""
    # Logic to call standard REST API
    return jira_client.create(summary, description, priority)`;

  const graphCode = `# app/graph.py
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.postgres import PostgresSaver

# 2026 Standard: Async State Machine Runtime
def build_graph():
    workflow = StateGraph(State)

    # Nodes (Functional Units)
    workflow.add_node("router", route_intent)
    workflow.add_node("rag_agent", rag_agent_node)
    workflow.add_node("ticket_agent", ticket_agent_node)

    # Edges (Conditional Logic)
    workflow.add_edge(START, "router")
    workflow.add_edge("router", "rag_agent", condition=is_qa)
    workflow.add_edge("router", "ticket_agent", condition=is_ticket)
    
    # Checkpointer for durable, interruptible state
    memory = PostgresSaver(...)
    
    return workflow.compile(checkpointer=memory)`;

  return (
    <div className="flex flex-col pr-2">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          <Code className="text-brand-500" /> Engineering Pipeline
        </h2>
        <p className="text-slate-400">From Local Python Code to Kubernetes Runtime.</p>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-8 overflow-x-auto">
         <div className="flex items-center min-w-[700px] justify-between text-sm">
            
            <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('structure')}>
               <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeTab === 'structure' ? 'bg-brand-600 text-white ring-4 ring-brand-900' : 'bg-slate-800 text-slate-400'}`}>
                  <Code size={20} />
               </div>
               <div className="flex flex-col items-center">
                  <span className={`font-semibold ${activeTab === 'structure' ? 'text-brand-400' : 'text-slate-500'}`}>1. Code</span>
                  <span className="text-[10px] text-slate-600 font-mono">Python 3.12</span>
               </div>
            </div>

            <div className="h-1 flex-1 bg-slate-800 mx-4 relative top-[-10px]">
               <div className="absolute inset-0 bg-brand-900/50 w-1/2"></div>
               <ArrowRight size={14} className="absolute right-0 -top-1.5 text-slate-600" />
            </div>

            <div className="flex flex-col items-center gap-3 opacity-90">
               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-slate-700">
                  <Package size={20} />
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-slate-500 font-semibold">2. Build</span>
                  <span className="text-[10px] text-slate-600 font-mono">Docker/OCl</span>
               </div>
            </div>

            <div className="h-1 flex-1 bg-slate-800 mx-4 top-[-10px] relative"></div>

            <div className="flex flex-col items-center gap-3 opacity-90">
               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-slate-700">
                  <Upload size={20} />
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-slate-500 font-semibold">3. Deploy</span>
                  <span className="text-[10px] text-slate-600 font-mono">Helm/ArgoCD</span>
               </div>
            </div>

            <div className="h-1 flex-1 bg-slate-800 mx-4 top-[-10px] relative"></div>

            <div className="flex flex-col items-center gap-3 opacity-90">
               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-slate-700">
                  <PlayCircle size={20} />
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-slate-500 font-semibold">4. Runtime</span>
                  <span className="text-[10px] text-slate-600 font-mono">KAgent CRD</span>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2">
           <div className="flex items-center gap-4 mb-4 border-b border-dark-border pb-2">
             <button onClick={() => setActiveTab('structure')} className={`text-sm font-semibold pb-2 px-1 ${activeTab === 'structure' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-slate-400 hover:text-white'}`}>Directory</button>
             <button onClick={() => setActiveTab('tools')} className={`text-sm font-semibold pb-2 px-1 ${activeTab === 'tools' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-slate-400 hover:text-white'}`}>Tools</button>
             <button onClick={() => setActiveTab('graph')} className={`text-sm font-semibold pb-2 px-1 ${activeTab === 'graph' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-slate-400 hover:text-white'}`}>Graph Definition</button>
           </div>

          {activeTab === 'structure' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
               <CodeBlock code={structureCode} language="bash" filename="Project Structure" />
            </div>
          )}
          {activeTab === 'tools' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <CodeBlock code={toolCode} language="python" filename="app/tools/jira.py" />
            </div>
          )}
          {activeTab === 'graph' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <CodeBlock code={graphCode} language="python" filename="app/graph.py" />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Design Patterns</h3>
          <ComparisonCard 
            title="Logic Flow" 
            microservice="Linear Controller (MVC)" 
            agent="Cyclic State Graph (DAG)" 
          />
          <ComparisonCard 
            title="State" 
            microservice="Stateless Request" 
            agent="Persistent Checkpoints" 
          />
        </div>
      </div>
    </div>
  );
};