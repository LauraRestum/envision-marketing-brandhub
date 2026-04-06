// ============================================================
// REQUEST FLOW DEFINITIONS — Gated decision trees that route
// users through smart questions before unlocking request forms.
//
// Each intent path defines a sequence of steps. The flow engine
// walks through them one at a time. Only when the user confirms
// that existing resources don't meet their need does the system
// unlock the actual ClickUp form.
//
// To add a new path: add an IntentOption + its FlowStep[].
// To modify gating: edit the steps array for the intent.
// ============================================================

export interface FlowOption {
  id: string;
  label: string;
  /** If set, this option redirects (anchor scroll, external link) instead of advancing. */
  redirect?: { type: 'anchor' | 'external' | 'imagery-search'; target: string };
  /** Advance to a specific step by ID instead of the next sequential step. */
  nextStepId?: string;
}

export interface FlowStep {
  id: string;
  question: string;
  type: 'select' | 'confirm';
  options?: FlowOption[];
  /** For 'confirm' steps: what the user is confirming. */
  confirmLabel?: string;
  /** For 'confirm' steps: the decline option label. */
  declineLabel?: string;
  /** If set, confirming redirects instead of advancing. */
  confirmRedirect?: { type: 'anchor' | 'external'; target: string };
  /** If set, declining redirects instead of advancing. */
  declineRedirect?: { type: 'anchor' | 'external'; target: string };
}

export interface IntentOption {
  id: string;
  label: string;
  icon: string;
  flowSteps: FlowStep[];
  /** The modal key to unlock at the end of the flow. */
  modalKey: string;
  /** Label for the final unlock button. */
  submitLabel: string;
}

// ── Intent paths ──

const createSomethingFlow: FlowStep[] = [
  {
    id: 'create-what',
    question: 'What are you creating?',
    type: 'select',
    options: [
      { id: 'presentation', label: 'Presentation' },
      { id: 'document', label: 'Document or one-pager' },
      { id: 'social', label: 'Social media post' },
      { id: 'flyer-signage', label: 'Flyer or signage' },
      { id: 'other', label: 'Something else' },
    ],
  },
  {
    id: 'create-checked-templates',
    question: 'Have you checked available templates?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, I checked' },
      { id: 'no', label: 'No, take me there', redirect: { type: 'anchor', target: 'templates' } },
    ],
  },
  {
    id: 'create-template-works',
    question: 'Can a template be used with minor edits?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, a template works', redirect: { type: 'anchor', target: 'templates' } },
      { id: 'no', label: 'No, I need something custom' },
    ],
  },
  {
    id: 'create-help-type',
    question: 'What do you need help with?',
    type: 'select',
    options: [
      { id: 'design', label: 'Design or layout' },
      { id: 'content', label: 'Content or copy' },
      { id: 'both', label: 'Both design and content' },
    ],
  },
];

const findImageryFlow: FlowStep[] = [
  {
    id: 'imagery-type',
    question: 'What type of imagery do you need?',
    type: 'select',
    options: [
      { id: 'classroom', label: 'Classroom or education', redirect: { type: 'imagery-search', target: 'classroom' } },
      { id: 'events', label: 'Events or community', redirect: { type: 'imagery-search', target: 'gala foundation event' } },
      { id: 'employees', label: 'Employees working', redirect: { type: 'imagery-search', target: 'employees working' } },
      { id: 'products', label: 'Products or process', redirect: { type: 'imagery-search', target: 'products manufacturing' } },
      { id: 'rehab', label: 'Rehabilitation or clinic', redirect: { type: 'imagery-search', target: 'patient therapy clinic' } },
      { id: 'research', label: 'Research or lab', redirect: { type: 'imagery-search', target: 'research lab eri' } },
      { id: 'building', label: 'Building photos', redirect: { type: 'imagery-search', target: 'building exterior' } },
    ],
  },
  {
    id: 'imagery-found',
    question: 'Did you find what you need in the approved imagery library?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, found it' },
      { id: 'no', label: 'No, I still need something' },
    ],
  },
  {
    id: 'imagery-missing',
    question: 'What is missing?',
    type: 'select',
    options: [
      { id: 'subject', label: 'A specific subject or person' },
      { id: 'program', label: 'A specific program or event' },
      { id: 'location', label: 'A specific location' },
      { id: 'new-content', label: 'New content entirely' },
    ],
  },
];

const writeMessagingFlow: FlowStep[] = [
  {
    id: 'messaging-type',
    question: 'What type of messaging do you need?',
    type: 'select',
    options: [
      { id: 'about', label: 'About Envision' },
      { id: 'program', label: 'Program description' },
      { id: 'campaign', label: 'Campaign messaging' },
      { id: 'stats', label: 'Stats, facts, or data points' },
    ],
  },
  {
    id: 'messaging-checked',
    question: 'Have you checked approved messaging and boilerplate?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, I checked' },
      { id: 'no', label: 'No, take me there', redirect: { type: 'anchor', target: 'brand-resources' } },
    ],
  },
  {
    id: 'messaging-works',
    question: 'Does existing messaging work for your needs?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, it works', redirect: { type: 'anchor', target: 'brand-resources' } },
      { id: 'no', label: 'No, I need something new' },
    ],
  },
];

const updateWebFlow: FlowStep[] = [
  {
    id: 'web-what',
    question: 'What kind of update do you need?',
    type: 'select',
    options: [
      { id: 'content', label: 'Update text or images on an existing page' },
      { id: 'new-page', label: 'Create a new page or section' },
      { id: 'bug', label: 'Fix a broken link or display issue' },
      { id: 'feature', label: 'Add a feature or integration' },
    ],
  },
  {
    id: 'web-url',
    question: 'Do you know the page URL that needs updating?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, I know the page' },
      { id: 'no', label: 'No, I need help identifying it' },
    ],
  },
];

const planCampaignFlow: FlowStep[] = [
  {
    id: 'campaign-type',
    question: 'What are you planning?',
    type: 'select',
    options: [
      { id: 'event', label: 'An event or conference' },
      { id: 'campaign', label: 'A marketing campaign' },
      { id: 'launch', label: 'A program or product launch' },
      { id: 'multi', label: 'A multi-channel initiative' },
    ],
  },
  {
    id: 'campaign-timeline',
    question: 'When do you need this?',
    type: 'select',
    options: [
      { id: 'urgent', label: 'Within 2 weeks' },
      { id: 'soon', label: '2–6 weeks out' },
      { id: 'planned', label: 'More than 6 weeks out' },
    ],
  },
];

const requestCustomFlow: FlowStep[] = [
  {
    id: 'custom-checked',
    question: 'Have you checked the available resources, templates, and imagery on this site?',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes, nothing fits my need' },
      { id: 'no-resources', label: 'Let me check resources first', redirect: { type: 'anchor', target: 'brand-resources' } },
      { id: 'no-templates', label: 'Let me check templates first', redirect: { type: 'anchor', target: 'templates' } },
    ],
  },
  {
    id: 'custom-type',
    question: 'What type of request is this?',
    type: 'select',
    options: [
      { id: 'design', label: 'Design or creative work' },
      { id: 'print', label: 'Print or reprint' },
      { id: 'asset', label: 'A file or asset I can\'t find' },
      { id: 'other', label: 'Something else' },
    ],
  },
];

// ── Exported intent options ──

export const intentOptions: IntentOption[] = [
  {
    id: 'create',
    label: 'Create something',
    icon: 'plus',
    flowSteps: createSomethingFlow,
    modalKey: 'design-request',
    submitLabel: 'Submit Design Request',
  },
  {
    id: 'imagery',
    label: 'Find photos or video',
    icon: 'image',
    flowSteps: findImageryFlow,
    modalKey: 'asset-request',
    submitLabel: 'Request New Imagery',
  },
  {
    id: 'messaging',
    label: 'Write messaging',
    icon: 'message',
    flowSteps: writeMessagingFlow,
    modalKey: 'design-request',
    submitLabel: 'Request Messaging Support',
  },
  {
    id: 'web',
    label: 'Update web or content',
    icon: 'globe',
    flowSteps: updateWebFlow,
    modalKey: 'web-request',
    submitLabel: 'Submit Web Update Request',
  },
  {
    id: 'campaign',
    label: 'Plan a campaign or event',
    icon: 'calendar',
    flowSteps: planCampaignFlow,
    modalKey: 'campaign-planning',
    submitLabel: 'Start Campaign Planning',
  },
  {
    id: 'custom',
    label: 'Request something custom',
    icon: 'download',
    flowSteps: requestCustomFlow,
    modalKey: 'asset-request',
    submitLabel: 'Submit Request',
  },
];
