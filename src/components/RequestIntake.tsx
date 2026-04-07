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
  const [copiedField, setCopiedField] = useState<string | null>(null);
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

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleEditAnswer(index: number) {
    const q = questions[index];
    setCurrentValue(answers[q.id] ?? '');
    setCurrentIndex(index);
  }

  function handleOpenForm() {
    window.open(definition.embedUrl, '_blank', 'noopener');
  }

  function handleCopyField(fieldKey: string, value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 1500);
    });
  }

  function handleCopyAll() {
    const lines: string[] = [];
    for (const q of questions) {
      const answer = answers[q.id]?.trim();
      if (answer) {
        lines.push(`${q.fieldKey}: ${answer}`);
      }
    }
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopiedField('__all__');
      setTimeout(() => setCopiedField(null), 1500);
    });
  }

  // ── Submitted: copy-paste panel + form link ──
  if (submitted) {
    const answeredQuestions = questions.filter((q) => answers[q.id]?.trim());

    return (
      <div className="intake">
        <div className="intake__header">
          <button className="intake__back" onClick={() => setSubmitted(false)}>
            <Icon name="arrow-right" /> Back to review
          </button>
          <div>
            <h3 className="intake__title">{definition.title}</h3>
            <p className="intake__subtitle">Copy your answers into the form</p>
          </div>
        </div>

        <div className="intake__prefill-banner">
          <div className="intake__prefill-banner-text">
            <p className="intake__prefill-headline">Your answers are ready</p>
            <p className="intake__prefill-note">
              Open the ClickUp form below, then copy each answer into the matching field. Upload any files directly on the form.
            </p>
          </div>
          <div className="intake__prefill-actions">
            <button className="intake__submit-btn" onClick={handleOpenForm}>
              Open ClickUp Form
              <Icon name="arrow-right" />
            </button>
            <button className="intake__copy-all" onClick={handleCopyAll}>
              {copiedField === '__all__' ? 'Copied!' : 'Copy All'}
            </button>
          </div>
        </div>

        <div className="intake__prefill-list">
          {answeredQuestions.map((q) => {
            const answer = answers[q.id]?.trim() ?? '';
            const isCopied = copiedField === q.fieldKey;
            return (
              <div key={q.id} className="intake__prefill-item">
                <div className="intake__prefill-header">
                  <span className="intake__prefill-label">{q.fieldKey}</span>
                  <button
                    className={`intake__prefill-copy ${isCopied ? 'intake__prefill-copy--done' : ''}`}
                    onClick={() => handleCopyField(q.fieldKey, answer)}
                  >
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="intake__prefill-value">{answer}</p>
              </div>
            );
          })}
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
            <button className="intake__submit-btn" onClick={handleSubmit}>
              Continue to ClickUp Form
              <Icon name="arrow-right" />
            </button>
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
