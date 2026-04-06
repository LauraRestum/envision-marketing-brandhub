import { Icon } from './Icons';
import { quickLinks } from '@/data/quickLinks';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
}

export function QuickActions({ onAction }: Props) {
  return (
    <div className="quick-actions">
      <div className="quick-actions__inner">
        <span className="quick-actions__label">Quick Access</span>
        <div className="quick-actions__list">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              className="quick-action"
              onClick={() => onAction(link)}
            >
              <span className="quick-action__icon"><Icon name={link.icon} /></span>
              {link.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
