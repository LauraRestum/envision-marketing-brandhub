// ============================================================
// LETTERHEAD ASSETS — Organized letterhead files with metadata
// for the guided Letterhead Downloader wizard.
//
// Each asset maps to a file in public/letterhead/ so Vite
// serves it at build time.
//
// To add a letterhead: add an entry with the correct office,
// fileType, and path. The wizard filters based on user answers.
// ============================================================

export type LetterheadOffice =
  | 'dallas-general'
  | 'dallas-foundation'
  | 'farmers-branch'
  | 'wichita-general'
  | 'wichita-eag'
  | 'evrc-dallas'
  | 'evrc-wichita'
  | 'ict-foundation'
  | 'water-street'
  | 'hr-eag'
  | 'desk-of-mjm'
  | 'no-address';

export type LetterheadFileType = 'pdf' | 'dotx' | 'indd' | 'jpg';

export interface LetterheadAsset {
  id: string;
  name: string;
  path: string;
  office: LetterheadOffice;
  fileType: LetterheadFileType;
  formatLabel: string;
  note: string;
}

export const allLetterheadAssets: LetterheadAsset[] = [
  // ── Dallas General ──
  {
    id: 'dal-gen-pdf',
    name: 'Dallas General Letterhead',
    path: '/letterhead/dallas-general/2025_Env-LH_DALLAS_Gen.pdf',
    office: 'dallas-general',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'General Envision Dallas letterhead — print or use as-is',
  },
  {
    id: 'dal-gen-header',
    name: 'Envision Header Graphic',
    path: '/letterhead/dallas-general/2025_LH-Envision-header.jpg',
    office: 'dallas-general',
    fileType: 'jpg',
    formatLabel: 'JPG (header graphic)',
    note: 'General Envision header image for custom letterhead assembly',
  },

  // ── Dallas Foundation ──
  {
    id: 'dal-fnd-pdf',
    name: 'Dallas Foundation Letterhead',
    path: '/letterhead/dallas-foundation/2025_Env-LH_DAL-FND.pdf',
    office: 'dallas-foundation',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'Envision Dallas Foundation letterhead',
  },
  {
    id: 'dal-fnd-dotx',
    name: 'Dallas Foundation Word Template',
    path: '/letterhead/dallas-foundation/Envision-Dallas-Fnd.dotx',
    office: 'dallas-foundation',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template — type directly on the letterhead',
  },
  {
    id: 'dal-fnd-indd',
    name: 'Dallas Foundation InDesign Source',
    path: '/letterhead/dallas-foundation/2025_LH-DAL-FND.indd',
    office: 'dallas-foundation',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'dal-fnd-header',
    name: 'Dallas Foundation Header Graphic',
    path: '/letterhead/dallas-foundation/2025_LH-DAL-FND-header.jpg',
    office: 'dallas-foundation',
    fileType: 'jpg',
    formatLabel: 'JPG (header graphic)',
    note: 'Header image for custom letterhead assembly',
  },

  // ── Farmers Branch ──
  {
    id: 'fb-dotx',
    name: 'Farmers Branch Word Template',
    path: '/letterhead/farmers-branch/EnvDallas-FarmersBranch.dotx',
    office: 'farmers-branch',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template for Farmers Branch location',
  },
  {
    id: 'fb-indd',
    name: 'Farmers Branch InDesign Source',
    path: '/letterhead/farmers-branch/2025_LH-FarmersBrnch.indd',
    office: 'farmers-branch',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'fb-footer',
    name: 'Farmers Branch Footer Graphic',
    path: '/letterhead/farmers-branch/2025_LH-FarmersBrnch-footer.jpg',
    office: 'farmers-branch',
    fileType: 'jpg',
    formatLabel: 'JPG (footer graphic)',
    note: 'Footer image for custom letterhead assembly',
  },
  {
    id: 'fb-evrc-footer',
    name: 'EVRC Farmers Branch Footer Graphic',
    path: '/letterhead/farmers-branch/2025_LH-EVRC-FarmersBranch-footer.jpg',
    office: 'farmers-branch',
    fileType: 'jpg',
    formatLabel: 'JPG (EVRC footer graphic)',
    note: 'EVRC-branded footer for Farmers Branch location',
  },

  // ── Wichita General ──
  {
    id: 'wch-gen-pdf',
    name: 'Wichita General Letterhead',
    path: '/letterhead/wichita-general/2025_Env-LH_WICHITA_Gen.pdf',
    office: 'wichita-general',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'General Envision Wichita letterhead',
  },

  // ── Wichita EAG ──
  {
    id: 'wch-eag-pdf',
    name: 'Wichita EAG Letterhead',
    path: '/letterhead/wichita-eag/2025_Env-LH_WICHITA_EAG.pdf',
    office: 'wichita-eag',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'Wichita Envision Accessibility Group letterhead',
  },

  // ── EVRC Dallas ──
  {
    id: 'evrc-dal-dotx',
    name: 'EVRC Dallas Word Template',
    path: '/letterhead/evrc-dallas/EVRC-Dallas.dotx',
    office: 'evrc-dallas',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template for EVRC Dallas',
  },

  // ── EVRC Wichita ──
  {
    id: 'evrc-wch-dotx',
    name: 'EVRC Wichita Word Template',
    path: '/letterhead/evrc-wichita/EVRC_Wichita.dotx',
    office: 'evrc-wichita',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template for EVRC Wichita',
  },
  {
    id: 'evrc-wch-indd',
    name: 'EVRC Wichita InDesign Source',
    path: '/letterhead/evrc-wichita/2025_LH-EVRC-WICHITA.indd',
    office: 'evrc-wichita',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'evrc-wch-header',
    name: 'EVRC Header Graphic',
    path: '/letterhead/evrc-wichita/2025_LH-EVRC-header.jpg',
    office: 'evrc-wichita',
    fileType: 'jpg',
    formatLabel: 'JPG (header graphic)',
    note: 'EVRC header image for custom letterhead assembly',
  },
  {
    id: 'evrc-wch-footer',
    name: 'EVRC Wichita Footer Graphic',
    path: '/letterhead/evrc-wichita/2025_LH-EVRC-WICHITA-footer.jpg',
    office: 'evrc-wichita',
    fileType: 'jpg',
    formatLabel: 'JPG (footer graphic)',
    note: 'EVRC Wichita footer image for custom letterhead assembly',
  },

  // ── ICT Foundation ──
  {
    id: 'ict-fnd-pdf',
    name: 'ICT Foundation Letterhead',
    path: '/letterhead/ict-foundation/2025_Env-LH_ICT-FND.pdf',
    office: 'ict-foundation',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'ICT Foundation letterhead',
  },
  {
    id: 'ict-fnd-dotx',
    name: 'ICT Foundation Word Template',
    path: '/letterhead/ict-foundation/Envision-ICT-FND.dotx',
    office: 'ict-foundation',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template — type directly on the letterhead',
  },
  {
    id: 'ict-fnd-indd',
    name: 'ICT Foundation InDesign Source',
    path: '/letterhead/ict-foundation/2025_LH-ICT-FND.indd',
    office: 'ict-foundation',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'ict-fnd-header',
    name: 'ICT Foundation Header Graphic',
    path: '/letterhead/ict-foundation/2025_LH-ICT-FND-header.jpg',
    office: 'ict-foundation',
    fileType: 'jpg',
    formatLabel: 'JPG (header graphic)',
    note: 'Header image for custom letterhead assembly',
  },

  // ── Water Street ──
  {
    id: 'ws-dotx',
    name: 'Water Street Word Template',
    path: '/letterhead/water-street/Envision-WaterSt-LH.dotx',
    office: 'water-street',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template for Water Street location',
  },
  {
    id: 'ws-indd',
    name: 'Water Street InDesign Source',
    path: '/letterhead/water-street/2025_LH-WaterSt.indd',
    office: 'water-street',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'ws-footer',
    name: 'Water Street Footer Graphic',
    path: '/letterhead/water-street/2025_LH-WaterSt-footer.jpg',
    office: 'water-street',
    fileType: 'jpg',
    formatLabel: 'JPG (footer graphic)',
    note: 'Footer image for custom letterhead assembly',
  },

  // ── HR EAG ──
  {
    id: 'hr-eag-dotx',
    name: 'HR EAG Word Template',
    path: '/letterhead/hr-eag/Envision-HR-EAG.dotx',
    office: 'hr-eag',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template for HR / Envision Accessibility Group',
  },
  {
    id: 'hr-fb-eag-dotx',
    name: 'HR Farmers Branch EAG Word Template',
    path: '/letterhead/hr-eag/Envision-HR-FB-EAG.dotx',
    office: 'hr-eag',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template for HR / EAG at Farmers Branch',
  },
  {
    id: 'hr-eag-indd',
    name: 'HR EAG InDesign Source',
    path: '/letterhead/hr-eag/2025_LH-HR-EAG.indd',
    office: 'hr-eag',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'hr-eag-header',
    name: 'HR EAG Header Graphic',
    path: '/letterhead/hr-eag/2025_LH-HR-EAG-header.jpg',
    office: 'hr-eag',
    fileType: 'jpg',
    formatLabel: 'JPG (header graphic)',
    note: 'Header image for custom letterhead assembly',
  },

  // ── Desk of M. Monteferrante ──
  {
    id: 'mjm-pdf',
    name: 'Desk of M. Monteferrante Letterhead',
    path: '/letterhead/desk-of-mjm/2025_Env-LH_MMonteferrante.pdf',
    office: 'desk-of-mjm',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'Personal letterhead for M. Monteferrante',
  },
  {
    id: 'mjm-dotx',
    name: 'Desk of MJM Word Template',
    path: '/letterhead/desk-of-mjm/Envision-MJM-LH.dotx',
    office: 'desk-of-mjm',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable Word template — type directly on the letterhead',
  },
  {
    id: 'mjm-indd',
    name: 'Desk of MJM InDesign Source',
    path: '/letterhead/desk-of-mjm/2025_LH-DESKofMJM.indd',
    office: 'desk-of-mjm',
    fileType: 'indd',
    formatLabel: 'InDesign (.indd)',
    note: 'Editable source file for design team',
  },
  {
    id: 'mjm-header',
    name: 'Desk of MJM Header Graphic',
    path: '/letterhead/desk-of-mjm/2025_LH-DESKofMJM-header.jpg',
    office: 'desk-of-mjm',
    fileType: 'jpg',
    formatLabel: 'JPG (header graphic)',
    note: 'Header image for custom letterhead assembly',
  },

  // ── No Address (Generic) ──
  {
    id: 'noaddr-pdf',
    name: 'No Address Letterhead',
    path: '/letterhead/no-address/2025_Env-LH_NoAddress.pdf',
    office: 'no-address',
    fileType: 'pdf',
    formatLabel: 'PDF (ready to print)',
    note: 'Generic Envision letterhead without a location address',
  },
  {
    id: 'noaddr-dotx',
    name: 'No Address Word Template',
    path: '/letterhead/no-address/Envision-NoAddress-LH.dotx',
    office: 'no-address',
    fileType: 'dotx',
    formatLabel: 'Word Template (.dotx)',
    note: 'Editable generic Word template — no address printed',
  },
  {
    id: 'noaddr-footer',
    name: 'No Address Footer Graphic',
    path: '/letterhead/no-address/2025_LH-NoAddress-footer.jpg',
    office: 'no-address',
    fileType: 'jpg',
    formatLabel: 'JPG (footer graphic)',
    note: 'Footer image for custom letterhead assembly',
  },
];

// ── Wizard question definitions ──

export interface LHWizardOption {
  id: string;
  label: string;
  description: string;
}

export interface LHWizardStep {
  id: string;
  question: string;
  options: LHWizardOption[];
}

export const lhWizardSteps: LHWizardStep[] = [
  {
    id: 'office',
    question: 'Which office or location is the letterhead for?',
    options: [
      { id: 'dallas-general', label: 'Dallas (General)', description: 'Envision Dallas — general use' },
      { id: 'dallas-foundation', label: 'Dallas Foundation', description: 'Envision Dallas Foundation office' },
      { id: 'farmers-branch', label: 'Farmers Branch', description: 'Envision Dallas — Farmers Branch location' },
      { id: 'wichita-general', label: 'Wichita (General)', description: 'Envision Wichita — general use' },
      { id: 'wichita-eag', label: 'Wichita EAG', description: 'Wichita Envision Accessibility Group' },
      { id: 'evrc-dallas', label: 'EVRC Dallas', description: 'Envision Vision Rehabilitation Center — Dallas' },
      { id: 'evrc-wichita', label: 'EVRC Wichita', description: 'Envision Vision Rehabilitation Center — Wichita' },
      { id: 'ict-foundation', label: 'ICT Foundation', description: 'Envision ICT Foundation' },
      { id: 'water-street', label: 'Water Street', description: 'Water Street location' },
      { id: 'hr-eag', label: 'HR / EAG', description: 'Human Resources / Envision Accessibility Group' },
      { id: 'desk-of-mjm', label: 'Desk of M. Monteferrante', description: 'Personal letterhead for M. Monteferrante' },
      { id: 'no-address', label: 'No Address (Generic)', description: 'Generic Envision letterhead without a specific location' },
    ],
  },
  {
    id: 'format',
    question: 'What format do you need?',
    options: [
      { id: 'dotx', label: 'Word Template (.dotx)', description: 'Open in Word and type directly on the letterhead' },
      { id: 'pdf', label: 'PDF (ready to print)', description: 'Print the letterhead and write or overlay content' },
      { id: 'indd', label: 'InDesign Source (.indd)', description: 'Editable source file for the design team' },
      { id: 'jpg', label: 'Header / Footer Graphics', description: 'JPG images for custom document assembly' },
      { id: 'all', label: 'Show me everything', description: 'All available files for this office' },
    ],
  },
];
