import { Icon } from './Icons';
import { primaryCards, secondaryCards } from '@/data/decisionCards';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onHelpWizard?: () => void;
}

export function GuidedAssistant({ onAction, onHelpWizard }: Props) {
  function handleClick(card: typeof primaryCards[number]) {
    if (card.id === 'decision-help' && onHelpWizard) {
      onHelpWizard();
    } else {
      onAction(card);
    }
  }

  return (
    <section className="assistant" id="hero">
      <div className="assistant__inner">
        <div className="assistant__header">
          <div className="assistant__icon">
            <Icon name="sparkle" />
          </div>
          <div>
            <div className="assistant__label">What do you need today?</div>
            <div className="assistant__sublabel">Pick the option that best describes your goal and we'll point you to the right resource or form.</div>
          </div>
        </div>

        {/* Primary actions — large, prominent */}
        <div className="decisions decisions--primary">
          {primaryCards.map((card) => (
            <button
              key={card.id}
              className="decision-card decision-card--primary"
              onClick={() => handleClick(card)}
            >
              <div className="decision-card__icon">
                <Icon name={card.icon} />
              </div>
              <div>
                <div className="decision-card__title">{card.title}</div>
                <div className="decision-card__desc">{card.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Secondary actions — compact row */}
        <div className="decisions decisions--secondary">
          {secondaryCards.map((card) => (
            <button
              key={card.id}
              className="decision-card decision-card--secondary"
              onClick={() => handleClick(card)}
            >
              <div className="decision-card__icon decision-card__icon--sm">
                <Icon name={card.icon} />
              </div>
              <div className="decision-card__title">{card.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
