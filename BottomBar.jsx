import { formatFullDate } from '../data/date.js';

export default function BottomBar({
  selectedDate,
  selectedTime
}) {
  let message = 'Выберите дату и время записи';

  if (selectedDate && selectedTime) {
    message = (
      <>
        {formatFullDate(selectedDate)}
        <strong> • {selectedTime}</strong>
      </>
    );
  } else if (selectedDate) {
    message = (
      <>
        {formatFullDate(selectedDate)} — выберите время
      </>
    );
  }

  return (
    <div className="selected-summary" aria-live="polite">
      <span className="summary-icon">✓</span>
      <p>{message}</p>
    </div>
  );
}