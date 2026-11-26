export default function BookingProgress() {
  return (
    <div className="booking-progress" aria-label="Шаг 3 из 5">
      <div className="progress-step is-complete">
        <span className="step-number">✓</span>
        <span className="step-name">Мастер</span>
      </div>

      <span className="progress-line is-complete"></span>

      <div className="progress-step is-complete">
        <span className="step-number">✓</span>
        <span className="step-name">Услуга</span>
      </div>

      <span className="progress-line is-current"></span>

      <div className="progress-step is-current" aria-current="step">
        <span className="step-number">3</span>
        <span className="step-name">Дата и время</span>
      </div>

      <span className="progress-line"></span>

      <div className="progress-step">
        <span className="step-number">4</span>
        <span className="step-name">Контакты</span>
      </div>

      <span className="progress-line"></span>

      <div className="progress-step">
        <span className="step-number">5</span>
        <span className="step-name">Готово</span>
      </div>
    </div>
  );
}