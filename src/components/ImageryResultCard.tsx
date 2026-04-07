import { Icon } from './Icons';
import { PillarTag } from './PillarTag';
import { DESTINATION_TO_PILLAR } from '@/data/pillars';
import type { ImageryRouteResult } from '@/lib/resolveImageryRoute';

interface Props {
  result: ImageryRouteResult;
  onDismiss: () => void;
}

export function ImageryResultCard({ result, onDismiss }: Props) {
  const pillarKey = DESTINATION_TO_PILLAR[result.destinationKey];

  return (
    <div className="imagery-card">
      <div className="imagery-card__inner">
        <div className="imagery-card__icon">
          <Icon name="image" />
        </div>
        <div className="imagery-card__body">
          <p className="imagery-card__eyebrow">Best match</p>
          <h3 className="imagery-card__subcategory">{result.subcategory}</h3>
          <p className="imagery-card__destination">
            Located under <strong>{result.destinationTitle}</strong>
          </p>
          {pillarKey && <PillarTag pillar={pillarKey} />}
        </div>
        <div className="imagery-card__actions">
          <a
            href={result.href}
            target="_blank"
            rel="noopener noreferrer"
            className="imagery-card__open"
          >
            Open folder
            <Icon name="arrow-right" />
          </a>
          <button className="imagery-card__dismiss" onClick={onDismiss}>
            <Icon name="x" />
          </button>
        </div>
      </div>
    </div>
  );
}
