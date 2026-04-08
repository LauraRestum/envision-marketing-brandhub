// ============================================================
// BRAND COLORS — Official Envision color palette with all
// color values (HEX, RGB, CMYK, Pantone) for brand consistency.
// ============================================================

export interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  usage: string;
}

export interface PillarColor {
  pillar: string;
  colorName: string;
  hex: string;
  usage: string;
}

export const primaryColors: BrandColor[] = [
  {
    name: 'Envision Navy',
    hex: '#162B6B',
    rgb: '22, 43, 107',
    cmyk: '100, 85, 23, 14',
    pantone: 'PMS 2758 C',
    usage: 'Primary brand color. Use for headers, key UI elements, and brand-forward materials.',
  },
  {
    name: 'Envision Green',
    hex: '#5CB135',
    rgb: '92, 177, 53',
    cmyk: '62, 0, 100, 0',
    pantone: 'PMS 362 C',
    usage: 'Primary accent. CTAs, highlights, and action elements.',
  },
  {
    name: 'Envision Cyan',
    hex: '#1BAEE1',
    rgb: '27, 174, 225',
    cmyk: '73, 14, 3, 0',
    pantone: 'PMS 299 C',
    usage: 'Interactive elements, links, and secondary accents.',
  },
];

export const secondaryColors: BrandColor[] = [
  {
    name: 'Envision Yellow',
    hex: '#F5C242',
    rgb: '245, 194, 66',
    cmyk: '2, 22, 83, 0',
    pantone: 'PMS 7405 C',
    usage: 'Highlights, alerts, and warm accents. Use sparingly.',
  },
  {
    name: 'Envision Purple',
    hex: '#8B3884',
    rgb: '139, 56, 132',
    cmyk: '39, 85, 4, 0',
    pantone: 'PMS 2592 C',
    usage: 'Research pillar and specialty accents.',
  },
  {
    name: 'Envision Forest',
    hex: '#1A4332',
    rgb: '26, 67, 50',
    cmyk: '82, 30, 72, 55',
    pantone: 'PMS 3435 C',
    usage: 'Products pillar and grounding elements.',
  },
  {
    name: 'Charcoal',
    hex: '#58595B',
    rgb: '88, 89, 91',
    cmyk: '54, 45, 43, 26',
    pantone: 'PMS Cool Gray 10 C',
    usage: 'Body text and secondary text.',
  },
  {
    name: 'Silver',
    hex: '#D3D4CC',
    rgb: '211, 212, 204',
    cmyk: '16, 10, 16, 0',
    pantone: 'PMS Cool Gray 3 C',
    usage: 'Borders, dividers, and subtle backgrounds.',
  },
];

export const pillarColors: PillarColor[] = [
  {
    pillar: 'Rehabilitation & Vision Services',
    colorName: 'Envision Cyan',
    hex: '#1BAEE1',
    usage: 'All rehab and vision services materials, EVRC content.',
  },
  {
    pillar: 'Education & Workforce Development',
    colorName: 'Envision Green',
    hex: '#5CB135',
    usage: 'ECDC, Level-Up, workforce programs.',
  },
  {
    pillar: 'Research & Innovation',
    colorName: 'Envision Purple',
    hex: '#8B3884',
    usage: 'ERI, research publications, scientific content.',
  },
  {
    pillar: 'Community Outreach & Engagement',
    colorName: 'Envision Yellow',
    hex: '#D4A017',
    usage: 'Community events, outreach, arts programming.',
  },
  {
    pillar: 'Employment & Career Pathways',
    colorName: 'Envision Navy',
    hex: '#162B6B',
    usage: 'BSC, workforce employment, career content.',
  },
  {
    pillar: 'Products & Customer Services',
    colorName: 'Envision Forest',
    hex: '#1A4332',
    usage: 'Commercial solutions, product-focused materials.',
  },
];
