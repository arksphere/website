import React, { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getAllProjects } from "../src/data/projects-index";
import { CATEGORIES, getCategoryBySlug } from "../src/data/categories";
import {
  loadProjectsWithScoresByCategory,
  getProjectsByCategory,
  RankedProject,
} from "../utils/ranking";
import { RankingList } from "../components/RankingList";

export const CategoryView: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const allProjects = useMemo(() => getAllProjects(), []);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const categoryName = category ? category.name : undefined;

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400",
      green:
        "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400",
      purple:
        "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400",
      indigo:
        "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
      orange:
        "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400",
      gray: "bg-gray-50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20 text-gray-600 dark:text-gray-400",
    };
    return colorMap[color] || colorMap.gray;
  };

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (!categoryName) return [];
    return allProjects.filter(
      (project) => project.primaryCategory === categoryName
    );
  }, [allProjects, categoryName]);

  const categoryColor = category ? category.color : "gray";
  const categoryDescription = category
    ? category.description
    : "AI infrastructure and tools";

  // Category Ranking Section Component
  const CategoryRankingSection: React.FC<{ categoryName: string }> = ({
    categoryName,
  }) => {
    const [rankedProjects, setRankedProjects] = useState<RankedProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const loadCategoryRanking = async () => {
        try {
          const projectsWithScores = await loadProjectsWithScoresByCategory(
            categoryName
          );
          const categoryProjects = getProjectsByCategory(
            projectsWithScores,
            categoryName
          );
          setRankedProjects(categoryProjects.slice(0, 10)); // Top 10 in category
        } catch (err) {
          console.error("Failed to load category ranking data:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      loadCategoryRanking();
    }, [categoryName]);

    if (loading) {
      return (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Category Ranking
          </h2>
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border-2 border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading category rankings...
            </p>
          </div>
        </div>
      );
    }

    if (error || rankedProjects.length === 0) {
      return null;
    }

    return (
      <div className="mb-12">
        <RankingList
          title="Category Ranking"
          projects={rankedProjects}
          showCategory={false}
        />
      </div>
    );
  };

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto pb-20">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h1>
          <Link
            to="/osshub"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to OSS Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <Helmet>
        <title>{categoryName} Projects - ArkSphere OSS Hub</title>
        <meta
          name="description"
          content={`Explore ${filteredProjects.length} ${categoryName} projects in ArkSphere's curated collection. Positioned within the Agentic Runtime, AI Native Infra, and OSS Hub stack. ${categoryDescription}`}
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          to="/osshub"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ← Back to OSS Hub
        </Link>
      </div>

      {/* Category Header */}
      <div className="mb-12">
        <div
          className={`inline-block px-4 py-1.5 rounded-full border-2 mb-4 ${getColorClasses(
            categoryColor
          )}`}
        >
          <span className="text-sm font-semibold">{categoryName}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {categoryName} Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {categoryDescription}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Category Ranking */}
      <CategoryRankingSection categoryName={categoryName} />

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/osshub/${project.slug}`}
              className="group block p-6 bg-white dark:bg-[#1e1e1e] rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-500">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  );
};
