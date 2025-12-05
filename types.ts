import React from 'react';

export enum View {
  OVERVIEW = 'Overview',
  AGENT_RUNTIME = 'AgentRuntime',
  AI_INFRA = 'AiInfra',
  OSS_HUB = 'OssHub',
  COMMUNITY = 'Community',
  AGENTOPS = 'AgentOps',
  AGENTOPS_ARCHITECT = 'AgentOpsArchitect'
}

export interface NavItem {
  label: string;
  view: View;
}

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}



export interface OssProject {
  name: string;
  description: string;
  tags: string[];
  stars: string;
  url: string;
  category: string;
  roleInStack?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github: string;
  thumbnail: string;
  date: string;
  featured: boolean;
  category?: string;
  primaryCategory?: string;
  roleInStack?: string;
  positionInStack?: string;
}

export type ProjectCategory =
  | 'Agentic Runtimes & Frameworks'
  | 'AI Native Infra & Serving'
  | 'Orchestration & Scheduling'
  | 'RAG & Retrieval'
  | 'Observability & Ops'
  | string;

export interface ProjectMetrics {
  slug: string;
  stars: number;
  forks: number;
  contributors: number;
  lastUpdated: string;
  openIssues?: number;
  license?: string;
}

export interface ProjectFrontmatter {
  title: string;
  category?: string;
  rating?: number;
  relatedProjects?: string[];
  screenshots?: string[];
  documentation?: string;
}

export interface ProjectDetail {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: React.ComponentType;
}
