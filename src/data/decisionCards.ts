// ============================================================
// DECISION CARDS — Edit this file to update the "Start Here" cards.
// ============================================================

import { DecisionCard } from './types';

/** Primary cards — shown large at the top */
export const primaryCards: DecisionCard[] = [
  {
    id: 'decision-create',
    title: 'Create Something New',
    description: 'Need a new design, asset, or material created from scratch.',
    icon: 'plus',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['create', 'new', 'design', 'make', 'build'],
  },
  {
    id: 'decision-find',
    title: 'Find a Resource',
    description: 'Looking for a logo, template, image, guideline, or brand file.',
    icon: 'search',
    actionType: 'anchor',
    anchorId: 'brand-resources',
    keywords: ['find', 'search', 'download', 'get', 'look for', 'where'],
  },
  {
    id: 'decision-update',
    title: 'Update or Reprint',
    description: 'Revise, reorder, or refresh an existing asset, material, or webpage.',
    icon: 'edit',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['update', 'revise', 'edit', 'change', 'refresh', 'reprint'],
  },
];

/** Secondary cards — shown smaller below */
export const secondaryCards: DecisionCard[] = [
  {
    id: 'decision-share',
    title: 'Share a Story',
    description: 'Submit a story, milestone, or achievement for Envision communications.',
    icon: 'share',
    actionType: 'email',
    href: 'mailto:marketing@envisionus.com?subject=Story%20Submission',
    keywords: ['share', 'story', 'news', 'submit', 'announce'],
  },
  {
    id: 'decision-plan',
    title: 'Plan a Campaign or Event',
    description: 'Coordinate a campaign, event, or multi-channel marketing initiative.',
    icon: 'calendar',
    actionType: 'modal',
    modalKey: 'campaign-planning',
    keywords: ['plan', 'campaign', 'event', 'strategy', 'initiative'],
  },
  {
    id: 'decision-help',
    title: 'Not Sure Where to Start',
    description: 'Let us help you find the right resource, form, or next step.',
    icon: 'help',
    actionType: 'anchor',
    anchorId: 'hero',
    keywords: ['help', 'not sure', 'confused', 'question', 'guidance'],
  },
];

/** All cards combined (for search indexing) */
export const decisionCards: DecisionCard[] = [...primaryCards, ...secondaryCards];
