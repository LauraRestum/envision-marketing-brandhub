// ============================================================
// IMAGERY ROUTE RESOLVER — Matches a free-text query against
// the approved imagery taxonomy and returns the best-match
// subcategory + SharePoint destination.
//
// Used by: UniversalSearch, imagery browse card, quick links,
// and any future imagery filter UI.
// ============================================================

import { imageryDestinations } from '@/data/imageryDestinations';
import { imageryRoutingRules } from '@/data/imageryRoutingRules';

export interface ImageryRouteResult {
  subcategory: string;
  destinationTitle: string;
  href: string;
  score: number;
}

export function resolveImageryRoute(query: string): ImageryRouteResult | null {
  const normalized = query.toLowerCase();

  let bestMatch: { subcategory: string; destination: string; score: number } | null = null;

  for (const rule of imageryRoutingRules) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        // Multi-word keywords get a bonus so "assistive technology" scores
        // higher than a single-word hit like "therapy".
        score += keyword.includes(' ') ? 2 : 1;
      }
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { subcategory: rule.subcategory, destination: rule.destination, score };
    }
  }

  if (!bestMatch) return null;

  const destination = imageryDestinations[bestMatch.destination];
  if (!destination) return null;

  return {
    subcategory: bestMatch.subcategory,
    destinationTitle: destination.title,
    href: destination.href,
    score: bestMatch.score,
  };
}

/** Returns all top-level imagery destinations for browse-all views. */
export function getAllImageryDestinations() {
  return Object.entries(imageryDestinations).map(([id, dest]) => ({
    id,
    ...dest,
  }));
}
