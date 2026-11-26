import { formatFullDate } from '../data/date.js';

export default function TimeSlots({
  selectedDate,
  slots,
  selectedTime,
  onTimeClick
}) {
  return (
    <section className="time-card" aria-labelledby="time-title">
      <div className="card-heading">
        <div>
          <h2 id="time-title">Доступное время</h2>

          <p id="selected-date-label">
            {selectedDate
              ? formatFullDate(selectedDate)
              : 'Выберите дату в календаре'}
          </p>
        </div>

        <span className="timezone">МСК</span>
      </div>

      <div className="time-grid" aria-live="polite">
        {!selectedDate ? (
          <p className="slots-placeholder">
            Сначала выберите доступный день.
          </p>
        ) : slots.length === 0 ? (
          <div className="no-slots">
            <strong>На эту дату свободного времени нет</strong>
            Попробуйте выбрать другой день.
          </div>
        ) : (
          slots.map(time => (
            <button
              className={`time-slot ${
                selectedTime === time ? 'is-selected' : ''
              }`}
              type="button"
              key={time}
              aria-pressed={selectedTime === time}
              onClick={() => onTimeClick(time)}
            >
              {time}
            </button>
          ))
        )}
      </div>
    </section>
  );
}