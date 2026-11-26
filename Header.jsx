export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="logo" href="#">
          <span className="logo-mark">B</span>
          <span className="logo-name">
            BRUT<span className="logo-dot">.</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#">Главная</a>
          <a href="#">Услуги</a>
          <a href="#">Мастера</a>
          <a href="#">Контакты</a>
        </nav>

        <a className="header-phone" href="tel:+79991234567">
          +7 (999) 123-45-67
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}