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
}

const platforms: Platform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/envisionus',
    audience: 'Community members, families, prospective referrals',
    usage: 'Stories, events, community highlights, culture posts',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/company/envisionus',
    audience: 'Industry professionals, potential partners, job seekers',
    usage: 'Thought leadership, company news, career opportunities, industry updates',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/envisionus',
    audience: 'Younger audience, visual-first followers, potential employees',
    usage: 'Behind-the-scenes, culture, events, short-form video, stories',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    url: 'https://www.youtube.com/@envisionus',
    audience: 'Broad audience seeking in-depth content',
    usage: 'Testimonials, event recaps, educational content, long-form video',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: 'twitter',
    url: 'https://x.com/envisionus',
    audience: 'Industry peers, media, quick-update followers',
    usage: 'News, announcements, event live-posts, quick engagement',
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
    title: 'Share it on your personal page',
    message:
      'This sounds like a great personal post! Sharing from your own account helps extend our reach organically. Use the platform links above to find our official pages for reference, and tag us so we can amplify it.',
    icon: 'users',
    type: 'personal',
  },
  contact: {
    title: 'Let us know about it',
    message:
      'Since this may tie into an existing campaign, reach out to the marketing team and we\'ll figure out the best way to share it. This doesn\'t guarantee a post on our official pages — but we want to hear about it so we can work it into our strategy.',
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

        {/* ── Platform cards ── */}
        <div className="social-platforms">
          {platforms.map((p) => (
            <a
              key={p.id}
              className="social-platform-card"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-platform-card__icon">
                <Icon name={p.icon} />
              </div>
              <div className="social-platform-card__body">
                <h3 className="social-platform-card__name">{p.name}</h3>
                <p className="social-platform-card__audience">
                  <strong>Audience:</strong> {p.audience}
                </p>
                <p className="social-platform-card__usage">
                  <strong>Best for:</strong> {p.usage}
                </p>
              </div>
              <div className="social-platform-card__arrow">
                <Icon name="arrow-right" />
              </div>
            </a>
          ))}
        </div>

        {/* ── Content routing questionnaire ── */}
        <div className="social-routing">
          <div className="social-routing__header">
            <div className="social-routing__icon">
              <Icon name="help" />
            </div>
            <div>
              <h3 className="social-routing__title">Have something to share on social media?</h3>
              <p className="social-routing__desc">
                We use each platform intentionally. This quick guide will help you figure out the best path for your content.
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
