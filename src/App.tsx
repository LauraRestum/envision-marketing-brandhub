import { useState } from 'react';
import { useAction } from '@/hooks/useAction';
import { FEATURES } from '@/config/features';
import { Header } from '@/components/Header';
import { UniversalSearch } from '@/components/UniversalSearch';
import { HeroTiles } from '@/components/HeroTiles';
import { BrandIdentity } from '@/components/BrandIdentity';
import { BrandGuidelines } from '@/components/BrandGuidelines';
import { TemplateGrid } from '@/components/TemplateGrid';
import { ResourceGrid } from '@/components/ResourceGrid';
import { RequestFlow } from '@/components/RequestFlow';
import { MessagingPreview } from '@/components/MessagingPreview';
import { SocialQuickLinks } from '@/components/SocialQuickLinks';
import { StorySubmission } from '@/components/StorySubmission';
import { SocialMediaHub } from '@/components/SocialMediaHub';
import { Footer } from '@/components/Footer';
import { Modal } from '@/components/Modal';
import { ContactPage } from '@/components/ContactPage';
import { HelpWizard } from '@/components/HelpWizard';
import { MessagingAssistant } from '@/components/MessagingAssistant';
import { LogoDownloader } from '@/components/LogoDownloader';
import { LetterheadDownloader } from '@/components/LetterheadDownloader';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showLogoDownloader, setShowLogoDownloader] = useState(false);
  const [showLetterheadDownloader, setShowLetterheadDownloader] = useState(false);
  const handleAction = useAction(setActiveModal);

  function handleWizardNavigate(anchorId: string) {
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
  }

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

      {/* Hero — "What do you need today?" + search + 4 quick-link tiles */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__inner">
          <h1 className="hero__title">What do you need today?</h1>
          <p className="hero__subtitle">
            From brand strategy to creative execution, we're here to elevate your vision.
          </p>
          <UniversalSearch onAction={handleAction} onLogoDownloader={() => setShowLogoDownloader(true)} onLetterheadDownloader={() => setShowLetterheadDownloader(true)} />
        </div>
        <HeroTiles onAction={handleAction} onHelpWizard={() => setShowWizard(true)} />
      </section>

      <main className="main">
        {/* Section 1 — Brand Identity (logos) */}
        <BrandIdentity onLogoDownloader={() => setShowLogoDownloader(true)} />

        {/* Section 2 — Brand Guidelines (colors, typography, fonts) */}
        <BrandGuidelines />

        {/* Section 3 — Templates (flat list, no subcategories) */}
        <TemplateGrid onAction={handleAction} onLetterheadDownloader={() => setShowLetterheadDownloader(true)} />

        {/* Request Center — backend quiz/intake layer, not a featured section */}
        <RequestFlow />

        {/* Section 4 — Brand Resources (imagery + video) */}
        <ResourceGrid onAction={handleAction} onLogoDownloader={() => setShowLogoDownloader(true)} onLetterheadDownloader={() => setShowLetterheadDownloader(true)} />

        {/* Section 5 — Messaging Assistant (small, locked, Phase 2 preview) */}
        <MessagingPreview onOpen={() => setShowMessaging(true)} />

        {/* Section 6 — Social Media Quick Links (icon row) */}
        <SocialQuickLinks />

        {/* Full Social Media Hub — behind feature flag */}
        {FEATURES.SOCIAL_MEDIA_HUB && (
          <SocialMediaHub onAction={handleAction} onMessagingAssistant={() => setShowMessaging(true)} />
        )}

        {/* Section 7 — Submit a Story (Web3Forms) */}
        <StorySubmission />
      </main>

      <Footer onContactClick={() => setShowContact(true)} />

      {/* Modal for ClickUp forms */}
      <Modal modalKey={activeModal} onClose={() => setActiveModal(null)} />

      {/* Help Wizard overlay */}
      {showWizard && (
        <HelpWizard
          onClose={() => setShowWizard(false)}
          onNavigate={handleWizardNavigate}
        />
      )}

      {/* Logo Downloader overlay */}
      {showLogoDownloader && (
        <LogoDownloader onClose={() => setShowLogoDownloader(false)} onContactClick={() => { setShowLogoDownloader(false); setShowContact(true); }} />
      )}

      {/* Letterhead Downloader overlay */}
      {showLetterheadDownloader && (
        <LetterheadDownloader onClose={() => setShowLetterheadDownloader(false)} onContactClick={() => { setShowLetterheadDownloader(false); setShowContact(true); }} />
      )}

      {/* Messaging Assistant overlay */}
      {showMessaging && (
        <MessagingAssistant onClose={() => setShowMessaging(false)} />
      )}
    </div>
  );
}
