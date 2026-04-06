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
  /** Minimum character threshold for "okay" tier. */
  minLength?: number;
  /** Keywords that signal specificity (boost to "good"). */
  specificitySignals?: string[];
  /** Keywords that signal vagueness (drop to "vague"). */
  vagueSignals?: string[];
  /** Maps to a ClickUp form field name for pre-fill. */
  fieldKey: string;
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

  // Empty or near-empty
  if (wordCount < 3) {
    return {
      tier: 'vague',
      feedback: 'Too brief. Add enough detail so the team can start without a follow-up.',
    };
  }

  // Check for vague signals
  const vagueHits = (question.vagueSignals ?? GLOBAL_VAGUE_SIGNALS).filter((s) =>
    lower.includes(s)
  );
  if (vagueHits.length > 0 && wordCount < 8) {
    return {
      tier: 'vague',
      feedback: `"${vagueHits[0]}" is too generic. Be specific — who, what, where, or when?`,
    };
  }

  // Check length threshold
  const minLen = question.minLength ?? 20;
  if (trimmed.length < minLen) {
    return {
      tier: 'okay',
      feedback: 'This works, but a bit more detail would help the team move faster.',
    };
  }

  // Check for specificity signals
  const specHits = (question.specificitySignals ?? []).filter((s) =>
    lower.includes(s)
  );
  if (specHits.length > 0 || wordCount >= 15) {
    return { tier: 'good', feedback: 'Clear and specific.' };
  }

  // Default: okay
  if (wordCount >= 8) {
    return { tier: 'good', feedback: 'Looks good.' };
  }

  return {
    tier: 'okay',
    feedback: 'Usable, but more context helps. Consider adding a timeline, audience, or example.',
  };
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
  const tiers = questions.map((q) => assessAnswer(q, answers[q.id] ?? '').tier);
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

  if (goodCount === questions.length) {
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

// ── Intake definitions per request type ──

export const intakeDefinitions: Record<string, IntakeDefinition> = {
  'design-request': {
    id: 'design-request',
    title: 'Design Request',
    description: 'Tell us what you need designed. The more specific you are, the faster we can deliver.',
    emailSubject: 'Design Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    questions: [
      {
        id: 'deliverable',
        label: 'What do you need created?',
        placeholder: 'e.g., A tri-fold brochure for the Q3 open house at EVRC, 8.5x11 folded',
        hints: ['Name the specific deliverable', 'Include format or size if you know it'],
        minLength: 15,
        specificitySignals: ['brochure', 'flyer', 'poster', 'infographic', 'presentation', 'banner', 'postcard', 'rack card', 'one-pager', 'social post', 'email', 'newsletter', 'slide'],
        vagueSignals: ['something', 'stuff', 'thing', 'not sure', 'whatever', 'just need', 'make something'],
        fieldKey: 'deliverable',
      },
      {
        id: 'audience',
        label: 'Who is this for?',
        placeholder: 'e.g., Prospective families visiting ECDC during enrollment season',
        hints: ['Internal team? External audience?', 'Be specific about who will see this'],
        minLength: 10,
        specificitySignals: ['families', 'staff', 'patients', 'donors', 'partners', 'leadership', 'employees', 'community', 'students', 'visitors'],
        fieldKey: 'audience',
      },
      {
        id: 'purpose',
        label: 'What is this for?',
        placeholder: 'e.g., Handing out at the annual open house on June 15. Need to highlight new programs and enrollment info.',
        hints: ['Event, campaign, or ongoing use?', 'What action should the audience take?'],
        minLength: 20,
        specificitySignals: ['event', 'campaign', 'launch', 'open house', 'conference', 'enrollment', 'recruitment', 'awareness', 'fundraising'],
        vagueSignals: ['general use', 'just because', 'idk'],
        fieldKey: 'purpose',
      },
      {
        id: 'timeline',
        label: 'When do you need it?',
        placeholder: 'e.g., Final version by May 30. Draft review by May 20.',
        hints: ['Include the hard deadline', 'Is there a review cycle?'],
        specificitySignals: ['by', 'before', 'deadline', 'date', 'week of', 'no later than'],
        vagueSignals: ['asap', 'whenever', 'soon', 'rush', 'urgent'],
        fieldKey: 'timeline',
      },
      {
        id: 'content',
        label: 'Do you have content ready, or do you need help writing it?',
        placeholder: 'e.g., I have the main copy in a Google Doc. Need help with the headline and call to action.',
        hints: ['Link to a doc if you have one', 'List what you have vs. what you need'],
        fieldKey: 'content_status',
      },
    ],
  },

  'web-request': {
    id: 'web-request',
    title: 'Web Update Request',
    description: 'Tell us what needs to change on the website.',
    emailSubject: 'Web Update Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94453/JK968N8IMKLFUBBTMI',
    questions: [
      {
        id: 'page',
        label: 'Which page or section needs updating?',
        placeholder: 'e.g., https://envisionus.com/services/evrc — the "Our Team" section',
        hints: ['Paste the URL if you have it', 'Describe the page location if no URL'],
        specificitySignals: ['http', 'www', '.com', 'page', 'section', 'header', 'footer', 'sidebar', 'nav'],
        fieldKey: 'page_url',
      },
      {
        id: 'change',
        label: 'What needs to change?',
        placeholder: 'e.g., Replace the team photo with the updated one from January. Update Dr. Smith\'s title to "Medical Director."',
        hints: ['Be specific: what text, image, or section?', 'Old value → new value helps'],
        minLength: 15,
        vagueSignals: ['update it', 'fix it', 'change stuff', 'make it better'],
        fieldKey: 'change_description',
      },
      {
        id: 'timeline',
        label: 'When does this need to go live?',
        placeholder: 'e.g., Before the board meeting on April 20',
        specificitySignals: ['by', 'before', 'date', 'week of', 'no later'],
        vagueSignals: ['asap', 'whenever', 'soon'],
        fieldKey: 'timeline',
      },
    ],
  },

  'campaign-planning': {
    id: 'campaign-planning',
    title: 'Campaign & Event Planning',
    description: 'Help us understand the scope so we can plan the right level of support.',
    emailSubject: 'Campaign & Event Planning Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-19293/A6NNTH5EOKPY0I434C',
    questions: [
      {
        id: 'what',
        label: 'What are you planning?',
        placeholder: 'e.g., Annual Envision Golf Classic fundraiser — 200+ attendees, May 15 at Tallgrass Country Club',
        hints: ['Name the event or campaign', 'Include date, location, and expected size'],
        minLength: 20,
        specificitySignals: ['event', 'campaign', 'launch', 'conference', 'gala', 'golf', 'fundraiser', 'open house', 'webinar'],
        fieldKey: 'event_description',
      },
      {
        id: 'deliverables',
        label: 'What marketing materials do you need?',
        placeholder: 'e.g., Save-the-date email, event program, table signage, social media posts (3), post-event recap',
        hints: ['List every deliverable you expect to need', 'Include quantities if known'],
        minLength: 15,
        fieldKey: 'deliverables',
      },
      {
        id: 'timeline',
        label: 'Key dates and deadlines?',
        placeholder: 'e.g., Save-the-date by March 1. Program finalized by April 15. Social posts start April 20.',
        hints: ['List milestones in order', 'Include the hard event date'],
        specificitySignals: ['by', 'before', 'date', 'week of', 'start', 'launch', 'send'],
        vagueSignals: ['asap', 'soon', 'tbd'],
        fieldKey: 'timeline',
      },
      {
        id: 'budget',
        label: 'Is there a budget or cost constraints?',
        placeholder: 'e.g., $2,500 for print materials. Digital is covered. Need to keep signage under $500.',
        choices: ['Yes, I have a budget range', 'No budget constraints', 'Not sure yet'],
        fieldKey: 'budget',
      },
    ],
  },

  'asset-request': {
    id: 'asset-request',
    title: 'Asset Request',
    description: 'Tell us exactly what you need and we will locate or create it.',
    emailSubject: 'Asset Request',
    embedUrl: 'https://forms.clickup.com/9010115835/f/8cgpx7v-94453/JK968N8IMKLFUBBTMI',
    questions: [
      {
        id: 'what',
        label: 'What do you need?',
        placeholder: 'e.g., High-res photo of the Wichita building exterior, or the ECDC classroom during a group activity',
        hints: ['Be as specific as possible', 'Include subject, location, or context'],
        minLength: 15,
        vagueSignals: ['something', 'a photo', 'an image', 'a file', 'stuff'],
        fieldKey: 'asset_description',
      },
      {
        id: 'usage',
        label: 'How will you use it?',
        placeholder: 'e.g., For a presentation to the board of directors. Needs to be high-resolution for projection.',
        hints: ['Print, digital, presentation, social?', 'Does it need a specific size or format?'],
        specificitySignals: ['print', 'digital', 'presentation', 'social', 'email', 'website', 'brochure', 'newsletter'],
        fieldKey: 'usage',
      },
      {
        id: 'timeline',
        label: 'When do you need it?',
        placeholder: 'e.g., By next Friday for the board deck',
        specificitySignals: ['by', 'before', 'date', 'friday', 'monday', 'week'],
        vagueSignals: ['asap', 'whenever', 'soon'],
        fieldKey: 'timeline',
      },
    ],
  },
};
