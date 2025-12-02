import React, { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MDXProvider } from "@mdx-js/react";
import { getAllProjects, getProjectBySlug } from "../src/data/projects-index";
import { ProjectMetrics } from "../types";
import { HealthBars, SmartBadges } from "../components/HealthIndicators";

const projects = getAllProjects();
const mdxComponents: Record<string, React.ComponentType<any>> = {
  h1: (props) => (
    <h1
      className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white"
      {...props}
    />
  ),
  p: (props) => (
    <p className="leading-7 mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ul: (props) => (
    <ul
      className="list-disc pl-6 space-y-2 mb-4 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 space-y-2 mb-4 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  a: (props) => (
    <a
      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-sm font-mono text-pink-600 dark:text-pink-300"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="rounded-xl bg-[#0f172a] text-gray-100 p-4 overflow-auto text-sm mb-4"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 bg-blue-50/60 dark:bg-blue-500/10 rounded-r-lg py-2 mb-4"
      {...props}
    />
  ),
  img: (props) => (
    <img
      className="rounded-lg border border-gray-200 dark:border-gray-800 my-4"
      {...props}
    />
  ),
};

class MdxErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Error rendering project MDX content", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-8 px-6 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 mb-12 text-red-800 dark:text-red-300">
          Unable to render project details. Please check the console for more
          information.
        </div>
      );
    }
    return this.props.children;
  }
}

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = slug ? getProjectBySlug(slug) : undefined;
  const mdxContent = project?.component;
  const frontmatter = project?.frontmatter;
  const metrics: ProjectMetrics | null = null;
  const loading = false;
  const error = null;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/osshub"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to OSS Hub
        </Link>
      </div>
    );
  }

  const formatDate = (value?: string) => {
    if (!value) return null;
    try {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return null;
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  };

  const metadata = {
    author: frontmatter?.author || project.title,
    ossDate: formatDate(frontmatter?.oss_date),
    lastUpdated: formatDate(frontmatter?.lastmod),
  };

  const relatedProjects = (() => {
    if (frontmatter?.relatedProjects?.length) {
      return projects
        .filter(
          (p) => p.slug !== slug && frontmatter.relatedProjects.includes(p.slug)
        )
        .slice(0, 3);
    }
    const tagMatches = projects
      .filter(
        (p) =>
          p.slug !== slug && p.tags.some((tag) => project.tags.includes(tag))
      )
      .slice(0, 3);
    if (tagMatches.length > 0) return tagMatches;
    // fallback: latest three excluding current
    return projects
      .filter((p) => p.slug !== slug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  })();

  let mdxSection: React.ReactNode = null;

  try {
    if (loading) {
      mdxSection = (
        <div className="py-12 text-center">
          <div className="text-gray-600 dark:text-gray-400">
            Loading project details...
          </div>
        </div>
      );
    } else if (mdxContent) {
      mdxSection = (
        <MdxErrorBoundary>
          <div className="prose max-w-none mb-12">
            <Suspense fallback={<div>Loading content...</div>}>
              <MDXProvider components={mdxComponents}>
                {React.createElement(mdxContent)}
              </MDXProvider>
            </Suspense>
          </div>
        </MdxErrorBoundary>
      );
    } else {
      mdxSection = (
        <div className="py-8 px-6 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 mb-12">
          <p className="text-yellow-800 dark:text-yellow-400">
            Detailed documentation for this project is coming soon. Visit the
            GitHub repository or official website for more information.
          </p>
        </div>
      );
    }
  } catch (err) {
    console.error("Error preparing project MDX content", err);
    mdxSection = (
      <div className="py-8 px-6 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 mb-12 text-red-800 dark:text-red-300">
        Unable to render project details. Please check the console for more
        information.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Helmet>
        <title>{project.title} - ArkSphere OSS Hub</title>
        <meta name="description" content={project.description} />
        <meta
          property="og:title"
          content={`${project.title} - ArkSphere OSS Hub`}
        />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.thumbnail} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm pt-4">
        <Link
          to="/osshub"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          OSS Hub
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        {project.primaryCategory && (
          <>
            <Link
              to={`/osshub/category/${encodeURIComponent(
                project.primaryCategory
              )}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {project.primaryCategory}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </>
        )}
        <span className="text-gray-600 dark:text-gray-400">
          {project.title}
        </span>
      </nav>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
        {/* Project Header + Content */}
        <div className="space-y-8">
          <div className="mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {frontmatter?.description || project.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-3">
              {metadata.author && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                  <span aria-hidden="true">👤</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Author
                  </span>
                  <strong>{metadata.author}</strong>
                </span>
              )}
              {metadata.ossDate && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                  <span aria-hidden="true">📅</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    OSS since
                  </span>
                  <strong>{metadata.ossDate}</strong>
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Official Website
                </a>
              )}
              {frontmatter?.documentation && (
                <a
                  href={frontmatter.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Documentation
                </a>
              )}
              <a
                href={`https://github.com/arksphere/website/edit/main/src/data/projects/${slug}.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit on GitHub
              </a>
            </div>
          </div>

          {/* Metrics Section */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.stars.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Stars
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.forks.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Forks
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.contributors.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Contributors
                </div>
              </div>
              {metrics.openIssues !== undefined && (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.openIssues.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Open Issues
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MDX Content */}
          {mdxSection}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1115] overflow-hidden shadow-sm">
            {frontmatter?.thumbnail || project.thumbnail ? (
              <img
                src={frontmatter?.thumbnail || project.thumbnail}
                alt={`${project.title} thumbnail`}
                className="w-full h-48 object-cover border-b border-gray-200 dark:border-gray-800"
                onError={(e) => {
                  // Hide broken images
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-200">
                No thumbnail
              </div>
            )}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Project Health
                </h3>
              </div>
              {project.github ? (
                <div className="space-y-4">
                  <HealthBars
                    githubUrl={project.github}
                    ossDate={frontmatter?.oss_date}
                    lang="en"
                  />
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <SmartBadges
                        githubUrl={project.github}
                        ossDate={frontmatter?.oss_date}
                        lang="en"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
                  No GitHub repository linked
                </div>
              )}
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Related Projects
              </h3>
              <div className="grid gap-3">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    to={`/osshub/${relatedProject.slug}`}
                    className="group block rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111] p-3 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {relatedProject.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedProject.frontmatter?.description ||
                        relatedProject.description ||
                        "No description available."}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
