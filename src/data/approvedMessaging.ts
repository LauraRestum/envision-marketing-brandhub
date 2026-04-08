// ============================================================
// APPROVED MESSAGING — All brand-approved copy blocks, voice
// guidelines, and boilerplate content. The Messaging Assistant
// uses this data to help users compose on-brand content.
// ============================================================

// ── Brand Voice Guidelines ──

export const brandVoice = {
  tone: [
    'Warm, dignified, and human. Envision enables. People thrive.',
    'Professional and credible. Expert without being cold or clinical.',
    'Action-oriented. Focus on what is possible, not limitations.',
    'Respectful. Person-first language always. Center agency, not deficit.',
    'Short, direct sentences. Active voice. No em dashes.',
  ],
  doList: [
    'Use person-first language: "people who are blind or low vision (BVI)" on first mention',
    'Use "sighted" or "typical vision" instead of "normal vision"',
    'Use "guide dog" instead of "seeing eye dog"',
    'Use sentence case in all body copy and headings',
    'Lead with capability and proof points in commercial contexts',
    'Lead with the person\'s experience and agency in mission contexts',
    'Keep claims measurable: stats, outcomes, and proof points over vague assertions',
    'Use active voice and short, direct sentences',
    'Use "future-ready" instead of "forward-thinking"',
    'Use "improve" instead of "optimize," "use" instead of "utilize," "start" instead of "initiate"',
    'Reference specific programs and services by their correct full names',
    'Apply the Mission/Credibility Rule: establish capability first, then mission',
  ],
  dontList: [
    'Never use deficit language: "suffers," "victim," "afflicted," "wheelchair-bound," "confined to"',
    'Never say "the blind" as a noun. Always "people who are blind or low vision"',
    'Never use "despite vision loss" or any "despite [condition]" construction',
    'Never use "normal vision." Use "sighted" or "typical vision"',
    'Never use sight-based idioms in BVI-facing content: avoid "see," "look," "watch," "blind to"',
    'Never use em dashes anywhere',
    'Never use AI-sounding phrasing: "delve," "it\'s worth noting," "certainly," "absolutely," "I\'d be happy to," "in conclusion," "leverage," "utilize"',
    'Never frame Envision as rescuing, saving, or giving back. Envision enables. People thrive.',
    'Never open commercial materials with "nonprofit," "charity," or "mission"',
    'Never use "special needs." Use specific, person-first language',
    'Never use "all abilities" in reference to ECDC',
    'Never use "forward-thinking." Use "future-ready"',
    'Never use "Envision Xpress." Always "Envision Base Supply Center"',
    'Never use "cutting-edge" or "innovative" without specific proof',
    'Never use "seeing eye dog." Always "guide dog"',
    'Never use abbreviations without first spelling them out',
  ],
  wordSwaps: [
    { instead: 'the blind', use: 'people who are blind or low vision' },
    { instead: 'visually impaired (alone)', use: 'people who are blind or low vision' },
    { instead: 'normal vision', use: 'sighted / typical vision' },
    { instead: 'seeing eye dog', use: 'guide dog' },
    { instead: 'suffers from vision loss', use: 'lives with vision loss' },
    { instead: 'despite vision loss', use: 'with the right tools and support' },
    { instead: 'optimize', use: 'improve' },
    { instead: 'utilize', use: 'use' },
    { instead: 'initiate', use: 'start' },
    { instead: 'forward-thinking', use: 'future-ready' },
    { instead: 'giving back', use: '(reframe around shared value)' },
    { instead: 'special needs', use: 'specific, person-first language' },
  ],
  missionCredibilityRule:
    'Mission follows credibility. In commercial contexts, lead with capability, compliance, and proof points. Mission may appear after credibility is established, never before. In mission-driven contexts, lead with the person\'s experience and agency. Envision enables; it does not rescue.',
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
    content: 'To improve the quality of life and provide inspiration for the blind or visually impaired through employment, outreach, rehabilitation, education and research.',
    usage: 'Use in formal communications, annual reports, grant applications, and organizational overviews. This is the official mission statement.',
    tags: ['mission', 'about', 'formal', 'overview'],
  },
  {
    id: 'brand-promise',
    title: 'Brand Promise',
    category: 'mission',
    content: 'Inspiring the community, supporting caregivers, and providing a pathway to independence for the blind or visually impaired through a continuum of opportunities so they can thrive.',
    usage: 'Use alongside the mission statement in formal materials, strategic plans, and leadership presentations.',
    tags: ['promise', 'about', 'formal'],
  },
  {
    id: 'elevator-pitch',
    title: 'Elevator Pitch',
    category: 'mission',
    content: 'We are dedicated to providing personalized solutions for people who are blind or low vision, enriching their lives through employment, outreach, rehabilitation, education, and research, so they can thrive.',
    usage: 'Use for quick introductions, networking, and conversational descriptions of Envision.',
    tags: ['elevator', 'pitch', 'about', 'overview'],
  },
  {
    id: 'boilerplate-short',
    title: 'Short Boilerplate (1-2 sentences)',
    category: 'boilerplate',
    content: 'Envision is a nonprofit social enterprise headquartered in Wichita, KS that improves the quality of life for people who are blind or low vision (BVI) through employment, outreach, rehabilitation, education, and research. People thrive with the right tools, support, and opportunities at every stage of life.',
    usage: 'Use for press releases, event descriptions, social media bios, and brief organizational mentions.',
    tags: ['boilerplate', 'short', 'press', 'bio', 'about'],
  },
  {
    id: 'boilerplate-long',
    title: 'Full Boilerplate (Paragraph)',
    category: 'boilerplate',
    content: 'Envision is a nonprofit social enterprise headquartered in Wichita, KS with a major presence in Dallas, TX. Founded in 1933, Envision improves the quality of life for people who are blind or low vision (BVI) through employment, outreach, rehabilitation, education, and research. Through the Envision Research Institute, one of the only research facilities in the world focused exclusively on blindness and low vision, Envision advances discoveries that improve lives. With a workforce that includes hundreds of employees who are BVI, Envision demonstrates that vision loss is not a barrier to meaningful employment and personal achievement.',
    usage: 'Use for annual reports, grant applications, about pages, donor communications, and detailed organizational overviews.',
    tags: ['boilerplate', 'long', 'about', 'annual report', 'grant', 'donor'],
  },
  {
    id: 'boilerplate-media',
    title: 'Media Boilerplate',
    category: 'boilerplate',
    content: 'About Envision: Envision is a nonprofit social enterprise that improves the quality of life for people who are blind or low vision (BVI). Based in Wichita, Kansas, Envision provides employment, outreach, rehabilitation, education, and research so people can thrive. Learn more at envisionus.com.',
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
    id: 'tagline-thriving',
    title: 'Anchoring Idea: Thriving',
    category: 'tagline',
    content: 'Thriving. Not surviving. Not managing. Thriving, with the right tools, the right support, and the right opportunities at every stage of life.',
    usage: 'Core brand concept. Use as a thematic anchor in campaigns, presentations, and mission-driven content.',
    tags: ['tagline', 'thriving', 'brand', 'anchor'],
  },
  {
    id: 'value-prop-employer',
    title: 'Value Proposition: Employer',
    category: 'value-prop',
    content: 'Envision is one of the largest employers of people who are blind or low vision (BVI) in the nation, demonstrating that vision loss is not a barrier to meaningful employment and career growth.',
    usage: 'Use in recruitment materials, career pages, employer branding, and workforce-related communications.',
    tags: ['employment', 'careers', 'workforce', 'employer'],
  },
  {
    id: 'value-prop-research',
    title: 'Value Proposition: Research',
    category: 'value-prop',
    content: 'The Envision Research Institute is one of the only facilities in the world dedicated exclusively to research on blindness and low vision, conducting studies in assistive technology, clinical outcomes, and quality of life that translate into real-world solutions.',
    usage: 'Use when highlighting ERI, research accomplishments, or scientific partnerships. Name specific studies and outcomes when available.',
    tags: ['research', 'ERI', 'science'],
  },
  {
    id: 'value-prop-rehab',
    title: 'Value Proposition: Rehabilitation',
    category: 'value-prop',
    content: 'Envision Vision Rehabilitation Center equips people who are blind or low vision with the tools, training, and expertise to navigate daily life with confidence, including low vision evaluations, assistive technology training, and independent living skills programs.',
    usage: 'Use for rehab services marketing, client-facing materials, and referral communications. Lead with what is possible, not what has been lost.',
    tags: ['rehabilitation', 'EVRC', 'services', 'independence'],
  },
  {
    id: 'value-prop-education',
    title: 'Value Proposition: Education',
    category: 'value-prop',
    content: 'The Envision Child Development Center provides an integrated early childhood education model where children who are blind or low vision learn alongside sighted peers, with a future-ready curriculum grounded in community involvement.',
    usage: 'Use for education-focused communications and ECDC materials. Always lead with the integration model. Never use "all abilities" or "inclusive" as a standalone claim.',
    tags: ['education', 'ECDC', 'children', 'integration'],
  },
  {
    id: 'value-prop-commercial',
    title: 'Value Proposition: Commercial Solutions',
    category: 'value-prop',
    content: 'Envision Commercial Solutions delivers print, fulfillment, contact center, assembly, and e-commerce services with on-time delivery, compliance certifications (HIPAA, FSLA), and a solution-oriented approach that serves any industry.',
    usage: 'Use for enterprise and government sales materials. Always lead with capability and proof points. Mission enters only after credibility is established.',
    tags: ['commercial', 'enterprise', 'government', 'capability'],
  },
  {
    id: 'value-prop-workforce',
    title: 'Value Proposition: Workforce Innovation',
    category: 'value-prop',
    content: 'Envision Workforce Innovation programs build real skills that lead to real jobs, including the Level-Up Pre-ETS residential program for youth ages 14 to 22 and adult workforce readiness programs focused on assistive technology.',
    usage: 'Use for workforce development content. Lead with outcomes and program specifics. Marketing audience for youth programs is TVIs and VR counselors.',
    tags: ['workforce', 'employment', 'Level-Up', 'Pre-ETS', 'training'],
  },

  // Programs
  {
    id: 'program-evrc',
    title: 'Envision Vision Rehabilitation Center (EVRC)',
    category: 'program',
    content: 'The Envision Vision Rehabilitation Center provides low vision evaluations, assistive technology training, independent living skills programs, and the Everyday Store. With locations in Wichita and Dallas, the center equips people who are blind or low vision with tools and training to navigate daily life with confidence.',
    usage: 'Use when describing EVRC services. Lead with what is possible and the client\'s agency. Never use "despite" in relation to vision loss. Never frame services as charity.',
    tags: ['EVRC', 'rehabilitation', 'services', 'assistive technology'],
  },
  {
    id: 'program-ecdc',
    title: 'Envision Child Development Center (ECDC)',
    category: 'program',
    content: 'The Envision Child Development Center provides an integrated early childhood education model where children who are blind or low vision learn alongside sighted peers. With campuses in Wichita and Dallas, certified teachers deliver a future-ready curriculum grounded in community involvement.',
    usage: 'Use for ECDC marketing and enrollment communications. Always lead with the integration model. Never use "all abilities," "children with differences," or "inclusive" as a standalone claim. Use "future-ready," not "forward-thinking."',
    tags: ['ECDC', 'education', 'children', 'early childhood', 'integration'],
  },
  {
    id: 'program-eri',
    title: 'Envision Research Institute (ERI)',
    category: 'program',
    content: 'The Envision Research Institute is one of the few research centers in the world focused exclusively on blindness and low vision. ERI conducts studies in assistive technology, clinical outcomes, and quality of life, translating findings into real-world solutions that benefit people who are blind or low vision.',
    usage: 'Use for research communications, grant proposals, and scientific partnerships. Be specific: name the studies, partnerships, and outcomes. Avoid vague terms like "innovative" or "cutting-edge" without proof.',
    tags: ['ERI', 'research', 'assistive technology', 'science'],
  },
  {
    id: 'program-bsc',
    title: 'Envision Base Supply Center',
    category: 'program',
    content: 'Envision Base Supply Center operates retail locations on military installations through the AbilityOne program. With a US-based workforce of BVI and veteran employees, the centers deliver consistent supply, product quality, and operational reliability to the military community.',
    usage: 'Use for BSC materials. Lead with operational reliability, not charity. AbilityOne is the contract mechanism, not a feel-good story. Never use "Envision Xpress" (retired).',
    tags: ['BSC', 'military', 'AbilityOne', 'retail', 'base supply'],
  },
  {
    id: 'program-arts',
    title: 'Envision Arts Center',
    category: 'program',
    content: 'The Envision Arts Center is a studio, gallery, and community creative space in Wichita. Professional and community artists create and exhibit work across visual art and expanding disciplines including music and dance.',
    usage: 'Use for arts programming. Lead with the work, the space, and the community. Never frame arts as therapy, rehabilitation, or coping. Celebrate the art first.',
    tags: ['arts', 'gallery', 'studio', 'community', 'creative'],
  },
  {
    id: 'program-mission-services',
    title: 'Envision Mission Services',
    category: 'program',
    content: 'Envision Mission Services provides community-based programs that support people who are blind or low vision (BVI) across every stage of life, including Heather\'s Camp, PRIDE Adult Day Support, and adult support groups. People choose to participate, engage on their own terms, and thrive.',
    usage: 'Use for mission services content. Lead with the continuum and the person\'s experience. Never enumerate all programs. Center agency: people choose and participate.',
    tags: ['mission services', 'community', 'programs', 'continuum'],
  },
  {
    id: 'program-workforce',
    title: 'Envision Workforce Innovation',
    category: 'program',
    content: 'Envision Workforce Innovation provides career development and employment pathways for people who are blind or low vision. The Level-Up program is a national residential Pre-ETS program for youth ages 14 to 22 at Wichita State University. Adult programs include Pathways and the Workforce Readiness Bootcamp focused on assistive technology.',
    usage: 'Use for workforce development. Lead with outcomes, program specifics, and real skills. Marketing audience for youth programs is TVIs and VR counselors. College Success Program and Talent Network are retired.',
    tags: ['workforce', 'Level-Up', 'Pre-ETS', 'careers', 'employment'],
  },
  {
    id: 'program-continuing-ed',
    title: 'Continuing Education',
    category: 'program',
    content: 'Envision Continuing Education offers Grand Rounds, the Envision Conference, and on-demand courses for vision rehabilitation professionals and allied health practitioners. Programs provide CEU credits and position Envision as a peer institution and thought leader in the field.',
    usage: 'Use for CE marketing. Lead with content quality, faculty, and CEU credits. Externally always reference as "Continuing Education," not "Envision University." Write to the credential level of the audience.',
    tags: ['continuing education', 'CEU', 'conference', 'Grand Rounds', 'professional development'],
  },

  // Key Stats
  {
    id: 'stat-employees',
    title: 'Employment Stat',
    category: 'stat',
    content: 'Envision employs hundreds of individuals who are blind or low vision (BVI), making it one of the largest employers of people with vision loss in the United States.',
    usage: 'Use in workforce communications, impact reports, and employer branding.',
    tags: ['stat', 'employment', 'impact', 'workforce'],
  },
  {
    id: 'stat-founded',
    title: 'Founded / History',
    category: 'stat',
    content: 'Founded in 1933, Envision has served people who are blind or low vision for over 90 years, growing from a small workshop into a nationally recognized leader in employment, outreach, rehabilitation, education, and research.',
    usage: 'Use in historical context, about pages, milestones, and organizational overviews.',
    tags: ['stat', 'history', 'founded', 'about', 'milestone'],
  },
  {
    id: 'stat-continuum',
    title: 'Continuum of Services',
    category: 'stat',
    content: 'Envision provides a continuum of services spanning early childhood education, vision rehabilitation, workforce development, community programs, employment, and research, supporting people who are blind or low vision at every stage of life.',
    usage: 'Use when describing the breadth of Envision\'s offerings in overviews and marketing materials.',
    tags: ['stat', 'services', 'continuum', 'overview'],
  },
  {
    id: 'stat-locations',
    title: 'Locations',
    category: 'stat',
    content: 'Envision is headquartered in Wichita, KS with a major presence in Farmers Branch/Dallas, TX, and operates Envision Base Supply Center retail locations on military installations across the country.',
    usage: 'Use when referencing Envision\'s geographic footprint.',
    tags: ['stat', 'locations', 'Wichita', 'Dallas', 'geography'],
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
    description: 'Professional post for sharing Envision news, stories, or content.',
    template: `[Hook: start with something attention-grabbing]

[Your main message: 2-3 sentences about the story, achievement, or news]

[Why it matters: connect to Envision's impact or mission]

[Call to action: what should people do next?]

#Envision #EmpoweringPotential [additional relevant hashtags]`,
    tips: [
      'Start with a hook: a bold statement, question, or surprising fact. First line must earn the read.',
      'Short, direct, human. Conversational tone. No jargon or corporate speak.',
      'Person-first language always: "people who are blind or low vision (BVI)."',
      'No em dashes. No AI-sounding phrasing.',
      'Use hashtags sparingly and only when they add reach.',
      'Tag @Envision Inc. when mentioning the organization.',
      'Images should be candid, never staged or inspirational-poster aesthetic.',
    ],
  },
  {
    id: 'linkedin-reshare',
    name: 'LinkedIn Reshare',
    icon: 'share',
    maxLength: 3000,
    description: 'Comment for resharing an Envision post on your personal LinkedIn.',
    template: `[Personal connection: why this matters to you]

[Brief context: what the post is about in your own words]

[Connection to your role or experience at Envision]

#Envision #EmpoweringPotential`,
    tips: [
      'Add a personal touch. Why does this resonate with you?',
      'Keep it to 2-4 short sentences.',
      'Mention your role or connection to the work.',
      'Always tag @Envision Inc.',
      'Person-first language. No em dashes.',
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

[Opening: what this is about in 1 sentence]

[Details: key information, context, and any changes or actions needed]

[Next steps or call to action]

Thank you,
[Your Name]
[Your Title]`,
    tips: [
      'Get to the point immediately. No "I hope this email finds you well."',
      'Subject line: specific, action-oriented.',
      'Short paragraphs. One idea per paragraph.',
      'Direct and clear. Less formal than external, but consistent with brand voice.',
      'Mission-connected tone: staff should feel the purpose in their work.',
    ],
  },
  {
    id: 'email-external',
    name: 'External Email',
    icon: 'mail',
    maxLength: null,
    description: 'External-facing email for partners, donors, or community contacts.',
    template: `Subject: [Specific, benefit-forward subject line]

Dear [Name / Title],

[Opening: get to the point immediately]

[Body: key details, context, and value proposition]

[About Envision: use short boilerplate if recipient is unfamiliar]

[One clear call to action]

Warm regards,
[Your Name]
[Your Title]
Envision | envisionus.com`,
    tips: [
      'Subject line: specific and benefit-forward, no clickbait.',
      'Opening line: get to the point. No "I hope this email finds you well."',
      'One clear action per email.',
      'Always include name, title, Envision, and contact info in signature.',
      'Person-first language. No em dashes. No AI-sounding phrasing.',
    ],
  },
  {
    id: 'social-short',
    name: 'Social Media (Short)',
    icon: 'megaphone',
    maxLength: 280,
    description: 'Short-form post for X (Twitter), Facebook, or Instagram captions.',
    template: `[Key message in 1-2 sentences]

[Link or call to action]

#Envision #EmpoweringPotential`,
    tips: [
      'Short, direct, human. One clear message per post.',
      'Lead with the hook: first line must earn the read.',
      'Person-first language always. No jargon.',
      'No em dashes. No AI-sounding phrasing.',
      'Use hashtags sparingly: only when they add reach, not decoration.',
    ],
  },
  {
    id: 'newsletter',
    name: 'Newsletter Blurb',
    icon: 'document',
    maxLength: null,
    description: 'Short content block for internal or external newsletters.',
    template: `**[Headline]**

[Summary: 2-3 sentences covering the who, what, and why]

[Impact or outcome: why this matters]

[Link to read more or take action]`,
    tips: [
      'Write a compelling headline that can stand alone.',
      'Front-load the most important info in the first sentence.',
      'Keep blurbs to 75-100 words.',
      'End with a clear link or call to action. Use action verbs: "Learn more." "Get started."',
      'Person-first language. Short sentences. Active voice.',
    ],
  },
  {
    id: 'presentation',
    name: 'Presentation Slide',
    icon: 'typography',
    maxLength: null,
    description: 'Concise text for a presentation slide or talking point.',
    template: `[Slide title: 3-5 words]

- [Key point 1: short phrase or single sentence]
- [Key point 2]
- [Key point 3]

[Optional: supporting stat or quote]`,
    tips: [
      'Keep slide text minimal. Expand verbally.',
      'Use bullet points, not paragraphs. One idea per slide when possible.',
      'Use approved stats and data points from the messaging guide.',
      'For commercial/sales slides: lead with capability, compliance, proof points. Mission is the closer, not the opener.',
      'Sentence case. No em dashes.',
    ],
  },
  {
    id: 'press-release',
    name: 'Press Release',
    icon: 'document',
    maxLength: null,
    description: 'Standard AP style press release for media distribution.',
    template: `[Headline: sentence case]

[Lead paragraph: who, what, when, where, why in 40 words or fewer]

[Supporting details: 1-2 paragraphs of context and specifics]

[Quote from a named Envision leader]

[Additional context or background]

###

[Media boilerplate]`,
    tips: [
      'Standard AP style. Lead paragraph: who, what, when, where, why in 40 words or fewer.',
      'One strong quote from a named Envision leader. Not generic.',
      'Always include the standard Envision media boilerplate at the end.',
      'Mission context belongs in the boilerplate, not the lead.',
      'No em dashes. Sentence case. Person-first language.',
    ],
  },
  {
    id: 'donor-communication',
    name: 'Donor Communication',
    icon: 'mail',
    maxLength: null,
    description: 'Impact-focused communication for donors and community partners.',
    template: `[Opening: specific person, specific outcome]

[Story: what happened, grounded in real details]

[Impact: quantify outcomes with numbers and proof points]

[Gratitude: genuine, not performative]

[Call to action or next step]`,
    tips: [
      'Lead with a story. Specific person, specific outcome.',
      'Quantify impact: numbers, outcomes, proof points.',
      'Gratitude is genuine, not performative.',
      'Donor names are appropriate in this context.',
      'Tone: grateful, impact-driven, relationship-focused.',
    ],
  },
  {
    id: 'sales-asset',
    name: 'Sales / Capabilities Deck',
    icon: 'typography',
    maxLength: null,
    description: 'Capability-led content for enterprise and government buyers.',
    template: `[Headline: capability or outcome-focused]

- [Key capability 1 with proof point]
- [Key capability 2 with certification or metric]
- [Key capability 3 with delivery or compliance detail]

[Optional: mission context as closer, not opener]`,
    tips: [
      'Lead with capability always. Apply the Mission/Credibility Rule.',
      'Proof points before mission. Certifications, compliance, delivery metrics are primary.',
      'Mission is the closer, not the opener, if it appears at all.',
      'No charity framing. No nonprofit opener.',
      'Never open with "we\'re a nonprofit" or "mission-driven."',
    ],
  },
];
