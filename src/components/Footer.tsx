export function Footer({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__text">
          Envision Brand & Marketing Hub &mdash; For internal use only.
        </span>
        <button type="button" className="footer__link" onClick={onContactClick}>
          Contact the Marketing Team
        </button>
      </div>
    </footer>
  );
}
