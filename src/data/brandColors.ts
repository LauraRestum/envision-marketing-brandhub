// ============================================================
// BRAND COLORS — Official Envision color palette matching the
// brand book. Primary Colors + Extended Palette.
// ============================================================

export interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  usage: string;
}

// ── Primary Colors ──

export const primaryColors: BrandColor[] = [
  {
    name: 'Blue',
    hex: '#003B97',
    rgb: '0, 48, 155',
    cmyk: '100, 81, 0, 23',
    pantone: 'PMS 287C',
    usage: 'Primary brand color. Use for headers, key visual elements, and brand-forward materials.',
  },
  {
    name: 'Green',
    hex: '#78BE21',
    rgb: '120, 190, 33',
    cmyk: '54, 0, 100, 0',
    pantone: 'PMS 368C',
    usage: 'Primary accent. CTAs, highlights, action elements, and growth-related materials.',
  },
];

// ── Extended Palette ──

export const extendedColors: BrandColor[] = [
  {
    name: 'Navy',
    hex: '#002855',
    rgb: '0, 40, 85',
    cmyk: '100, 65, 19, 60',
    pantone: 'PMS 296C',
    usage: 'Deep anchoring color for backgrounds, headers, and formal materials.',
  },
  {
    name: 'Bright Blue',
    hex: '#41B6E6',
    rgb: '65, 182, 230',
    cmyk: '63, 3, 0, 0',
    pantone: 'PMS 298C',
    usage: 'Interactive elements, links, and secondary accents.',
  },
  {
    name: 'Forest Green',
    hex: '#004B1E',
    rgb: '0, 75, 30',
    cmyk: '100, 0, 100, 69',
    pantone: 'PMS 357C',
    usage: 'Grounding element for products and environmental materials.',
  },
  {
    name: 'Goldenrod',
    hex: '#FFB81C',
    rgb: '255, 184, 28',
    cmyk: '0, 25, 94, 0',
    pantone: 'PMS 123C',
    usage: 'Highlights, warm accents, and attention-drawing elements. Use sparingly.',
  },
  {
    name: 'Terracotta',
    hex: '#EA733D',
    rgb: '234, 115, 61',
    cmyk: '0, 64, 80, 1',
    pantone: 'PMS 4010C',
    usage: 'Warm accent for community, outreach, and energetic materials.',
  },
  {
    name: 'Violet',
    hex: '#8B4799',
    rgb: '139, 71, 153',
    cmyk: '51, 84, 0, 0',
    pantone: 'PMS 258C',
    usage: 'Research and specialty accents.',
  },
  {
    name: 'Charcoal',
    hex: '#55565A',
    rgb: '85, 86, 90',
    cmyk: '63, 52, 44, 33',
    pantone: 'PMS Cool Gray 11C',
    usage: 'Body text and secondary text.',
  },
  {
    name: 'Gray',
    hex: '#D0D5CE',
    rgb: '208, 213, 206',
    cmyk: '10, 7, 12, 0',
    pantone: 'PMS Cool Gray 7C',
    usage: 'Borders, dividers, and subtle backgrounds.',
  },
];
