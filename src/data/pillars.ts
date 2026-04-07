// ============================================================
// PILLARS — Envision's six strategic content pillars.
// Each pillar has a color set used for tags throughout the dashboard.
// ============================================================

export type PillarKey =
  | 'rehabilitation-vision'
  | 'education-workforce'
  | 'research-innovation'
  | 'community-outreach'
  | 'employment-career'
  | 'products-services';

export interface Pillar {
  key: PillarKey;
  label: string;
  shortLabel: string;
  /** Full-saturation dot color */
  color: string;
  /** Light tint background for tag */
  bg: string;
  /** Readable text color on bg */
  text: string;
}

export const PILLARS: Record<PillarKey, Pillar> = {
  'rehabilitation-vision': {
    key: 'rehabilitation-vision',
    label: 'Rehabilitation & Vision Services',
    shortLabel: 'Rehab & Vision',
    color: '#1BAEE1',
    bg: '#E3F5FC',
    text: '#0F7DAD',
  },
  'education-workforce': {
    key: 'education-workforce',
    label: 'Education & Workforce Development',
    shortLabel: 'Education',
    color: '#5CB135',
    bg: '#EBF7E3',
    text: '#3A7521',
  },
  'research-innovation': {
    key: 'research-innovation',
    label: 'Research & Innovation',
    shortLabel: 'Research',
    color: '#8B3884',
    bg: '#F3E8F2',
    text: '#6A2A64',
  },
  'community-outreach': {
    key: 'community-outreach',
    label: 'Community Outreach & Engagement',
    shortLabel: 'Community',
    color: '#D4A017',
    bg: '#FEF7E0',
    text: '#7A5A00',
  },
  'employment-career': {
    key: 'employment-career',
    label: 'Employment & Career Pathways',
    shortLabel: 'Employment',
    color: '#162B6B',
    bg: '#E8ECF5',
    text: '#162B6B',
  },
  'products-services': {
    key: 'products-services',
    label: 'Products & Customer Services',
    shortLabel: 'Products',
    color: '#1A4332',
    bg: '#E3EDE8',
    text: '#1A4332',
  },
};

/** Maps imagery destination keys → pillar keys */
export const DESTINATION_TO_PILLAR: Record<string, PillarKey> = {
  'rehabilitation-vision-services': 'rehabilitation-vision',
  'education-workforce-development': 'education-workforce',
  'research-innovation': 'research-innovation',
  'community-outreach-engagement': 'community-outreach',
  'employment-career-pathways': 'employment-career',
  'products-customer-services': 'products-services',
  // building-photos has no single pillar — omitted intentionally
};
