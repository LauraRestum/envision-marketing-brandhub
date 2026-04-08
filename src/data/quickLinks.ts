// ============================================================
// QUICK LINKS — Edit this file to update the quick-access shortcuts.
// ============================================================

import { QuickLink } from './types';

export const quickLinks: QuickLink[] = [
  {
    id: 'quick-logos',
    title: 'Logos',
    icon: 'logo',
    actionType: 'anchor',
    anchorId: 'brand-resources',
  },
  {
    id: 'quick-brand-guidelines',
    title: 'Brand Guidelines',
    icon: 'palette',
    actionType: 'anchor',
    anchorId: 'brand-resources',
  },
  {
    id: 'quick-templates',
    title: 'Templates',
    icon: 'document',
    actionType: 'anchor',
    anchorId: 'templates',
  },
  {
    id: 'quick-request',
    title: 'New Request',
    icon: 'plus',
    actionType: 'anchor',
    anchorId: 'request-center',
  },
  {
    id: 'quick-web',
    title: 'Web Update',
    icon: 'globe',
    actionType: 'modal',
    modalKey: 'web-request',
  },
  {
    id: 'quick-social-hub',
    title: 'Social Media',
    icon: 'social',
    actionType: 'anchor',
    anchorId: 'social-hub',
  },
  {
    id: 'quick-story',
    title: 'Share a Story',
    icon: 'star',
    actionType: 'anchor',
    anchorId: 'story-submission',
  },
];
