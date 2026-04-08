// ============================================================
// TEMPLATES — Edit this file to update template cards.
// For SharePoint links: set actionType to 'external' and update href.
// For hosted files: set actionType to 'internal' and update assetPath.
// ============================================================

import { Resource } from './types';

export const templates: Resource[] = [
  {
    id: 'template-presentation',
    title: 'Presentation Templates',
    description: 'PowerPoint and Google Slides templates with approved Envision branding for meetings and conferences.',
    category: 'template',
    type: 'Presentation',
    tag: 'Popular',
    cta: 'Download Templates',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['presentation', 'powerpoint', 'slides', 'deck', 'ppt', 'google slides', 'keynote'],
    icon: 'document',
  },
  {
    id: 'template-letterhead',
    title: 'Letterhead & Stationery',
    description: 'Official letterhead templates for all Envision offices — Word, PDF, InDesign, and header/footer graphics.',
    category: 'template',
    type: 'Print',
    tag: 'Updated',
    cta: 'Download Letterhead',
    actionType: 'internal',
    href: '#letterhead-downloader',
    keywords: ['letterhead', 'stationery', 'envelope', 'letter', 'correspondence', 'dotx', 'word template', 'dallas', 'wichita', 'evrc', 'farmers branch', 'water street'],
    icon: 'document',
  },
  {
    id: 'template-brochure',
    title: 'Brochure & Flyer Templates',
    description: 'Pre-designed brochure and flyer layouts for print and digital distribution.',
    category: 'template',
    type: 'Print',
    cta: 'Browse Templates',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['brochure', 'flyer', 'handout', 'pamphlet', 'one-pager', 'sell sheet', 'rack card'],
    icon: 'document',
  },
  {
    id: 'template-social',
    title: 'Social Media Templates',
    description: 'Canva and design templates sized for social media posts, stories, and ads.',
    category: 'template',
    type: 'Digital',
    cta: 'Use Templates',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['social media template', 'canva', 'instagram', 'facebook', 'linkedin', 'post template'],
    icon: 'social',
  },
  {
    id: 'template-email',
    title: 'Email Marketing Templates',
    description: 'Branded email templates for newsletters, announcements, and campaigns.',
    category: 'template',
    type: 'Digital',
    tag: 'Popular',
    cta: 'View Templates',
    actionType: 'anchor',
    anchorId: 'request-center',
    keywords: ['email template', 'newsletter', 'email campaign', 'mailchimp', 'constant contact', 'email marketing'],
    icon: 'message',
  },
];
