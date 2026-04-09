import { Icon } from './Icons';

interface Props {
  onOpenModal: (key: string) => void;
}

const requestCards = [
  {
    id: 'create',
    title: 'Create Something New',
    description: 'Request a new design, asset, or creative deliverable from scratch.',
    icon: 'plus',
    modalKey: 'design-request',
  },
  {
    id: 'web',
    title: 'Update Web or Content',
    description: 'Request a website update, new page, content change, or bug fix.',
    icon: 'globe',
    modalKey: 'web-request',
  },
  {
    id: 'campaign',
    title: 'Plan a Campaign or Event',
    description: 'Coordinate a multi-channel campaign or event with marketing support.',
    icon: 'calendar',
    modalKey: 'campaign-planning',
  },
  {
    id: 'asset',
    title: 'Request an Asset',
    description: 'Request a specific asset or resource from the marketing team.',
    icon: 'download',
    modalKey: 'asset-request',
  },
];

export function StartNewRequest({ onOpenModal }: Props) {
  return (
    <section className="section" id="start-request">
      <div className="container">
        <div className="section__header">
          <div className="section__eyebrow">Get Support</div>
          <h2 className="section__title">Start a New Request</h2>
          <p className="section__subtitle">
            Already know what you need? Jump straight to the right form.
          </p>
        </div>

        <div className="resource-grid resource-grid--3col">
          {requestCards.map((card) => (
            <button
              key={card.id}
              className="resource-card resource-card--clickable"
              onClick={() => onOpenModal(card.modalKey)}
            >
              <div className="resource-card__top">
                <div className="resource-card__icon">
                  <Icon name={card.icon} />
                </div>
              </div>
              <h3 className="resource-card__title">{card.title}</h3>
              <p className="resource-card__desc">{card.description}</p>
              <span className="resource-card__cta">
                Open Form <Icon name="arrow-right" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
