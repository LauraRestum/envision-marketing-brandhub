// ============================================================
// BRAND TYPOGRAPHY — Official Envision typography guidelines,
// font families, weights, and usage rules.
// ============================================================

export interface FontWeight {
  weight: number;
  name: string;
  usage: string;
}

export interface TypographyGuideline {
  rule: string;
  detail: string;
}

export const primaryFont = {
  name: 'Montserrat',
  category: 'Sans-serif',
  designer: 'Julieta Ulanovsky',
  license: 'Google Fonts (Open Font License)',
  description: 'Montserrat is the official typeface for all Envision communications. It balances warmth with professionalism across headings, body text, and UI elements.',
};

export const fontWeights: FontWeight[] = [
  { weight: 300, name: 'Light', usage: 'Large display text and decorative use only.' },
  { weight: 400, name: 'Regular', usage: 'Body copy, paragraphs, and general content.' },
  { weight: 500, name: 'Medium', usage: 'Subheadings, labels, and emphasis.' },
  { weight: 600, name: 'SemiBold', usage: 'Buttons, CTAs, and navigation items.' },
  { weight: 700, name: 'Bold', usage: 'Headings, titles, and key information.' },
];

export const typographyGuidelines: TypographyGuideline[] = [
  {
    rule: 'Use Montserrat everywhere',
    detail: 'All print, digital, presentations, and internal documents should use Montserrat. No substitutions unless a system does not support custom fonts.',
  },
  {
    rule: 'Sentence case for all headings',
    detail: 'Use sentence case (capitalize first word only) in headings and subheadings. No Title Case or ALL CAPS except for acronyms.',
  },
  {
    rule: 'Body text: Regular 400',
    detail: 'All body copy uses Montserrat Regular (400) at 14-16px / 1rem for digital, 10-12pt for print.',
  },
  {
    rule: 'Headings: Bold 700',
    detail: 'Primary headings use Montserrat Bold (700). Subheadings use SemiBold (600) or Medium (500).',
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
    detail: 'When Montserrat is unavailable, use: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.',
  },
];
