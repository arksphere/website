import React from 'react';

interface ProjectRankStatsProps {
  rankOverall?: number;
  rankInCategory?: number;
  score?: number;
  category?: string;
  loading?: boolean;
}

export const ProjectRankStats: React.FC<ProjectRankStatsProps> = ({
  rankOverall,
  rankInCategory,
  score,
  category,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (rankOverall === undefined && rankInCategory === undefined && score === undefined) {
    return null;
  }

  return (
    <div className="space-y-4">
      {score !== undefined && (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">📊</span>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {score.toFixed(1)}
            </div>
          </div>
        </div>
      )}

      {rankOverall !== undefined && (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
            <span className="text-green-600 dark:text-green-400 text-sm font-bold">🌍</span>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Rank Overall</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              #{rankOverall}
            </div>
          </div>
        </div>
      )}

      {rankInCategory !== undefined && category && (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">📁</span>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Rank in {category}
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              #{rankInCategory}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
