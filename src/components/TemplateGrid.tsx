import { Icon } from './Icons';
import { templates } from '@/data/templates';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
}

export function TemplateGrid({ onAction }: Props) {
  return (
    <section className="section section--alt" id="templates">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Ready to Use</div>
          <h2 className="section__title">Templates</h2>
          <p className="section__subtitle">
            Pre-approved templates for presentations, print, email, social, and events. Start with the right format every time.
          </p>
        </div>
        <div className="resource-grid">
          {templates.map((t) => (
            <div key={t.id} className="resource-card" onClick={() => onAction(t)} style={{ cursor: 'pointer' }}>
              <div className="resource-card__top">
                <div className="resource-card__icon">
                  <Icon name={t.icon || 'document'} />
                </div>
                {t.tag && (
                  <span className={`resource-card__tag resource-card__tag--${t.tag.toLowerCase()}`}>
                    {t.tag}
                  </span>
                )}
              </div>
              <div className="resource-card__type">{t.type}</div>
              <h3 className="resource-card__title">{t.title}</h3>
              <p className="resource-card__desc">{t.description}</p>
              <span className="resource-card__cta">
                {t.cta} <Icon name="arrow-right" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
