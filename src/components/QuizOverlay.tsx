import { useState, useCallback } from 'react';
import { Icon } from './Icons';

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
}

export interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizConfig {
  title: string;
  subtitle: string;
  icon: string;
  steps: QuizStep[];
}

interface Props {
  config: QuizConfig;
  onClose: () => void;
  renderResult: (answers: Record<string, string>) => React.ReactNode;
}

export function QuizOverlay({ config, onClose, renderResult }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentStep = config.steps[stepIndex];

  const handleSelect = useCallback(
    (optionId: string) => {
      const newAnswers = { ...answers, [currentStep.id]: optionId };
      setAnswers(newAnswers);

      if (stepIndex + 1 >= config.steps.length) {
        setShowResults(true);
      } else {
        setStepIndex(stepIndex + 1);
      }
    },
    [answers, currentStep, stepIndex, config.steps.length]
  );

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      const key = config.steps[prev].id;
      const cleaned = { ...answers };
      delete cleaned[key];
      setAnswers(cleaned);
      setStepIndex(prev);
    }
  }, [showResults, stepIndex, answers, config.steps]);

  const handleStartOver = useCallback(() => {
    setStepIndex(0);
    setAnswers({});
    setShowResults(false);
  }, []);

  // Build breadcrumbs
  const breadcrumbs: string[] = [];
  for (let i = 0; i < stepIndex; i++) {
    const step = config.steps[i];
    const answerId = answers[step.id];
    if (answerId) {
      const opt = step.options.find((o) => o.id === answerId);
      if (opt) breadcrumbs.push(opt.label);
    }
  }
  if (showResults) {
    const lastStep = config.steps[Math.min(stepIndex, config.steps.length - 1)];
    const lastAnswer = answers[lastStep.id];
    if (lastAnswer) {
      const opt = lastStep.options.find((o) => o.id === lastAnswer);
      if (opt) breadcrumbs.push(opt.label);
    }
  }

  return (
    <div className="logo-dl__overlay" onClick={onClose}>
      <div className="logo-dl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="logo-dl__header">
          <div className="logo-dl__header-left">
            <div className="logo-dl__icon-wrap">
              <Icon name={config.icon} />
            </div>
            <div>
              <h2 className="logo-dl__title">{config.title}</h2>
              <p className="logo-dl__subtitle">{config.subtitle}</p>
            </div>
          </div>
          <button className="logo-dl__close" onClick={onClose} aria-label="Close">
            <Icon name="x" />
          </button>
        </div>

        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <div className="logo-dl__breadcrumb">
            <button className="logo-dl__back-btn" onClick={showResults ? handleStartOver : handleBack}>
              <Icon name="arrow-right" /> {showResults ? 'Start over' : 'Back'}
            </button>
            <div className="logo-dl__trail">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="logo-dl__crumb">
                  {i > 0 && <span className="logo-dl__crumb-sep">/</span>}
                  {crumb}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {!showResults && currentStep && (
          <div className="logo-dl__step">
            <div className="logo-dl__step-counter">
              Step {stepIndex + 1} of {config.steps.length}
            </div>
            <h3 className="logo-dl__question">{currentStep.question}</h3>
            <div className="logo-dl__options">
              {currentStep.options.map((option) => (
                <button
                  key={option.id}
                  className="logo-dl__option"
                  onClick={() => handleSelect(option.id)}
                >
                  <div className="logo-dl__option-content">
                    <span className="logo-dl__option-label">{option.label}</span>
                    {option.description && (
                      <span className="logo-dl__option-desc">{option.description}</span>
                    )}
                  </div>
                  <span className="logo-dl__option-arrow">
                    <Icon name="arrow-right" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="logo-dl__results">
            {renderResult(answers)}
            <div className="logo-dl__footer-note">
              Not what you expected?{' '}
              <button className="logo-dl__link-btn" onClick={handleStartOver}>
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
