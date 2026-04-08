import { useState } from 'react';
import { Icon } from './Icons';
import { primaryColors, secondaryColors, pillarColors } from '@/data/brandColors';
import type { BrandColor } from '@/data/brandColors';

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function ColorSwatch({ color }: { color: BrandColor }) {
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(label: string, value: string) {
    copyToClipboard(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="color-swatch">
      <div className="color-swatch__preview" style={{ backgroundColor: color.hex }} />
      <div className="color-swatch__info">
        <div className="color-swatch__name">{color.name}</div>
        <div className="color-swatch__values">
          <button className="color-swatch__value" onClick={() => handleCopy('HEX', color.hex)} title="Copy HEX">
            <span className="color-swatch__label">HEX</span>
            <span className="color-swatch__code">{color.hex}</span>
            {copied === 'HEX' ? <span className="color-swatch__copied">Copied</span> : <Icon name="copy" />}
          </button>
          <button className="color-swatch__value" onClick={() => handleCopy('RGB', color.rgb)} title="Copy RGB">
            <span className="color-swatch__label">RGB</span>
            <span className="color-swatch__code">{color.rgb}</span>
            {copied === 'RGB' ? <span className="color-swatch__copied">Copied</span> : <Icon name="copy" />}
          </button>
          <button className="color-swatch__value" onClick={() => handleCopy('CMYK', color.cmyk)} title="Copy CMYK">
            <span className="color-swatch__label">CMYK</span>
            <span className="color-swatch__code">{color.cmyk}</span>
            {copied === 'CMYK' ? <span className="color-swatch__copied">Copied</span> : <Icon name="copy" />}
          </button>
          <button className="color-swatch__value" onClick={() => handleCopy('Pantone', color.pantone)} title="Copy Pantone">
            <span className="color-swatch__label">Pantone</span>
            <span className="color-swatch__code">{color.pantone}</span>
            {copied === 'Pantone' ? <span className="color-swatch__copied">Copied</span> : <Icon name="copy" />}
          </button>
        </div>
        <div className="color-swatch__usage">{color.usage}</div>
      </div>
    </div>
  );
}

export function ColorPalettePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="brand-panel-overlay" onClick={onClose}>
      <div className="brand-panel" onClick={(e) => e.stopPropagation()}>
        <div className="brand-panel__header">
          <div>
            <h2 className="brand-panel__title">Color Palette</h2>
            <p className="brand-panel__subtitle">Official Envision brand colors. Click any value to copy.</p>
          </div>
          <button className="brand-panel__close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        <div className="brand-panel__body">
          <div className="color-section">
            <h3 className="color-section__title">Primary colors</h3>
            <div className="color-section__grid">
              {primaryColors.map((c) => (
                <ColorSwatch key={c.hex} color={c} />
              ))}
            </div>
          </div>

          <div className="color-section">
            <h3 className="color-section__title">Secondary colors</h3>
            <div className="color-section__grid">
              {secondaryColors.map((c) => (
                <ColorSwatch key={c.hex} color={c} />
              ))}
            </div>
          </div>

          <div className="color-section">
            <h3 className="color-section__title">Pillar color direction</h3>
            <p className="color-section__desc">Each Envision pillar has a designated color for consistent identification across all materials.</p>
            <div className="pillar-color-grid">
              {pillarColors.map((p) => (
                <div key={p.pillar} className="pillar-color-row">
                  <div className="pillar-color-row__dot" style={{ backgroundColor: p.hex }} />
                  <div className="pillar-color-row__info">
                    <div className="pillar-color-row__pillar">{p.pillar}</div>
                    <div className="pillar-color-row__detail">
                      <span className="pillar-color-row__color-name">{p.colorName}</span>
                      <span className="pillar-color-row__hex">{p.hex}</span>
                    </div>
                    <div className="pillar-color-row__usage">{p.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
