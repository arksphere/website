import React from "react";
import { ViewState } from "../types";
import { NAV_ITEMS } from "../constants";

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onChangeView,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
          <h1 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2 uppercase mb-3">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center">
              <span className="text-white font-mono font-bold text-xs">AO</span>
            </div>
            AgentOps
          </h1>

          {/* Simulation Disclaimer */}
          <div className="text-[0.65rem] leading-relaxed text-gray-500 dark:text-slate-400 pl-2 border-l-2 border-gray-300 dark:border-slate-700 opacity-80">
            <span className="font-semibold block mb-0.5">Simulation Only</span>
            Conceptual visualization of AgentOps orchestration. All metrics and
            cluster states are simulated and do not reflect a live system.
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                currentView === item.id
                  ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-500/20"
                  : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-dark-border/50 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <item.icon size={16} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-dark-border">
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded border border-gray-200 dark:border-dark-border p-3 text-[10px] text-gray-500 dark:text-slate-400 font-mono">
            <div className="flex justify-between mb-1">
              <span>Cluster</span>
              <span className="text-green-500 dark:text-green-400">Ready</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
