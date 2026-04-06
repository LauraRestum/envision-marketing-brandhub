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
    id: 'quick-brand-book',
    title: 'Brand Book',
    icon: 'book',
    actionType: 'internal',
    href: '/assets/documents/brand-guidelines.pdf',
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
    id: 'quick-story',
    title: 'Share a Story',
    icon: 'star',
    actionType: 'email',
    href: 'mailto:marketing@envisionus.com?subject=Story%20Submission',
  },
];
