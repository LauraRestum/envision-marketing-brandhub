import { Icon } from './Icons';
import type { ActionType } from '@/data/types';

interface Props {
  onAction: (target: { actionType: ActionType; href?: string; modalKey?: string; anchorId?: string }) => void;
  onHelpWizard?: () => void;
}

const tiles = [
  {
    id: 'tile-create',
    title: 'Create something new',
    icon: 'plus',
    actionType: 'anchor' as ActionType,
    anchorId: 'request-center',
  },
  {
    id: 'tile-find',
    title: 'Find a resource',
    icon: 'search',
    actionType: 'anchor' as ActionType,
    anchorId: 'brand-identity',
  },
  {
    id: 'tile-update',
    title: 'Update or reprint',
    icon: 'edit',
    actionType: 'anchor' as ActionType,
    anchorId: 'request-center',
  },
  {
    id: 'tile-help',
    title: 'Not sure where to start',
    icon: 'help',
    actionType: 'anchor' as ActionType,
    anchorId: 'hero',
  },
];

export function HeroTiles({ onAction, onHelpWizard }: Props) {
  function handleClick(tile: typeof tiles[number]) {
    if (tile.id === 'tile-help' && onHelpWizard) {
      onHelpWizard();
    } else {
      onAction(tile);
    }
  }

  return (
    <div className="hero-tiles">
      <div className="hero-tiles__inner">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className="hero-tile"
            onClick={() => handleClick(tile)}
          >
            <span className="hero-tile__icon">
              <Icon name={tile.icon} />
            </span>
            <span className="hero-tile__label">{tile.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
