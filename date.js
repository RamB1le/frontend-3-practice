export const MONTHS_NOMINATIVE = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const MONTHS_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const DAYS_OF_WEEK = [
  'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота'
];

export const AVAILABLE_TIMES = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00'
];

export function compareDates(date1, date2) {
  const first = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );

  const second = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  if (first.getTime() < second.getTime()) return -1;
  if (first.getTime() > second.getTime()) return 1;

  return 0;
}

export function isDateSelectable(day, month, year, today) {
  const date = new Date(year, month, day);
  return compareDates(date, today) >= 0;
}

export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const offset = (firstDay.getDay() + 6) % 7;
  const cells = [];

  for (let i = 0; i < offset; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks = [];

  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

export function getSlotsForDate(date) {
  const day = date.getDate();
  const pattern = day % 4;

  if (pattern === 0) return [];

  if (pattern === 1) {
    return AVAILABLE_TIMES.filter(
      time => !['11:00', '14:00', '17:00'].includes(time)
    );
  }

  if (pattern === 2) {
    return AVAILABLE_TIMES.filter(
      time => !['10:00', '13:00', '16:00'].includes(time)
    );
  }

  return AVAILABLE_TIMES.filter(
    time => !['12:00', '15:00'].includes(time)
  );
}

export function getAvailableSlotsForDate(date, today) {
  const slots = getSlotsForDate(date);

  if (compareDates(date, today) === 0) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return slots.filter(time => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes > currentMinutes;
    });
  }

  return slots;
}

export function formatFullDate(date) {
  return `${DAYS_OF_WEEK[date.getDay()]}, ${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

export function hasAnyAvailableSlot(day, month, year, today) {
  const date = new Date(year, month, day);

  return (
    isDateSelectable(day, month, year, today) &&
    getAvailableSlotsForDate(date, today).length > 0
  );
}