// ============================================================
// IMAGERY DESTINATIONS — SharePoint folder targets for the
// approved imagery taxonomy. Add or update folders here when
// new SharePoint locations are created.
// ============================================================

export interface ImageryDestination {
  title: string;
  href: string;
}

export const imageryDestinations: Record<string, ImageryDestination> = {
  'building-photos': {
    title: 'Building Photos',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgAR9LPzbyezSbNDfhPVBwhfAY44JlnOLMx9Q0NoJPJ02bM?e=noZhUE',
  },
  'community-outreach-engagement': {
    title: 'Community Outreach & Engagement',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgC2900JfvmoTbqftgQMqWdxAXs6m9zLEu3abs492AuE8B4?e=Y2SRCc',
  },
  'education-workforce-development': {
    title: 'Education & Workforce Development',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgC7mMdTYipjRat8qMy4Kjv9AUfFJ3fM9UoOmScuAUxtZSs?e=OPcR7T',
  },
  'employment-career-pathways': {
    title: 'Employment & Career Pathways',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgC7mMdTYipjRat8qMy4Kjv9AUfFJ3fM9UoOmScuAUxtZSs?e=OPcR7T',
  },
  'products-customer-services': {
    title: 'Products & Customer Services',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgC3rTpRwbFITbiW87ecWnz6AZXSdl_wwncgQpORo94h0-Y?e=5jF8Y4',
  },
  'rehabilitation-vision-services': {
    title: 'Rehabilitation & Vision Services',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgCWDFMtQESTRqC7J59axw-LAVMbUZTBML6F5BXopKtVNGg?e=gZ9fKJ',
  },
  'research-innovation': {
    title: 'Research & Innovation',
    href: 'https://dlhfb.sharepoint.com/:f:/s/EnvisionMarketing/IgDz74du7x5NTaBEFU8cSOz2ATh83z9EVgmCsWBVz5cxOj4?e=E2CKag',
  },
};
