// ============================================================
// BRAND TYPOGRAPHY — Official Envision typography guidelines,
// font families, weights, and usage rules.
// ============================================================

export interface BrandFont {
  name: string;
  category: string;
  description: string;
  downloadUrl?: string;
  downloadLabel?: string;
}

export interface FontWeight {
  weight: number;
  name: string;
  usage: string;
}

export interface TypographyGuideline {
  rule: string;
  detail: string;
}

export const brandFonts: BrandFont[] = [
  {
    name: 'Gotham',
    category: 'Sans-serif',
    description: 'Gotham is the primary brand typeface for Envision. Use it for headings, titles, and high-visibility brand materials where a bold, confident presence is needed.',
  },
  {
    name: 'Montserrat',
    category: 'Sans-serif',
    description: 'Montserrat is the companion typeface used for body copy, digital applications, and any context where Gotham is unavailable. It pairs naturally with Gotham.',
    downloadUrl: 'https://fonts.google.com/specimen/Montserrat',
    downloadLabel: 'Get from Google Fonts',
  },
];

export const fontWeights: FontWeight[] = [
  { weight: 800, name: 'Extra Bold', usage: 'Hero headings, primary display text, and high-impact brand moments.' },
  { weight: 700, name: 'Bold', usage: 'Section headings, titles, and key information.' },
  { weight: 400, name: 'Regular', usage: 'Body copy, paragraphs, and general content.' },
  { weight: 100, name: 'Thin', usage: 'Large decorative display text, stylistic accents.' },
];

export const typographyGuidelines: TypographyGuideline[] = [
  {
    rule: 'Always use sentence case',
    detail: 'Capitalize only the first word in headings, subheadings, buttons, and labels. Never use Title Case. The only exception is proper nouns and acronyms.',
  },
  {
    rule: 'Apply kerning on uppercase text',
    detail: 'When text is set in all caps (e.g., labels, eyebrows, or short callouts), increase letter-spacing (kerning) for readability. Recommended: 0.05em – 0.1em.',
  },
  {
    rule: 'Use Gotham for headings and brand materials',
    detail: 'Gotham is the primary font for headings, titles, and any brand-forward material. Use Montserrat as the companion for body text and digital contexts where Gotham is unavailable.',
  },
  {
    rule: 'Body text: Regular 400',
    detail: 'All body copy uses Regular (400) at 14–16px / 1rem for digital, 10–12pt for print.',
  },
  {
    rule: 'Headings: Bold or Extra Bold',
    detail: 'Primary headings use Bold (700) or Extra Bold (800). Reserve Thin (100) for large decorative display text only.',
  },
  {
    rule: 'Minimum font size: 14px digital, 10pt print',
    detail: 'Never set body text smaller than 14px on screen or 10pt in print for readability and accessibility.',
  },
  {
    rule: 'Line height: 1.5 for body, 1.25 for headings',
    detail: 'Maintain generous line spacing for readability. Tighter leading is acceptable for large display headings.',
  },
  {
    rule: 'Fallback stack',
    detail: 'When brand fonts are unavailable, use: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.',
  },
];

// Keep backward compat export
export const primaryFont = brandFonts[0];
