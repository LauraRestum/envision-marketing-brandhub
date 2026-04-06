// ============================================================
// REQUEST FORMS — Edit this file to update request form cards.
//
// FORM URLs: Update embedUrl to change the ClickUp form loaded
// in the modal. The modalKey must match a key in the formRegistry
// inside src/components/Modal.tsx.
//
// STORY SUBMISSION: Uses actionType 'email' and routes to
// marketing@envisionus.com via mailto link.
// ============================================================

import { RequestForm } from './types';

export const requestForms: RequestForm[] = [
  {
    id: 'request-design',
    title: 'Design Request',
    description: 'Request a new design asset — flyers, brochures, infographics, presentations, or other custom design work.',
    helperText: 'Use this form for any new creative or design deliverable. Include details about audience, format, and timeline.',
    icon: 'palette',
    actionType: 'modal',
    modalKey: 'design-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    keywords: ['design', 'graphic design', 'creative', 'layout', 'infographic', 'flyer', 'brochure', 'poster'],
  },
  {
    id: 'request-web',
    title: 'Web Update Request',
    description: 'Request updates to the website — new pages, content changes, feature requests, or bug fixes.',
    helperText: 'Include the URL of the page to update and a clear description of needed changes.',
    icon: 'globe',
    actionType: 'modal',
    modalKey: 'web-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94453/JK968N8IMKLFUBBTMI',
    keywords: ['website', 'web', 'webpage', 'page', 'site', 'url', 'online', 'web update', 'landing page'],
  },
  {
    id: 'request-reprint',
    title: 'Reprint Request',
    description: 'Request a reprint of existing approved materials — business cards, brochures, signage, and more.',
    helperText: 'Provide the name or description of the existing material and how many copies you need.',
    icon: 'printer',
    actionType: 'modal',
    modalKey: 'reprint-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    keywords: ['reprint', 'print', 'order', 'reorder', 'copies', 'printing', 'print more'],
  },
  {
    id: 'request-asset',
    title: 'Asset Request',
    description: "Can't find what you need? Request specific brand assets, files, or resources not available on the dashboard.",
    helperText: 'Describe the asset you need and how you plan to use it.',
    icon: 'download',
    actionType: 'modal',
    modalKey: 'asset-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94453/JK968N8IMKLFUBBTMI',
    keywords: ['asset', 'file', 'resource', 'download', 'need', 'find', 'looking for'],
  },
  {
    id: 'request-story',
    title: 'Story Submission',
    description: 'Submit a story, achievement, or milestone for potential feature across Envision communications.',
    helperText: 'Email our team with your story details. We review all submissions and follow up within a few business days.',
    icon: 'star',
    actionType: 'email',
    href: 'mailto:marketing@envisionus.com?subject=Story%20Submission&body=Hi%20Marketing%20Team%2C%0A%0AI%20have%20a%20story%20to%20share%3A%0A%0A',
    keywords: ['story', 'news', 'achievement', 'milestone', 'feature', 'spotlight', 'recognition', 'press'],
  },
  {
    id: 'request-campaign',
    title: 'Campaign & Event Planning',
    description: 'Plan a multi-channel campaign or event with coordinated marketing support.',
    helperText: 'For campaigns and events that need multiple deliverables, coordinated timelines, or strategic planning.',
    icon: 'calendar',
    actionType: 'modal',
    modalKey: 'campaign-planning',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    keywords: ['campaign', 'event', 'launch', 'initiative', 'multi-channel', 'plan', 'planning', 'conference', 'promotion'],
  },
];
