import { useCallback } from 'react';
import { Icon } from './Icons';
import { approvedCopy } from '@/data/approvedMessaging';

interface Props {
  onClose: () => void;
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
  // TODO: boilerplate file pending upload from Laura
  // When /public/assets/messaging/envision-boilerplate.docx exists, download that instead
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

export function ApprovedMessagingModal({ onClose }: Props) {
  const handleDownload = useCallback(() => {
    downloadBoilerplate();
  }, []);

  return (
    <div className="logo-dl__overlay" onClick={onClose}>
      <div className="logo-dl logo-dl--narrow" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="logo-dl__header">
          <div className="logo-dl__header-left">
            <div className="logo-dl__icon-wrap">
              <Icon name="message" />
            </div>
            <div>
              <h2 className="logo-dl__title">Approved Messaging & Copy</h2>
              <p className="logo-dl__subtitle">
                Download approved boilerplate and reference messaging by pillar.
              </p>
            </div>
          </div>
          <button className="logo-dl__close" onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>

        {/* Two options side by side */}
        <div className="messaging-options">
          {/* Option 1: Download Boilerplate — Active */}
          <button className="messaging-option messaging-option--active" onClick={handleDownload}>
            <div className="messaging-option__icon">
              <Icon name="download" />
            </div>
            <h3 className="messaging-option__title">Download Boilerplate</h3>
            <p className="messaging-option__desc">
              Official Envision organizational descriptions, mission statement, and approved copy for press, events, and publications.
            </p>
            <span className="messaging-option__cta">
              Download <Icon name="arrow-right" />
            </span>
          </button>

          {/* Option 2: View by Pillar — Locked */}
          <div className="messaging-option messaging-option--locked">
            <div className="messaging-option__badge">Coming Soon</div>
            <div className="messaging-option__icon messaging-option__icon--locked">
              <Icon name="lock" />
            </div>
            <h3 className="messaging-option__title">View Approved Messaging by Pillar</h3>
            <p className="messaging-option__desc">
              Per-pillar messaging guide in development. Browse approved copy organized by Envision's core pillars.
            </p>
            <span className="messaging-option__cta messaging-option__cta--locked">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
