// ============================================================
// REQUEST INTAKE — Smart question definitions and quality
// assessment rules for each request type. The intake engine
// asks questions one at a time, evaluates each answer, and
// builds a structured brief that pre-fills the ClickUp form.
// ============================================================

// ── Quality tiers ──

export type QualityTier = 'vague' | 'okay' | 'good';

export interface QualityAssessment {
  tier: QualityTier;
  feedback: string;
}

// ── Intake questions ──

export interface IntakeQuestion {
  id: string;
  label: string;
  placeholder: string;
  /** Hints shown below the input to prompt better answers. */
  hints?: string[];
  /** If true, this is a select-one question instead of free text. */
  choices?: string[];
  /** Keywords that signal specificity (boost to "good"). */
  specificitySignals?: string[];
  /** Keywords that signal vagueness (drop to "vague"). */
  vagueSignals?: string[];
  /** Maps to a ClickUp form field name for pre-fill. */
  fieldKey: string;
  /** If true, user can skip this question. */
  optional?: boolean;
}

export interface IntakeDefinition {
  id: string;
  title: string;
  description: string;
  questions: IntakeQuestion[];
  /** ClickUp form URL for pre-fill. */
  embedUrl: string;
  /** Email subject for the generated brief. */
  emailSubject: string;
}

// ── Quality assessment engine ──

export function assessAnswer(question: IntakeQuestion, answer: string): QualityAssessment {
  const trimmed = answer.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const lower = trimmed.toLowerCase();

  // Choice questions are always "good" once selected
  if (question.choices) {
    return trimmed
      ? { tier: 'good', feedback: '' }
      : { tier: 'vague', feedback: 'Select an option.' };
  }

  // Completely empty
  if (!trimmed) {
    return {
      tier: 'vague',
      feedback: 'This field needs an answer so the team can get started.',
    };
  }

  // Check for vague signals — only flag if the answer is JUST vague filler
  const vagueHits = (question.vagueSignals ?? GLOBAL_VAGUE_SIGNALS).filter((s) =>
    lower.includes(s)
  );
  if (vagueHits.length > 0 && wordCount <= 3) {
    return {
      tier: 'vague',
      feedback: `"${vagueHits[0]}" is too generic. Be specific — who, what, where, or when?`,
    };
  }

  // Check for specificity signals — this is the primary quality driver
  const specHits = (question.specificitySignals ?? []).filter((s) =>
    lower.includes(s)
  );

  // If the answer contains a specificity signal, it is good regardless of length
  if (specHits.length > 0) {
    return { tier: 'good', feedback: 'Clear and specific.' };
  }

  // A single word that is not a vague signal — usable but could be better
  if (wordCount === 1) {
    return {
      tier: 'okay',
      feedback: 'A bit more context would help the team move faster.',
    };
  }

  // 2+ words without vague signals = good enough to act on
  // The user gave a real answer; trust it
  if (wordCount >= 2) {
    return { tier: 'good', feedback: 'Looks good.' };
  }

  return { tier: 'okay', feedback: 'A bit more context would help the team move faster.' };
}

const GLOBAL_VAGUE_SIGNALS = [
  'something',
  'stuff',
  'thing',
  'whatever',
  'idk',
  'not sure',
  'asap',
  'just need',
  'basic',
  'simple',
  'quick',
  'general',
  'misc',
  'tbd',
  'update it',
  'fix it',
  'make it look good',
  'make it nice',
  'do something',
];

// ── Scope assessment (overall brief quality) ──

export type ScopeTier = 'not_enough' | 'ready' | 'too_big';

export interface ScopeAssessment {
  tier: ScopeTier;
  label: string;
  message: string;
}

export function assessScope(
  questions: IntakeQuestion[],
  answers: Record<string, string>
): ScopeAssessment {
  const assessed = questions.map((q) => ({
    tier: assessAnswer(q, answers[q.id] ?? '').tier,
    optional: q.optional ?? false,
    empty: !(answers[q.id] ?? '').trim(),
  }));
  // Optional empty answers are fine — do not count them as vague
  const tiers = assessed.filter((a) => !(a.optional && a.empty)).map((a) => a.tier);
  const vagueCount = tiers.filter((t) => t === 'vague').length;
  const goodCount = tiers.filter((t) => t === 'good').length;

  if (vagueCount > 0) {
    return {
      tier: 'not_enough',
      label: 'Needs more detail',
      message: `${vagueCount} answer${vagueCount > 1 ? 's are' : ' is'} too vague. Add specifics so the team doesn't need to follow up.`,
    };
  }

  // Check if the project sounds too big (heuristic: lots of text + multiple deliverables mentioned)
  const totalWords = Object.values(answers).join(' ').split(/\s+/).length;
  const multiDeliverableSignals = ['and also', 'plus', 'as well as', 'in addition', 'multiple', 'several', 'all of'];
  const fullText = Object.values(answers).join(' ').toLowerCase();
  const bigHits = multiDeliverableSignals.filter((s) => fullText.includes(s));

  if (totalWords > 150 && bigHits.length >= 2) {
    return {
      tier: 'too_big',
      label: 'Consider breaking this up',
      message: 'This sounds like it could be multiple requests. Submit the most urgent piece first and follow up with the rest.',
    };
  }

  if (goodCount === tiers.length) {
    return {
      tier: 'ready',
      label: 'Ready to submit',
      message: 'Clear and detailed. The team can start on this without a follow-up call.',
    };
  }

  return {
    tier: 'ready',
    label: 'Good enough to submit',
    message: 'The team can work with this. You can add more detail if you have it.',
  };
}

// ── Brief generator ──

export function generateBrief(
  definition: IntakeDefinition,
  answers: Record<string, string>,
  context: Record<string, string>
): string {
  const lines: string[] = [];
  lines.push(`REQUEST: ${definition.title}`);
  lines.push(`---`);

  for (const q of definition.questions) {
    const answer = answers[q.id] ?? '';
    if (answer.trim()) {
      lines.push(`${q.label}`);
      lines.push(answer.trim());
      lines.push('');
    }
  }

  // Add context from the gating flow
  if (Object.keys(context).length > 0) {
    lines.push(`CONTEXT FROM INTAKE`);
    for (const [key, val] of Object.entries(context)) {
      lines.push(`${key}: ${val}`);
    }
  }

  return lines.join('\n');
}

// ── Shared dropdown options (match ClickUp form exactly) ──

const DEPARTMENTS = ['Corporate', 'EVRC', 'Foundation', 'ECDC', 'Interface'];
const LOCATIONS = ['Wichita', 'Dallas', 'BSCs', 'Company-wide'];
const MAJOR_EVENTS = ['None', 'Golf', 'Gala', 'White Cane Day', 'Corporate Breakfast'];
const FINAL_DELIVERABLES = [
  'PRINT: Specify the item (Flyer, brochure, signage, rack card, etc.)',
  'DIGITAL: Specify the item (Social graphic, web banner, email, etc.)',
  'Combination - Print & Digital',
];
const GRAPHIC_NEEDS = ['Images Provided', 'Stock Imagery Needed', 'New Photos/Video Needed'];
const PRIORITY_LEVELS = ['Low: 3+ weeks', 'Normal: 1-2 weeks', 'High: Less than 1 week', 'Urgent: CRITICAL EMERGENCY'];
const WEB_PRIORITY_LEVELS = ['Low: General maintenance or future event', 'Normal: Launch in 1-2 weeks', 'High: Less than 1 week', 'Urgent: CRITICAL EMERGENCY'];

// ── Shared timeline specificity signals ──

const TIMELINE_SIGNALS = ['by', 'before', 'deadline', 'date', 'week of', 'no later than', 'end of', 'beginning of', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

// ── Intake definitions per request type ──
// Each definition maps 1:1 to a ClickUp form. Questions cover every
// form field except file uploads (which the user handles on the form).

export const intakeDefinitions: Record<string, IntakeDefinition> = {

  // ────────────────────────────────────────────────
  // DESIGN / PRINT MARKETING REQUEST FORM
  // ClickUp form: 8cgpx7v-19293
  // ────────────────────────────────────────────────
  'design-request': {
    id: 'design-request',
    title: 'Design / Print Request',
    description: 'Answer these questions and we will pre-fill the ClickUp form for you. You will only need to upload files.',
    emailSubject: 'Design Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    questions: [
      {
        id: 'requestor_name',
        label: 'Your name',
        placeholder: 'e.g., Jane Smith',
        fieldKey: 'Requestor Name',
      },
      {
        id: 'department',
        label: 'Department',
        placeholder: 'Select your department',
        choices: DEPARTMENTS,
        fieldKey: 'Department',
      },
      {
        id: 'location',
        label: 'General location',
        placeholder: 'Select your location',
        choices: LOCATIONS,
        fieldKey: 'General Location',
      },
      {
        id: 'major_event',
        label: 'Is this tied to a major event?',
        placeholder: 'Select if applicable',
        choices: MAJOR_EVENTS,
        fieldKey: 'Major Event',
      },
      {
        id: 'project_name',
        label: 'Project name',
        placeholder: 'e.g., Q3 Open House Brochure for EVRC',
        hints: ['Short, descriptive name for this project or event'],
        fieldKey: 'Project Name',
      },
      {
        id: 'goal',
        label: 'What is the goal and call to action?',
        placeholder: 'e.g., Drive attendance to the open house. CTA: Register at envisionus.com/openhouse',
        hints: ['What should the audience do after seeing this?', 'e.g., Register, Donate, Attend, Contact Us'],
        specificitySignals: ['register', 'donate', 'attend', 'contact', 'visit', 'call', 'sign up', 'enroll', 'apply', 'learn more', 'rsvp'],
        vagueSignals: ['general use', 'just because', 'idk'],
        fieldKey: 'Project Goal & Call to Action',
      },
      {
        id: 'audience',
        label: 'Who is the primary audience?',
        placeholder: 'e.g., Blind/Visually Impaired Individuals, Donors, Employees',
        hints: ['Who are we talking to?'],
        specificitySignals: ['families', 'staff', 'patients', 'donors', 'partners', 'leadership', 'employees', 'community', 'students', 'visitors', 'customers', 'providers', 'blind', 'visually impaired'],
        fieldKey: 'Primary Audience',
      },
      {
        id: 'usage',
        label: 'How will this be used?',
        placeholder: 'e.g., Event handout at the open house, posted signage in the lobby',
        hints: ['Event handout, posted signage, mailed piece, digital sharing, internal reference?'],
        specificitySignals: ['handout', 'signage', 'mailed', 'digital', 'internal', 'event', 'posted', 'email', 'social media', 'presentation'],
        fieldKey: 'How will this be used?',
      },
      {
        id: 'distribution',
        label: 'Where will this be distributed or displayed?',
        placeholder: 'e.g., On-site at EVRC, social media, and partner locations',
        hints: ['On-site, website, social media, email, partner location?'],
        specificitySignals: ['on-site', 'website', 'social media', 'email', 'partner', 'lobby', 'office', 'campus', 'community'],
        fieldKey: 'Where will this be distributed or displayed?',
      },
      {
        id: 'deliverable',
        label: 'What is the final deliverable?',
        placeholder: 'Select the type',
        hints: ['Include sizing or print quantities in the next question'],
        choices: FINAL_DELIVERABLES,
        fieldKey: 'Final Deliverable',
      },
      {
        id: 'due_date',
        label: 'When do you need the final delivery?',
        placeholder: 'e.g., May 30, 2026',
        hints: ['Enter the date you need the finished piece'],
        specificitySignals: TIMELINE_SIGNALS,
        vagueSignals: ['asap', 'whenever', 'soon', 'rush', 'urgent'],
        fieldKey: 'Requested Final Delivery Due date',
      },
      {
        id: 'due_date_driver',
        label: 'What is driving the due date?',
        placeholder: 'e.g., Tied to the annual open house on June 15',
        hints: ['Is this tied to a public event, deadline, or external commitment?'],
        specificitySignals: ['event', 'launch', 'conference', 'board meeting', 'open house', 'deadline', 'commitment', 'print date'],
        fieldKey: 'What is driving the Due Date?',
      },
      {
        id: 'gl_code',
        label: 'GL Code (for production expenses)',
        placeholder: 'e.g., 5200-100-00',
        hints: ['Ask your manager if unsure'],
        fieldKey: 'GL Code (for production expenses)',
      },
      {
        id: 'requirements',
        label: 'Sizing and brand requirements',
        placeholder: 'e.g., 8.5x11, must include Envision logo and ADA disclaimer',
        hints: ['Sizing requirements, required logos, disclaimers, or brand elements'],
        fieldKey: 'Requirements',
      },
      {
        id: 'messaging',
        label: 'What messaging or content must be included?',
        placeholder: 'e.g., Event date, location, registration link, keynote speaker name. Full copy in attached Word doc.',
        hints: ['Who, what, when, where, why', 'Attach a Word doc in the Project Files on the form'],
        fieldKey: 'Messaging',
      },
      {
        id: 'graphic_needs',
        label: 'What are your graphic/image needs?',
        placeholder: 'Select one',
        choices: GRAPHIC_NEEDS,
        fieldKey: 'Graphic Needs',
      },
      {
        id: 'reference_pieces',
        label: 'Any reference pieces or inspiration?',
        placeholder: 'e.g., Similar to the 2024 Gala invite. See link: ...',
        hints: ['Links or examples you want this to feel similar to'],
        optional: true,
        fieldKey: 'Reference Pieces',
      },
      {
        id: 'responsible_accuracy',
        label: 'Who is responsible for factual accuracy?',
        placeholder: 'e.g., Sarah Johnson, Program Director',
        hints: ['Name and title of the person who can verify content'],
        fieldKey: 'Responsible for Accuracy',
      },
      {
        id: 'approvals',
        label: 'Who provides final approval?',
        placeholder: 'e.g., Tom Williams, VP of Marketing',
        hints: ['Name and title of the person who gives the green light'],
        fieldKey: 'Approvals Needed',
      },
      {
        id: 'priority',
        label: 'Priority level',
        placeholder: 'Select based on your deadline',
        choices: PRIORITY_LEVELS,
        fieldKey: 'Priority Level',
      },
    ],
  },

  // ────────────────────────────────────────────────
  // WEB UPDATE / DIGITAL CONTENT UPDATE FORM
  // ClickUp form: 8cgpx7v-94453
  // ────────────────────────────────────────────────
  'web-request': {
    id: 'web-request',
    title: 'Web / Digital Content Update',
    description: 'Answer these questions and we will pre-fill the ClickUp form for you. You will only need to upload attachments.',
    emailSubject: 'Web Update Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94453/JK968N8IMKLFUBBTMI',
    questions: [
      {
        id: 'requestor_name',
        label: 'Your name',
        placeholder: 'e.g., Jane Smith',
        fieldKey: 'Requestor Name',
      },
      {
        id: 'request_type',
        label: 'Type of request',
        placeholder: 'Select one',
        choices: ['Existing Page Update', 'New Page Request', 'Calendar-Only Listing'],
        fieldKey: 'Type of Request',
      },
      {
        id: 'update_title',
        label: 'Update title or event name',
        placeholder: 'e.g., EVRC Team Page Update, or 2026 Golf Classic Calendar Listing',
        hints: ['Name of the page being updated or event being added'],
        fieldKey: 'Update Title or Event Name',
      },
      {
        id: 'description',
        label: 'Description of changes',
        placeholder: 'e.g., Update the hours of operation on the contact page to reflect new winter hours.',
        hints: ['In 1-2 sentences, what needs to change and why?'],
        vagueSignals: ['update it', 'fix it', 'change stuff', 'make it better'],
        fieldKey: 'Description of Changes',
      },
      {
        id: 'url',
        label: 'Page URL or location',
        placeholder: 'e.g., https://envisionus.com/services/evrc',
        hints: ['Link to the existing page, or describe where a new page should live'],
        specificitySignals: ['http', 'www', '.com', '.org', 'envision', 'page', 'section'],
        fieldKey: 'Location (URL)',
      },
      {
        id: 'calendar_details',
        label: 'Calendar details (if applicable)',
        placeholder: 'e.g., Host: Foundation Team. June 15, 9am-3pm, Tallgrass Country Club. RSVP: envisionus.com/golf',
        hints: ['Host name, date(s), start/end times, location, RSVP link'],
        optional: true,
        fieldKey: 'Calendar Details (If Applicable)',
      },
      {
        id: 'publish_date',
        label: 'Target publish date',
        placeholder: 'e.g., April 20, 2026',
        hints: ['When does this need to go live?'],
        specificitySignals: TIMELINE_SIGNALS,
        vagueSignals: ['asap', 'whenever', 'soon'],
        fieldKey: 'Target Publish Date',
      },
      {
        id: 'priority',
        label: 'Priority level',
        placeholder: 'Select based on your publish date',
        choices: WEB_PRIORITY_LEVELS,
        fieldKey: 'Priority',
      },
      {
        id: 'final_approval',
        label: 'Does this need a preview before going live?',
        placeholder: 'e.g., Yes, Sarah Johnson needs to review before publish',
        hints: ['If a preview is required, who is responsible for the final green light?'],
        optional: true,
        fieldKey: 'Final Approval',
      },
    ],
  },

  // ────────────────────────────────────────────────
  // MAJOR CAMPAIGN & LARGE-SCALE EVENT FORM
  // ClickUp form: 8cgpx7v-94493
  // For high-level initiatives, multi-phase campaigns,
  // or large organizational events
  // ────────────────────────────────────────────────
  'campaign-planning': {
    id: 'campaign-planning',
    title: 'Major Campaign & Large-Scale Event',
    description: 'This kicks off the discovery process. The Marketing team will schedule a kickoff meeting after you submit.',
    emailSubject: 'Major Campaign / Large-Scale Event Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94493/T6UOLOC4XBZPFPY4E9',
    questions: [
      {
        id: 'requestor',
        label: 'Your name',
        placeholder: 'e.g., Jane Smith',
        fieldKey: 'Requestor',
      },
      {
        id: 'title',
        label: 'Campaign or event title',
        placeholder: 'e.g., 2026 Annual Golf Classic, White Cane Day Awareness Campaign',
        hints: ['Official name or working title for this initiative'],
        specificitySignals: ['golf', 'gala', 'white cane', 'corporate breakfast', 'summit', 'conference', 'fundraiser', 'open house', 'awareness', 'campaign', 'classic'],
        fieldKey: 'Campaign or Event Title',
      },
      {
        id: 'scope',
        label: 'High-level description and scope',
        placeholder: 'e.g., Multi-channel fundraiser campaign for the annual Golf Classic. One-time event with 200+ attendees, requiring 8 weeks of pre-event marketing.',
        hints: ['What is the big picture?', 'One-time event or multi-month initiative?'],
        fieldKey: 'High-Level Description & Scope',
      },
      {
        id: 'goals',
        label: 'Strategic goals and key objectives',
        placeholder: 'e.g., Raise $50k in sponsorships, 200+ attendees, strengthen corporate donor relationships',
        hints: ['What does success look like?', 'e.g., 500 attendees, $50k raised, new partnership'],
        specificitySignals: ['attendees', 'raised', 'donations', 'registrations', 'awareness', 'partnership', 'engagement', 'revenue', 'sponsors', 'leads'],
        fieldKey: 'Strategic Goals & Key Objectives',
      },
      {
        id: 'audience',
        label: 'Target audience and market segments',
        placeholder: 'e.g., Primary: Corporate donors and sponsors. Secondary: Community partners and local businesses.',
        hints: ['Primary and secondary audiences?', 'Specific demographics or stakeholders?'],
        specificitySignals: ['donors', 'sponsors', 'partners', 'employees', 'families', 'community', 'corporate', 'patients', 'providers', 'leadership', 'blind', 'visually impaired'],
        fieldKey: 'Target Audience & Market Segments',
      },
      {
        id: 'budget',
        label: 'Budget and funding source',
        placeholder: 'e.g., $15,000 marketing budget funded by the Foundation grant. Print costs separate.',
        hints: ['Estimated range?', 'Which department or grant is funding this?'],
        fieldKey: 'Budget & Funding Source',
      },
      {
        id: 'timeline',
        label: 'Estimated timeline and key milestones',
        placeholder: 'e.g., Event: June 15. Save-the-dates by April 1. Invitations by May 1. Social campaign starts May 15.',
        hints: ['Event date(s) or target launch window', 'Critical external deadlines'],
        specificitySignals: TIMELINE_SIGNALS,
        vagueSignals: ['asap', 'soon', 'tbd'],
        fieldKey: 'Estimated Timeline & Key Milestones',
      },
      {
        id: 'deliverables',
        label: 'Anticipated deliverables',
        placeholder: 'e.g., Branding refresh, save-the-date email, printed invitations, social media plan, event signage, web landing page, video production',
        hints: ['What marketing support will be needed?', 'e.g., Branding, social media, paid ads, signage, video, web page'],
        specificitySignals: ['branding', 'social media', 'paid', 'advertising', 'signage', 'video', 'web', 'landing page', 'email', 'print', 'brochure', 'invitation', 'program', 'photography'],
        fieldKey: 'Anticipated Deliverables',
      },
      {
        id: 'stakeholders',
        label: 'Key stakeholders and final decision maker',
        placeholder: 'e.g., Project lead: Sarah Johnson. Final approval: Tom Williams, VP. Other voices: Mike Chen (Foundation), Lisa Park (Events)',
        hints: ['Who are the key voices?', 'Who has final authority on strategy and spend?'],
        fieldKey: 'Stakeholders & Final Decision Maker',
      },
    ],
  },

  // ────────────────────────────────────────────────
  // ASSET REQUEST
  // Same ClickUp form as web-request (8cgpx7v-94453)
  // but framed for finding/creating assets
  // ────────────────────────────────────────────────
  'asset-request': {
    id: 'asset-request',
    title: 'Asset Request',
    description: 'Answer these questions and we will pre-fill the ClickUp form for you. You will only need to upload attachments.',
    emailSubject: 'Asset Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94473/4XU9UHCRWNRTIBMQ9D',
    questions: [
      {
        id: 'requestor_name',
        label: 'Your name',
        placeholder: 'e.g., Jane Smith',
        fieldKey: 'Requestor Name',
      },
      {
        id: 'request_type',
        label: 'Type of request',
        placeholder: 'Select one',
        choices: ['Existing Page Update', 'New Page Request', 'Calendar-Only Listing'],
        fieldKey: 'Type of Request',
      },
      {
        id: 'update_title',
        label: 'What asset are you looking for?',
        placeholder: 'e.g., High-res EVRC building exterior photo, or ECDC classroom activity shots',
        hints: ['Be specific about the subject, location, or context'],
        vagueSignals: ['something', 'a photo', 'an image', 'a file', 'stuff'],
        fieldKey: 'Update Title or Event Name',
      },
      {
        id: 'description',
        label: 'How will you use it?',
        placeholder: 'e.g., Board presentation — needs to be high-resolution for projection on a large screen',
        hints: ['Print, digital, presentation, social?', 'Any specific size or format needed?'],
        specificitySignals: ['print', 'digital', 'presentation', 'social', 'email', 'website', 'brochure', 'newsletter', 'board', 'projection'],
        fieldKey: 'Description of Changes',
      },
      {
        id: 'url',
        label: 'Link to existing asset or related page (if any)',
        placeholder: 'e.g., https://envisionus.com/about — need the hero image from this page',
        hints: ['Paste a URL if you have a reference'],
        optional: true,
        fieldKey: 'Location (URL)',
      },
      {
        id: 'publish_date',
        label: 'When do you need it?',
        placeholder: 'e.g., By next Friday for the board deck',
        specificitySignals: TIMELINE_SIGNALS,
        vagueSignals: ['asap', 'whenever', 'soon'],
        fieldKey: 'Target Publish Date',
      },
      {
        id: 'priority',
        label: 'Priority level',
        placeholder: 'Select based on your timeline',
        choices: WEB_PRIORITY_LEVELS,
        fieldKey: 'Priority',
      },
      {
        id: 'final_approval',
        label: 'Does someone need to review before you use it?',
        placeholder: 'e.g., No, I just need the file. Or: Yes, Sarah Johnson needs to approve usage.',
        optional: true,
        fieldKey: 'Final Approval',
      },
    ],
  },
};
