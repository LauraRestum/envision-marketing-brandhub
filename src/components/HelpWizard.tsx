import { useState } from 'react';
import { Icon } from './Icons';

// ── Wizard tree types ──

interface WizardNode {
  id: string;
  question: string;
  options: WizardOption[];
}

interface WizardOption {
  label: string;
  /** Go to another question node */
  next?: string;
  /** Terminal: scroll to a section */
  anchorId?: string;
  /** Terminal: open a modal key */
  modalKey?: string;
  /** Terminal: show a recommendation message */
  recommendation?: string;
}

// ── Decision tree ──

const nodes: Record<string, WizardNode> = {
  start: {
    id: 'start',
    question: "Let's figure this out together. What best describes your situation?",
    options: [
      { label: "I'm working on a project and I'm stuck", next: 'project-stuck' },
      { label: 'I need to find something that already exists', next: 'find-existing' },
      { label: 'I need to build or create something new', next: 'build-new' },
      { label: 'I need to submit a request to the marketing team', next: 'submit-request' },
      { label: "I'm just browsing to see what's available", anchorId: 'brand-identity', recommendation: "Check out the Brand Identity section — it has logos, guidelines, templates, and more." },
    ],
  },

  // ── Project stuck branch ──
  'project-stuck': {
    id: 'project-stuck',
    question: "No worries — let's narrow it down. What's the project about?",
    options: [
      { label: 'A presentation or document', next: 'stuck-presentation' },
      { label: 'Social media or digital content', next: 'stuck-social' },
      { label: 'Print materials (flyers, signage, etc.)', next: 'stuck-print' },
      { label: 'A website or web page update', anchorId: 'request-center', recommendation: "Head to the Request Center and choose 'Update web or content' to get started on your web request." },
      { label: 'Something else entirely', next: 'stuck-other' },
    ],
  },
  'stuck-presentation': {
    id: 'stuck-presentation',
    question: 'What do you need help with?',
    options: [
      { label: 'I need a template to start from', anchorId: 'templates', recommendation: "We've got presentation templates ready to go. Check the Templates section and filter for presentations." },
      { label: 'I need help with the design or layout', anchorId: 'request-center', recommendation: "Submit a design request through the Request Center — our team can help with layout and design." },
      { label: 'I need help writing the content', anchorId: 'request-center', recommendation: "Submit a request through the Request Center — choose 'Write messaging' to get content support." },
      { label: 'I need the right logos or brand assets', anchorId: 'brand-resources', recommendation: "You'll find approved logos and brand assets in the Brand Resources section." },
    ],
  },
  'stuck-social': {
    id: 'stuck-social',
    question: 'What part of the social content do you need help with?',
    options: [
      { label: 'I need graphics or visuals', anchorId: 'request-center', recommendation: "Submit a design request through the Request Center for custom social media graphics." },
      { label: 'I need help with copy or captions', anchorId: 'request-center', recommendation: "Head to the Request Center and select 'Write messaging' for caption and copy support." },
      { label: 'I need approved photos or imagery', anchorId: 'request-center', recommendation: "Go to the Request Center and choose 'Find photos or video' to browse approved imagery." },
      { label: 'I need a social media template', anchorId: 'templates', recommendation: "Check the Templates section for social media templates you can customize." },
    ],
  },
  'stuck-print': {
    id: 'stuck-print',
    question: 'Are you reprinting something that already exists, or creating something new?',
    options: [
      { label: 'Reprinting or reordering an existing piece', anchorId: 'request-center', recommendation: "Go to the Request Center and choose 'Request something custom' — mention it's a reprint in your brief." },
      { label: 'Creating a new print piece from scratch', anchorId: 'request-center', recommendation: "Head to the Request Center and select 'Create something' to kick off a new print design request." },
      { label: "I'm not sure — I need guidance", anchorId: 'request-center', recommendation: "No problem! Head to the Request Center and submit a request — our team will help you figure out the best approach." },
    ],
  },
  'stuck-other': {
    id: 'stuck-other',
    question: "Can you tell me a bit more about what you're trying to accomplish?",
    options: [
      { label: 'I need brand guidelines or standards info', anchorId: 'brand-resources', recommendation: "The Brand Resources section has brand guidelines, color palettes, typography rules, and more." },
      { label: 'I need to plan a campaign or event', anchorId: 'request-center', recommendation: "The Request Center has a campaign planning flow — select 'Plan a campaign or event' to get started." },
      { label: 'I want to share a story or announcement', anchorId: 'story-submission', recommendation: "Use the Story Submission form to share your story — include details and any photos, and we'll take it from there." },
      { label: "I still don't know — I'd like to talk to someone", recommendation: "Totally fine! Use the Contact Us page at the top of the site to send a message to the marketing team. We're happy to help." },
    ],
  },

  // ── Find existing branch ──
  'find-existing': {
    id: 'find-existing',
    question: 'What are you looking for?',
    options: [
      { label: 'A logo or brand mark', anchorId: 'brand-resources', recommendation: "Approved logos are in the Brand Resources section. You'll find different formats and variations there." },
      { label: 'Brand colors, fonts, or guidelines', anchorId: 'brand-resources', recommendation: "Brand guidelines including colors, typography, and usage rules are all in the Brand Resources section." },
      { label: 'A template (presentation, document, etc.)', anchorId: 'templates', recommendation: "Check out the Templates section — we have ready-to-use templates for presentations, documents, and more." },
      { label: 'Photos, images, or video', anchorId: 'request-center', recommendation: "Head to the Request Center and choose 'Find photos or video' to search approved imagery." },
      { label: 'Approved messaging or boilerplate text', anchorId: 'brand-resources', recommendation: "Approved messaging and boilerplate copy can be found in the Brand Resources section." },
      { label: "Something else — I'm not sure where it lives", recommendation: "Try the search bar at the top of the page, or use the Contact Us page to send a message and we'll point you in the right direction." },
    ],
  },

  // ── Build new branch ──
  'build-new': {
    id: 'build-new',
    question: 'What do you need to create?',
    options: [
      { label: 'A new design or creative asset', next: 'build-design' },
      { label: 'Written content or messaging', anchorId: 'request-center', recommendation: "Head to the Request Center and choose 'Write messaging' to request content support from the team." },
      { label: 'A new web page or web update', anchorId: 'request-center', recommendation: "Go to the Request Center and select 'Update web or content' to submit your web request." },
      { label: 'A campaign or multi-piece project', anchorId: 'request-center', recommendation: "The Request Center has a campaign planning flow — select 'Plan a campaign or event' to get started." },
    ],
  },
  'build-design': {
    id: 'build-design',
    question: 'Have you checked if there\'s already a template you could start from?',
    options: [
      { label: 'Yes — nothing fits what I need', anchorId: 'request-center', recommendation: "Got it. Head to the Request Center and select 'Create something' to submit a custom design request." },
      { label: "No — let me check templates first", anchorId: 'templates', recommendation: "Take a look at the Templates section first. If nothing works, come back and submit a request." },
      { label: "I'm not sure what's available", anchorId: 'templates', recommendation: "Browse the Templates section to see what's available. You might find something that works as a starting point." },
    ],
  },

  // ── Submit request branch ──
  'submit-request': {
    id: 'submit-request',
    question: 'What kind of request do you need to submit?',
    options: [
      { label: 'A design or creative request', anchorId: 'request-center', recommendation: "Go to the Request Center and choose 'Create something' or 'Request something custom' to submit your design request." },
      { label: 'A print or reprint order', anchorId: 'request-center', recommendation: "Head to the Request Center and select 'Request something custom' — mention it's a print/reprint in your brief." },
      { label: 'A website or content update', anchorId: 'request-center', recommendation: "Go to the Request Center and select 'Update web or content' for your web request." },
      { label: 'A story or announcement submission', anchorId: 'story-submission', recommendation: "Use the Story Submission form to share your story. Include details, quotes, and any photos you'd like us to consider." },
      { label: "I'm not sure what type of request I need", recommendation: "No problem! Use the Contact Us page to send a message with a description of what you need, and we'll route it to the right person." },
    ],
  },
};

// ── Component ──

interface Props {
  onClose: () => void;
  onNavigate: (anchorId: string) => void;
}

interface HistoryEntry {
  nodeId: string;
  choiceLabel: string;
}

export function HelpWizard({ onClose, onNavigate }: Props) {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [result, setResult] = useState<{ recommendation: string; anchorId?: string } | null>(null);

  const currentNode = nodes[currentNodeId];

  function handleChoice(option: WizardOption) {
    const entry: HistoryEntry = { nodeId: currentNodeId, choiceLabel: option.label };

    if (option.next) {
      setHistory((h) => [...h, entry]);
      setCurrentNodeId(option.next);
      return;
    }

    // Terminal node
    setHistory((h) => [...h, entry]);
    setResult({
      recommendation: option.recommendation || '',
      anchorId: option.anchorId,
    });
  }

  function handleBack() {
    if (result) {
      setResult(null);
      return;
    }
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentNodeId(prev.nodeId);
    }
  }

  function handleGoToSection() {
    if (result?.anchorId) {
      onClose();
      // Small delay so the overlay closes before scrolling
      setTimeout(() => onNavigate(result.anchorId!), 150);
    }
  }

  function handleStartOver() {
    setCurrentNodeId('start');
    setHistory([]);
    setResult(null);
  }

  return (
    <div className="wizard-overlay" onClick={onClose}>
      <div className="wizard" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wizard__header">
          <div className="wizard__header-left">
            <div className="wizard__icon"><Icon name="help" /></div>
            <span className="wizard__heading">Not Sure Where to Start</span>
          </div>
          <button className="wizard__close" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>

        {/* Progress breadcrumbs */}
        {history.length > 0 && (
          <div className="wizard__breadcrumbs">
            {history.map((entry, i) => (
              <span key={i} className="wizard__crumb">
                {i > 0 && <span className="wizard__crumb-sep">&rsaquo;</span>}
                {entry.choiceLabel}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="wizard__body">
          {!result ? (
            <>
              <h3 className="wizard__question">{currentNode.question}</h3>
              <div className="wizard__options">
                {currentNode.options.map((option, i) => (
                  <button
                    key={i}
                    className="wizard__option"
                    onClick={() => handleChoice(option)}
                  >
                    <span className="wizard__option-label">{option.label}</span>
                    <span className="wizard__option-arrow"><Icon name="arrow-right" /></span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="wizard__result">
              <div className="wizard__result-icon"><Icon name="sparkle" /></div>
              <p className="wizard__result-text">{result.recommendation}</p>
              <div className="wizard__result-actions">
                {result.anchorId && (
                  <button className="wizard__result-btn wizard__result-btn--primary" onClick={handleGoToSection}>
                    Take Me There <Icon name="arrow-right" />
                  </button>
                )}
                <button className="wizard__result-btn wizard__result-btn--secondary" onClick={handleStartOver}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="wizard__footer">
          {history.length > 0 && (
            <button className="wizard__back" onClick={handleBack}>
              <Icon name="arrow-right" /> Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
