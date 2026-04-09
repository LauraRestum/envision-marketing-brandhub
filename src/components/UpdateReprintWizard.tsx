import { useState } from 'react';
import { Icon } from './Icons';

type Step = 'question' | 'print' | 'revise';

interface Props {
  onClose: () => void;
  onOpenModal: (key: string) => void;
}

export function UpdateReprintWizard({ onClose, onOpenModal }: Props) {
  const [step, setStep] = useState<Step>('question');

  function handleGoToPrint() {
    window.open('https://www.envisionprintservices.com', '_blank', 'noopener');
  }

  function handleRevise() {
    onClose();
    // Small delay so overlay closes before opening the modal
    setTimeout(() => onOpenModal('design-request'), 150);
  }

  return (
    <div className="wizard-overlay" onClick={onClose}>
      <div className="wizard" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wizard__header">
          <div className="wizard__header-left">
            <div className="wizard__icon"><Icon name="edit" /></div>
            <span className="wizard__heading">Update or Reprint</span>
          </div>
          <button className="wizard__close" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>

        {/* Body */}
        <div className="wizard__body">
          {step === 'question' && (
            <>
              <h3 className="wizard__question">
                Are you looking to get something printed that already exists?
              </h3>
              <div className="wizard__options">
                <button
                  className="wizard__option"
                  onClick={() => setStep('print')}
                >
                  <span className="wizard__option-label">
                    Yes, I need to reprint an existing piece
                  </span>
                  <span className="wizard__option-arrow">
                    <Icon name="arrow-right" />
                  </span>
                </button>
                <button
                  className="wizard__option"
                  onClick={() => setStep('revise')}
                >
                  <span className="wizard__option-label">
                    No, I need to revise or make a major update to an existing asset
                  </span>
                  <span className="wizard__option-arrow">
                    <Icon name="arrow-right" />
                  </span>
                </button>
              </div>
            </>
          )}

          {step === 'print' && (
            <div className="wizard__result">
              <div className="wizard__result-icon"><Icon name="printer" /></div>
              <p className="wizard__result-text">
                All evergreen pieces are available on the Envision Print Dashboard for print. Click below to visit the dashboard and place your order.
              </p>
              <div className="wizard__result-actions">
                <button
                  className="wizard__result-btn wizard__result-btn--primary"
                  onClick={handleGoToPrint}
                >
                  Go to Print Dashboard <Icon name="arrow-right" />
                </button>
                <button
                  className="wizard__result-btn wizard__result-btn--secondary"
                  onClick={() => setStep('question')}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === 'revise' && (
            <div className="wizard__result">
              <div className="wizard__result-icon"><Icon name="edit" /></div>
              <p className="wizard__result-text">
                To revise or make a major update to an existing asset, submit a new request through our intake form so we can scope the project.
              </p>
              <div className="wizard__result-actions">
                <button
                  className="wizard__result-btn wizard__result-btn--primary"
                  onClick={handleRevise}
                >
                  Submit a Request <Icon name="arrow-right" />
                </button>
                <button
                  className="wizard__result-btn wizard__result-btn--secondary"
                  onClick={() => setStep('question')}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="wizard__footer">
          {step !== 'question' && (
            <button className="wizard__back" onClick={() => setStep('question')}>
              <Icon name="arrow-right" /> Start Over
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
