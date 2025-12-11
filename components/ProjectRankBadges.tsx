import React, { useState, useEffect } from 'react';
import { getProjectRankStats } from '../utils/ranking';

interface ProjectRankBadgesProps {
  slug: string;
}

export const ProjectRankBadges: React.FC<ProjectRankBadgesProps> = ({ slug }) => {
  const [stats, setStats] = useState<{
    rankOverall?: number;
    rankInCategory?: number;
    score?: number;
    category?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadStats = async () => {
      try {
        const data = await getProjectRankStats(slug);
        if (mounted) {
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to load rank stats:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStats();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading || !stats || stats.score === undefined) {
    return null;
  }

  const badgeStyle = "inline-flex items-center justify-center rounded-md bg-[#f3f3f3] dark:bg-[#333] px-2 py-1 text-xs font-normal text-gray-700 dark:text-gray-300 opacity-75 hover:opacity-100 transition-opacity cursor-default whitespace-nowrap";

  return (
    <div className="inline-flex flex-wrap gap-2">
      {/* Score Badge */}
      <div className={badgeStyle} title={`Score: ${stats.score.toFixed(1)}`}>
        Score {stats.score.toFixed(1)}
      </div>

      {/* Overall Rank Badge */}
      {stats.rankOverall !== undefined && (
        <div className={badgeStyle} title={`Overall Rank: #${stats.rankOverall}`}>
          #{stats.rankOverall} Overall
        </div>
      )}

      {/* Category Rank Badge */}
      {stats.rankInCategory !== undefined && (
        <div 
          className={badgeStyle} 
          title={`Category Rank: #${stats.rankInCategory} (${stats.category || 'Category'})`}
        >
          #{stats.rankInCategory} {stats.category ? (stats.category.length > 10 ? 'Category' : stats.category) : 'Category'}
        </div>
      )}
    </div>
  );
};
