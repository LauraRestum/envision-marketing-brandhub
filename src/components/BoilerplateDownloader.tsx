import { useState } from 'react';
import { Icon } from './Icons';
import { approvedCopy } from '@/data/approvedMessaging';

type Step = 'purpose' | 'challenge' | 'download';

const officialPurposes = [
  'press release',
  'media advisory',
  'grant application',
  'annual report',
  'event description',
  'donor communication',
  'presentation',
  'website',
  'social media bio',
  'email signature',
  'partnership',
  'proposal',
  'publication',
];

function looksOfficial(purpose: string): boolean {
  const lower = purpose.toLowerCase();
  return officialPurposes.some((p) => lower.includes(p)) || lower.length > 15;
}

function generateBoilerplateDoc(): string {
  const boilerplates = approvedCopy.filter((c) => c.category === 'boilerplate' || c.category === 'mission');
  let doc = 'ENVISION — OFFICIAL BOILERPLATE LANGUAGE\n';
  doc += '=========================================\n\n';
  doc += 'These are the approved organizational descriptions for use in official communications.\n';
  doc += 'Always use this language as provided. Do not modify without Marketing approval.\n\n';

  for (const block of boilerplates) {
    doc += `--- ${block.title} ---\n\n`;
    doc += `${block.content}\n\n`;
    doc += `Usage: ${block.usage}\n\n\n`;
  }

  doc += '=========================================\n';
  doc += 'Questions? Contact the Marketing team.\n';
  return doc;
}

function downloadBoilerplate() {
  const content = generateBoilerplateDoc();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Envision-Boilerplate-Language.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function BoilerplateDownloader({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('purpose');
  const [purpose, setPurpose] = useState('');

  function handleSubmitPurpose() {
    if (!purpose.trim()) return;
    if (looksOfficial(purpose)) {
      setStep('download');
    } else {
      setStep('challenge');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitPurpose();
    }
  }

  return (
    <div className="brand-panel-overlay" onClick={onClose}>
      <div className="brand-panel brand-panel--narrow" onClick={(e) => e.stopPropagation()}>
        <div className="brand-panel__header">
          <div>
            <h2 className="brand-panel__title">Boilerplate Language</h2>
            <p className="brand-panel__subtitle">Official organizational descriptions for approved use.</p>
          </div>
          <button className="brand-panel__close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        <div className="brand-panel__body">
          {step === 'purpose' && (
            <div className="boilerplate-step">
              <div className="boilerplate-step__icon">
                <Icon name="help" />
              </div>
              <h3 className="boilerplate-step__title">What do you need the boilerplate for?</h3>
              <p className="boilerplate-step__desc">
                Help us understand your use case so we can make sure you get the right version.
              </p>
              <textarea
                className="boilerplate-step__input"
                placeholder="e.g., Press release for upcoming gala event, grant application, website about page..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                autoFocus
              />
              <button
                className="boilerplate-step__btn"
                onClick={handleSubmitPurpose}
                disabled={!purpose.trim()}
              >
                Continue <Icon name="arrow-right" />
              </button>
            </div>
          )}

          {step === 'challenge' && (
            <div className="boilerplate-step">
              <div className="boilerplate-step__icon boilerplate-step__icon--warn">
                <Icon name="alert" />
              </div>
              <h3 className="boilerplate-step__title">Quick reminder</h3>
              <p className="boilerplate-step__desc">
                Boilerplate language is approved for <strong>official Envision communications only</strong> — things like press releases, grant applications, event materials, donor communications, and organizational overviews.
              </p>
              <p className="boilerplate-step__desc">
                If your use case is different, please reach out to the Marketing team first. Otherwise, you can proceed with the download.
              </p>
              <div className="boilerplate-step__purpose-echo">
                <span className="boilerplate-step__purpose-label">Your stated purpose:</span>
                <span className="boilerplate-step__purpose-text">{purpose}</span>
              </div>
              <div className="boilerplate-step__actions">
                <button className="boilerplate-step__btn boilerplate-step__btn--secondary" onClick={() => setStep('purpose')}>
                  Go back
                </button>
                <button className="boilerplate-step__btn" onClick={() => setStep('download')}>
                  I understand, proceed <Icon name="arrow-right" />
                </button>
              </div>
            </div>
          )}

          {step === 'download' && (
            <div className="boilerplate-step">
              <div className="boilerplate-step__icon boilerplate-step__icon--success">
                <Icon name="check" />
              </div>
              <h3 className="boilerplate-step__title">Ready to download</h3>
              <p className="boilerplate-step__desc">
                This document includes all approved boilerplate copy: mission statement, brand promise, elevator pitch, and short/long/media boilerplate versions.
              </p>
              <p className="boilerplate-step__desc boilerplate-step__desc--note">
                Please use the language exactly as provided. Contact Marketing for any modifications or custom copy needs.
              </p>
              <button className="boilerplate-step__btn boilerplate-step__btn--download" onClick={downloadBoilerplate}>
                <Icon name="download" /> Download boilerplate (.txt)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
