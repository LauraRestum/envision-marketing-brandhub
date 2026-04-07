// ============================================================
// LOGO ASSETS — Organized logo files with metadata for the
// guided Logo Downloader wizard. Each asset maps to a file
// in public/logos/ so Vite serves it at build time.
//
// To add a logo: add an entry with the correct category,
// colorVariant, format, and path. The wizard uses these
// fields to filter results based on user answers.
// ============================================================

export type LogoCategory =
  | 'primary'
  | 'vertical'
  | 'social-profile'
  | 'hands-mark'
  | 'legacy';

export type ColorVariant = 'full-color' | 'black' | 'white';

export type FileFormat = 'png' | 'jpg' | 'eps' | 'ai' | 'pdf' | 'indd';

export type UseCase = 'digital' | 'print' | 'social' | 'presentation' | 'apparel';

export interface LogoAsset {
  id: string;
  /** Display name shown in results */
  name: string;
  /** File path relative to public/ (served by Vite at /) */
  path: string;
  category: LogoCategory;
  colorVariant: ColorVariant;
  format: FileFormat;
  /** Which use cases this file is best for */
  useCases: UseCase[];
  /** Human-readable format label */
  formatLabel: string;
  /** Extra detail shown in results */
  note?: string;
}

// ── Primary Logo — Full Color ──

const primaryFullColor: LogoAsset[] = [
  {
    id: 'primary-2c-png',
    name: 'Primary Logo — Full Color',
    path: '/logos/primary/full-color/Envision_PrimaryLogo_2C.png',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'png',
    useCases: ['digital', 'presentation', 'social'],
    formatLabel: 'PNG (transparent)',
    note: 'Best for websites, presentations, and digital use',
  },
  {
    id: 'primary-2c-jpg',
    name: 'Primary Logo — Full Color',
    path: '/logos/primary/full-color/Envision_PrimaryLogo_2C.jpg',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'jpg',
    useCases: ['digital', 'presentation'],
    formatLabel: 'JPG',
    note: 'For use on white backgrounds where transparency is not needed',
  },
  {
    id: 'primary-bg-rgb-eps',
    name: 'Primary Logo — Blue-Green (RGB)',
    path: '/logos/primary/full-color/2025_Envision_PrimaryLogo_blue-green_RGB.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['digital', 'presentation'],
    formatLabel: 'EPS (RGB)',
    note: 'Vector format for digital and screen use',
  },
  {
    id: 'primary-bg-cmyk-eps',
    name: 'Primary Logo — Blue-Green (CMYK)',
    path: '/logos/primary/full-color/2025_Envision_PrimaryLogo_blue-green_CMYK.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['print'],
    formatLabel: 'EPS (CMYK)',
    note: 'Vector format for professional printing',
  },
  {
    id: 'primary-bg-pms-eps',
    name: 'Primary Logo — Blue-Green (Pantone)',
    path: '/logos/primary/full-color/2025_Envision_PrimaryLogo_blue-green_PMS.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['print', 'apparel'],
    formatLabel: 'EPS (PMS/Pantone)',
    note: 'Spot-color vector for brand-exact print and apparel',
  },
  {
    id: 'primary-bg-pms-ai',
    name: 'Primary Logo — Blue-Green (Pantone)',
    path: '/logos/primary/full-color/2025_Envision_PrimaryLogo_blue-green_PMS.ai',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'ai',
    useCases: ['print', 'apparel'],
    formatLabel: 'Adobe Illustrator (PMS)',
    note: 'Editable source file — Pantone spot colors',
  },
  {
    id: 'primary-pms-lab-eps',
    name: 'Primary Logo — PMS Lab',
    path: '/logos/primary/full-color/2025_Envision-Logo_PMS-Lab.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['print', 'apparel'],
    formatLabel: 'EPS (PMS Lab)',
    note: 'Lab-calibrated Pantone version for precise color matching',
  },
  {
    id: 'primary-blue-rgb-eps',
    name: 'Primary Logo — Blue (RGB)',
    path: '/logos/primary/full-color/251215_Envision_PrimaryLogo_blue_RGB.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['digital', 'presentation'],
    formatLabel: 'EPS (RGB)',
    note: 'Blue-only version for screen use',
  },
  {
    id: 'primary-blue-cmyk-eps',
    name: 'Primary Logo — Blue (CMYK)',
    path: '/logos/primary/full-color/251215_Envision_PrimaryLogo_blue_CMYK.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['print'],
    formatLabel: 'EPS (CMYK)',
    note: 'Blue-only version for professional printing',
  },
  {
    id: 'primary-blue-pms-eps',
    name: 'Primary Logo — Blue (Pantone)',
    path: '/logos/primary/full-color/251215_Envision_PrimaryLogo_blue_PMS.eps',
    category: 'primary',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['print', 'apparel'],
    formatLabel: 'EPS (PMS)',
    note: 'Blue-only spot-color for print and apparel',
  },
];

// ── Primary Logo — Black ──

const primaryBlack: LogoAsset[] = [
  {
    id: 'primary-black-png',
    name: 'Primary Logo — Black',
    path: '/logos/primary/black/Envision_PrimaryLogo_BLACK.png',
    category: 'primary',
    colorVariant: 'black',
    format: 'png',
    useCases: ['digital', 'presentation', 'social'],
    formatLabel: 'PNG (transparent)',
    note: 'For light backgrounds — digital and presentations',
  },
  {
    id: 'primary-black-jpg',
    name: 'Primary Logo — Black',
    path: '/logos/primary/black/Envision_PrimaryLogo_BLACK.jpg',
    category: 'primary',
    colorVariant: 'black',
    format: 'jpg',
    useCases: ['digital', 'presentation'],
    formatLabel: 'JPG',
    note: 'For light backgrounds where transparency is not needed',
  },
  {
    id: 'primary-black-eps',
    name: 'Primary Logo — Black',
    path: '/logos/primary/black/Envision_PrimaryLogo_BLACK.eps',
    category: 'primary',
    colorVariant: 'black',
    format: 'eps',
    useCases: ['print', 'apparel'],
    formatLabel: 'EPS',
    note: 'Vector for one-color print and apparel',
  },
  {
    id: 'primary-black-ai',
    name: 'Primary Logo — Black',
    path: '/logos/primary/black/Envision_PrimaryLogo_BLACK.ai',
    category: 'primary',
    colorVariant: 'black',
    format: 'ai',
    useCases: ['print', 'apparel'],
    formatLabel: 'Adobe Illustrator',
    note: 'Editable source — one-color black',
  },
];

// ── Primary Logo — White ──

const primaryWhite: LogoAsset[] = [
  {
    id: 'primary-white-png',
    name: 'Primary Logo — White',
    path: '/logos/primary/white/Envision_PrimaryLogo_WHITE.png',
    category: 'primary',
    colorVariant: 'white',
    format: 'png',
    useCases: ['digital', 'presentation', 'social'],
    formatLabel: 'PNG (transparent)',
    note: 'For dark backgrounds — digital and presentations',
  },
  {
    id: 'primary-white-jpg',
    name: 'Primary Logo — White',
    path: '/logos/primary/white/Envision_PrimaryLogo_WHITE.jpg',
    category: 'primary',
    colorVariant: 'white',
    format: 'jpg',
    useCases: ['digital', 'presentation'],
    formatLabel: 'JPG',
    note: 'White logo on dark/colored backgrounds',
  },
  {
    id: 'primary-white-eps',
    name: 'Primary Logo — White',
    path: '/logos/primary/white/Envision_PrimaryLogo_WHITE.eps',
    category: 'primary',
    colorVariant: 'white',
    format: 'eps',
    useCases: ['print', 'apparel'],
    formatLabel: 'EPS',
    note: 'Vector for reversed/knockout print and apparel',
  },
  {
    id: 'primary-white-ai',
    name: 'Primary Logo — White',
    path: '/logos/primary/white/Envision_PrimaryLogo_WHITE.ai',
    category: 'primary',
    colorVariant: 'white',
    format: 'ai',
    useCases: ['print', 'apparel'],
    formatLabel: 'Adobe Illustrator',
    note: 'Editable source — white/knockout version',
  },
];

// ── Vertical Logo ──

const verticalLogo: LogoAsset[] = [
  {
    id: 'vertical-rgb-eps',
    name: 'Envision Logo — Vertical (RGB)',
    path: '/logos/primary/vertical/2025_EnvisionLogo_Vertical_RGB.eps',
    category: 'vertical',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['digital', 'print', 'presentation'],
    formatLabel: 'EPS (RGB)',
    note: 'Stacked/vertical layout for square spaces',
  },
];

// ── Social Profile Images ──

const socialProfiles: LogoAsset[] = [
  {
    id: 'profile-400-png',
    name: 'Profile Image — 400x400',
    path: '/logos/social-profiles/400x400 profile.png',
    category: 'social-profile',
    colorVariant: 'full-color',
    format: 'png',
    useCases: ['social'],
    formatLabel: 'PNG 400x400',
    note: 'Standard social profile image (LinkedIn, Facebook)',
  },
  {
    id: 'profile-400-jpg',
    name: 'Profile Image — 400x400',
    path: '/logos/social-profiles/400x400 profile.jpg',
    category: 'social-profile',
    colorVariant: 'full-color',
    format: 'jpg',
    useCases: ['social'],
    formatLabel: 'JPG 400x400',
    note: 'Social profile image — compressed',
  },
  {
    id: 'profile-320-png',
    name: 'Profile Image — 320x320',
    path: '/logos/social-profiles/320x320 profile.png',
    category: 'social-profile',
    colorVariant: 'full-color',
    format: 'png',
    useCases: ['social'],
    formatLabel: 'PNG 320x320',
    note: 'Smaller social profile image',
  },
  {
    id: 'profile-400-4x',
    name: 'Profile Image — 400px @4x',
    path: '/logos/social-profiles/400px_4x-100.jpg',
    category: 'social-profile',
    colorVariant: 'full-color',
    format: 'jpg',
    useCases: ['social', 'digital'],
    formatLabel: 'JPG 400px @4x',
    note: 'High-resolution profile for retina displays',
  },
  {
    id: 'profile-320-4x-a',
    name: 'Profile Image — 320px @4x',
    path: '/logos/social-profiles/320px_4x-100.jpg',
    category: 'social-profile',
    colorVariant: 'full-color',
    format: 'jpg',
    useCases: ['social', 'digital'],
    formatLabel: 'JPG 320px @4x',
    note: 'High-resolution profile for retina displays',
  },
  {
    id: 'profile-320-4x-b',
    name: 'Profile Image — 320px @4x (alt)',
    path: '/logos/social-profiles/320PX@4x-100.jpg',
    category: 'social-profile',
    colorVariant: 'full-color',
    format: 'jpg',
    useCases: ['social', 'digital'],
    formatLabel: 'JPG 320px @4x',
    note: 'Alternate high-resolution profile image',
  },
];

// ── Hands Mark ──

const handsMark: LogoAsset[] = [
  {
    id: 'hands-white-png',
    name: 'Envision Hands — White',
    path: '/logos/marks/EnvisionHands_WHITE.png',
    category: 'hands-mark',
    colorVariant: 'white',
    format: 'png',
    useCases: ['digital', 'presentation', 'social', 'apparel'],
    formatLabel: 'PNG (transparent)',
    note: 'Hands graphic mark for dark backgrounds',
  },
  {
    id: 'hands-white-eps',
    name: 'Envision Hands — White',
    path: '/logos/marks/EnvisionHands_WHITE.eps',
    category: 'hands-mark',
    colorVariant: 'white',
    format: 'eps',
    useCases: ['print', 'apparel'],
    formatLabel: 'EPS',
    note: 'Vector hands mark for print and apparel',
  },
];

// ── Legacy ──

const legacyLogos: LogoAsset[] = [
  {
    id: 'legacy-eps',
    name: 'Legacy Envision Logo',
    path: '/logos/legacy/1.75x.50-EnvisionLogo.eps',
    category: 'legacy',
    colorVariant: 'full-color',
    format: 'eps',
    useCases: ['print'],
    formatLabel: 'EPS',
    note: 'Previous version — use only if specifically required',
  },
  {
    id: 'legacy-pdf',
    name: 'Legacy Envision Logo',
    path: '/logos/legacy/1.75x.50-EnvisionLogo.pdf',
    category: 'legacy',
    colorVariant: 'full-color',
    format: 'pdf',
    useCases: ['print', 'digital'],
    formatLabel: 'PDF',
    note: 'Previous version — use only if specifically required',
  },
];

// ── Combined export ──

export const allLogoAssets: LogoAsset[] = [
  ...primaryFullColor,
  ...primaryBlack,
  ...primaryWhite,
  ...verticalLogo,
  ...socialProfiles,
  ...handsMark,
  ...legacyLogos,
];

// ── Wizard question definitions ──

export interface WizardOption {
  id: string;
  label: string;
  description: string;
}

export interface WizardStep {
  id: string;
  question: string;
  options: WizardOption[];
}

export const wizardSteps: WizardStep[] = [
  {
    id: 'logo-type',
    question: 'Which logo or asset do you need?',
    options: [
      { id: 'primary', label: 'Primary Envision Logo', description: 'The main horizontal Envision wordmark' },
      { id: 'vertical', label: 'Vertical / Stacked Logo', description: 'Logo stacked vertically for square spaces' },
      { id: 'social-profile', label: 'Social Media Profile Image', description: 'Pre-sized profile pictures for social platforms' },
      { id: 'hands-mark', label: 'Envision Hands Mark', description: 'The hands graphic element only' },
      { id: 'legacy', label: 'Legacy Logo (previous version)', description: 'Older logo — only if specifically required' },
    ],
  },
  {
    id: 'use-case',
    question: 'What will you be using it for?',
    options: [
      { id: 'digital', label: 'Website or Digital', description: 'Websites, email, apps, digital ads' },
      { id: 'presentation', label: 'Presentation or Document', description: 'PowerPoint, Google Slides, Word, PDF' },
      { id: 'print', label: 'Print Materials', description: 'Brochures, business cards, signage, banners' },
      { id: 'social', label: 'Social Media', description: 'Posts, stories, profile images, cover photos' },
      { id: 'apparel', label: 'Apparel or Merchandise', description: 'T-shirts, mugs, branded items' },
    ],
  },
  {
    id: 'background',
    question: 'What kind of background will it go on?',
    options: [
      { id: 'light', label: 'Light / White Background', description: 'Logo on a white or light-colored surface' },
      { id: 'dark', label: 'Dark / Colored Background', description: 'Logo on a dark, navy, or colored surface' },
      { id: 'both', label: 'Not sure / Need both', description: 'I need options for multiple backgrounds' },
    ],
  },
];
