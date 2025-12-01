import type React from 'react';
import type { Project } from '../../types';

export interface LoadedProject extends Project {
  frontmatter?: any;
  component?: React.ComponentType<any>;
}

const projectModules = import.meta.glob('./projects/*.md', { eager: true });

const mapToPrimaryCategory = (category?: string, tags: string[] = []): string => {
  const normalized = (category || '').toLowerCase();

  if (normalized.includes('agent')) return 'Agentic Runtimes & Frameworks';
  if (normalized.includes('workflow') || normalized.includes('orchestration')) return 'Orchestration & Scheduling';
  if (normalized.includes('rag')) return 'RAG & Retrieval';
  if (normalized.includes('infer') || normalized.includes('training') || normalized.includes('ai infra')) return 'AI Native Infra & Serving';
  if (normalized.includes('observability') || normalized.includes('ops') || normalized.includes('monitor')) return 'Observability & Ops';

  if (tags.some((t) => t.toLowerCase().includes('rag'))) return 'RAG & Retrieval';
  if (tags.some((t) => t.toLowerCase().includes('agent'))) return 'Agentic Runtimes & Frameworks';
  if (tags.some((t) => t.toLowerCase().includes('gpu') || t.toLowerCase().includes('k8s'))) return 'AI Native Infra & Serving';

  return 'Observability & Ops';
};

const mapRoleInStack = (primaryCategory: string): string => {
  switch (primaryCategory) {
    case 'Agentic Runtimes & Frameworks':
      return 'Runtime -> Workflows';
    case 'AI Native Infra & Serving':
      return 'Infra -> Serving/Compute';
    case 'Orchestration & Scheduling':
      return 'Runtime -> Scheduling';
    case 'RAG & Retrieval':
      return 'Hub -> Retrieval';
    default:
      return 'Ops -> Observability';
  }
};

const normalizeProject = (entry: [string, unknown]): LoadedProject => {
  const [path, mod] = entry;
  const md: any = mod;
  
  // MDX modules with remark-mdx-frontmatter export frontmatter as a named export
  const frontmatter = md.frontmatter || {};
  
  const slug = frontmatter.slug || path.split('/').pop()?.replace('.md', '') || '';
  const tags = frontmatter.tags || [];
  const primaryCategory = frontmatter.primaryCategory || mapToPrimaryCategory(frontmatter.category, tags);
  const derivedRole = mapRoleInStack(primaryCategory);

  return {
    slug,
    title: frontmatter.title || slug,
    description: frontmatter.description || '',
    tags: frontmatter.tags || [],
    link: frontmatter.link || frontmatter.website || '',
    github: frontmatter.github || '',
    thumbnail: frontmatter.thumbnail || frontmatter.image || '',
    date: frontmatter.date || frontmatter.oss_date || new Date().toISOString(),
    featured: frontmatter.featured || false,
    category: frontmatter.category,
    primaryCategory,
    roleInStack: frontmatter.role_in_stack || derivedRole,
    positionInStack: frontmatter.position_in_stack || frontmatter.role_in_stack || derivedRole,
    frontmatter,
    component: md.default,
  };
};

const cachedProjects: LoadedProject[] = Object.entries(projectModules)
  .map(normalizeProject)
  .filter((p) => !p.frontmatter?.archived && !(p.tags || []).includes('archived'));

export const getAllProjects = (): LoadedProject[] => cachedProjects;

export const getProjectBySlug = (slug?: string): LoadedProject | undefined =>
  cachedProjects.find((p) => p.slug === slug);
