import { Icon } from './Icons';
import { FEATURES } from '@/config/features';
import { templates } from '@/data/templates';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onLetterheadDownloader?: () => void;
}

/** IDs of expanded template categories hidden behind feature flag */
const EXPANDED_TEMPLATE_IDS = ['template-email', 'template-social', 'template-brochure'];

export function TemplateGrid({ onAction, onLetterheadDownloader }: Props) {
  const templateMap = Object.fromEntries(templates.map((t) => [t.id, t]));

  // Active templates: presentation, letterhead, and print tools link
  // Expanded templates (email, social, brochure/signage/flyer) are behind feature flag
  const visibleIds = FEATURES.EXPANDED_TEMPLATES
    ? ['template-presentation', 'template-letterhead', 'template-email', 'template-social', 'template-brochure']
    : ['template-presentation', 'template-letterhead'];

  return (
    <section className="section section--alt" id="templates">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Ready to Use</div>
          <h2 className="section__title">Templates</h2>
          <p className="section__subtitle">
            Pre-approved templates for presentations and letterhead. Start with the right format every time.
          </p>
        </div>

        <div className="template-list">
          {/* Corporate Presentation Deck */}
          {(() => {
            const t = templateMap['template-presentation'];
            if (!t) return null;
            return (
              <div
                key={t.id}
                className="resource-card resource-card--compact"
                onClick={() => onAction(t)}
                style={{ cursor: 'pointer' }}
              >
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
                <h3 className="resource-card__title">Corporate Presentation Deck</h3>
                <p className="resource-card__desc">{t.description}</p>
                <span className="resource-card__cta">
                  {t.cta} <Icon name="arrow-right" />
                </span>
              </div>
            );
          })()}

          {/* Letterhead — Water Street */}
          <div
            className="resource-card resource-card--compact"
            onClick={() => onLetterheadDownloader?.()}
            style={{ cursor: 'pointer' }}
          >
            <div className="resource-card__top">
              <div className="resource-card__icon">
                <Icon name="document" />
              </div>
            </div>
            <h3 className="resource-card__title">Letterhead &mdash; Water Street</h3>
            <p className="resource-card__desc">Official letterhead for the Water Street location.</p>
            <span className="resource-card__cta">
              Download <Icon name="arrow-right" />
            </span>
          </div>

          {/* Letterhead — Dallas */}
          <div
            className="resource-card resource-card--compact"
            onClick={() => onLetterheadDownloader?.()}
            style={{ cursor: 'pointer' }}
          >
            <div className="resource-card__top">
              <div className="resource-card__icon">
                <Icon name="document" />
              </div>
            </div>
            <h3 className="resource-card__title">Letterhead &mdash; Dallas</h3>
            <p className="resource-card__desc">Official letterhead for the Dallas location.</p>
            <span className="resource-card__cta">
              Download <Icon name="arrow-right" />
            </span>
          </div>

          {/* Letterhead — General (default) */}
          <div
            className="resource-card resource-card--compact"
            onClick={() => onLetterheadDownloader?.()}
            style={{ cursor: 'pointer' }}
          >
            <div className="resource-card__top">
              <div className="resource-card__icon">
                <Icon name="document" />
              </div>
            </div>
            <h3 className="resource-card__title">Letterhead &mdash; General</h3>
            <p className="resource-card__desc">Generic Envision letterhead without a specific location address.</p>
            <span className="resource-card__cta">
              Download <Icon name="arrow-right" />
            </span>
          </div>

          {/* Print Tools — inline link */}
          <a
            className="resource-card resource-card--compact resource-card--link"
            href="https://www.envisionprintservices.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-card__top">
              <div className="resource-card__icon">
                <Icon name="printer" />
              </div>
            </div>
            <h3 className="resource-card__title">Print Tools</h3>
            <p className="resource-card__desc">Order prints, manage print jobs, and access Envision Print Services.</p>
            <span className="resource-card__cta">
              Visit Print Services <Icon name="arrow-right" />
            </span>
          </a>

          {/* Expanded templates behind feature flag */}
          {FEATURES.EXPANDED_TEMPLATES && EXPANDED_TEMPLATE_IDS.map((id) => {
            const t = templateMap[id];
            if (!t) return null;
            return (
              <div
                key={t.id}
                className="resource-card resource-card--compact"
                onClick={() => onAction(t)}
                style={{ cursor: 'pointer' }}
              >
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
    </section>
  );
}
