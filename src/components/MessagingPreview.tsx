import { Icon } from './Icons';

interface Props {
  onOpen: () => void;
}

export function MessagingPreview({ onOpen }: Props) {
  return (
    <section className="section messaging-preview-section" id="messaging-assistant">
      <div className="container">
        <div className="messaging-preview" onClick={onOpen}>
          <div className="messaging-preview__lock">
            <Icon name="lock" />
          </div>
          <div className="messaging-preview__content">
            <div className="messaging-preview__badge">Coming Soon</div>
            <h3 className="messaging-preview__title">Messaging Assistant</h3>
            <p className="messaging-preview__desc">
              Compose on-brand content, check brand compliance, and reformat for any platform.
            </p>
          </div>
          <span className="messaging-preview__arrow">
            <Icon name="arrow-right" />
          </span>
        </div>
      </div>
    </section>
  );
}
