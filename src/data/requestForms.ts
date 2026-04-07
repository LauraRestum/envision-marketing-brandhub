// ============================================================
// REQUEST FORMS — Edit this file to update request form cards.
//
// FORM URLs: Update embedUrl to change the ClickUp form loaded
// in the modal. The modalKey must match a key in the formRegistry
// inside src/components/Modal.tsx.
//
// STORY SUBMISSION: Uses actionType 'anchor' to scroll to
// the inline StorySubmission form section.
// ============================================================

import { RequestForm } from './types';

export const requestForms: RequestForm[] = [
  {
    id: 'request-design',
    title: 'Design Request',
    description: 'Request a new flyer, brochure, infographic, presentation, or other custom design deliverable.',
    helperText: 'Include your audience, preferred format, and timeline so we can scope the project accurately.',
    icon: 'palette',
    actionType: 'modal',
    modalKey: 'design-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    keywords: ['design', 'graphic design', 'creative', 'layout', 'infographic', 'flyer', 'brochure', 'poster'],
  },
  {
    id: 'request-web',
    title: 'Web Update Request',
    description: 'Request a new page, content update, feature change, or bug fix on the Envision website.',
    helperText: 'Provide the page URL and a clear description of the change you need.',
    icon: 'globe',
    actionType: 'modal',
    modalKey: 'web-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94453/JK968N8IMKLFUBBTMI',
    keywords: ['website', 'web', 'webpage', 'page', 'site', 'url', 'online', 'web update', 'landing page'],
  },
  {
    id: 'request-reprint',
    title: 'Reprint Request',
    description: 'Reorder business cards, brochures, signage, or any previously approved printed material.',
    helperText: 'Let us know the material name and the quantity you need.',
    icon: 'printer',
    actionType: 'modal',
    modalKey: 'reprint-request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    keywords: ['reprint', 'print', 'order', 'reorder', 'copies', 'printing', 'print more'],
  },
  {
    id: 'request-asset',
    title: 'Asset Request',
    description: "Can't find what you need here? Request a specific file, asset, or resource directly from the team.",
    helperText: 'Describe the asset and its intended use so we can locate or create it for you.',
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
    actionType: 'anchor',
    anchorId: 'story-submission',
    keywords: ['story', 'news', 'achievement', 'milestone', 'feature', 'spotlight', 'recognition', 'press'],
  },
  {
    id: 'request-campaign',
    title: 'Campaign & Event Planning',
    description: 'Coordinate a multi-channel campaign or event with full marketing support.',
    helperText: 'Best for projects that span multiple deliverables, timelines, or require strategic planning.',
    icon: 'calendar',
    actionType: 'modal',
    modalKey: 'campaign-planning',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    keywords: ['campaign', 'event', 'launch', 'initiative', 'multi-channel', 'plan', 'planning', 'conference', 'promotion'],
  },
];
