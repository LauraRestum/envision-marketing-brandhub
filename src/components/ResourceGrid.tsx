import { Icon } from './Icons';
import { resources } from '@/data/resources';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onLogoDownloader?: () => void;
  onLetterheadDownloader?: () => void;
}

/** Only show imagery and video resources in this section */
const VISIBLE_IDS = ['brand-imagery'];

export function ResourceGrid({ onAction, onLogoDownloader, onLetterheadDownloader }: Props) {
  const resourceMap = Object.fromEntries(resources.map((r) => [r.id, r]));

  function handleCardClick(id: string) {
    if (id === 'logos-primary' && onLogoDownloader) {
      onLogoDownloader();
    } else {
      const r = resourceMap[id];
      if (r) onAction(r);
    }
  }

  return (
    <section className="section" id="brand-resources">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Brand Resources</div>
          <h2 className="section__title">Approved Imagery & Video</h2>
          <p className="section__subtitle">
            Curated photography and video assets. Search by topic to find the right content for your project.
          </p>
        </div>

        <div className="resource-grid">
          {VISIBLE_IDS.map((id) => {
            const r = resourceMap[id];
            if (!r) return null;
            return (
              <div key={r.id} className="resource-card resource-card--compact" onClick={() => handleCardClick(r.id)} style={{ cursor: 'pointer' }}>
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
    </section>
  );
}
