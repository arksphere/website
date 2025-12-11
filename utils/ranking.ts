import { getAllProjects } from '../src/data/projects-index';
import { fetchHealthData, extractRepoFromUrl, calculateDaysSinceLastCommit } from '../services/healthService';
import { RANKING_WEIGHTS, MAX_FRESHNESS_DAYS } from '../constants/ranking';
import { Project } from '../types';

export interface ProjectWithScore extends Project {
  score?: number;
  rankOverall?: number;
  rankInCategory?: number;
  healthData?: any;
}

export interface RankedProject {
  slug: string;
  title: string;
  category?: string;
  primaryCategory?: string;
  score: number;
  rank: number;
  health: number;
  activity: number;
  community: number;
  impact: number;
  freshness: number;
}

/**
 * Calculate freshness score based on days since last commit
 */
export function calculateFreshness(daysSinceLastCommit: number | null): number {
  if (daysSinceLastCommit === null || daysSinceLastCommit === undefined) {
    return 0;
  }
  return Math.max(0, 100 - daysSinceLastCommit);
}

/**
 * Calculate project score based on health metrics
 */
export function calculateScore(healthData: any): number {
  if (!healthData?.scores) return 0;

  const health = healthData.scores.health || 0;
  const activity = healthData.scores.activity || 0;
  const community = healthData.scores.community || 0;
  const impact = healthData.scores.quality || 0; // Using quality as impact

  const daysSinceLastCommit = calculateDaysSinceLastCommit(healthData);
  const freshness = calculateFreshness(daysSinceLastCommit);

  return (
    RANKING_WEIGHTS.impact * impact +
    RANKING_WEIGHTS.activity * activity +
    RANKING_WEIGHTS.health * health +
    RANKING_WEIGHTS.community * community +
    RANKING_WEIGHTS.freshness * freshness
  );
}

/**
 * Load all projects with their health data and scores
 */
export async function loadAllProjectsWithScores(): Promise<ProjectWithScore[]> {
  const projects = getAllProjects();
  const projectsWithScores: ProjectWithScore[] = [];

  for (const project of projects) {
    try {
      if (project.github) {
        const repo = extractRepoFromUrl(project.github);
        if (repo) {
          const healthData = await fetchHealthData(repo, 'en');
          if (healthData) {
            const score = calculateScore(healthData);
            projectsWithScores.push({
              ...project,
              score,
              healthData
            });
          } else {
            projectsWithScores.push({
              ...project,
              score: 0
            });
          }
        } else {
          projectsWithScores.push({
            ...project,
            score: 0
          });
        }
      } else {
        projectsWithScores.push({
          ...project,
          score: 0
        });
      }
    } catch (error) {
      console.error(`Error loading health data for ${project.slug}:`, error);
      projectsWithScores.push({
        ...project,
        score: 0
      });
    }
  }

  return projectsWithScores;
}

/**
 * Load projects with scores for a specific category only
 * This is much faster than loading all projects
 */
export async function loadProjectsWithScoresByCategory(
  categoryName: string
): Promise<ProjectWithScore[]> {
  const allProjects = getAllProjects();
  const categoryProjects = allProjects.filter(
    p => p.primaryCategory === categoryName
  );
  
  // Parallel API calls with Promise.all for better performance
  const promises = categoryProjects.map(async (project) => {
    try {
      if (project.github) {
        const repo = extractRepoFromUrl(project.github);
        if (repo) {
          const healthData = await fetchHealthData(repo, 'en');
          if (healthData) {
            return {
              ...project,
              score: calculateScore(healthData),
              healthData
            };
          }
        }
      }
      return { ...project, score: 0 };
    } catch (error) {
      console.error(`Error loading health data for ${project.slug}:`, error);
      return { ...project, score: 0 };
    }
  });
  
  return await Promise.all(promises);
}

/**
 * Get top N projects by score
 */
export function getTopNProjects(projects: ProjectWithScore[], n: number = 10): RankedProject[] {
  // Filter out projects without scores
  const projectsWithScores = projects.filter(p => p.score !== undefined && !isNaN(p.score));

  // Sort by score descending
  const sorted = [...projectsWithScores].sort((a, b) => (b.score || 0) - (a.score || 0));

  // Take top N and add rank
  return sorted.slice(0, n).map((project, index) => {
    const healthData = project.healthData;
    return {
      slug: project.slug,
      title: project.title,
      category: project.category,
      primaryCategory: project.primaryCategory,
      score: project.score || 0,
      rank: index + 1,
      health: healthData?.scores?.health || 0,
      activity: healthData?.scores?.activity || 0,
      community: healthData?.scores?.community || 0,
      impact: healthData?.scores?.quality || 0,
      freshness: calculateFreshness(calculateDaysSinceLastCommit(healthData))
    };
  });
}

/**
 * Get projects by category with scores
 */
export function getProjectsByCategory(projects: ProjectWithScore[], category: string): RankedProject[] {
  const filtered = projects.filter(p =>
    p.primaryCategory === category &&
    p.score !== undefined &&
    !isNaN(p.score)
  );

  // Sort by score descending
  const sorted = [...filtered].sort((a, b) => (b.score || 0) - (a.score || 0));

  // Add rank within category
  return sorted.map((project, index) => {
    const healthData = project.healthData;
    return {
      slug: project.slug,
      title: project.title,
      category: project.category,
      primaryCategory: project.primaryCategory,
      score: project.score || 0,
      rank: index + 1,
      health: healthData?.scores?.health || 0,
      activity: healthData?.scores?.activity || 0,
      community: healthData?.scores?.community || 0,
      impact: healthData?.scores?.quality || 0,
      freshness: calculateFreshness(calculateDaysSinceLastCommit(healthData))
    };
  });
}

/**
 * Calculate ranks for all projects
 */
export async function calculateAllRanks(): Promise<ProjectWithScore[]> {
  const projectsWithScores = await loadAllProjectsWithScores();

  // Calculate overall ranks
  const projectsWithOverallRanks = [...projectsWithScores]
    .filter(p => p.score !== undefined && !isNaN(p.score))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .map((project, index) => ({
      ...project,
      rankOverall: index + 1
    }));

  // Calculate category ranks
  const categories = Array.from(new Set(projectsWithScores.map(p => p.primaryCategory).filter(Boolean) as string[]));

  for (const category of categories) {
    const categoryProjects = projectsWithScores.filter(p => p.primaryCategory === category && p.score !== undefined && !isNaN(p.score));
    const sortedCategoryProjects = [...categoryProjects].sort((a, b) => (b.score || 0) - (a.score || 0));

    for (let i = 0; i < sortedCategoryProjects.length; i++) {
      const projectSlug = sortedCategoryProjects[i].slug;
      const projectIndex = projectsWithOverallRanks.findIndex(p => p.slug === projectSlug);
      if (projectIndex !== -1) {
        projectsWithOverallRanks[projectIndex] = {
          ...projectsWithOverallRanks[projectIndex],
          rankInCategory: i + 1
        };
      }
    }
  }

  return projectsWithOverallRanks;
}

/**
 * Get project rank stats by slug
 */
export async function getProjectRankStats(slug: string): Promise<{
  rankOverall?: number;
  rankInCategory?: number;
  score?: number;
  category?: string;
} | null> {
  const allProjects = await calculateAllRanks();
  const project = allProjects.find(p => p.slug === slug);

  if (!project) return null;

  return {
    rankOverall: project.rankOverall,
    rankInCategory: project.rankInCategory,
    score: project.score,
    category: project.primaryCategory
  };
}
