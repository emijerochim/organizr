import React, { useState, useEffect } from "react";
import getCalendarDays from "../../util/getCalendarDays";
import Day from "../../components/Day/Day";
import DayView from "../../components/Day/DayView";
import EditTransaction from "../../components/Transaction/EditTransaction";
import NewTransaction from "../../components/Transaction/NewTransaction";
import NavBar from "./NavBar";
import "./MonthView.scss";

function MonthView({ user, setUser, dayToView, setDayToView }) {
  let [days, setDays] = useState([]);
  let [triggerDayView, setTriggerDayView] = useState(false);
  let [triggerNewTransaction, setTriggerNewTransaction] = useState(false);
  let [triggerEditTransaction, setTriggerEditTransaction] = useState(false);
  let [transactionToEdit, setTransactionToEdit] = useState(null);

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
        />
      }
      <div className="calendar-container">
        <div className="weekday-list">
          <div className="weekday-item">
            <p>SUNDAY</p>
          </div>
          <div className="weekday-item">
            <p>MONDAY</p>
          </div>
          <div className="weekday-item">
            <p>TUESDAY</p>
          </div>
          <div className="weekday-item">
            <p>WEDNESDAY</p>
          </div>
          <div className="weekday-item">
            <p>THURSDAY</p>
          </div>
          <div className="weekday-item">
            <p>FRIDAY</p>
          </div>
          <div className="weekday-item">
            <p>SATURDAY</p>
          </div>
        </div>
        <div className="calendar">
          {days.map((day) => {
            return (
              <Day
                day={day}
                user={user}
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
      {triggerEditTransaction ? (
        <EditTransaction
          user={user}
          transaction={transactionToEdit}
          dayToView={dayToView}
          triggerEditTransaction={triggerEditTransaction}
          setTransactionToEdit={setTransactionToEdit}
          setTriggerEditTransaction={setTriggerEditTransaction}
        />
      ) : null}
      {triggerNewTransaction ? (
        <NewTransaction
          user={user}
          dayToView={dayToView}
          setDayToView={setDayToView}
          triggerNewTransaction={triggerNewTransaction}
          setTriggerNewTransaction={setTriggerNewTransaction}
        />
      ) : null}
    </main>
  );
}

export default MonthView;
