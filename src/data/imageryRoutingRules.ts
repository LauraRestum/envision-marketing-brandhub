// ============================================================
// IMAGERY ROUTING RULES — Maps subcategories to their parent
// destination via keyword matching. Based on the approved
// Imagery Organization Guidelines taxonomy.
//
// To add a subcategory: add a new entry with its keywords and
// the destination key from imageryDestinations.ts.
// ============================================================

export interface ImageryRoutingRule {
  subcategory: string;
  destination: string;
  keywords: string[];
}

export const imageryRoutingRules: ImageryRoutingRule[] = [
  // ── Rehabilitation & Vision Services ──
  {
    subcategory: 'EVRC',
    destination: 'rehabilitation-vision-services',
    keywords: [
      'evrc',
      'clinic',
      'therapy',
      'patient',
      'provider',
      'assistive technology',
      'orientation and mobility',
      'mobility training',
      'exterior shots',
      'vision services',
      'rehabilitation',
    ],
  },

  // ── Education & Workforce Development ──
  {
    subcategory: 'ECDC',
    destination: 'education-workforce-development',
    keywords: [
      'ecdc',
      'classroom',
      'kids',
      'teachers',
      'learning',
      'play',
      'sensory',
      'tactile tools',
    ],
  },
  {
    subcategory: 'Envision University',
    destination: 'education-workforce-development',
    keywords: [
      'envision university',
      'conference',
      'grand rounds',
      'continuing education',
      'ce',
      'education conference',
    ],
  },
  {
    subcategory: 'Career / Workforce Readiness',
    destination: 'education-workforce-development',
    keywords: [
      'level up',
      'college success',
      'workforce readiness',
      'bootcamp',
      'training',
      'college mentorship',
    ],
  },

  // ── Research & Innovation ──
  {
    subcategory: 'ERI Content',
    destination: 'research-innovation',
    keywords: [
      'eri',
      'fellowship headshots',
      'research',
      'lab',
      'research partnerships',
      'digital accessibility',
    ],
  },

  // ── Community Outreach & Engagement ──
  {
    subcategory: 'Programs',
    destination: 'community-outreach-engagement',
    keywords: [
      'arts programming',
      "heather's camp",
      'coffee and conversations',
      'adult day support',
      'community programs',
    ],
  },
  {
    subcategory: 'Foundation Events',
    destination: 'community-outreach-engagement',
    keywords: [
      'golf',
      'gala',
      'white cane day',
      'foundation event',
    ],
  },

  // ── Employment & Career Pathways ──
  {
    subcategory: 'General Employment',
    destination: 'employment-career-pathways',
    keywords: [
      'employees working',
      'print',
      'contact center',
      'manufacturing employees',
      'in-action work moments',
      'employment',
    ],
  },
  {
    subcategory: 'BSC / Retail',
    destination: 'employment-career-pathways',
    keywords: [
      'bsc',
      'retail',
      'store environment',
      'product displays',
      'customer interaction',
      'store',
    ],
  },

  // ── Products & Customer Services ──
  {
    subcategory: 'Products',
    destination: 'products-customer-services',
    keywords: [
      'finished goods',
      'packaged items',
      'product display',
      'products',
    ],
  },
  {
    subcategory: 'Manufacturing / Assembly / Kitting',
    destination: 'products-customer-services',
    keywords: [
      'assembly',
      'kitting',
      'production',
      'equipment',
      'materials',
      'workflow',
      'process shots',
    ],
  },
  {
    subcategory: 'Fulfillment Services',
    destination: 'products-customer-services',
    keywords: [
      'packaging',
      'shipping',
      'staging',
      'order preparation',
      'fulfillment',
    ],
  },

  // ── Building Photos ──
  {
    subcategory: 'Building Photos',
    destination: 'building-photos',
    keywords: [
      'building',
      'exterior',
      'facility exterior',
      'location exterior',
      'campus',
      'building photos',
    ],
  },
];
