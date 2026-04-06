// ============================================================
// DECISION CARDS — Edit this file to update the "Start Here" cards.
// ============================================================

import { DecisionCard } from './types';

export const decisionCards: DecisionCard[] = [
  {
    id: 'decision-create',
    title: 'Create Something New',
    description: "I need a new design, asset, or material that doesn't exist yet.",
    icon: 'plus',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['create', 'new', 'design', 'make', 'build'],
  },
  {
    id: 'decision-update',
    title: 'Update Something Existing',
    description: 'I need to revise, reprint, or refresh an existing asset or webpage.',
    icon: 'edit',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['update', 'revise', 'edit', 'change', 'refresh', 'reprint'],
  },
  {
    id: 'decision-find',
    title: 'Find an Asset',
    description: "I'm looking for a logo, template, image, document, or brand resource.",
    icon: 'search',
    actionType: 'anchor',
    anchorId: 'brand-resources',
    keywords: ['find', 'search', 'download', 'get', 'look for', 'where'],
  },
  {
    id: 'decision-share',
    title: 'Share Something',
    description: 'I have a story, news, achievement, or content to share with the organization.',
    icon: 'share',
    actionType: 'email',
    href: 'mailto:marketing@envisionus.com?subject=Story%20Submission',
    keywords: ['share', 'story', 'news', 'submit', 'announce'],
  },
  {
    id: 'decision-plan',
    title: 'Plan Something',
    description: 'I need help planning a campaign, event, or multi-channel initiative.',
    icon: 'calendar',
    actionType: 'modal',
    modalKey: 'campaign-planning',
    keywords: ['plan', 'campaign', 'event', 'strategy', 'initiative'],
  },
  {
    id: 'decision-help',
    title: 'Not Sure Where to Start',
    description: 'I need help figuring out what I need or where to go.',
    icon: 'help',
    actionType: 'anchor',
    anchorId: 'hero',
    keywords: ['help', 'not sure', 'confused', 'question', 'guidance'],
  },
];
