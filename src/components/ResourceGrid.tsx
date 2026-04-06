import { Icon } from './Icons';
import { resources } from '@/data/resources';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
}

export function ResourceGrid({ onAction }: Props) {
  return (
    <section className="section" id="brand-resources">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Brand Assets</div>
          <h2 className="section__title">Brand Resources</h2>
          <p className="section__subtitle">
            Official logos, imagery, guidelines, and brand materials. Everything you need to represent Envision consistently.
          </p>
        </div>
        <div className="resource-grid">
          {resources.map((r) => (
            <div key={r.id} className="resource-card" onClick={() => onAction(r)} style={{ cursor: 'pointer' }}>
              <div className="resource-card__top">
                <div className="resource-card__icon">
                  <Icon name={r.icon || 'document'} />
                </div>
                {r.tag && (
                  <span className={`resource-card__tag resource-card__tag--${r.tag.toLowerCase()}`}>
                    {r.tag}
                  </span>
                )}
              </div>
              <div className="resource-card__type">{r.type}</div>
              <h3 className="resource-card__title">{r.title}</h3>
              <p className="resource-card__desc">{r.description}</p>
              <span className="resource-card__cta">
                {r.cta} <Icon name="arrow-right" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
