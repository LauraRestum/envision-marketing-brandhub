import { useState } from 'react';
import { Icon } from './Icons';

/* ── Platform data ── */
interface Platform {
  id: string;
  name: string;
  icon: string;
  url: string;
  audience: string;
  usage: string;
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
    usage: 'Thought leadership, company news, career opportunities, industry updates',
    color: '#0A66C2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/discoverenvision?igsh=MWdtMG1qOXBrcGRuYg%3D%3D&utm_source=qr',
    audience: 'Younger audience, visual-first followers, potential employees',
    usage: 'Behind-the-scenes, culture, events, short-form video, stories',
    color: '#E4405F',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    url: 'https://www.tiktok.com/@discoverenvision?_r=1&_t=ZP-95KICtXRLtW',
    audience: 'Gen Z and younger millennials, trend-driven audience',
    usage: 'Short-form video, trends, behind-the-scenes, culture spotlights',
    color: '#000000',
  },
];

/* ── Decision tree types ── */
type Step = 'start' | 'campaign' | 'personal' | 'contact' | 'done';

interface Outcome {
  title: string;
  message: string;
  icon: string;
  type: 'personal' | 'contact';
}

const OUTCOMES: Record<string, Outcome> = {
  personal: {
    title: 'This is a great fit for your personal page',
    message:
      'Most content like this is best shared from your own account — and that\'s a good thing! Personal posts feel more authentic, reach different audiences, and help extend Envision\'s presence organically. Use the platform links above to find our official pages for reference, and tag us so we can help amplify it.',
    icon: 'users',
    type: 'personal',
  },
  contact: {
    title: 'Let us know about it',
    message:
      'Since this may tie into an existing campaign, reach out to the marketing team so we can figure out how it fits. This doesn\'t mean we\'ll post it on an official page — our accounts follow strict content guidelines — but we want to hear about it so we can potentially work it into our strategy.',
    icon: 'message',
    type: 'contact',
  },
};

export function SocialMediaHub() {
  const [step, setStep] = useState<Step>('start');
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  function reset() {
    setStep('start');
    setOutcome(null);
  }

  function handleCampaignYes() {
    setOutcome(OUTCOMES.contact);
    setStep('done');
  }

  function handleCampaignNo() {
    setOutcome(OUTCOMES.personal);
    setStep('done');
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

        {/* ── Platform feed previews ── */}
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

              {p.embedUrl && (
                <div className="social-feed-card__footer">
                  <span className="social-feed-card__usage">
                    <strong>Best for:</strong> {p.usage}
                  </span>
                  <a
                    className="social-feed-card__link"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Page <Icon name="arrow-right" />
                  </a>
                </div>
              )}
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
                This quick quiz will help guide you through whether content is best shared on an official Envision page or on your personal page. In most cases, your personal page is the way to go — our official accounts follow pretty specific guidelines and are tied to planned campaigns.
              </p>
            </div>
          </div>

          <div className="social-routing__body">
            {/* Step: start */}
            {step === 'start' && (
              <div className="social-routing__step">
                <p className="social-routing__question">
                  Is this content connected to an existing marketing campaign?
                </p>
                <div className="social-routing__options">
                  <button
                    className="social-routing__option"
                    onClick={() => { setStep('campaign'); handleCampaignYes(); }}
                  >
                    Yes, it ties into an active campaign
                  </button>
                  <button
                    className="social-routing__option"
                    onClick={() => { setStep('campaign'); handleCampaignNo(); }}
                  >
                    No, it's a one-off or standalone idea
                  </button>
                  <button
                    className="social-routing__option"
                    onClick={() => { setStep('campaign'); handleCampaignNo(); }}
                  >
                    I'm not sure
                  </button>
                </div>
              </div>
            )}

            {/* Step: done — outcome */}
            {step === 'done' && outcome && (
              <div className="social-routing__outcome">
                <div className={`social-routing__outcome-badge social-routing__outcome-badge--${outcome.type}`}>
                  <Icon name={outcome.icon} />
                </div>
                <h4 className="social-routing__outcome-title">{outcome.title}</h4>
                <p className="social-routing__outcome-message">{outcome.message}</p>
                {outcome.type === 'contact' && (
                  <a
                    className="social-routing__cta"
                    href="mailto:marketing@envisionus.com?subject=Social%20Media%20Content%20Idea"
                  >
                    Email the Marketing Team <Icon name="arrow-right" />
                  </a>
                )}
                <button className="social-routing__restart" onClick={reset}>
                  Start over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
