import {
  MONTHS_NOMINATIVE,
  MONTHS_GENITIVE,
  buildCalendarGrid,
  isDateSelectable,
  hasAnyAvailableSlot
} from '../data/date.js';

export default function Calendar({
  currentMonth,
  currentYear,
  selectedDate,
  today,
  onDayClick,
  onMonthChange
}) {
  const weeks = buildCalendarGrid(currentYear, currentMonth);

  const firstMonth = today.getFullYear() * 12 + today.getMonth();
  const shownMonth = currentYear * 12 + currentMonth;

  return (
    <section className="calendar-card" aria-labelledby="calendar-title">
      <div className="card-heading">
        <div>
          <h2 id="calendar-title">Выберите дату</h2>
          <p>Прошедшие дни недоступны для записи</p>
        </div>

        <div className="month-controls" aria-label="Переключение месяца">
          <button
            className="month-arrow"
            type="button"
            aria-label="Предыдущий месяц"
            disabled={shownMonth <= firstMonth}
            onClick={() => onMonthChange(-1)}
          >
            ‹
          </button>

          <button
            className="month-arrow"
            type="button"
            aria-label="Следующий месяц"
            onClick={() => onMonthChange(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="calendar-month" aria-live="polite">
        {MONTHS_NOMINATIVE[currentMonth]} <span>{currentYear}</span>
      </div>

      <div className="calendar-grid calendar-weekdays" aria-hidden="true">
        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div
        className="calendar-grid calendar-days"
        role="group"
        aria-label="Дни месяца"
      >
        {weeks.flat().map((day, index) => {
          if (day === null) {
            return <span className="day-empty" key={`empty-${index}`}></span>;
          }

          const selectable = isDateSelectable(
            day,
            currentMonth,
            currentYear,
            today
          );

          const hasSlots = hasAnyAvailableSlot(
            day,
            currentMonth,
            currentYear,
            today
          );

          const selected =
            selectedDate &&
            selectedDate.getFullYear() === currentYear &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getDate() === day;

          const classes = ['day'];

          if (selected) classes.push('is-selected');
          if (!hasSlots && selectable) classes.push('is-no-slots');

          return (
            <button
              className={classes.join(' ')}
              type="button"
              key={day}
              disabled={!selectable}
              aria-pressed={Boolean(selected)}
              aria-label={`${day} ${MONTHS_GENITIVE[currentMonth]}`}
              onClick={() => onDayClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="calendar-legend">
        <span>
          <i className="legend-dot legend-free"></i>
          Доступный день
        </span>

        <span>
          <i className="legend-dot legend-busy"></i>
          Нет мест
        </span>

        <span>
          <i className="legend-dot legend-selected"></i>
          Выбран
        </span>
      </div>
    </section>
  );
}