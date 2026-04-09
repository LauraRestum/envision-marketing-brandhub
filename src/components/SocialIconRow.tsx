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

export function SocialIconRow() {
  return (
    <div className="social-row">
      <div className="social-row__inner">
        <span className="social-row__label">Follow Us</span>
        <div className="social-row__icons">
          {platforms.map((p) => (
            <a
              key={p.id}
              className="social-row__icon-link"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={p.name}
              style={{ '--platform-color': p.color } as React.CSSProperties}
            >
              <Icon name={p.icon} />
              <span className="social-row__icon-name">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
