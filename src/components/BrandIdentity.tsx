import { Icon } from './Icons';

/**
 * Brand Identity section — logos only.
 * Shows horizontal, stacked, and vertical in full color, black, and white (9 display items).
 * Excludes icon-only marks and all alternates.
 */

interface LogoDisplayItem {
  id: string;
  label: string;
  sublabel: string;
  previewPath: string;
  bgClass: string;
}

const logoItems: LogoDisplayItem[] = [
  // Horizontal — Full Color, Black, White
  {
    id: 'horiz-color',
    label: 'Horizontal',
    sublabel: 'Full Color',
    previewPath: '/logos/primary/full-color/Envision_PrimaryLogo_2C.png',
    bgClass: 'logo-preview--light',
  },
  {
    id: 'horiz-black',
    label: 'Horizontal',
    sublabel: 'Black',
    previewPath: '/logos/primary/black/Envision_PrimaryLogo_BLACK.png',
    bgClass: 'logo-preview--light',
  },
  {
    id: 'horiz-white',
    label: 'Horizontal',
    sublabel: 'White',
    previewPath: '/logos/primary/white/Envision_PrimaryLogo_WHITE.png',
    bgClass: 'logo-preview--dark',
  },
  // Stacked — using the primary logo as representative for stacked layout
  {
    id: 'stacked-color',
    label: 'Stacked',
    sublabel: 'Full Color',
    previewPath: '/logos/primary/full-color/Envision_PrimaryLogo_2C.png',
    bgClass: 'logo-preview--light',
  },
  {
    id: 'stacked-black',
    label: 'Stacked',
    sublabel: 'Black',
    previewPath: '/logos/primary/black/Envision_PrimaryLogo_BLACK.png',
    bgClass: 'logo-preview--light',
  },
  {
    id: 'stacked-white',
    label: 'Stacked',
    sublabel: 'White',
    previewPath: '/logos/primary/white/Envision_PrimaryLogo_WHITE.png',
    bgClass: 'logo-preview--dark',
  },
  // Vertical
  {
    id: 'vertical-color',
    label: 'Vertical',
    sublabel: 'Full Color',
    previewPath: '/logos/primary/full-color/Envision_PrimaryLogo_2C.png',
    bgClass: 'logo-preview--light',
  },
  {
    id: 'vertical-black',
    label: 'Vertical',
    sublabel: 'Black',
    previewPath: '/logos/primary/black/Envision_PrimaryLogo_BLACK.png',
    bgClass: 'logo-preview--light',
  },
  {
    id: 'vertical-white',
    label: 'Vertical',
    sublabel: 'White',
    previewPath: '/logos/primary/white/Envision_PrimaryLogo_WHITE.png',
    bgClass: 'logo-preview--dark',
  },
];

interface Props {
  onLogoDownloader: () => void;
}

export function BrandIdentity({ onLogoDownloader }: Props) {
  return (
    <section className="section" id="brand-identity">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Brand Identity</div>
          <h2 className="section__title">Logos</h2>
          <p className="section__subtitle">
            Official Envision logos in horizontal, stacked, and vertical layouts. Available in full color, black, and white.
          </p>
        </div>

        <div className="logo-grid">
          {logoItems.map((item) => (
            <div
              key={item.id}
              className="logo-grid__item"
              onClick={onLogoDownloader}
              style={{ cursor: 'pointer' }}
            >
              <div className={`logo-grid__preview ${item.bgClass}`}>
                <img
                  src={item.previewPath}
                  alt={`${item.label} logo - ${item.sublabel}`}
                  loading="lazy"
                />
              </div>
              <div className="logo-grid__info">
                <span className="logo-grid__label">{item.label}</span>
                <span className="logo-grid__sublabel">{item.sublabel}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="section__cta" onClick={onLogoDownloader}>
          <Icon name="download" />
          Download Logo Files
        </button>
      </div>
    </section>
  );
}
