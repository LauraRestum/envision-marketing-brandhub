import { useState } from 'react';
import { Icon } from './Icons';
import { ColorPalettePanel } from './ColorPalettePanel';
import { TypographyPanel } from './TypographyPanel';

const items = [
  {
    id: 'colors',
    title: 'Color Palette',
    description: 'Official brand colors with HEX, RGB, CMYK, and Pantone values.',
    icon: 'palette',
    panel: 'colors',
  },
  {
    id: 'typography',
    title: 'Typography & Fonts',
    description: 'Official brand typefaces, font files, and typography usage guidelines.',
    icon: 'typography',
    panel: 'typography',
  },
];

export function BrandGuidelines() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  return (
    <section className="section section--alt" id="brand-guidelines">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Brand Guidelines</div>
          <h2 className="section__title">Colors, Typography & Fonts</h2>
          <p className="section__subtitle">
            Official brand guidelines for consistent representation across all materials.
          </p>
        </div>

        <div className="guidelines-grid">
          {items.map((item) => (
            <button
              key={item.id}
              className="guideline-card"
              onClick={() => setActivePanel(item.panel)}
            >
              <div className="guideline-card__icon">
                <Icon name={item.icon} />
              </div>
              <div>
                <h3 className="guideline-card__title">{item.title}</h3>
                <p className="guideline-card__desc">{item.description}</p>
              </div>
              <span className="guideline-card__arrow">
                <Icon name="arrow-right" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {activePanel === 'colors' && <ColorPalettePanel onClose={() => setActivePanel(null)} />}
      {activePanel === 'typography' && <TypographyPanel onClose={() => setActivePanel(null)} />}
    </section>
  );
}
