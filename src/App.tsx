import { useState } from 'react';
import { useAction } from '@/hooks/useAction';
import { Header } from '@/components/Header';
import { UniversalSearch } from '@/components/UniversalSearch';
import { GuidedAssistant } from '@/components/GuidedAssistant';
import { QuickActions } from '@/components/QuickActions';
import { PolicyBanner } from '@/components/PolicyBanner';
import { ResourceGrid } from '@/components/ResourceGrid';
import { TemplateGrid } from '@/components/TemplateGrid';
import { RequestFlow } from '@/components/RequestFlow';
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

      {/* Hero with Universal Search */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__inner">
          <p className="hero__welcome">Envision Brand & Marketing</p>
          <h1 className="hero__title">How can we help?</h1>
          <p className="hero__subtitle">
            Find brand assets, download templates, submit requests, or share a story — all in one place.
          </p>
          <UniversalSearch onAction={handleAction} onLogoDownloader={() => setShowLogoDownloader(true)} onLetterheadDownloader={() => setShowLetterheadDownloader(true)} />
        </div>
      </section>

      {/* Guided Needs Assistant */}
      <GuidedAssistant onAction={handleAction} onHelpWizard={() => setShowWizard(true)} />

      {/* Quick Actions */}
      <QuickActions onAction={handleAction} />

      {/* Policy Alerts */}
      <PolicyBanner />

      <main className="main">
        {/* Brand Resources */}
        <ResourceGrid onAction={handleAction} onMessagingAssistant={() => setShowMessaging(true)} onLogoDownloader={() => setShowLogoDownloader(true)} onLetterheadDownloader={() => setShowLetterheadDownloader(true)} />

        {/* Templates */}
        <TemplateGrid onAction={handleAction} onLetterheadDownloader={() => setShowLetterheadDownloader(true)} />

        {/* Request Center — gated decision flow + smart intake */}
        <RequestFlow />

        {/* Social Media Hub — platform links + content routing */}
        <SocialMediaHub onAction={handleAction} onMessagingAssistant={() => setShowMessaging(true)} />
      </main>

      {/* Story Submission — dedicated section, not a modal */}
      <StorySubmission />

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
