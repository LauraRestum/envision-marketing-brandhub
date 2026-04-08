import { Icon } from './Icons';
import { quickLinks } from '@/data/quickLinks';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
}

/** Group quick links by their target section for intuitive bucketing */
const groups = [
  { label: 'Get Assets', ids: ['quick-logos', 'quick-brand-guidelines'] },
  { label: 'Use Templates', ids: ['quick-templates'] },
  { label: 'Submit', ids: ['quick-request', 'quick-web', 'quick-story'] },
  { label: 'Social', ids: ['quick-social-hub'] },
];

export function QuickActions({ onAction }: Props) {
  const linkMap = Object.fromEntries(quickLinks.map((l) => [l.id, l]));

  return (
    <div className="quick-actions">
      <div className="quick-actions__inner">
        <span className="quick-actions__label">Jump to</span>
        <div className="quick-actions__groups">
          {groups.map((group) => (
            <div key={group.label} className="quick-actions__group">
              <span className="quick-actions__group-label">{group.label}</span>
              <div className="quick-actions__list">
                {group.ids.map((id) => {
                  const link = linkMap[id];
                  if (!link) return null;
                  return (
                    <button
                      key={link.id}
                      className="quick-action"
                      onClick={() => onAction(link)}
                    >
                      <span className="quick-action__icon"><Icon name={link.icon} /></span>
                      {link.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
