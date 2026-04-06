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
import { Footer } from '@/components/Footer';
import { Modal } from '@/components/Modal';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const handleAction = useAction(setActiveModal);

  return (
    <div className="app">
      <Header />

      {/* Hero with Universal Search */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__inner">
          <p className="hero__welcome">Envision Brand & Marketing</p>
          <h1 className="hero__title">How can we help?</h1>
          <p className="hero__subtitle">
            Find brand assets, download templates, submit requests, or share a story — all in one place.
          </p>
          <UniversalSearch onAction={handleAction} />
        </div>
      </section>

      {/* Guided Needs Assistant */}
      <GuidedAssistant onAction={handleAction} />

      {/* Quick Actions */}
      <QuickActions onAction={handleAction} />

      {/* Policy Alerts */}
      <PolicyBanner />

      <main className="main">
        {/* Brand Resources */}
        <ResourceGrid onAction={handleAction} />

        {/* Templates */}
        <TemplateGrid onAction={handleAction} />

        {/* Request Center — gated decision flow */}
        <RequestFlow onOpenModal={setActiveModal} />
      </main>

      {/* Story Submission — dedicated section, not a modal */}
      <StorySubmission />

      <Footer />

      {/* Modal for ClickUp forms */}
      <Modal modalKey={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
