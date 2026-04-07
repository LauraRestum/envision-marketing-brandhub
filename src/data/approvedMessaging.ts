// ============================================================
// APPROVED MESSAGING — All brand-approved copy blocks, voice
// guidelines, and boilerplate content. The Messaging Assistant
// uses this data to help users compose on-brand content.
// ============================================================

// ── Brand Voice Guidelines ──

export const brandVoice = {
  tone: [
    'Warm and empowering — we uplift the people we serve and the communities we support.',
    'Professional but approachable — expert without being cold or clinical.',
    'Action-oriented — we focus on what\'s possible, not limitations.',
    'Inclusive and respectful — people-first language always.',
  ],
  doList: [
    'Use people-first language (e.g., "people who are blind" not "blind people")',
    'Lead with impact and outcomes',
    'Speak to empowerment, independence, and possibility',
    'Keep language clear, direct, and jargon-free',
    'Use active voice whenever possible',
    'Reference specific programs and services by their correct names',
  ],
  dontList: [
    'Don\'t use pity language ("suffers from," "confined to," "afflicted")',
    'Don\'t say "the blind" or "the disabled" — always use people-first language',
    'Don\'t use overly clinical or bureaucratic language',
    'Don\'t make promises or guarantees about outcomes',
    'Don\'t use "special needs" — say "people with disabilities"',
    'Don\'t use abbreviations or acronyms without first spelling them out',
  ],
};

// ── Approved Boilerplate Copy ──

export interface CopyBlock {
  id: string;
  title: string;
  category: 'boilerplate' | 'tagline' | 'value-prop' | 'program' | 'stat' | 'mission';
  content: string;
  usage: string;
  tags: string[];
}

export const approvedCopy: CopyBlock[] = [
  // Mission & About
  {
    id: 'mission-statement',
    title: 'Mission Statement',
    category: 'mission',
    content: 'Envision empowers people who are blind or visually impaired to achieve their full potential through rehabilitation, education, employment, and innovation.',
    usage: 'Use in formal communications, annual reports, grant applications, and organizational overviews.',
    tags: ['mission', 'about', 'formal', 'overview'],
  },
  {
    id: 'vision-statement',
    title: 'Vision Statement',
    category: 'mission',
    content: 'A world where blindness and vision loss are not barriers to achieving independence, success, and fulfillment.',
    usage: 'Use alongside the mission statement in formal materials, strategic plans, and leadership presentations.',
    tags: ['vision', 'about', 'formal'],
  },
  {
    id: 'boilerplate-short',
    title: 'Short Boilerplate (1-2 sentences)',
    category: 'boilerplate',
    content: 'Envision is a national leader in empowering people who are blind or visually impaired. Through rehabilitation, education, employment, and research, Envision helps individuals achieve independence and reach their full potential.',
    usage: 'Use for press releases, event descriptions, social media bios, and brief organizational mentions.',
    tags: ['boilerplate', 'short', 'press', 'bio', 'about'],
  },
  {
    id: 'boilerplate-long',
    title: 'Full Boilerplate (Paragraph)',
    category: 'boilerplate',
    content: 'Envision is a national leader in empowering people who are blind or visually impaired to achieve independence, success, and fulfillment. Headquartered in Wichita, Kansas, Envision provides a comprehensive continuum of services — from rehabilitation and education to employment and cutting-edge research. Through its Envision Research Institute, one of the only research facilities in the world focused exclusively on blindness and low vision, Envision is advancing breakthroughs that improve lives. With a workforce that includes hundreds of employees who are blind or visually impaired, Envision leads by example, demonstrating that vision loss is not a barrier to meaningful employment and personal achievement.',
    usage: 'Use for annual reports, grant applications, about pages, donor communications, and detailed organizational overviews.',
    tags: ['boilerplate', 'long', 'about', 'annual report', 'grant', 'donor'],
  },
  {
    id: 'boilerplate-media',
    title: 'Media Boilerplate',
    category: 'boilerplate',
    content: 'About Envision: Envision is a national leader in creating opportunities for people who are blind or visually impaired. Based in Wichita, Kansas, Envision provides rehabilitation, education, employment, and research services that empower individuals to live independently and thrive. Learn more at envisionus.com.',
    usage: 'Use at the end of press releases and media advisories.',
    tags: ['boilerplate', 'press', 'media', 'PR'],
  },

  // Taglines & Value Propositions
  {
    id: 'tagline-primary',
    title: 'Primary Tagline',
    category: 'tagline',
    content: 'Empowering Potential. Enriching Lives.',
    usage: 'Primary tagline for use in marketing materials, presentations, and brand communications.',
    tags: ['tagline', 'primary', 'brand'],
  },
  {
    id: 'value-prop-employer',
    title: 'Value Proposition — Employer',
    category: 'value-prop',
    content: 'Envision is one of the largest employers of people who are blind or visually impaired in the nation, proving that vision loss is not a barrier to meaningful employment and career growth.',
    usage: 'Use in recruitment materials, career pages, employer branding, and workforce-related communications.',
    tags: ['employment', 'careers', 'workforce', 'employer'],
  },
  {
    id: 'value-prop-research',
    title: 'Value Proposition — Research',
    category: 'value-prop',
    content: 'The Envision Research Institute is one of the only facilities in the world dedicated exclusively to research on blindness and low vision, driving innovations that improve quality of life for people around the globe.',
    usage: 'Use when highlighting ERI, research accomplishments, or innovation initiatives.',
    tags: ['research', 'ERI', 'innovation', 'science'],
  },
  {
    id: 'value-prop-rehab',
    title: 'Value Proposition — Rehabilitation',
    category: 'value-prop',
    content: 'Envision\'s rehabilitation programs help individuals who are blind or visually impaired build the skills and confidence they need to live independently — from daily living and mobility training to assistive technology.',
    usage: 'Use for rehab services marketing, patient-facing materials, and referral communications.',
    tags: ['rehabilitation', 'services', 'patients', 'independence'],
  },
  {
    id: 'value-prop-education',
    title: 'Value Proposition — Education',
    category: 'value-prop',
    content: 'Through the Envision Child Development Center and workforce training programs, Envision provides specialized education that prepares children and adults who are blind or visually impaired for success at every stage of life.',
    usage: 'Use for education-focused communications, ECDC materials, and workforce development content.',
    tags: ['education', 'ECDC', 'children', 'workforce', 'training'],
  },

  // Programs
  {
    id: 'program-evrc',
    title: 'Envision Vision Rehabilitation Center (EVRC)',
    category: 'program',
    content: 'The Envision Vision Rehabilitation Center provides comprehensive rehabilitation services for people who are blind or visually impaired, including orientation and mobility training, assistive technology instruction, daily living skills, and counseling — helping individuals regain confidence and independence.',
    usage: 'Use when describing EVRC services in marketing materials, referral communications, and program overviews.',
    tags: ['EVRC', 'rehabilitation', 'clinic', 'services'],
  },
  {
    id: 'program-ecdc',
    title: 'Envision Child Development Center (ECDC)',
    category: 'program',
    content: 'The Envision Child Development Center offers an inclusive early childhood education environment where children who are blind or visually impaired learn alongside sighted peers. Certified teachers provide specialized instruction tailored to each child\'s needs, fostering development and preparing them for success in school and beyond.',
    usage: 'Use for ECDC marketing, enrollment communications, and education-focused content.',
    tags: ['ECDC', 'education', 'children', 'early childhood', 'inclusive'],
  },
  {
    id: 'program-eri',
    title: 'Envision Research Institute (ERI)',
    category: 'program',
    content: 'The Envision Research Institute is one of the few research centers in the world focused exclusively on blindness and low vision. ERI conducts groundbreaking studies in areas such as assistive technology, clinical outcomes, and quality of life — translating research into real-world solutions that benefit people who are blind or visually impaired.',
    usage: 'Use for research communications, grant proposals, scientific partnerships, and innovation-focused content.',
    tags: ['ERI', 'research', 'innovation', 'assistive technology', 'science'],
  },

  // Key Stats
  {
    id: 'stat-employees',
    title: 'Employment Stat',
    category: 'stat',
    content: 'Envision employs hundreds of individuals who are blind or visually impaired, making it one of the largest employers of people with vision loss in the United States.',
    usage: 'Use in workforce communications, impact reports, and employer branding.',
    tags: ['stat', 'employment', 'impact', 'workforce'],
  },
  {
    id: 'stat-founded',
    title: 'Founded / History',
    category: 'stat',
    content: 'Founded in 1933, Envision has served people who are blind or visually impaired for over 90 years, evolving from a small workshop into a nationally recognized leader in rehabilitation, education, employment, and research.',
    usage: 'Use in historical context, about pages, milestones, and organizational overviews.',
    tags: ['stat', 'history', 'founded', 'about', 'milestone'],
  },
  {
    id: 'stat-continuum',
    title: 'Continuum of Services',
    category: 'stat',
    content: 'Envision offers a comprehensive continuum of services — from early childhood education and rehabilitation to employment and cutting-edge research — supporting individuals who are blind or visually impaired at every stage of life.',
    usage: 'Use when describing the breadth of Envision\'s offerings in overviews and marketing materials.',
    tags: ['stat', 'services', 'continuum', 'overview'],
  },
];

// ── Platform Formatting Templates ──

export interface PlatformFormat {
  id: string;
  name: string;
  icon: string;
  maxLength: number | null;
  description: string;
  template: string;
  tips: string[];
}

export const platformFormats: PlatformFormat[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn Post',
    icon: 'globe',
    maxLength: 3000,
    description: 'Professional post for sharing Envision news, stories, or resharing content.',
    template: `[Hook — start with something attention-grabbing]

[Your main message — 2-3 sentences about the story, achievement, or news]

[Why it matters — connect to Envision's mission or impact]

[Call to action — what should people do next?]

#Envision #EmpoweringPotential [additional relevant hashtags]`,
    tips: [
      'Start with a hook — a bold statement, question, or surprising fact',
      'Keep paragraphs short (1-2 sentences) with line breaks between them',
      'Tag @Envision Inc. when mentioning the organization',
      'Use 3-5 relevant hashtags at the end',
      'Posts with images get 2x more engagement',
    ],
  },
  {
    id: 'linkedin-reshare',
    name: 'LinkedIn Reshare',
    icon: 'share',
    maxLength: 3000,
    description: 'Comment for resharing an Envision post on your personal LinkedIn.',
    template: `[Personal connection — why this matters to you]

[Brief context — what the post is about in your own words]

[Proud to be part of / Grateful to work with — connect to your role]

#Envision #EmpoweringPotential`,
    tips: [
      'Add a personal touch — why does this resonate with you?',
      'Keep it to 2-4 short sentences',
      'Mention your role or connection to the work',
      'Always tag @Envision Inc.',
    ],
  },
  {
    id: 'email-internal',
    name: 'Internal Email',
    icon: 'mail',
    maxLength: null,
    description: 'Internal email for staff communications, announcements, or updates.',
    template: `Subject: [Clear, specific subject line]

Hi [Team / All],

[Opening — what this is about in 1 sentence]

[Details — key information, context, and any changes or actions needed]

[Next steps or call to action]

Thank you,
[Your Name]
[Your Title]`,
    tips: [
      'Keep subject lines specific and action-oriented',
      'Lead with the most important information',
      'Use bullet points for lists of items or action steps',
      'Keep it concise — aim for scannable, not long paragraphs',
    ],
  },
  {
    id: 'email-external',
    name: 'External Email',
    icon: 'mail',
    maxLength: null,
    description: 'External-facing email for partners, donors, or community contacts.',
    template: `Subject: [Clear, professional subject line]

Dear [Name / Title],

[Opening — purpose of the email]

[Body — key details, context, and value proposition]

[About Envision — use short boilerplate if recipient is unfamiliar]

[Call to action — what you're asking for or offering]

Warm regards,
[Your Name]
[Your Title]
Envision | envisionus.com`,
    tips: [
      'Use the short boilerplate if the recipient may not know Envision',
      'Keep a professional but warm tone',
      'Always include contact information and the Envision website',
      'Proofread for people-first language',
    ],
  },
  {
    id: 'social-short',
    name: 'Social Media (Short)',
    icon: 'megaphone',
    maxLength: 280,
    description: 'Short-form post for X (Twitter), Facebook, or Instagram captions.',
    template: `[Key message in 1-2 sentences] [Emoji optional]

[Link or call to action]

#Envision #EmpoweringPotential`,
    tips: [
      'Keep it punchy — one clear message per post',
      'Use emojis sparingly and professionally',
      'Include a link when relevant',
      'Use 2-3 hashtags max on X/Twitter, up to 5 on Facebook',
    ],
  },
  {
    id: 'newsletter',
    name: 'Newsletter Blurb',
    icon: 'document',
    maxLength: null,
    description: 'Short content block for internal or external newsletters.',
    template: `**[Headline]**

[Summary — 2-3 sentences covering the who, what, and why]

[Impact or outcome — why this matters]

[Link to read more or take action]`,
    tips: [
      'Write a compelling headline that can stand alone',
      'Front-load the most important info in the first sentence',
      'Keep blurbs to 75-100 words',
      'End with a clear link or call to action',
    ],
  },
  {
    id: 'presentation',
    name: 'Presentation Slide',
    icon: 'typography',
    maxLength: null,
    description: 'Concise text for a presentation slide or talking point.',
    template: `[Slide Title — 3-5 words]

• [Key point 1 — short phrase or single sentence]
• [Key point 2]
• [Key point 3]

[Optional: supporting stat or quote]`,
    tips: [
      'Keep slide text minimal — expand verbally',
      'Use bullet points, not paragraphs',
      'One idea per slide when possible',
      'Use approved stats and data points from the messaging guide',
    ],
  },
];
