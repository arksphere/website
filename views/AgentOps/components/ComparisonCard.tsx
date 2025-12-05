import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface ComparisonCardProps {
  title: string;
  microservice: string;
  agent: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, microservice, agent }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-4 hover:border-brand-500/50 transition-colors group">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-brand-900/30 rounded text-brand-400">
          <ArrowRightLeft size={16} />
        </div>
        <h3 className="font-semibold text-slate-200">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-dark-border pr-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Standard Microservice</p>
          <p className="text-sm text-slate-300 leading-relaxed">{microservice}</p>
        </div>
        <div className="pl-2">
          <p className="text-xs text-brand-400 uppercase font-bold mb-1">AI Agent</p>
          <p className="text-sm text-white leading-relaxed">{agent}</p>
        </div>
      </div>
    </div>
  );
};