import { Icon } from './Icons';
import { templates } from '@/data/templates';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onLetterheadDownloader?: () => void;
}

const buckets = [
  {
    label: 'Presentations & Digital',
    description: 'Slides, email campaigns, and social media templates',
    ids: ['template-presentation', 'template-email', 'template-social'],
  },
  {
    label: 'Print & Stationery',
    description: 'Letterhead, brochures, signage, and business cards',
    ids: ['template-letterhead', 'template-brochure', 'template-signage', 'template-business-cards'],
  },
  {
    label: 'Events',
    description: 'Invitations, programs, badges, and promotional materials',
    ids: ['template-event'],
  },
];

export function TemplateGrid({ onAction, onLetterheadDownloader }: Props) {
  const templateMap = Object.fromEntries(templates.map((t) => [t.id, t]));

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

        {buckets.map((bucket) => (
          <div key={bucket.label} className="resource-bucket">
            <div className="resource-bucket__header">
              <h3 className="resource-bucket__title">{bucket.label}</h3>
              <p className="resource-bucket__desc">{bucket.description}</p>
            </div>
            <div className="resource-grid">
              {bucket.ids.map((id) => {
                const t = templateMap[id];
                if (!t) return null;
                return (
                  <div key={t.id} className="resource-card" onClick={() => {
                    if (t.id === 'template-letterhead' && onLetterheadDownloader) {
                      onLetterheadDownloader();
                    } else {
                      onAction(t);
                    }
                  }} style={{ cursor: 'pointer' }}>
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
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
