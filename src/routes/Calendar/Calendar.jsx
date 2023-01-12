import React, { useState, useEffect } from "react";
import { getCalendarDays } from "./calendarFunctions";
import Day from "../../components/Day/Day";
import NavBar from "./NavBar";
import "./Calendar.scss";

function Calendar({
  user,
  setUser,
  day,
  setDay,
  setTransaction,
  triggers,
  setTriggers,
}) {
  let [calendarDays, setCalendarDays] = useState([]);
  const weekdays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  useEffect(() => {
    setCalendarDays(getCalendarDays(day));
  }, [day, setUser, user.transactions, user.username]);

  return (
    <main className="calendar-main">
      <NavBar
        user={user}
        setUser={setUser}
        day={day}
        setDay={setDay}
        triggers={triggers}
        setTriggers={setTriggers}
      />

      <div className="calendar-container">
        <div className="weekday-list">
          {weekdays.map((weekday) => (
            <div className="weekday-item" key={weekday}>
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        <div className="calendar">
          {calendarDays.map((calendarDay) => {
            return (
              <Day
                user={user}
                setDay={setDay}
                calendarDay={calendarDay}
                setTransaction={setTransaction}
                triggers={triggers}
                setTriggers={setTriggers}
                key={calendarDay}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Calendar;
