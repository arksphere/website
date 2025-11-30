import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllProjects } from '../src/data/projects-index';
import { Project } from '../types';

export const OssHub: React.FC = () => {
  const projects: Project[] = getAllProjects();

  const getCategoryColor = (tags: string[]) => {
    // Determine color based on primary tag
    const primaryTag = tags[0] || '';
    if (primaryTag.includes('Agent') || primaryTag.includes('Agents')) {
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20';
    }
    if (primaryTag.includes('Framework')) {
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20';
    }
    if (primaryTag.includes('Orchestration') || primaryTag.includes('Workflow')) {
      return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20';
    }
    if (primaryTag.includes('Dev Tools') || primaryTag.includes('Vibe Coding')) {
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20';
    }
    if (primaryTag.includes('Evaluation') || primaryTag.includes('RAG')) {
      return 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20';
    }
    return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-500/10 border border-gray-100 dark:border-gray-500/20';
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <Helmet>
        <title>OSS Hub - ArkSphere Open Source Projects</title>
        <meta name="description" content="Explore ArkSphere's curated collection of open-source AI infrastructure projects. Runtime engines, orchestration tools, and Kubernetes operators for production AI." />
      </Helmet>
      <div className="hub-header text-center mb-16 space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 text-sm font-semibold text-gray-600 dark:text-gray-300 backdrop-blur-sm">
          Community Curated
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Open Source AI Hub
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover {projects.length}+ curated open-source projects for AI infrastructure, agents, and tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, 50).map((project) => (
          <a
            key={project.slug}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group block p-6 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-md font-medium ${getCategoryColor(project.tags)}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-20 text-center">
         <p className="text-gray-500 dark:text-gray-500 mb-4">
            Have a project to add?
         </p>
         <a 
            href="https://github.com/arksphere"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
         >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Contribute on GitHub
         </a>
      </div>
    </div>
  );
};
