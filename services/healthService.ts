/**
 * Health Service
 * Fetches health metrics for AI open source projects from Cloudflare Worker
 */

// Configuration
const WORKER_URL = 'https://ai-oss-rank-worker.jimmysong.io';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
const CACHE_KEY_PREFIX = 'ai-health-';

// Types
export interface HealthScores {
  health: number;
  activity: number;
  community: number;
  quality: number;
  sustainability?: number;
}

export interface HealthMetrics {
  stars: number;
  forks: number;
  contributors?: number;
  openIssues?: number;
  daysSinceLastCommit: number | null;
  lastCommitAt?: string;
}

export interface HealthTags {
  isArchived?: boolean;
}

export interface HealthMetadata {
  localeOssDate?: string;
}

export interface HealthData {
  repo: string;
  scores: HealthScores;
  metrics: HealthMetrics;
  tags?: HealthTags;
  metadata?: HealthMetadata;
}

export interface HealthLevel {
  min: number;
  label: { zh: string; en: string };
  class: 'excellent' | 'good' | 'fair' | 'poor';
  icon: string;
}

// Health score thresholds and levels
export const HEALTH_LEVELS: Record<string, HealthLevel> = {
  excellent: { min: 80, label: { zh: '优秀', en: 'Excellent' }, class: 'excellent', icon: '🌟' },
  good: { min: 60, label: { zh: '良好', en: 'Good' }, class: 'good', icon: '✅' },
  fair: { min: 40, label: { zh: '一般', en: 'Fair' }, class: 'fair', icon: '⚠️' },
  poor: { min: 0, label: { zh: '较差', en: 'Poor' }, class: 'poor', icon: '❌' }
};

// Smart badge configurations
export interface BadgeConfig {
  key: string;
  check: (data: HealthData & { oss_date?: string }) => boolean;
  label: { zh: string; en: string };
  icon: string;
  class: string;
  priority: number;
}

export const SMART_BADGE_CONFIGS: BadgeConfig[] = [
  {
    key: 'archived',
    check: (data) => data.tags?.isArchived === true,
    label: { zh: '已归档', en: 'Archived' },
    icon: '📦',
    class: 'badge-archived',
    priority: 1
  },
  {
    key: 'veryHighPopularity',
    check: (data) => data.metrics && data.metrics.stars >= 50000,
    label: { zh: '顶级热度', en: 'Top Trending' },
    icon: '⭐',
    class: 'badge-trending',
    priority: 2
  },
  {
    key: 'highPopularity',
    check: (data) => data.metrics && data.metrics.stars >= 10000,
    label: { zh: '高人气', en: 'Popular' },
    icon: '🔥',
    class: 'badge-popular',
    priority: 3
  },
  {
    key: 'newProject',
    check: (data) => {
      const ossDate = data.metadata?.localeOssDate || data.oss_date;
      if (!ossDate) return false;
      const createdAt = new Date(ossDate);
      const now = new Date();
      const diffMonths = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30);
      return diffMonths <= 3;
    },
    label: { zh: '新项目', en: 'New' },
    icon: '🆕',
    class: 'badge-new',
    priority: 4
  },
  {
    key: 'activeDevelopment',
    check: (data) => {
      if (data.metrics?.daysSinceLastCommit !== null && data.metrics?.daysSinceLastCommit !== undefined) {
        return data.metrics.daysSinceLastCommit <= 30;
      }
      if (!data.metrics?.lastCommitAt) return false;
      const lastUpdate = new Date(data.metrics.lastCommitAt);
      const now = new Date();
      const diffDays = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 30;
    },
    label: { zh: '活跃开发', en: 'Active' },
    icon: '🚀',
    class: 'badge-active',
    priority: 5
  },
  {
    key: 'wellMaintained',
    check: (data) => data.scores && data.scores.quality >= 70,
    label: { zh: '维护良好', en: 'Well Maintained' },
    icon: '✅',
    class: 'badge-maintained',
    priority: 6
  },
  {
    key: 'largeCommunity',
    check: (data) => data.metrics && data.metrics.forks >= 1000,
    label: { zh: '大型社区', en: 'Large Community' },
    icon: '👥',
    class: 'badge-community',
    priority: 7
  },
  {
    key: 'matureTechnology',
    check: (data) => {
      const ossDate = data.metadata?.localeOssDate || data.oss_date;
      if (!ossDate) return false;
      const createdAt = new Date(ossDate);
      const now = new Date();
      const diffYears = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return diffYears >= 3 && data.metrics && data.metrics.stars >= 5000;
    },
    label: { zh: '成熟技术', en: 'Mature' },
    icon: '🏆',
    class: 'badge-mature',
    priority: 8
  },
  {
    key: 'inactive',
    check: (data) => {
      if (!data.metrics?.daysSinceLastCommit) return false;
      return data.metrics.daysSinceLastCommit >= 180;
    },
    label: { zh: '不活跃', en: 'Inactive' },
    icon: '💤',
    class: 'badge-inactive',
    priority: 9
  },
  {
    key: 'rapidGrowth',
    check: (data) => {
      const ossDate = data.metadata?.localeOssDate || data.oss_date;
      if (!data.metrics || !ossDate) return false;
      const createdAt = new Date(ossDate);
      const now = new Date();
      const months = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (months < 1) return false;
      const starsPerMonth = data.metrics.stars / months;
      return starsPerMonth >= 100;
    },
    label: { zh: '快速增长', en: 'Fast Growing' },
    icon: '📈',
    class: 'badge-growth',
    priority: 10
  }
];

// Helper functions
function normalizeRepoSlug(repo: string): string {
  return (repo || '').trim().toLowerCase();
}

function getCacheKey(repo: string, locale: string): string {
  return `${CACHE_KEY_PREFIX}${locale}:${repo}`;
}

function getCachedData(repo: string, locale: string): HealthData | null | undefined {
  try {
    const key = getCacheKey(repo, locale);
    const cached = localStorage.getItem(key);
    if (!cached) return undefined;

    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return undefined;
    }

    return data.value;
  } catch {
    return undefined;
  }
}

function setCachedData(repo: string, locale: string, data: HealthData | null): void {
  try {
    localStorage.setItem(getCacheKey(repo, locale), JSON.stringify({
      timestamp: Date.now(),
      value: data
    }));
  } catch {
    // Ignore storage errors
  }
}

// Get health level based on score
export function getHealthLevel(score: number): HealthLevel {
  if (score >= HEALTH_LEVELS.excellent.min) return HEALTH_LEVELS.excellent;
  if (score >= HEALTH_LEVELS.good.min) return HEALTH_LEVELS.good;
  if (score >= HEALTH_LEVELS.fair.min) return HEALTH_LEVELS.fair;
  return HEALTH_LEVELS.poor;
}

// Calculate days since last commit (with fallback)
export function calculateDaysSinceLastCommit(data: HealthData): number | null {
  // Check if metrics exists first
  if (!data || !data.metrics) {
    return null;
  }
  
  if (data.metrics.daysSinceLastCommit !== null && data.metrics.daysSinceLastCommit !== undefined) {
    return data.metrics.daysSinceLastCommit;
  }
  
  if (data.metrics.lastCommitAt) {
    const lastCommit = new Date(data.metrics.lastCommitAt);
    const now = new Date();
    const days = Math.floor((now.getTime() - lastCommit.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  }
  
  return null;
}

// Generate smart badges based on health data
export interface SmartBadge {
  key: string;
  priority: number;
  icon: string;
  label: string;
  class: string;
}

export function generateSmartBadges(healthData: HealthData, ossDate?: string, lang: string = 'en'): SmartBadge[] {
  const checkData = {
    ...healthData,
    oss_date: ossDate
  };

  const matchingBadges: SmartBadge[] = [];
  for (const config of SMART_BADGE_CONFIGS) {
    if (config.check(checkData)) {
      matchingBadges.push({
        key: config.key,
        priority: config.priority,
        icon: config.icon,
        label: config.label[lang as 'zh' | 'en'] || config.label.en,
        class: config.class
      });
    }
  }

  matchingBadges.sort((a, b) => a.priority - b.priority);
  return matchingBadges;
}

// Extract repo slug from GitHub URL
export function extractRepoFromUrl(githubUrl: string): string | null {
  if (!githubUrl) return null;
  
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== 'github.com') return null;
    
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch {
    // Try regex fallback
    const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+)/);
    if (match) return match[1];
  }
  
  return null;
}

// Fetch health data for a single repo
export async function fetchHealthData(repo: string, locale: string = 'en'): Promise<HealthData | null> {
  const normalizedRepo = normalizeRepoSlug(repo);
  
  // Check cache first
  const cached = getCachedData(normalizedRepo, locale);
  if (cached !== undefined) {
    return cached;
  }

  try {
    const url = `${WORKER_URL}/api/health?repos=${encodeURIComponent(repo)}&locale=${locale}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch health data [${response.status}]: ${response.statusText}`);
      setCachedData(normalizedRepo, locale, null);
      return null;
    }

    const payload = await response.json();
    
    if (payload && Array.isArray(payload.projects) && payload.projects.length > 0) {
      const project = payload.projects[0];
      setCachedData(normalizedRepo, locale, project);
      return project;
    }

    setCachedData(normalizedRepo, locale, null);
    return null;
  } catch (error) {
    console.error('Failed to fetch health data:', error);
    setCachedData(normalizedRepo, locale, null);
    return null;
  }
}

// Format number with K suffix
export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
