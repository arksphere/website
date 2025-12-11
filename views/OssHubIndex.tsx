import React, { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { getAllProjects } from "../src/data/projects-index";
import { Project } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { CATEGORIES, getCategoryByName } from "../src/data/categories";
import {
  loadAllProjectsWithScores,
  getTopNProjects,
  RankedProject,
} from "../utils/ranking";
import { RankingList } from "../components/RankingList";
import {
  workflowBuilderResponsibilities,
  workflowBuilderCapabilityAnchors,
} from "../src/data/workflow-builder";

interface CategoryInfo {
  name: string;
  description: string;
  color: string;
  slug: string; // Added slug
  projects: Project[];
}

export const OssHubIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const projects = useMemo(() => getAllProjects(), []);

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
      const categoryName =
        project.primaryCategory || project.category || "Other";
      const categoryDef = getCategoryByName(categoryName);

      if (!categories[categoryName]) {
        categories[categoryName] = {
          name: categoryName,
          description: categoryDef
            ? categoryDef.description
            : "AI infrastructure and tools",
          color: categoryDef ? categoryDef.color : "gray",
          slug: categoryDef ? categoryDef.slug : "other",
          projects: [],
        };
      }

      categories[categoryName].projects.push(project);
    });

    // Sort categories by defined order in CATEGORIES array
    return Object.values(categories).sort((a, b) => {
      const aIndex = CATEGORIES.findIndex((c) => c.name === a.name);
      const bIndex = CATEGORIES.findIndex((c) => c.name === b.name);

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      // New categories at the end, sorted by project count
      return b.projects.length - a.projects.length;
    });
  }, [projects]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  // Top Ranked Projects Section Component
  const TopRankedProjectsSection: React.FC = () => {
    const [topProjects, setTopProjects] = useState<RankedProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const loadRankingData = async () => {
        try {
          const projectsWithScores = await loadAllProjectsWithScores();
          const topN = getTopNProjects(projectsWithScores, 10);
          setTopProjects(topN);
        } catch (err) {
          console.error("Failed to load ranking data:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      loadRankingData();
    }, []);

    if (loading) {
      return (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Top Ranked Projects
          </h2>
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border-2 border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading project rankings...
            </p>
          </div>
        </div>
      );
    }

    if (error || topProjects.length === 0) {
      return null;
    }

    return (
      <div className="mb-16">
        <RankingList
          title="Top Ranked Projects"
          projects={topProjects}
          showCategory={true}
        />
      </div>
    );
  };

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

      {/* AI Workflow Builder entry */}
      <section className="mb-16">
        <div className="p-8 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-[#0d1117] dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-200 text-sm font-semibold">
                🤖 AI Workflow Builder
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Plan AI apps into capability graphs, stacks, and DevTasks
              </h3>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
                Dedicated builder page with domain models, planning pipeline, and export options ready for AI coding tools.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/workflow-builder"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Open Builder
                </Link>
                <Link
                  to="/workflow-builder#domain"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  View types
                </Link>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                {workflowBuilderCapabilityAnchors.slice(0, 4).map((capability) => (
                  <div
                    key={capability.capability}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60"
                  >
                    <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-300 uppercase">
                      {capability.capability.replace(/_/g, " ")}
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {capability.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Top Ranked Projects */}
      <TopRankedProjectsSection />

      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorizedProjects.slice(0, 12).map((category) => (
            <div key={category.name} className="relative group h-full">
              <Link
                to={`/osshub/category/${category.slug}`}
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
