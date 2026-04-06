import { Icon } from './Icons';
import { policies } from '@/data/policies';

export function PolicyBanner() {
  if (policies.length === 0) return null;

  return (
    <>
      {policies.map((policy) => (
        <div
          key={policy.id}
          className={`policy-banner ${policy.severity === 'critical' ? 'policy-banner--critical' : policy.severity === 'info' ? 'policy-banner--info' : ''}`}
        >
          <div className="policy-banner__inner">
            <span className="policy-banner__icon"><Icon name={policy.icon} /></span>
            <div className="policy-banner__text">
              <span className="policy-banner__title">{policy.title}: </span>
              {policy.message}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
