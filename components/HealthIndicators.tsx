import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchHealthData,
  extractRepoFromUrl,
  getHealthLevel,
  calculateDaysSinceLastCommit,
  generateSmartBadges,
  formatNumber,
  type HealthData,
  type SmartBadge
} from '../services/healthService';

interface HealthIndicatorsProps {
  githubUrl: string;
  ossDate?: string;
  lang?: string;
}

// Health Bars Component (Sidebar view)
export const HealthBars: React.FC<HealthIndicatorsProps> = ({ githubUrl, ossDate, lang = 'en' }) => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadHealthData = async () => {
      const repo = extractRepoFromUrl(githubUrl);
      if (!repo) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchHealthData(repo, lang);
        setHealthData(data);
        setError(!data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadHealthData();
  }, [githubUrl, lang]);

  if (loading) {
    return (
      <div className="health-loading flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Loading health data...</span>
      </div>
    );
  }

  if (error || !healthData) {
    return (
      <div className="health-error text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
        Health data unavailable
      </div>
    );
  }

  const healthLevel = getHealthLevel(healthData.scores.health);
  const activityLevel = getHealthLevel(healthData.scores.activity);
  const communityLevel = getHealthLevel(healthData.scores.community);
  const qualityLevel = getHealthLevel(healthData.scores.quality);

  const healthScore = Math.round(healthData.scores.health);
  const activityScore = Math.round(healthData.scores.activity);
  const communityScore = Math.round(healthData.scores.community);
  const qualityScore = Math.round(healthData.scores.quality);
  const sustainabilityScore = healthData.scores.sustainability !== undefined ? Math.round(healthData.scores.sustainability) : undefined;

  const daysSinceLastCommit = calculateDaysSinceLastCommit(healthData);
  const updateText = daysSinceLastCommit !== null ? daysSinceLastCommit : '?';

  const activityTooltip = lang === 'zh'
    ? '项目开发维护的活跃程度，基于最近提交时间和提交频率计算。'
    : 'Development activity level based on recent commits and frequency.';

  const communityTooltip = lang === 'zh'
    ? '社区活跃度和参与度，综合考虑贡献者数量、Issue 和 PR 活动。'
    : 'Community engagement based on contributors count, Issues and PRs activity.';

  const qualityTooltip = lang === 'zh'
    ? '项目的社区影响力和成熟度，基于 Star 数、Fork 数、Release 发布频率等指标计算。'
    : 'Community impact and maturity based on Stars, Forks, and Release frequency.';

  return (
    <div className="mt-6 space-y-2 text-sm">
      {/* Overall Health Summary */}
      <div className="text-base font-medium flex items-center gap-2 mb-4">
        <span className="text-red-500">❤️</span>
        <span className="text-gray-900 dark:text-white">
          {lang === 'zh' ? '综合健康度' : 'Overall Health'}:
        </span>
        <span className={`font-semibold ${
            healthLevel.class === 'excellent' ? 'text-green-600 dark:text-green-400' :
            healthLevel.class === 'good' ? 'text-blue-600 dark:text-blue-400' :
            healthLevel.class === 'fair' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-red-600 dark:text-red-400'
          }`}>
          {healthLevel.label[lang as 'zh' | 'en'] || healthLevel.label.en}
        </span>
        <span className="text-gray-400">·</span>
        <span className="font-bold text-gray-900 dark:text-white">{healthScore}</span>
      </div>

      {/* Mini Bars */}
      <div className="space-y-3">
        {/* Activity */}
        <div className="flex items-center gap-2 justify-between" title={activityTooltip}>
          <div className="flex items-center gap-2 min-w-[100px]">
            <span className="text-gray-500">🚀</span>
            <span className="text-gray-700 dark:text-gray-300">{lang === 'zh' ? '活跃度' : 'Activity'}</span>
          </div>
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white w-6 text-right">{activityScore}</span>
            <div className="relative w-full max-w-[120px] h-[6px] bg-gray-200 dark:bg-gray-700/60 rounded overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-green-500 rounded"
                style={{ width: `${activityScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="flex items-center gap-2 justify-between" title={communityTooltip}>
          <div className="flex items-center gap-2 min-w-[100px]">
            <span className="text-gray-500">👥</span>
            <span className="text-gray-700 dark:text-gray-300">{lang === 'zh' ? '社区' : 'Community'}</span>
          </div>
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white w-6 text-right">{communityScore}</span>
            <div className="relative w-full max-w-[120px] h-[6px] bg-gray-200 dark:bg-gray-700/60 rounded overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-blue-500 rounded"
                style={{ width: `${communityScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="flex items-center gap-2 justify-between" title={qualityTooltip}>
          <div className="flex items-center gap-2 min-w-[100px]">
            <span className="text-gray-500">📈</span>
            <span className="text-gray-700 dark:text-gray-300">{lang === 'zh' ? '影响力' : 'Impact'}</span>
          </div>
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white w-6 text-right">{isNaN(qualityScore) ? '?' : qualityScore}</span>
            <div className="relative w-full max-w-[120px] h-[6px] bg-gray-200 dark:bg-gray-700/60 rounded overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-purple-500 rounded"
                style={{ width: `${isNaN(qualityScore) ? 0 : qualityScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sustainability (Optional) */}
        {sustainabilityScore !== undefined && (
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 min-w-[100px]">
              <span className="text-gray-500">🌱</span>
              <span className="text-gray-700 dark:text-gray-300">{lang === 'zh' ? '可持续性' : 'Sustainability'}</span>
            </div>
            <div className="flex items-center gap-3 flex-1 justify-end">
              <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white w-6 text-right">{sustainabilityScore}</span>
              <div className="relative w-full max-w-[120px] h-[6px] bg-gray-200 dark:bg-gray-700/60 rounded overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-emerald-500 rounded"
                  style={{ width: `${sustainabilityScore}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Last Update */}
      <div className="pt-4 mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
        <span>🕒</span>
        <span>
          {lang === 'zh' ? '更新于' : 'Updated'} {updateText} {lang === 'zh' ? '天前' : 'days ago'}
        </span>
      </div>
    </div>
  );
};

// Smart Badges Component
export const SmartBadges: React.FC<HealthIndicatorsProps> = ({ githubUrl, ossDate, lang = 'en' }) => {
  const [badges, setBadges] = useState<SmartBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadges = async () => {
      const repo = extractRepoFromUrl(githubUrl);
      if (!repo) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchHealthData(repo, lang);
        if (data) {
          const generatedBadges = generateSmartBadges(data, ossDate, lang);
          setBadges(generatedBadges);
        }
      } catch {
        // Ignore errors
      } finally {
        setLoading(false);
      }
    };

    loadBadges();
  }, [githubUrl, ossDate, lang]);

  if (loading) {
    return (
      <span className="inline-block animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full h-6 w-16"></span>
    );
  }

  if (badges.length === 0) {
    return null;
  }

  const getBadgeColors = (badgeClass: string) => {
    switch (badgeClass) {
      case 'badge-archived':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600';
      case 'badge-trending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-600';
      case 'badge-popular':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-600';
      case 'badge-new':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-600';
      case 'badge-active':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-600';
      case 'badge-maintained':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-600';
      case 'badge-community':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-600';
      case 'badge-mature':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-300 dark:border-indigo-600';
      case 'badge-inactive':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 border-gray-300 dark:border-gray-600';
      case 'badge-growth':
        return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-300 dark:border-pink-600';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge.key}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getBadgeColors(badge.class)}`}
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </span>
      ))}
    </div>
  );
};

// Health Summary Component (for cards)
export const HealthSummary: React.FC<HealthIndicatorsProps> = ({ githubUrl, ossDate, lang = 'en' }) => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHealthData = async () => {
      const repo = extractRepoFromUrl(githubUrl);
      if (!repo) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchHealthData(repo, lang);
        setHealthData(data);
      } catch {
        // Ignore errors
      } finally {
        setLoading(false);
      }
    };

    loadHealthData();
  }, [githubUrl, lang]);

  if (loading) {
    return (
      <div className="flex items-center gap-1">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
      </div>
    );
  }

  if (!healthData) {
    return null;
  }

  const overallScore = healthData.scores.health || 0;
  const stars = Math.round((overallScore / 100) * 5);

  const badges = generateSmartBadges(healthData, ossDate, lang);
  let summaryText = '';

  if (badges.length > 0) {
    const topBadges = badges.slice(0, 2).map(b => b.label);
    summaryText = topBadges.join(', ');
  } else if (overallScore >= 80) {
    summaryText = lang === 'zh' ? '项目状态优秀' : 'Excellent status';
  } else if (overallScore >= 60) {
    summaryText = lang === 'zh' ? '项目状态良好' : 'Good status';
  } else if (overallScore >= 40) {
    summaryText = lang === 'zh' ? '项目状态一般' : 'Fair status';
  } else {
    summaryText = lang === 'zh' ? '活跃度较低' : 'Low activity';
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          >
            {i < stars ? '★' : '☆'}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {Math.round(overallScore)}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
      <span className="text-xs text-gray-600 dark:text-gray-400">{summaryText}</span>
    </div>
  );
};

export default HealthBars;
