import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ViewState } from "./types";
import { ScenarioView } from "./views/ScenarioView";
import { DevelopmentView } from "./views/DevelopmentView";
import { KubernetesView } from "./views/KubernetesView";
import { OperationsView } from "./views/OperationsView";
import { WalkthroughView } from "./views/WalkthroughView";
import { Menu } from "lucide-react";

export const AgentOps: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.SCENARIO);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.SCENARIO:
        return <ScenarioView />;
      case ViewState.DEVELOPMENT:
        return <DevelopmentView />;
      case ViewState.KUBERNETES:
        return <KubernetesView />;
      case ViewState.OPERATIONS:
        return <OperationsView />;
      case ViewState.WALKTHROUGH:
        return <WalkthroughView />;
      default:
        return <ScenarioView />;
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-slate-200 font-sans flex flex-col md:flex-row transition-colors duration-300 overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden w-full bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center">
            <span className="text-white font-mono font-bold text-xs">AO</span>
          </div>
          <span className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-tight">
            AgentOps
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border"
        >
          <Menu size={20} />
        </button>
      </div>

      <Sidebar
        currentView={currentView}
        onChangeView={(view) => {
          setCurrentView(view);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 md:ml-64 p-4 md:p-8 h-full overflow-hidden flex flex-col">
        <div className="flex-1 pr-2 custom-scrollbar overflow-y-auto relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
