import React, { useState, useEffect } from "react";
import { getCalendarDays } from "./calendarFunctions";
import Day from "../../components/Day/Day";
import DayView from "../../components/Day/DayView";
import NavBar from "./NavBar";
import "./Calendar.scss";

function Calendar({
  user,
  setUser,
  dayToView,
  setDayToView,
  setTriggerCategoryList,
  setTriggerEditTransaction,
  setTransactionToEdit,
  setTriggerNewTransaction,
  transactionToEdit,
}) {
  let [days, setDays] = useState([]);
  let [triggerDayView, setTriggerDayView] = useState(false);
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
    setDays(getCalendarDays(dayToView));
  }, [dayToView, setUser, user.transactions, user.username]);

  return (
    <main>
      {
        <NavBar
          user={user}
          setUser={setUser}
          dayToView={dayToView}
          setDayToView={setDayToView}
          setTriggerCategoryList={setTriggerCategoryList}
        />
      }
      <div className="calendar-container">
        <div className="weekday-list">
          {weekdays.map((day) => (
            <div className="weekday-item" key={day}>
              <p>{day}</p>
            </div>
          ))}
        </div>
        <div className="calendar">
          {days.map((day) => {
            return (
              <Day
                day={day}
                user={user}
                setUser={setUser}
                dayToView={dayToView}
                setDayToView={setDayToView}
                setTriggerDayView={setTriggerDayView}
                setTriggerEditTransaction={setTriggerEditTransaction}
                setTransactionToEdit={setTransactionToEdit}
                setTriggerNewTransaction={setTriggerNewTransaction}
                key={day}
              />
            );
          })}
        </div>
      </div>
      <DayView
        user={user}
        setUser={setUser}
        triggerDayView={triggerDayView}
        setTriggerDayView={setTriggerDayView}
        dayToView={dayToView}
        setDayToView={setDayToView}
        setTriggerEditTransaction={setTriggerEditTransaction}
        transactionToEdit={transactionToEdit}
        setTransactionToEdit={setTransactionToEdit}
        setTriggerNewTransaction={setTriggerNewTransaction}
      />
    </main>
  );
}

export default Calendar;
