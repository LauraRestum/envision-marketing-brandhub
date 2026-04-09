import { Icon } from './Icons';
import { brandFonts, fontWeights, typographyGuidelines } from '@/data/brandTypography';

export function TypographyPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="brand-panel-overlay" onClick={onClose}>
      <div className="brand-panel" onClick={(e) => e.stopPropagation()}>
        <div className="brand-panel__header">
          <div>
            <h2 className="brand-panel__title">Typography & Fonts</h2>
            <p className="brand-panel__subtitle">Official Envision typefaces, weights, and usage guidelines.</p>
          </div>
          <button className="brand-panel__close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        <div className="brand-panel__body">
          {/* Font overviews */}
          {brandFonts.map((font, idx) => (
            <div key={font.name} className="typo-section">
              <h3 className="typo-section__title">
                {idx === 0 ? 'Primary typeface' : 'Companion typeface'}
              </h3>
              <div className="typo-font-card">
                <div className="typo-font-card__specimen">
                  <span style={{ fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 }}>{font.name}</span>
                  <span style={{ fontWeight: 400, fontSize: '1.125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {font.category}
                  </span>
                </div>
                <p className="typo-font-card__desc">{font.description}</p>
                <div className="typo-font-card__preview">
                  <div style={{ fontWeight: 400, fontSize: '1rem' }}>
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                    abcdefghijklmnopqrstuvwxyz<br />
                    0123456789 !@#$%&amp;*()
                  </div>
                </div>
              </div>

              {/* Download row */}
              {(font.downloadUrl || font.downloadLabel) && (
                <div className="typo-download" style={{ marginTop: '1rem' }}>
                  <div className="typo-download__icon">
                    <Icon name="download" />
                  </div>
                  <div className="typo-download__info">
                    <div className="typo-download__title">Download {font.name}</div>
                    <div className="typo-download__desc">
                      {font.downloadUrl
                        ? `Font files for installing ${font.name} on your computer.`
                        : 'Licensed font — contact the marketing team for access.'}
                    </div>
                  </div>
                  {font.downloadUrl ? (
                    <a
                      href={font.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="typo-download__btn"
                    >
                      {font.downloadLabel} <Icon name="arrow-right" />
                    </a>
                  ) : (
                    <a
                      href="mailto:marketing@envisionus.com?subject=Gotham%20Font%20Files%20Request"
                      className="typo-download__btn"
                    >
                      {font.downloadLabel} <Icon name="arrow-right" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Font weights */}
          <div className="typo-section">
            <h3 className="typo-section__title">Font weights</h3>
            <div className="typo-weights">
              {fontWeights.map((fw) => (
                <div key={fw.weight} className="typo-weight-row">
                  <div className="typo-weight-row__sample" style={{ fontWeight: fw.weight }}>
                    Envision enables. People thrive.
                  </div>
                  <div className="typo-weight-row__meta">
                    <span className="typo-weight-row__name">{fw.name} ({fw.weight})</span>
                    <span className="typo-weight-row__usage">{fw.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage guidelines */}
          <div className="typo-section">
            <h3 className="typo-section__title">Usage guidelines</h3>
            <div className="typo-guidelines">
              {typographyGuidelines.map((g) => (
                <div key={g.rule} className="typo-guideline">
                  <div className="typo-guideline__rule">{g.rule}</div>
                  <div className="typo-guideline__detail">{g.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
