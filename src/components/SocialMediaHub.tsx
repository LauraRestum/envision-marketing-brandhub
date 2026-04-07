import { useState } from 'react';
import { Icon } from './Icons';
import type { ActionType } from '@/data/types';

/* ── Platform data ── */
interface Platform {
  id: string;
  name: string;
  icon: string;
  url: string;
  audience: string;
  usage: string;
  bestPractices: string;
  /** Optional iframe embed URL for live feed preview */
  embedUrl?: string;
  /** Hex color for the platform accent */
  color: string;
}

const platforms: Platform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/share/1DzeJL9y4S/?mibextid=wwXIfr',
    audience: 'Community members, families, prospective referrals',
    usage: 'Stories, events, community highlights, culture posts',
    bestPractices: 'Warm, community-focused tone. Great for celebrating milestones, sharing events, and spotlighting people. Keep it personal and relatable.',
    embedUrl:
      'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DzeJL9y4S%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false',
    color: '#1877F2',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/company/envision-inc/',
    audience: 'Industry professionals, potential partners, job seekers',
    usage: 'Thought leadership, company news, career opportunities',
    bestPractices: 'Professional but approachable. Focus on thought leadership, industry insights, and company achievements. This is where we build credibility.',
    color: '#0A66C2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/discoverenvision?igsh=MWdtMG1qOXBrcGRuYg%3D%3D&utm_source=qr',
    audience: 'Younger audience, visual-first followers, potential employees',
    usage: 'Behind-the-scenes, culture, short-form video, stories',
    bestPractices: 'Visual-first and authentic. Show the human side — behind-the-scenes, team culture, day-in-the-life. Keep captions conversational and use stories often.',
    color: '#E4405F',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    url: 'https://www.tiktok.com/@discoverenvision?_r=1&_t=ZP-95KICtXRLtW',
    audience: 'Gen Z and younger millennials, trend-driven audience',
    usage: 'Short-form video, trends, behind-the-scenes, culture',
    bestPractices: 'Fun, casual, and trend-aware. Quick videos that show personality. Don\'t overthink it — authenticity wins here. More personal, less corporate.',
    color: '#000000',
  },
];

/* ── Quiz step definitions ── */
type QuizStep =
  | 'start'
  | 'campaign-type'
  | 'event-details'
  | 'oneoff-type'
  | 'outcome-personal'
  | 'outcome-event'
  | 'outcome-campaign'
  | 'outcome-collaborate';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onMessagingAssistant: () => void;
}

const INTAKE_URL = 'https://envision-marketing-dashboard-jnqm.vercel.app/api/intake';

export function SocialMediaHub({ onAction, onMessagingAssistant }: Props) {
  const [step, setStep] = useState<QuizStep>('start');
  const [socialName, setSocialName] = useState('');
  const [socialEmail, setSocialEmail] = useState('');
  const [socialIdea, setSocialIdea] = useState('');
  const [socialSubmitting, setSocialSubmitting] = useState(false);
  const [socialSubmitted, setSocialSubmitted] = useState(false);
  const [socialError, setSocialError] = useState('');

  async function handleSocialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSocialSubmitting(true);
    setSocialError('');

    try {
      const res = await fetch(INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'social_submission',
          name: socialName,
          email: socialEmail,
          idea: socialIdea,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSocialSubmitted(true);
    } catch {
      setSocialError('Something went wrong. Please try again.');
    } finally {
      setSocialSubmitting(false);
    }
  }

  function reset() {
    setStep('start');
  }

  function openWebUpdate() {
    onAction({ actionType: 'modal', modalKey: 'web-request' });
  }

  return (
    <section className="section section--alt" id="social-hub">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Social Presence</div>
          <h2 className="section__title">Social Media Hub</h2>
          <p className="section__subtitle">
            Quick links to our official platforms, plus guidance on where your content fits best.
          </p>
        </div>

        {/* ── Platform feed previews — 4 across ── */}
        <div className="social-feeds">
          {platforms.map((p) => (
            <div key={p.id} className="social-feed-card">
              <div className="social-feed-card__header" style={{ borderTopColor: p.color }}>
                <div className="social-feed-card__icon" style={{ background: p.color }}>
                  <Icon name={p.icon} />
                </div>
                <div className="social-feed-card__info">
                  <h3 className="social-feed-card__name">{p.name}</h3>
                  <p className="social-feed-card__audience">{p.audience}</p>
                </div>
              </div>

              <div className="social-feed-card__preview">
                {p.embedUrl ? (
                  <iframe
                    src={p.embedUrl}
                    width="100%"
                    height="500"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`${p.name} feed`}
                  />
                ) : (
                  <div className="social-feed-card__placeholder">
                    <div
                      className="social-feed-card__placeholder-icon"
                      style={{ background: p.color }}
                    >
                      <Icon name={p.icon} size={32} />
                    </div>
                    <p className="social-feed-card__placeholder-label">
                      <strong>Best for:</strong> {p.usage}
                    </p>
                    <a
                      className="social-feed-card__visit"
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: p.color }}
                    >
                      Visit {p.name} <Icon name="arrow-right" />
                    </a>
                  </div>
                )}
              </div>

              <div className="social-feed-card__footer">
                <div className="social-feed-card__best-practices">
                  <span className="social-feed-card__bp-label">Best practices:</span>
                  <span className="social-feed-card__bp-text">{p.bestPractices}</span>
                </div>
                <a
                  className="social-feed-card__link"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Page <Icon name="arrow-right" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Content routing questionnaire ── */}
        <div className="social-routing">
          <div className="social-routing__header">
            <div className="social-routing__icon">
              <Icon name="help" />
            </div>
            <div>
              <h3 className="social-routing__title">Want to post something on social media?</h3>
              <p className="social-routing__desc">
                This quick quiz will help guide you through whether content is best shared on an official Envision page or on your personal page. We're extremely intentional and strategic about what goes on each platform and the audiences they reach — so in most cases, your personal page is the way to go. That said, we're always open to collaboration!
              </p>
            </div>
          </div>

          <div className="social-routing__body">

            {/* Q1: Tied to a campaign? */}
            {step === 'start' && (
              <div className="social-routing__step">
                <p className="social-routing__question">
                  Is this content connected to an existing marketing campaign?
                </p>
                <div className="social-routing__options">
                  <button className="social-routing__option" onClick={() => setStep('campaign-type')}>
                    Yes, it ties into an active campaign
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('oneoff-type')}>
                    No, it's a one-off or standalone idea
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('oneoff-type')}>
                    I'm not sure
                  </button>
                </div>
              </div>
            )}

            {/* Q2a (campaign path): What kind of campaign content? */}
            {step === 'campaign-type' && (
              <div className="social-routing__step">
                <p className="social-routing__question">
                  What kind of content is this?
                </p>
                <div className="social-routing__options">
                  <button className="social-routing__option" onClick={() => setStep('event-details')}>
                    An upcoming Envision event (grid rounds, programs, etc.)
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-campaign')}>
                    A post promoting or supporting an active campaign
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-collaborate')}>
                    Something else tied to a campaign
                  </button>
                </div>
                <button className="social-routing__back-link" onClick={reset}>
                  <Icon name="arrow-right" /> Back
                </button>
              </div>
            )}

            {/* Q3 (event path): Event details */}
            {step === 'event-details' && (
              <div className="social-routing__step">
                <p className="social-routing__question">
                  Does this event need to be listed publicly — like a Facebook Event — or is it more of a social post promoting it?
                </p>
                <div className="social-routing__options">
                  <button className="social-routing__option" onClick={() => setStep('outcome-event')}>
                    It needs a public event listing (Facebook Event, website, etc.)
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-campaign')}>
                    It's a social post promoting the event
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-personal')}>
                    I just want to share it from my own page
                  </button>
                </div>
                <button className="social-routing__back-link" onClick={() => setStep('campaign-type')}>
                  <Icon name="arrow-right" /> Back
                </button>
              </div>
            )}

            {/* Q2b (one-off path): What kind of one-off? */}
            {step === 'oneoff-type' && (
              <div className="social-routing__step">
                <p className="social-routing__question">
                  What best describes what you want to share?
                </p>
                <div className="social-routing__options">
                  <button className="social-routing__option" onClick={() => setStep('outcome-personal')}>
                    A personal story, win, or shout-out
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-personal')}>
                    Thought leadership or an industry take
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-personal')}>
                    A team moment, behind-the-scenes, or culture post
                  </button>
                  <button className="social-routing__option" onClick={() => setStep('outcome-collaborate')}>
                    Something I think Envision should post officially
                  </button>
                </div>
                <button className="social-routing__back-link" onClick={reset}>
                  <Icon name="arrow-right" /> Back
                </button>
              </div>
            )}

            {/* ── OUTCOMES ── */}

            {/* Personal page */}
            {step === 'outcome-personal' && (
              <div className="social-routing__outcome">
                <div className="social-routing__outcome-badge social-routing__outcome-badge--personal">
                  <Icon name="users" />
                </div>
                <h4 className="social-routing__outcome-title">This is a great fit for your personal page</h4>
                <p className="social-routing__outcome-message">
                  Content like this is best shared from your own account — and that's a good thing! Personal posts feel more authentic, reach different audiences, and help extend Envision's presence organically. Tag us so we can help amplify it.
                </p>
                <p className="social-routing__outcome-hint">
                  Need help writing your post? Our Messaging Assistant can help you craft on-brand content for any platform.
                </p>
                <button className="social-routing__cta" onClick={onMessagingAssistant}>
                  Open Messaging Assistant <Icon name="arrow-right" />
                </button>
                <button className="social-routing__restart" onClick={reset}>
                  Start over
                </button>
              </div>
            )}

            {/* Event listing → web update */}
            {step === 'outcome-event' && (
              <div className="social-routing__outcome">
                <div className="social-routing__outcome-badge social-routing__outcome-badge--event">
                  <Icon name="calendar" />
                </div>
                <h4 className="social-routing__outcome-title">Let's get that event set up</h4>
                <p className="social-routing__outcome-message">
                  Public event listings — like Facebook Events — are managed through our web update process. Submit a request and the marketing team will get the event created on the right platforms.
                </p>
                <button className="social-routing__cta" onClick={openWebUpdate}>
                  Submit a Web Update Request <Icon name="arrow-right" />
                </button>
                <button className="social-routing__restart" onClick={reset}>
                  Start over
                </button>
              </div>
            )}

            {/* Campaign post → dashboard intake */}
            {step === 'outcome-campaign' && (
              <div className="social-routing__outcome">
                <div className="social-routing__outcome-badge social-routing__outcome-badge--contact">
                  <Icon name="megaphone" />
                </div>
                <h4 className="social-routing__outcome-title">Let the marketing team know</h4>
                <p className="social-routing__outcome-message">
                  Since this ties into an active campaign, reach out to marketing so we can coordinate. We're always open to collaboration — it may get folded into planned content, reworked for a specific platform, or take a different shape entirely. Either way, we want to hear about it!
                </p>
                {socialSubmitted ? (
                  <>
                    <div className="social-routing__success">
                      <Icon name="sparkle" />
                      <p>Your submission was received. The Envision marketing team will follow up soon.</p>
                    </div>
                    <button className="social-routing__restart" onClick={reset}>
                      Start over
                    </button>
                  </>
                ) : (
                  <>
                    <form className="social-routing__form" onSubmit={handleSocialSubmit}>
                      <input
                        type="text"
                        className="social-routing__input"
                        placeholder="Your name"
                        value={socialName}
                        onChange={(e) => setSocialName(e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        className="social-routing__input"
                        placeholder="Your email"
                        value={socialEmail}
                        onChange={(e) => setSocialEmail(e.target.value)}
                        required
                      />
                      <textarea
                        className="social-routing__textarea"
                        placeholder="Describe your social media content idea..."
                        value={socialIdea}
                        onChange={(e) => setSocialIdea(e.target.value)}
                        required
                        rows={3}
                      />
                      {socialError && <p className="social-routing__error">{socialError}</p>}
                      <button type="submit" className="social-routing__cta" disabled={socialSubmitting}>
                        {socialSubmitting ? 'Submitting...' : 'Submit to Marketing Team'} <Icon name="arrow-right" />
                      </button>
                    </form>
                    <button className="social-routing__restart" onClick={reset}>
                      Start over
                    </button>
                  </>
                )}
              </div>
            )}

            {/* General collaborate → dashboard intake */}
            {step === 'outcome-collaborate' && (
              <div className="social-routing__outcome">
                <div className="social-routing__outcome-badge social-routing__outcome-badge--contact">
                  <Icon name="message" />
                </div>
                <h4 className="social-routing__outcome-title">We'd love to hear about it</h4>
                <p className="social-routing__outcome-message">
                  Reach out to the marketing team and tell us what you have in mind. We can't guarantee it'll end up on an official page — we're very intentional about what goes where — but we're always open to collaboration and want to know what's happening across the organization.
                </p>
                {socialSubmitted ? (
                  <>
                    <div className="social-routing__success">
                      <Icon name="sparkle" />
                      <p>Your submission was received. The Envision marketing team will follow up soon.</p>
                    </div>
                    <button className="social-routing__restart" onClick={reset}>
                      Start over
                    </button>
                  </>
                ) : (
                  <>
                    <form className="social-routing__form" onSubmit={handleSocialSubmit}>
                      <input
                        type="text"
                        className="social-routing__input"
                        placeholder="Your name"
                        value={socialName}
                        onChange={(e) => setSocialName(e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        className="social-routing__input"
                        placeholder="Your email"
                        value={socialEmail}
                        onChange={(e) => setSocialEmail(e.target.value)}
                        required
                      />
                      <textarea
                        className="social-routing__textarea"
                        placeholder="Tell us what you have in mind..."
                        value={socialIdea}
                        onChange={(e) => setSocialIdea(e.target.value)}
                        required
                        rows={3}
                      />
                      {socialError && <p className="social-routing__error">{socialError}</p>}
                      <button type="submit" className="social-routing__cta" disabled={socialSubmitting}>
                        {socialSubmitting ? 'Submitting...' : 'Submit to Marketing Team'} <Icon name="arrow-right" />
                      </button>
                    </form>
                    <button className="social-routing__restart" onClick={reset}>
                      Start over
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
