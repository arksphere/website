import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllProjects } from "../src/data/projects-index";
import { Project } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface CategoryInfo {
  name: string;
  description: string;
  color: string;
  projects: Project[];
}

export const OssHubIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const projects = useMemo(() => getAllProjects(), []);

  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      "Agentic Runtimes & Frameworks":
        "Execution and workflow engines for agents as processes. Contracts, state, and orchestration around the runtime.",
      "AI Native Infra & Serving":
        "Inference engines, GPU optimization, serving gateways, and distributed compute that power the runtime layer.",
      "Orchestration & Scheduling":
        "Schedulers, queues, and control planes that route agent work with guarantees and priorities.",
      "RAG & Retrieval":
        "Retrievers, vector stores, rerankers, and pipelines that feed context into agent workflows.",
      "Observability & Ops":
        "Metrics, tracing, evaluation, and interface layers that keep the runtime understandable and debuggable.",
    };
    return descriptions[category] || "AI infrastructure and tools";
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Agentic Runtimes & Frameworks": "blue",
      "AI Native Infra & Serving": "indigo",
      "Orchestration & Scheduling": "orange",
      "RAG & Retrieval": "purple",
      "Observability & Ops": "green",
    };
    return colors[category] || "gray";
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 hover:border-blue-500",
      green:
        "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 hover:border-green-500",
      gray: "bg-gray-50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20 hover:border-gray-500",
      yellow:
        "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 hover:border-yellow-500",
      pink: "bg-pink-50 dark:bg-pink-500/10 border-pink-200 dark:border-pink-500/20 hover:border-pink-500",
      purple:
        "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 hover:border-purple-500",
      indigo:
        "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 hover:border-indigo-500",
      red: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 hover:border-red-500",
      orange:
        "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 hover:border-orange-500",
    };
    return colorMap[color] || colorMap.gray;
  };

  // Filter projects based on search query with title priority
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const matches = projects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        project.primaryCategory?.toLowerCase().includes(query) ||
        project.category?.toLowerCase().includes(query)
      );
    });

    // Sort by title match priority
    return matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aTitleMatch = aTitle.includes(query);
      const bTitleMatch = bTitle.includes(query);

      // Prioritize title matches
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;

      // If both match title or both don't, sort by title starts with query
      const aStartsWith = aTitle.startsWith(query);
      const bStartsWith = bTitle.startsWith(query);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Finally, alphabetical order
      return aTitle.localeCompare(bTitle);
    });
  }, [projects, searchQuery]);

  // Group projects by category (always show all projects)
  const categorizedProjects = useMemo(() => {
    const categories: Record<string, CategoryInfo> = {};

    projects.forEach((project) => {
      const category = project.primaryCategory || project.category || "Other";

      if (!categories[category]) {
        categories[category] = {
          name: category,
          description: getCategoryDescription(category),
          color: getCategoryColor(category),
          projects: [],
        };
      }

      categories[category].projects.push(project);
    });

    // Sort categories by a predefined order, then by project count
    const categoryOrder = [
      "Agentic Runtimes & Frameworks",
      "AI Native Infra & Serving",
      "Orchestration & Scheduling",
      "RAG & Retrieval",
      "Observability & Ops",
    ];
    return Object.values(categories).sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.name);
      const bIndex = categoryOrder.indexOf(b.name);

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return b.projects.length - a.projects.length;
    });
  }, [projects]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchQuery || filteredProjects.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < Math.min(filteredProjects.length - 1, 9) ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = filteredProjects[selectedIndex];
      if (selected) {
        window.location.href = `/osshub/${selected.slug}`;
      }
    } else if (e.key === "Escape") {
      setSearchQuery("");
      setSelectedIndex(-1);
    }
  };

  // Reset selected index when search query changes
  React.useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <Helmet>
        <title>OSS Hub - ArkSphere Open Source Projects</title>
        <meta
          name="description"
          content="Curated open-source projects around Agentic Runtime, AI Native Infra, and the surrounding ecosystem."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="hub-header text-center mb-16 space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 text-sm font-semibold text-gray-600 dark:text-gray-300 backdrop-blur-sm">
          Resource entry to the runtime stack
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
          AI OSS Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Curated open-source projects around Agentic Runtime, AI Native Infra,
          and the surrounding ecosystem.
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-8 relative">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search projects by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery && filteredProjects.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
              {filteredProjects.slice(0, 10).map((project, index) => (
                <Link
                  key={project.slug}
                  to={`/osshub/${project.slug}`}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedIndex(-1);
                  }}
                  className={`block px-6 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                    index === selectedIndex
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                      {project.primaryCategory && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                          {project.primaryCategory}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              {filteredProjects.length > 10 && (
                <div className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400 text-center bg-gray-50 dark:bg-gray-700/50">
                  +{filteredProjects.length - 10} more results
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {searchQuery && filteredProjects.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 z-50">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No projects found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/osshub/${project.slug}`}
                className="group block p-6 bg-white dark:bg-[#1e1e1e] rounded-xl border-2 border-blue-200 dark:border-blue-500/30 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    Featured
                  </span>
                </div>
                {project.primaryCategory && (
                  <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    {project.primaryCategory}
                  </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorizedProjects.slice(0, 12).map((category) => (
            <div key={category.name} className="relative group h-full">
              <Link
                to={`/osshub/category/${encodeURIComponent(category.name)}`}
                className={`flex flex-col h-full p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getColorClasses(
                  category.color
                )}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {category.projects.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.projects.slice(0, 3).map((project) => (
                    <Link
                      key={project.slug}
                      to={`/osshub/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="relative z-10 text-xs px-2 py-1 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {project.title}
                    </Link>
                  ))}
                  {category.projects.length > 3 && (
                    <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-500">
                      +{category.projects.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Future Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            🤖 AI Workflow Builder
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select your use case, and AI will automatically build a complete
            tech stack with architecture diagram.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-sm font-semibold">
            Coming Soon
          </span>
        </div>

        <div className="p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            📊 Project Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View detailed metrics, ratings, and community insights for each
            project to make informed decisions.
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-sm font-semibold">
            Coming Soon
          </span>
        </div>
      </div>

      {/* Contribute CTA */}
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-500 mb-4">
          Have a project to add?
        </p>
        <a
          href="https://github.com/arksphere/website"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
          Contribute on GitHub
        </a>
      </div>
    </div>
  );
};
