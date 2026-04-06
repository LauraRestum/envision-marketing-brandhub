export function Header({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__logo">E</div>
          <span className="header__title">Brand & Marketing Hub</span>
          <span className="header__tag">Internal</span>
        </div>
        <nav className="header__nav">
          <a href="#brand-resources" className="header__link">Resources</a>
          <a href="#templates" className="header__link">Templates</a>
          <a href="#request-center" className="header__link">Requests</a>
          <button
            type="button"
            className="header__link header__link--btn"
            onClick={onContactClick}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </header>
  );
}
