import { Icon } from './Icons';
import { resources } from '@/data/resources';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onMessagingAssistant?: () => void;
  onLogoDownloader?: () => void;
  onLetterheadDownloader?: () => void;
}

const buckets = [
  {
    label: 'Logos & Visual Identity',
    description: 'Official logos, imagery, and color palette',
    ids: ['logos-primary', 'logos-subbrands', 'brand-imagery', 'brand-colors'],
  },
  {
    label: 'Guidelines & Messaging',
    description: 'Brand standards, approved copy, and boilerplate language',
    ids: ['brand-book', 'brand-messaging', 'brand-typography', 'brand-boilerplate'],
  },
];

export function ResourceGrid({ onAction, onMessagingAssistant, onLogoDownloader, onLetterheadDownloader }: Props) {
  const resourceMap = Object.fromEntries(resources.map((r) => [r.id, r]));

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

        {/* Messaging Assistant CTA */}
        {onMessagingAssistant && (
          <button className="msg-cta" onClick={onMessagingAssistant}>
            <div className="msg-cta__icon">
              <Icon name="sparkle" />
            </div>
            <div className="msg-cta__content">
              <div className="msg-cta__title">Messaging Assistant</div>
              <div className="msg-cta__desc">
                Need help writing on-brand content? Compose from approved copy, reformat for any platform, and check brand compliance.
              </div>
            </div>
            <div className="msg-cta__arrow">
              <Icon name="arrow-right" />
            </div>
          </button>
        )}

        {buckets.map((bucket) => (
          <div key={bucket.label} className="resource-bucket">
            <div className="resource-bucket__header">
              <h3 className="resource-bucket__title">{bucket.label}</h3>
              <p className="resource-bucket__desc">{bucket.description}</p>
            </div>
            <div className="resource-grid">
              {bucket.ids.map((id) => {
                const r = resourceMap[id];
                if (!r) return null;
                return (
                  <div key={r.id} className="resource-card" onClick={() => {
                    if (r.id === 'logos-primary' && onLogoDownloader) {
                      onLogoDownloader();
                    } else {
                      onAction(r);
                    }
                  }} style={{ cursor: 'pointer' }}>
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
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
