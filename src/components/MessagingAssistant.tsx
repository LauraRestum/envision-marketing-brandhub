import { useState, useRef } from 'react';
import { Icon } from './Icons';
import {
  approvedCopy,
  brandVoice,
  platformFormats,
  type CopyBlock,
  type PlatformFormat,
} from '@/data/approvedMessaging';

// ── Types ──

type Tab = 'compose' | 'library' | 'reformat';
type ComposeStep = 'topic' | 'audience' | 'platform' | 'draft';

interface ComposeState {
  step: ComposeStep;
  topic: CopyBlock | null;
  audience: string;
  platform: PlatformFormat | null;
}

const audiences = [
  'General / External',
  'Donors & Partners',
  'Staff / Internal Team',
  'Patients & Families',
  'Community / Public',
  'Media / Press',
  'Leadership / Board',
];

// ── Helpers ──

function buildDraft(topic: CopyBlock, audience: string, platform: PlatformFormat): string {
  // Build a draft by fitting the approved copy into the platform template
  // and tailoring the framing to the audience
  let audienceOpener = '';
  switch (audience) {
    case 'Donors & Partners':
      audienceOpener = 'We\'re grateful for the support that makes this work possible. ';
      break;
    case 'Staff / Internal Team':
      audienceOpener = 'Team — wanted to share an update. ';
      break;
    case 'Patients & Families':
      audienceOpener = 'At Envision, we\'re here to help every step of the way. ';
      break;
    case 'Media / Press':
      audienceOpener = '';
      break;
    case 'Leadership / Board':
      audienceOpener = 'For your awareness — ';
      break;
    default:
      audienceOpener = '';
  }

  const copy = topic.content;

  if (platform.id === 'linkedin') {
    return `${audienceOpener}${copy}\n\nAt Envision, we believe vision loss is not a barrier to independence, success, and fulfillment.\n\nLearn more at envisionus.com\n\n#Envision #EmpoweringPotential`;
  }
  if (platform.id === 'linkedin-reshare') {
    return `${audienceOpener}Proud to be part of the work happening at @Envision Inc.\n\n${copy}\n\n#Envision #EmpoweringPotential`;
  }
  if (platform.id === 'email-internal') {
    return `Hi Team,\n\n${audienceOpener}${copy}\n\nPlease don't hesitate to reach out if you have questions.\n\nThank you,\n[Your Name]`;
  }
  if (platform.id === 'email-external') {
    return `Dear [Name],\n\n${audienceOpener}${copy}\n\nWe'd love to connect further — please don't hesitate to reach out.\n\nWarm regards,\n[Your Name]\n[Your Title]\nEnvision | envisionus.com`;
  }
  if (platform.id === 'social-short') {
    // Trim to fit short-form
    const short = copy.length > 220 ? copy.slice(0, 217) + '...' : copy;
    return `${short}\n\n#Envision #EmpoweringPotential`;
  }
  if (platform.id === 'newsletter') {
    return `**${topic.title}**\n\n${audienceOpener}${copy}\n\n→ Learn more at envisionus.com`;
  }
  if (platform.id === 'presentation') {
    // Break into bullet-ish points
    const sentences = copy.split(/\.\s+/).filter(Boolean);
    const bullets = sentences.map((s) => `• ${s.trim().replace(/\.$/, '')}`).join('\n');
    return `${topic.title}\n\n${bullets}`;
  }

  return `${audienceOpener}${copy}`;
}

function checkBrandCompliance(text: string): { issues: string[]; passed: string[] } {
  const issues: string[] = [];
  const passed: string[] = [];
  const lower = text.toLowerCase();

  // People-first language checks
  if (/\bthe blind\b/i.test(text)) {
    issues.push('Avoid "the blind" — use "people who are blind" (people-first language).');
  } else {
    passed.push('People-first language looks good.');
  }

  if (/\bthe disabled\b/i.test(text)) {
    issues.push('Avoid "the disabled" — use "people with disabilities."');
  }

  if (/\bblind people\b/i.test(text) && !/people who are blind/i.test(text)) {
    issues.push('Consider "people who are blind" instead of "blind people" (people-first language).');
  }

  if (/\bvisually impaired people\b/i.test(text)) {
    issues.push('Consider "people who are visually impaired" instead of "visually impaired people."');
  }

  // Pity language
  const pityTerms = ['suffers from', 'suffering from', 'afflicted', 'confined to', 'victim of', 'stricken'];
  const foundPity = pityTerms.filter((term) => lower.includes(term));
  if (foundPity.length > 0) {
    issues.push(`Remove pity language: "${foundPity.join('", "')}" — use empowering, neutral language instead.`);
  } else {
    passed.push('No pity language detected.');
  }

  // "Special needs"
  if (lower.includes('special needs')) {
    issues.push('Avoid "special needs" — use "people with disabilities" or be specific about the disability.');
  }

  // Active voice check (basic passive detection)
  if (/\b(was|were|is|are|been) (being )?\w+ed\b/i.test(text) && text.length > 100) {
    passed.push('Consider reviewing for passive voice — active voice is preferred.');
  }

  // Abbreviation check
  const abbreviations = text.match(/\b[A-Z]{2,5}\b/g);
  if (abbreviations) {
    const knownAbbrevs = ['US', 'CEO', 'PR', 'HR', 'IT', 'URL', 'PDF'];
    const envisionAbbrevs = ['ERI', 'EVRC', 'ECDC', 'BSC'];
    const unknown = abbreviations.filter(
      (a) => !knownAbbrevs.includes(a) && !envisionAbbrevs.includes(a)
    );
    if (envisionAbbrevs.some((a) => abbreviations.includes(a))) {
      const found = envisionAbbrevs.filter((a) => abbreviations.includes(a));
      // Check if spelled out
      const notSpelledOut = found.filter((a) => {
        if (a === 'ERI' && lower.includes('envision research institute')) return false;
        if (a === 'EVRC' && lower.includes('envision vision rehabilitation center')) return false;
        if (a === 'ECDC' && lower.includes('envision child development center')) return false;
        return true;
      });
      if (notSpelledOut.length > 0) {
        issues.push(`Spell out abbreviation(s) on first use: ${notSpelledOut.join(', ')}.`);
      }
    }
  }

  if (issues.length === 0) {
    passed.push('Content appears to follow brand voice guidelines.');
  }

  return { issues, passed };
}

// ── Component ──

export function MessagingAssistant({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('compose');
  const [compose, setCompose] = useState<ComposeState>({
    step: 'topic',
    topic: null,
    audience: '',
    platform: null,
  });
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryCategory, setLibraryCategory] = useState<string>('all');
  const [reformatText, setReformatText] = useState('');
  const [reformatPlatform, setReformatPlatform] = useState<PlatformFormat | null>(null);
  const [reformatResult, setReformatResult] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Compose flow ──

  function selectTopic(block: CopyBlock) {
    setCompose({ ...compose, step: 'audience', topic: block });
  }

  function selectAudience(audience: string) {
    setCompose({ ...compose, step: 'platform', audience });
  }

  function selectPlatform(platform: PlatformFormat) {
    const newState = { ...compose, step: 'draft' as ComposeStep, platform };
    setCompose(newState);
    if (newState.topic) {
      setDraft(buildDraft(newState.topic, newState.audience, platform));
    }
  }

  function resetCompose() {
    setCompose({ step: 'topic', topic: null, audience: '', platform: null });
    setDraft('');
    setCopied(false);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Library filter ──

  const filteredCopy = approvedCopy.filter((block) => {
    const matchesCategory = libraryCategory === 'all' || block.category === libraryCategory;
    const matchesSearch =
      !librarySearch ||
      block.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      block.content.toLowerCase().includes(librarySearch.toLowerCase()) ||
      block.tags.some((t) => t.toLowerCase().includes(librarySearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // ── Reformat ──

  function handleReformat(platform: PlatformFormat) {
    setReformatPlatform(platform);
    let formatted = reformatText.trim();

    if (platform.id === 'linkedin') {
      formatted = `${formatted}\n\n#Envision #EmpoweringPotential`;
    } else if (platform.id === 'linkedin-reshare') {
      formatted = `Proud to share this from @Envision Inc.:\n\n${formatted}\n\n#Envision #EmpoweringPotential`;
    } else if (platform.id === 'social-short') {
      if (formatted.length > 250) {
        formatted = formatted.slice(0, 247) + '...';
      }
      formatted = `${formatted}\n\n#Envision`;
    } else if (platform.id === 'email-internal') {
      formatted = `Hi Team,\n\n${formatted}\n\nThank you,\n[Your Name]`;
    } else if (platform.id === 'email-external') {
      formatted = `Dear [Name],\n\n${formatted}\n\nWarm regards,\n[Your Name]\n[Your Title]\nEnvision | envisionus.com`;
    } else if (platform.id === 'newsletter') {
      formatted = `**[Headline]**\n\n${formatted}\n\n→ Learn more at envisionus.com`;
    } else if (platform.id === 'presentation') {
      const sentences = formatted.split(/\.\s+/).filter(Boolean);
      formatted = sentences.map((s) => `• ${s.trim().replace(/\.$/, '')}`).join('\n');
    }

    setReformatResult(formatted);
  }

  // ── Brand check on current draft ──
  const compliance = (tab === 'compose' && draft)
    ? checkBrandCompliance(draft)
    : (tab === 'reformat' && reformatResult)
      ? checkBrandCompliance(reformatResult)
      : null;

  return (
    <div className="msg-overlay" onClick={onClose}>
      <div className="msg-assistant" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="msg__header">
          <div className="msg__header-left">
            <div className="msg__header-icon"><Icon name="sparkle" /></div>
            <div>
              <div className="msg__header-title">Messaging Assistant</div>
              <div className="msg__header-sub">AI-powered, brand-approved content</div>
            </div>
          </div>
          <button className="msg__close" onClick={onClose}><Icon name="x" /></button>
        </div>

        {/* Tabs */}
        <div className="msg__tabs">
          <button
            className={`msg__tab ${tab === 'compose' ? 'msg__tab--active' : ''}`}
            onClick={() => setTab('compose')}
          >
            <Icon name="edit" /> Compose
          </button>
          <button
            className={`msg__tab ${tab === 'library' ? 'msg__tab--active' : ''}`}
            onClick={() => setTab('library')}
          >
            <Icon name="book" /> Approved Copy
          </button>
          <button
            className={`msg__tab ${tab === 'reformat' ? 'msg__tab--active' : ''}`}
            onClick={() => setTab('reformat')}
          >
            <Icon name="share" /> Reformat
          </button>
        </div>

        {/* Body */}
        <div className="msg__body">

          {/* ── COMPOSE TAB ── */}
          {tab === 'compose' && (
            <div className="msg__compose">
              {/* Breadcrumb */}
              {compose.step !== 'topic' && (
                <div className="msg__compose-nav">
                  <button className="msg__compose-back" onClick={resetCompose}>
                    <Icon name="arrow-right" /> Start over
                  </button>
                  <div className="msg__compose-trail">
                    {compose.topic && <span className="msg__compose-crumb">{compose.topic.title}</span>}
                    {compose.audience && <span className="msg__compose-crumb">&rsaquo; {compose.audience}</span>}
                    {compose.platform && <span className="msg__compose-crumb">&rsaquo; {compose.platform.name}</span>}
                  </div>
                </div>
              )}

              {/* Step 1: Pick topic */}
              {compose.step === 'topic' && (
                <>
                  <h3 className="msg__step-title">What do you want to write about?</h3>
                  <p className="msg__step-desc">Pick an approved messaging topic and we'll help you draft it for your audience and platform.</p>
                  <div className="msg__topic-grid">
                    {approvedCopy.map((block) => (
                      <button key={block.id} className="msg__topic-card" onClick={() => selectTopic(block)}>
                        <div className="msg__topic-cat">{block.category.replace('-', ' ')}</div>
                        <div className="msg__topic-title">{block.title}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 2: Pick audience */}
              {compose.step === 'audience' && (
                <>
                  <h3 className="msg__step-title">Who are you writing this for?</h3>
                  <p className="msg__step-desc">We'll adjust the tone and framing for your audience.</p>
                  <div className="msg__audience-grid">
                    {audiences.map((a) => (
                      <button key={a} className="msg__audience-btn" onClick={() => selectAudience(a)}>
                        {a}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 3: Pick platform */}
              {compose.step === 'platform' && (
                <>
                  <h3 className="msg__step-title">Where will this be used?</h3>
                  <p className="msg__step-desc">We'll format it for the right platform with the right structure.</p>
                  <div className="msg__platform-grid">
                    {platformFormats.map((p) => (
                      <button key={p.id} className="msg__platform-card" onClick={() => selectPlatform(p)}>
                        <Icon name={p.icon} />
                        <div>
                          <div className="msg__platform-name">{p.name}</div>
                          <div className="msg__platform-desc">{p.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Step 4: Draft */}
              {compose.step === 'draft' && compose.platform && (
                <>
                  <h3 className="msg__step-title">Your Draft</h3>
                  <p className="msg__step-desc">
                    Edit the draft below. It's built from approved messaging, formatted for {compose.platform.name}.
                  </p>
                  <textarea
                    ref={textareaRef}
                    className="msg__draft-textarea"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={10}
                  />

                  {/* Platform tips */}
                  <div className="msg__tips">
                    <div className="msg__tips-title">
                      <Icon name="sparkle" /> Tips for {compose.platform.name}
                    </div>
                    <ul className="msg__tips-list">
                      {compose.platform.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Brand compliance */}
                  {compliance && (
                    <div className="msg__compliance">
                      <div className="msg__compliance-title">
                        <Icon name="help" /> Brand Check
                      </div>
                      {compliance.issues.length > 0 && (
                        <div className="msg__compliance-issues">
                          {compliance.issues.map((issue, i) => (
                            <div key={i} className="msg__compliance-item msg__compliance-item--warn">
                              <Icon name="warning" /> {issue}
                            </div>
                          ))}
                        </div>
                      )}
                      {compliance.passed.map((p, i) => (
                        <div key={i} className="msg__compliance-item msg__compliance-item--pass">
                          <Icon name="sparkle" /> {p}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="msg__draft-actions">
                    <button className="msg__btn msg__btn--primary" onClick={() => handleCopy(draft)}>
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button className="msg__btn msg__btn--secondary" onClick={resetCompose}>
                      Start Over
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── LIBRARY TAB ── */}
          {tab === 'library' && (
            <div className="msg__library">
              <div className="msg__library-controls">
                <input
                  className="msg__library-search"
                  type="text"
                  placeholder="Search approved copy..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                />
                <select
                  className="msg__library-filter"
                  value={libraryCategory}
                  onChange={(e) => setLibraryCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="mission">Mission & Vision</option>
                  <option value="boilerplate">Boilerplate</option>
                  <option value="tagline">Taglines</option>
                  <option value="value-prop">Value Propositions</option>
                  <option value="program">Programs</option>
                  <option value="stat">Stats & Facts</option>
                </select>
              </div>

              {/* Brand voice reference */}
              <details className="msg__voice-ref">
                <summary className="msg__voice-summary">
                  <Icon name="book" /> Brand Voice Guidelines
                </summary>
                <div className="msg__voice-body">
                  <div className="msg__voice-section">
                    <strong>Our Tone</strong>
                    <ul>{brandVoice.tone.map((t, i) => <li key={i}>{t}</li>)}</ul>
                  </div>
                  <div className="msg__voice-section">
                    <strong>Do</strong>
                    <ul>{brandVoice.doList.map((t, i) => <li key={i}>{t}</li>)}</ul>
                  </div>
                  <div className="msg__voice-section">
                    <strong>Don't</strong>
                    <ul>{brandVoice.dontList.map((t, i) => <li key={i}>{t}</li>)}</ul>
                  </div>
                </div>
              </details>

              <div className="msg__library-list">
                {filteredCopy.map((block) => (
                  <div key={block.id} className="msg__copy-card">
                    <div className="msg__copy-header">
                      <span className="msg__copy-cat">{block.category.replace('-', ' ')}</span>
                      <h4 className="msg__copy-title">{block.title}</h4>
                    </div>
                    <p className="msg__copy-content">{block.content}</p>
                    <p className="msg__copy-usage"><strong>Usage:</strong> {block.usage}</p>
                    <div className="msg__copy-actions">
                      <button
                        className="msg__btn msg__btn--small"
                        onClick={() => handleCopy(block.content)}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        className="msg__btn msg__btn--small msg__btn--ghost"
                        onClick={() => {
                          setTab('compose');
                          selectTopic(block);
                        }}
                      >
                        Use in Compose
                      </button>
                    </div>
                  </div>
                ))}
                {filteredCopy.length === 0 && (
                  <p className="msg__empty">No approved copy matches your search.</p>
                )}
              </div>
            </div>
          )}

          {/* ── REFORMAT TAB ── */}
          {tab === 'reformat' && (
            <div className="msg__reformat">
              <h3 className="msg__step-title">Reformat for a Platform</h3>
              <p className="msg__step-desc">
                Paste your content below and we'll reformat it for the platform you choose — ensuring it follows brand standards.
              </p>

              <textarea
                className="msg__draft-textarea"
                value={reformatText}
                onChange={(e) => { setReformatText(e.target.value); setReformatResult(''); setReformatPlatform(null); }}
                rows={5}
                placeholder="Paste your content here..."
              />

              {reformatText.trim() && !reformatResult && (
                <>
                  <p className="msg__step-desc" style={{ marginTop: 'var(--space-4)' }}>Choose a platform:</p>
                  <div className="msg__platform-grid">
                    {platformFormats.map((p) => (
                      <button key={p.id} className="msg__platform-card" onClick={() => handleReformat(p)}>
                        <Icon name={p.icon} />
                        <div>
                          <div className="msg__platform-name">{p.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {reformatResult && reformatPlatform && (
                <>
                  <div className="msg__reformat-label">
                    Formatted for <strong>{reformatPlatform.name}</strong>
                    {reformatPlatform.maxLength && (
                      <span className={`msg__char-count ${reformatResult.length > reformatPlatform.maxLength ? 'msg__char-count--over' : ''}`}>
                        {reformatResult.length} / {reformatPlatform.maxLength}
                      </span>
                    )}
                  </div>
                  <textarea
                    className="msg__draft-textarea"
                    value={reformatResult}
                    onChange={(e) => setReformatResult(e.target.value)}
                    rows={8}
                  />

                  {/* Brand compliance */}
                  {compliance && (
                    <div className="msg__compliance">
                      <div className="msg__compliance-title">
                        <Icon name="help" /> Brand Check
                      </div>
                      {compliance.issues.map((issue, i) => (
                        <div key={i} className="msg__compliance-item msg__compliance-item--warn">
                          <Icon name="warning" /> {issue}
                        </div>
                      ))}
                      {compliance.passed.map((p, i) => (
                        <div key={i} className="msg__compliance-item msg__compliance-item--pass">
                          <Icon name="sparkle" /> {p}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="msg__draft-actions">
                    <button className="msg__btn msg__btn--primary" onClick={() => handleCopy(reformatResult)}>
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button className="msg__btn msg__btn--secondary" onClick={() => { setReformatResult(''); setReformatPlatform(null); }}>
                      Try Another Format
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
