import { useState, useCallback } from 'react';
import { Icon } from '@/components/Icons';
import { Header } from '@/components/Header';
import { UniversalSearch } from '@/components/UniversalSearch';
import { Footer } from '@/components/Footer';
import { Modal } from '@/components/Modal';
import { ContactPage } from '@/components/ContactPage';
import { HelpWizard } from '@/components/HelpWizard';
import { MessagingAssistant } from '@/components/MessagingAssistant';
import { LogoDownloader } from '@/components/LogoDownloader';
import { LetterheadDownloader } from '@/components/LetterheadDownloader';
import { QuizOverlay } from '@/components/QuizOverlay';
import { ApprovedMessagingModal } from '@/components/ApprovedMessagingModal';
import { SocialIconRow } from '@/components/SocialIconRow';
import { StartNewRequest } from '@/components/StartNewRequest';
import { StorySubmission } from '@/components/StorySubmission';
import { ColorPalettePanel } from '@/components/ColorPalettePanel';
import { TypographyPanel } from '@/components/TypographyPanel';
import { imageryQuiz, videoQuiz, presentationQuiz } from '@/data/quizConfigs';
import { imageryDestinations } from '@/data/imageryDestinations';
import { useAction } from '@/hooks/useAction';
import type { ActionType } from '@/data/types';

// ── Quiz result renderers ──

function ImageryResult({ answers }: { answers: Record<string, string> }) {
  const topic = answers['topic'];
  const destinations: Record<string, { label: string; key: string }> = {
    rehabilitation: { label: 'Rehabilitation & Vision Services', key: 'rehabilitation-vision-services' },
    education: { label: 'Education & Workforce Development', key: 'education-workforce-development' },
    research: { label: 'Research & Innovation', key: 'research-innovation' },
    community: { label: 'Community Outreach & Engagement', key: 'community-outreach-engagement' },
    employment: { label: 'Employment & Career Pathways', key: 'employment-career-pathways' },
    products: { label: 'Products & Customer Services', key: 'products-customer-services' },
    buildings: { label: 'Building Photos', key: 'building-photos' },
  };
  const dest = destinations[topic];
  const folder = dest ? imageryDestinations[dest.key] : null;
  return (
    <div className="quiz-result">
      <div className="quiz-result__header">
        <Icon name="image" />
        <h3 className="quiz-result__title">{dest?.label || 'Approved Imagery'}</h3>
      </div>
      <p className="quiz-result__desc">
        Browse approved imagery for this category in the shared SharePoint library.
      </p>
      {folder && (
        <a
          href={folder.href}
          target="_blank"
          rel="noopener noreferrer"
          className="quiz-result__action-btn"
        >
          <Icon name="arrow-right" /> Open {folder.title} folder
        </a>
      )}
    </div>
  );
}

function VideoResult({ answers }: { answers: Record<string, string> }) {
  const type = answers['type'];
  const labels: Record<string, string> = {
    overview: 'Brand Overview Videos',
    testimonials: 'Testimonial Videos',
    events: 'Event Coverage',
    broll: 'B-Roll Footage',
  };
  return (
    <div className="quiz-result">
      <div className="quiz-result__header">
        <Icon name="image" />
        <h3 className="quiz-result__title">{labels[type] || 'Video Library'}</h3>
      </div>
      <p className="quiz-result__desc">
        Video assets for this category are maintained by the marketing team.
      </p>
      <p className="quiz-result__note">
        The video library is being integrated into the Brand Hub. For now, contact marketing@envisionus.com for video requests.
      </p>
    </div>
  );
}

function PresentationResult({ answers }: { answers: Record<string, string> }) {
  const purpose = answers['purpose'];
  const labels: Record<string, string> = {
    sales: 'Sales / External Deck',
    internal: 'Internal Meeting Deck',
    conference: 'Conference / Speaking Deck',
    general: 'General Purpose Deck',
  };
  return (
    <div className="quiz-result">
      <div className="quiz-result__header">
        <Icon name="document" />
        <h3 className="quiz-result__title">{labels[purpose] || 'Presentation Template'}</h3>
      </div>
      <p className="quiz-result__desc">
        Presentation templates are being organized by purpose. Contact the marketing team for the latest approved deck.
      </p>
      <p className="quiz-result__note">
        Template library integration coming soon. For now, reach out to marketing@envisionus.com.
      </p>
    </div>
  );
}

// ── Hero tile data ──

const heroTiles = [
  { id: 'create', title: 'Create something new', icon: 'plus', desc: 'Request a new design, asset, or deliverable' },
  { id: 'find', title: 'Find a resource', icon: 'search', desc: 'Logos, templates, images, or brand files' },
  { id: 'update', title: 'Update or reprint', icon: 'edit', desc: 'Revise or reorder an existing asset' },
  { id: 'help', title: 'Not sure where to start', icon: 'help', desc: 'Let us guide you to the right place' },
];

// ── Section card data ──

interface SectionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
  cta: string;
}

const brandAssetCards: SectionCard[] = [
  { id: 'logos', title: 'Logos', description: 'Official Envision logo files in all formats — PNG, JPG, EPS, AI, and social profile images.', icon: 'logo', tag: 'Essential', cta: 'Download Logos' },
  { id: 'imagery', title: 'Approved Imagery', description: 'Curated photography across Rehabilitation, Education, Research, Community, Employment, and more.', icon: 'image', tag: 'Essential', cta: 'Browse Imagery' },
  { id: 'video', title: 'Video Library', description: 'Brand overview videos, testimonials, event coverage, and b-roll footage for your projects.', icon: 'image', cta: 'Browse Videos' },
];

const brandIdentityCards: SectionCard[] = [
  { id: 'colors', title: 'Color Palette', description: 'Official brand colors with HEX, RGB, CMYK, and Pantone values for all applications.', icon: 'palette', cta: 'View Colors' },
  { id: 'typography', title: 'Typography & Fonts', description: 'Official brand typefaces Gotham and Montserrat — font files, weights, and usage guidelines.', icon: 'typography', cta: 'View Fonts' },
  { id: 'messaging', title: 'Approved Messaging & Copy', description: 'Download approved boilerplate and reference messaging by pillar.', icon: 'message', tag: 'Essential', cta: 'View Messaging' },
];

const templateCards: SectionCard[] = [
  { id: 'presentation', title: 'Presentation', description: 'PowerPoint and Google Slides templates with approved Envision branding.', icon: 'document', tag: 'Popular', cta: 'Get Templates' },
  { id: 'letterhead', title: 'Letterhead', description: 'Official letterhead templates for all Envision offices — Word, PDF, and InDesign.', icon: 'document', tag: 'Updated', cta: 'Download Letterhead' },
];

// ── Active overlay types ──

type ActiveOverlay =
  | null
  | 'logo-downloader'
  | 'letterhead-downloader'
  | 'imagery-quiz'
  | 'video-quiz'
  | 'presentation-quiz'
  | 'messaging-modal'
  | 'messaging-assistant'
  | 'help-wizard';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);
  // For quiz → panel flow: after Color/Typography quiz, show the panel
  const [showColorPanel, setShowColorPanel] = useState(false);
  const [showTypographyPanel, setShowTypographyPanel] = useState(false);
  const handleAction = useAction(setActiveModal);

  const closeOverlay = useCallback(() => setActiveOverlay(null), []);

  // ── Hero tile click handlers ──

  function handleHeroTile(tileId: string) {
    switch (tileId) {
      case 'create':
        // Scroll to Start a New Request section AND open the design request form
        document.getElementById('start-request')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'find':
        // Scroll to Brand Assets section
        document.getElementById('brand-assets')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'update':
        // Open the reprint/web update form directly
        setActiveModal('design-request');
        break;
      case 'help':
        setActiveOverlay('help-wizard');
        break;
    }
  }

  // ── Card click handlers ──

  function handleCardClick(cardId: string) {
    switch (cardId) {
      case 'logos':
        setActiveOverlay('logo-downloader');
        break;
      case 'imagery':
        setActiveOverlay('imagery-quiz');
        break;
      case 'video':
        setActiveOverlay('video-quiz');
        break;
      case 'colors':
        setShowColorPanel(true);
        break;
      case 'typography':
        setShowTypographyPanel(true);
        break;
      case 'messaging':
        setActiveOverlay('messaging-modal');
        break;
      case 'presentation':
        setActiveOverlay('presentation-quiz');
        break;
      case 'letterhead':
        setActiveOverlay('letterhead-downloader');
        break;
    }
  }

  function handleWizardNavigate(anchorId: string) {
    setActiveOverlay(null);
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
  }

  // ── Contact page ──

  if (showContact) {
    return (
      <div className="app">
        <Header onContactClick={() => setShowContact(true)} />
        <ContactPage onBack={() => { setShowContact(false); window.scrollTo(0, 0); }} />
        <Footer onContactClick={() => setShowContact(true)} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header onContactClick={() => setShowContact(true)} />

      {/* ═══════════════════════════════════════════
          1. HERO — "What do you need today?"
          ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__inner">
          <h1 className="hero__title">What do you need today?</h1>
          <p className="hero__subtitle">
            From brand strategy to creative execution, we're here to elevate your vision.
          </p>
          <UniversalSearch
            onAction={handleAction}
            onLogoDownloader={() => setActiveOverlay('logo-downloader')}
            onLetterheadDownloader={() => setActiveOverlay('letterhead-downloader')}
          />

          {/* 4 Quick-Link Tiles */}
          <div className="hero-tiles">
            {heroTiles.map((tile) => (
              <button
                key={tile.id}
                className="hero-tile"
                onClick={() => handleHeroTile(tile.id)}
              >
                <div className="hero-tile__icon">
                  <Icon name={tile.icon} />
                </div>
                <div className="hero-tile__text">
                  <span className="hero-tile__title">{tile.title}</span>
                  <span className="hero-tile__desc">{tile.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="main">
        {/* ═══════════════════════════════════════════
            2. BRAND ASSETS (parent section)
            ═══════════════════════════════════════════ */}
        <section className="section" id="brand-assets">
          <div className="container">
            <div className="section__header">
              <div className="section__eyebrow">Brand Assets</div>
              <h2 className="section__title">Brand Assets</h2>
              <p className="section__subtitle">
                Official logos, imagery, and video for Envision.
              </p>
            </div>
            <div className="resource-grid resource-grid--3col">
              {brandAssetCards.map((card) => (
                <div
                  key={card.id}
                  className="resource-card resource-card--clickable"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="resource-card__top">
                    <div className="resource-card__icon">
                      <Icon name={card.icon} />
                    </div>
                    {card.tag && (
                      <span className={`resource-card__tag resource-card__tag--${card.tag.toLowerCase()}`}>
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="resource-card__title">{card.title}</h3>
                  <p className="resource-card__desc">{card.description}</p>
                  <span className="resource-card__cta">
                    {card.cta} <Icon name="arrow-right" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            3. BRAND IDENTITY & GUIDELINES (parent section)
            ═══════════════════════════════════════════ */}
        <section className="section section--alt" id="brand-identity">
          <div className="container">
            <div className="section__header">
              <div className="section__eyebrow">Brand Identity</div>
              <h2 className="section__title">Brand Identity & Guidelines</h2>
              <p className="section__subtitle">
                Visual standards, typography, and approved messaging.
              </p>
            </div>
            <div className="resource-grid resource-grid--3col">
              {brandIdentityCards.map((card) => (
                <div
                  key={card.id}
                  className="resource-card resource-card--clickable"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="resource-card__top">
                    <div className="resource-card__icon">
                      <Icon name={card.icon} />
                    </div>
                    {card.tag && (
                      <span className={`resource-card__tag resource-card__tag--${card.tag.toLowerCase()}`}>
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="resource-card__title">{card.title}</h3>
                  <p className="resource-card__desc">{card.description}</p>
                  <span className="resource-card__cta">
                    {card.cta} <Icon name="arrow-right" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4. READY-TO-USE TEMPLATES (parent section)
            ═══════════════════════════════════════════ */}
        <section className="section" id="templates">
          <div className="container">
            <div className="section__header">
              <div className="section__eyebrow">Ready to Use</div>
              <h2 className="section__title">Ready-to-Use Templates</h2>
              <p className="section__subtitle">
                Pre-approved templates for presentations and letterhead.
              </p>
            </div>
            <div className="resource-grid resource-grid--2col">
              {templateCards.map((card) => (
                <div
                  key={card.id}
                  className="resource-card resource-card--clickable"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="resource-card__top">
                    <div className="resource-card__icon">
                      <Icon name={card.icon} />
                    </div>
                    {card.tag && (
                      <span className={`resource-card__tag resource-card__tag--${card.tag.toLowerCase()}`}>
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="resource-card__title">{card.title}</h3>
                  <p className="resource-card__desc">{card.description}</p>
                  <span className="resource-card__cta">
                    {card.cta} <Icon name="arrow-right" />
                  </span>
                </div>
              ))}
            </div>

            {/* Envision Print Callout */}
            <div className="print-callout">
              <div className="print-callout__icon">
                <Icon name="printer" />
              </div>
              <div className="print-callout__content">
                <h3 className="print-callout__title">Need something printed?</h3>
                <p className="print-callout__desc">Business cards, printed letterhead, and more.</p>
              </div>
              <a
                href="https://www.envisionprintservices.com"
                target="_blank"
                rel="noopener noreferrer"
                className="print-callout__btn"
              >
                Connect with Envision Print <Icon name="arrow-right" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            5. MESSAGING ASSISTANT (locked card)
            ═══════════════════════════════════════════ */}
        <div className="messaging-assistant-card-wrap">
          <div className="container">
            <button
              className="messaging-assistant-card"
              onClick={() => setActiveOverlay('messaging-assistant')}
            >
              <div className="messaging-assistant-card__badge">Phase 2</div>
              <div className="messaging-assistant-card__icon">
                <Icon name="lock" />
              </div>
              <div className="messaging-assistant-card__text">
                <h3 className="messaging-assistant-card__title">Messaging Assistant</h3>
                <p className="messaging-assistant-card__desc">
                  AI-powered, brand-approved content composer. Coming in Phase 2.
                </p>
              </div>
              <span className="messaging-assistant-card__cta">
                Coming Soon <Icon name="arrow-right" />
              </span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            6. SOCIAL MEDIA ICON ROW
            ═══════════════════════════════════════════ */}
        <SocialIconRow />

        {/* ═══════════════════════════════════════════
            7. START A NEW REQUEST
            ═══════════════════════════════════════════ */}
        <StartNewRequest onOpenModal={setActiveModal} />

      </main>

      {/* ═══════════════════════════════════════════
          8. SUBMIT A STORY
          ═══════════════════════════════════════════ */}
      <StorySubmission />

      <Footer onContactClick={() => setShowContact(true)} />

      {/* ═══════════════════════════════════════════
          MODALS & OVERLAYS
          ═══════════════════════════════════════════ */}

      {/* ClickUp iframe modal */}
      <Modal modalKey={activeModal} onClose={() => setActiveModal(null)} />

      {/* Logo Downloader */}
      {activeOverlay === 'logo-downloader' && (
        <LogoDownloader
          onClose={closeOverlay}
          onContactClick={() => { setActiveOverlay(null); setShowContact(true); }}
        />
      )}

      {/* Letterhead Downloader */}
      {activeOverlay === 'letterhead-downloader' && (
        <LetterheadDownloader
          onClose={closeOverlay}
          onContactClick={() => { setActiveOverlay(null); setShowContact(true); }}
        />
      )}

      {/* Color Palette Panel (opens directly) */}
      {showColorPanel && (
        <ColorPalettePanel onClose={() => setShowColorPanel(false)} />
      )}

      {/* Typography Panel (opens directly) */}
      {showTypographyPanel && (
        <TypographyPanel onClose={() => setShowTypographyPanel(false)} />
      )}

      {/* Imagery Quiz */}
      {activeOverlay === 'imagery-quiz' && (
        <QuizOverlay
          config={imageryQuiz}
          onClose={closeOverlay}
          renderResult={(answers) => <ImageryResult answers={answers} />}
        />
      )}

      {/* Video Quiz */}
      {activeOverlay === 'video-quiz' && (
        <QuizOverlay
          config={videoQuiz}
          onClose={closeOverlay}
          renderResult={(answers) => <VideoResult answers={answers} />}
        />
      )}

      {/* Presentation Quiz */}
      {activeOverlay === 'presentation-quiz' && (
        <QuizOverlay
          config={presentationQuiz}
          onClose={closeOverlay}
          renderResult={(answers) => <PresentationResult answers={answers} />}
        />
      )}

      {/* Approved Messaging & Copy */}
      {activeOverlay === 'messaging-modal' && (
        <ApprovedMessagingModal onClose={closeOverlay} />
      )}

      {/* Messaging Assistant */}
      {activeOverlay === 'messaging-assistant' && (
        <MessagingAssistant onClose={closeOverlay} />
      )}

      {/* Help Wizard */}
      {activeOverlay === 'help-wizard' && (
        <HelpWizard
          onClose={closeOverlay}
          onNavigate={handleWizardNavigate}
        />
      )}
    </div>
  );
}
