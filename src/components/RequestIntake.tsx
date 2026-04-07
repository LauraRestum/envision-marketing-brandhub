import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icons';
import {
  intakeDefinitions,
  assessAnswer,
  assessScope,
  type IntakeDefinition,
  type IntakeQuestion,
  type QualityTier,
} from '@/data/requestIntake';

interface Props {
  modalKey: string;
  /** Context answers from the gating flow. */
  flowContext: Record<string, string>;
  onClose: () => void;
}

const TIER_CONFIG: Record<QualityTier, { icon: string; className: string }> = {
  vague: { icon: 'warning', className: 'intake__quality--vague' },
  okay: { icon: 'help', className: 'intake__quality--okay' },
  good: { icon: 'sparkle', className: 'intake__quality--good' },
};

export function RequestIntake({ modalKey, flowContext, onClose }: Props) {
  const definition = intakeDefinitions[modalKey];
  if (!definition) return null;

  return <IntakeFlow definition={definition} flowContext={flowContext} onClose={onClose} />;
}

function IntakeFlow({
  definition,
  flowContext,
  onClose,
}: {
  definition: IntakeDefinition;
  flowContext: Record<string, string>;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentValue, setCurrentValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const questions = definition.questions;
  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length;
  const assessment = currentQ ? assessAnswer(currentQ, currentValue) : null;
  const scope = isLastQuestion ? assessScope(questions, answers) : null;

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  function handleNext() {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: currentValue }));
    setCurrentValue('');
    setCurrentIndex((prev) => prev + 1);
  }

  function handleChoiceSelect(choice: string) {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: choice }));
    setCurrentValue('');
    setCurrentIndex((prev) => prev + 1);
  }

  function handleBack() {
    if (currentIndex === 0) {
      onClose();
      return;
    }
    const prevQ = questions[currentIndex - 1];
    setCurrentValue(answers[prevQ.id] ?? '');
    setCurrentIndex((prev) => prev - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError('');

    try {
      // Build a formatted body from all Q&A pairs
      const bodyLines: string[] = [];
      let requestorName = '';
      for (const q of questions) {
        const answer = answers[q.id]?.trim();
        if (answer) {
          bodyLines.push(`${q.label}: ${answer}`);
          if (q.fieldKey === 'Requestor Name') {
            requestorName = answer;
          }
        }
      }

      const payload: Record<string, string> = {
        type: 'event_request',
        submitterName: requestorName || 'Anonymous',
        body: bodyLines.join('\n'),
      };

      const res = await fetch('https://envision-marketing-dashboard-jnqm.vercel.app/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleEditAnswer(index: number) {
    const q = questions[index];
    setCurrentValue(answers[q.id] ?? '');
    setCurrentIndex(index);
  }


  // ── Submitted: success message ──
  if (submitted) {
    return (
      <div className="intake">
        <div className="intake__header">
          <div>
            <h3 className="intake__title">{definition.title}</h3>
            <p className="intake__subtitle">Request submitted</p>
          </div>
        </div>

        <div className="intake__prefill-banner">
          <div className="intake__prefill-banner-text">
            <p className="intake__prefill-headline">
              <Icon name="sparkle" /> Your submission was received. The Envision marketing team will follow up soon.
            </p>
          </div>
        </div>

        <div className="intake__submit-area">
          <button className="intake__done-btn" onClick={onClose}>
            Done — Back to Hub
          </button>
        </div>
      </div>
    );
  }

  // ── Review & submit phase ──
  if (isLastQuestion && scope) {
    return (
      <div className="intake">
        <div className="intake__header">
          <button className="intake__back" onClick={handleBack}>
            <Icon name="arrow-right" /> Back
          </button>
          <div>
            <h3 className="intake__title">{definition.title}</h3>
            <p className="intake__subtitle">Review your brief</p>
          </div>
        </div>

        <div className={`intake__scope intake__scope--${scope.tier}`}>
          <div className="intake__scope-label">{scope.label}</div>
          <p className="intake__scope-message">{scope.message}</p>
        </div>

        <div className="intake__review">
          {questions.map((q, i) => {
            const answer = answers[q.id] ?? '';
            const isOptionalEmpty = q.optional && !answer.trim();
            const quality = isOptionalEmpty
              ? { tier: 'good' as QualityTier, feedback: '' }
              : assessAnswer(q, answer);
            const config = TIER_CONFIG[quality.tier];
            return (
              <div key={q.id} className="intake__review-item">
                <div className="intake__review-header">
                  <span className="intake__review-label">
                    {q.label}
                    {q.optional && <span className="intake__review-optional"> (optional)</span>}
                  </span>
                  <div className="intake__review-actions">
                    {!isOptionalEmpty && (
                      <span className={`intake__quality-dot ${config.className}`}>
                        <Icon name={config.icon} size={12} />
                      </span>
                    )}
                    <button
                      className="intake__review-edit"
                      onClick={() => handleEditAnswer(i)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <p className="intake__review-answer">
                  {answer || (q.optional ? '(skipped)' : '(empty)')}
                </p>
                {quality.tier === 'vague' && !isOptionalEmpty && (
                  <p className="intake__review-warning">{quality.feedback}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="intake__submit-area">
          {scope.tier === 'not_enough' ? (
            <p className="intake__submit-note">
              Fix the flagged answers above before submitting.
            </p>
          ) : (
            <>
              {submitError && <p className="intake__submit-error">{submitError}</p>}
              <button className="intake__submit-btn" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
                <Icon name="arrow-right" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Question phase ──
  if (!currentQ) return null;

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="intake">
      <div className="intake__header">
        <button className="intake__back" onClick={handleBack}>
          <Icon name="arrow-right" /> {currentIndex === 0 ? 'Cancel' : 'Back'}
        </button>
        <div>
          <h3 className="intake__title">{definition.title}</h3>
          <p className="intake__subtitle">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      <div className="intake__progress">
        <div className="intake__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="intake__question-area">
        <label className="intake__label">
          {currentQ.label}
          {currentQ.optional && <span className="intake__label-optional"> (optional)</span>}
        </label>

        {currentQ.hints && (
          <div className="intake__hints">
            {currentQ.hints.map((h, i) => (
              <span key={i} className="intake__hint">{h}</span>
            ))}
          </div>
        )}

        {currentQ.choices ? (
          <div className="intake__choices">
            {currentQ.choices.map((choice) => (
              <button
                key={choice}
                className="intake__choice"
                onClick={() => handleChoiceSelect(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <>
            <textarea
              ref={inputRef}
              className="intake__input"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={currentQ.placeholder}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && (currentValue.trim() || currentQ.optional)) {
                  e.preventDefault();
                  handleNext();
                }
              }}
            />

            {/* Live quality feedback */}
            {currentValue.trim().length > 0 && assessment && (
              <div className={`intake__quality ${TIER_CONFIG[assessment.tier].className}`}>
                <Icon name={TIER_CONFIG[assessment.tier].icon} size={14} />
                <span>{assessment.feedback}</span>
              </div>
            )}

            <div className="intake__actions">
              <button
                className="intake__next"
                onClick={handleNext}
                disabled={!currentValue.trim() && !currentQ.optional}
              >
                {currentIndex === questions.length - 1 ? 'Review Brief' : 'Next'}
                <Icon name="arrow-right" />
              </button>
              {currentQ.optional && !currentValue.trim() && (
                <button className="intake__skip" onClick={handleNext}>
                  Skip
                </button>
              )}
              {currentValue.trim() && (
                <span className="intake__enter-hint">or press Enter</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
