export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="logo logo-light" href="#">
            <span className="logo-mark">B</span>
            <span className="logo-name">
              BRUT<span className="logo-dot">.</span>
            </span>
          </a>

          <p>Место, где стиль становится характером.</p>
        </div>

        <div className="footer-column">
          <h2>Контакты</h2>
          <a href="tel:+79991234567">+7 (999) 123-45-67</a>
          <a href="mailto:hello@brut.ru">hello@brut.ru</a>
        </div>

        <div className="footer-column">
          <h2>Мы работаем</h2>
          <p>Ежедневно</p>
          <p>10:00 — 22:00</p>
        </div>

        <div className="footer-bottom">
          <span>© 2026 BRUT Barbershop</span>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}