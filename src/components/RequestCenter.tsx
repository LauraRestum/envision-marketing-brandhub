import { Icon } from './Icons';
import { requestForms } from '@/data/requestForms';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
}

export function RequestCenter({ onAction }: Props) {
  // Filter out story submission — it has its own dedicated section
  const forms = requestForms.filter((f) => f.id !== 'request-story');

  return (
    <section className="section" id="request-center">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Get Support</div>
          <h2 className="section__title">Request Center</h2>
          <p className="section__subtitle">
            Need something custom? Submit a request and the marketing team will be in touch.
          </p>
        </div>
        <div className="request-grid">
          {forms.map((f) => (
            <button
              key={f.id}
              className="request-card"
              onClick={() => onAction({ actionType: f.actionType, href: f.href, modalKey: f.modalKey })}
            >
              <div className="request-card__header">
                <div className="request-card__icon">
                  <Icon name={f.icon} />
                </div>
                <h3 className="request-card__title">{f.title}</h3>
              </div>
              <p className="request-card__desc">{f.description}</p>
              <p className="request-card__helper">{f.helperText}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
