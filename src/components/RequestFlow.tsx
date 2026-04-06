import { useState, useCallback } from 'react';
import { Icon } from './Icons';
import { ImageryResultCard } from './ImageryResultCard';
import { intentOptions, type IntentOption, type FlowStep, type FlowOption } from '@/data/requestFlows';
import { resolveImageryRoute, type ImageryRouteResult } from '@/lib/resolveImageryRoute';

interface Props {
  onOpenModal: (key: string) => void;
}

type Phase = 'intent' | 'steps' | 'unlocked';

interface FlowState {
  phase: Phase;
  intent: IntentOption | null;
  stepIndex: number;
  answers: Record<string, string>;
  imageryResult: ImageryRouteResult | null;
}

const INITIAL: FlowState = {
  phase: 'intent',
  intent: null,
  stepIndex: 0,
  answers: {},
  imageryResult: null,
};

export function RequestFlow({ onOpenModal }: Props) {
  const [state, setState] = useState<FlowState>(INITIAL);

  const reset = useCallback(() => setState(INITIAL), []);

  const currentStep: FlowStep | null =
    state.intent && state.phase === 'steps'
      ? state.intent.flowSteps[state.stepIndex] ?? null
      : null;

  function selectIntent(intent: IntentOption) {
    setState({
      phase: 'steps',
      intent,
      stepIndex: 0,
      answers: {},
      imageryResult: null,
    });
  }

  function handleOptionClick(step: FlowStep, option: FlowOption) {
    if (!state.intent) return;

    // Handle redirects
    if (option.redirect) {
      if (option.redirect.type === 'anchor') {
        document.getElementById(option.redirect.target)?.scrollIntoView({ behavior: 'smooth' });
        reset();
        return;
      }
      if (option.redirect.type === 'external') {
        window.open(option.redirect.target, '_blank', 'noopener');
        reset();
        return;
      }
      if (option.redirect.type === 'imagery-search') {
        const match = resolveImageryRoute(option.redirect.target);
        if (match) {
          // Show imagery result, advance to next step to ask "did you find it?"
          setState((prev) => ({
            ...prev,
            answers: { ...prev.answers, [step.id]: option.id },
            imageryResult: match,
            stepIndex: prev.stepIndex + 1,
          }));
          return;
        }
      }
    }

    // "Yes, found it" on imagery-found step → done
    if (step.id === 'imagery-found' && option.id === 'yes') {
      reset();
      return;
    }

    // Record answer and advance
    const newAnswers = { ...state.answers, [step.id]: option.id };
    const nextIndex = state.stepIndex + 1;

    if (nextIndex >= state.intent.flowSteps.length) {
      // All steps done → unlock form
      setState((prev) => ({ ...prev, answers: newAnswers, phase: 'unlocked' }));
    } else {
      setState((prev) => ({
        ...prev,
        answers: newAnswers,
        stepIndex: nextIndex,
      }));
    }
  }

  function handleUnlock() {
    if (state.intent) {
      onOpenModal(state.intent.modalKey);
      reset();
    }
  }

  // Breadcrumb labels
  const breadcrumbs: string[] = [];
  if (state.intent) {
    breadcrumbs.push(state.intent.label);
    for (let i = 0; i < state.stepIndex; i++) {
      const step = state.intent.flowSteps[i];
      const answerId = state.answers[step.id];
      if (step.options) {
        const opt = step.options.find((o) => o.id === answerId);
        if (opt) breadcrumbs.push(opt.label);
      }
    }
  }

  return (
    <section className="section" id="request-center">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Get Support</div>
          <h2 className="section__title">Request Center</h2>
          <p className="section__subtitle">
            Tell us what you need. We'll point you to the right resource — or open a request if nothing fits.
          </p>
        </div>

        <div className="flow">
          {/* Breadcrumb trail */}
          {state.phase !== 'intent' && (
            <div className="flow__breadcrumb">
              <button className="flow__back" onClick={reset}>
                <Icon name="arrow-right" /> Start over
              </button>
              <div className="flow__trail">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flow__crumb">
                    {i > 0 && <span className="flow__crumb-sep">/</span>}
                    {crumb}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Phase 1: Intent selection */}
          {state.phase === 'intent' && (
            <div className="flow__step">
              <h3 className="flow__question">What are you trying to do?</h3>
              <div className="flow__options flow__options--intents">
                {intentOptions.map((intent) => (
                  <button
                    key={intent.id}
                    className="flow__option flow__option--intent"
                    onClick={() => selectIntent(intent)}
                  >
                    <span className="flow__option-icon">
                      <Icon name={intent.icon} />
                    </span>
                    <span className="flow__option-label">{intent.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase 2: Progressive steps */}
          {state.phase === 'steps' && currentStep && (
            <div className="flow__step">
              <h3 className="flow__question">{currentStep.question}</h3>

              {/* Show imagery result card if we have one */}
              {state.imageryResult && currentStep.id === 'imagery-found' && (
                <div className="flow__imagery-result">
                  <ImageryResultCard
                    result={state.imageryResult}
                    onDismiss={() =>
                      setState((prev) => ({ ...prev, imageryResult: null }))
                    }
                  />
                </div>
              )}

              {currentStep.type === 'select' && currentStep.options && (
                <div className="flow__options">
                  {currentStep.options.map((option) => (
                    <button
                      key={option.id}
                      className="flow__option"
                      onClick={() => handleOptionClick(currentStep, option)}
                    >
                      <span className="flow__option-label">{option.label}</span>
                      {option.redirect && (
                        <span className="flow__option-redirect">
                          <Icon name="arrow-right" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Phase 3: Unlocked */}
          {state.phase === 'unlocked' && state.intent && (
            <div className="flow__step flow__step--unlocked">
              <div className="flow__unlock-icon">
                <Icon name="sparkle" />
              </div>
              <h3 className="flow__question">Ready to submit</h3>
              <p className="flow__unlock-note">
                You've confirmed that existing resources don't cover this need. Go ahead and submit your request — the marketing team will follow up.
              </p>
              <button className="flow__submit" onClick={handleUnlock}>
                {state.intent.submitLabel}
                <Icon name="arrow-right" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
