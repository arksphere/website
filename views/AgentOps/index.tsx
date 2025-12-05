import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ViewState } from "./types";
import { ScenarioView } from "./views/ScenarioView";
import { DevelopmentView } from "./views/DevelopmentView";
import { KubernetesView } from "./views/KubernetesView";
import { OperationsView } from "./views/OperationsView";
import { WalkthroughView } from "./views/WalkthroughView";

export const AgentOps: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.SCENARIO);

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
    <div className="h-[calc(100vh-64px)] bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-slate-200 font-sans flex transition-colors duration-300 overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      <main className="flex-1 ml-64 p-8 h-full overflow-hidden flex flex-col">
        <div className="flex-1 pr-2 custom-scrollbar relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};
