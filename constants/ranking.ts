// Ranking constants and weights
export const RANKING_WEIGHTS = {
  impact: 0.35,
  activity: 0.25,
  health: 0.20,
  community: 0.15,
  freshness: 0.05
} as const;

export type RankingWeights = typeof RANKING_WEIGHTS;

export const MAX_FRESHNESS_DAYS = 100;
