import { useState } from 'react';

import Header from './components/Header.jsx';
import BookingProgress from './components/BookingProgress.jsx';
import Calendar from './components/Calendar.jsx';
import TimeSlots from './components/TimeSlots.jsx';
import BottomBar from './components/BottomBar.jsx';
import Footer from './components/Footer.jsx';

import {
  getAvailableSlotsForDate,
  compareDates
} from './data/date.js';

import './styles.css';

export default function App() {
  // Текущая дата без времени.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Находим ближайшую дату, для которой есть свободное время.
  function getInitialDate() {
    const date = new Date(today);
    let attempts = 0;

    while (
      getAvailableSlotsForDate(date, today).length === 0 &&
      attempts < 31
    ) {
      date.setDate(date.getDate() + 1);
      attempts += 1;
    }

    return date;
  }

  const initialDate = getInitialDate();

  // Состояние приложения.
  const [currentMonth, setCurrentMonth] = useState(
    initialDate.getMonth()
  );

  const [currentYear, setCurrentYear] = useState(
    initialDate.getFullYear()
  );

  const [selectedDay, setSelectedDay] = useState(
    initialDate.getDate()
  );

  const [selectedTime, setSelectedTime] = useState(null);

  const [slots, setSlots] = useState(
    getAvailableSlotsForDate(initialDate, today)
  );

  const [formMessage, setFormMessage] = useState('');

  // Полная выбранная дата.
  const selectedDate = selectedDay === null
    ? null
    : new Date(currentYear, currentMonth, selectedDay);

  // Выбор дня календаря.
  function handleDayClick(day) {
    const newDate = new Date(currentYear, currentMonth, day);

    if (compareDates(newDate, today) < 0) {
      return;
    }

    setSelectedDay(day);
    setSelectedTime(null);
    setSlots(getAvailableSlotsForDate(newDate, today));
    setFormMessage('');
  }

  // Выбор времени.
  function handleTimeClick(time) {
    setSelectedTime(time);
    setFormMessage('');
  }

  // Переключение месяцев.
  function handleMonthChange(direction) {
    const newDate = new Date(
      currentYear,
      currentMonth + direction,
      1
    );

    const firstMonth = today.getFullYear() * 12 + today.getMonth();
    const targetMonth = newDate.getFullYear() * 12 + newDate.getMonth();

    if (targetMonth < firstMonth) {
      return;
    }

    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  }

  // Кнопка продолжения.
  function handleContinue() {
    if (!selectedDate || !selectedTime) {
      return;
    }

    setFormMessage(
      'Дата и время выбраны. Можно переходить к контактным данным.'
    );
  }

  return (
    <>
      <Header />

      <main className="booking-main">
        <section className="booking-shell" aria-labelledby="page-title">

          <BookingProgress />

          <div className="page-heading">
            <p className="eyebrow">ЗАПИСЬ ОНЛАЙН</p>

            <h1 id="page-title">
              Выберите дату и время
            </h1>

            <p className="page-description">
              Остался всего один шаг до встречи с вашим мастером.
            </p>
          </div>

          <div className="booking-layout">

            <Calendar
              currentMonth={currentMonth}
              currentYear={currentYear}
              selectedDate={selectedDate}
              today={today}
              onDayClick={handleDayClick}
              onMonthChange={handleMonthChange}
            />

            <div className="time-card">
              <TimeSlots
                selectedDate={selectedDate}
                slots={slots}
                selectedTime={selectedTime}
                onTimeClick={handleTimeClick}
              />

              <BottomBar
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </div>

          </div>

          <div className="booking-actions">
            <a className="back-link" href="#">
              ← Назад к выбору услуги
            </a>

            <button
              className="primary-button"
              type="button"
              disabled={!selectedDate || !selectedTime}
              onClick={handleContinue}
            >
              Продолжить <span>→</span>
            </button>
          </div>

          <p className="form-message" role="status">
            {formMessage}
          </p>

        </section>
      </main>

      <Footer />
    </>
  );
}