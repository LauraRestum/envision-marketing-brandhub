import { Icon } from './Icons';

const platforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/share/1DzeJL9y4S/?mibextid=wwXIfr',
    color: '#1877F2',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/company/envision-inc/',
    color: '#0A66C2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/discoverenvision?igsh=MWdtMG1qOXBrcGRuYg%3D%3D&utm_source=qr',
    color: '#E4405F',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    url: 'https://www.tiktok.com/@discoverenvision?_r=1&_t=ZP-95KICtXRLtW',
    color: '#000000',
  },
];

export function SocialQuickLinks() {
  return (
    <section className="section social-quick" id="social-links">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Follow Us</div>
          <h2 className="section__title">Social Media</h2>
        </div>
        <div className="social-quick__row">
          {platforms.map((p) => (
            <a
              key={p.id}
              className="social-quick__link"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={p.name}
            >
              <span className="social-quick__icon" style={{ background: p.color }}>
                <Icon name={p.icon} />
              </span>
              <span className="social-quick__name">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
