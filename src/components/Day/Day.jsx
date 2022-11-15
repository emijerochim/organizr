import React, { useState, useEffect } from "react";
import Transaction from "../Transaction/Transaction";
import DayView from "./DayView";
import filterTransactions from "../../util/filterTransactions";
import "./Day.scss";

const Day = ({ date, user, setUser }) => {
  let [editMode, setEditMode] = useState(false);
  let [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user.transactions) {
      setTransactions(filterTransactions(user.transactions, "day", date));
    }
  }, [user.transactions, date]);

  return editMode ? (
    <DayView
      user={user}
      setUser={setUser}
      editMode={editMode}
      setEditMode={setEditMode}
    />
  ) : (
    <div
      className="calendar-day"
      onClick={() => {
        editMode = true;
      }}
    >
      <div className="day-header">
        <p className="day-date">{date}</p>
        <p className="day-balance">450</p>
      </div>

      <div className="transactions-container">
        {transactions.map((transaction) => {
          return (
            <Transaction
              transaction={transaction}
              user={user}
              setUser={setUser}
              key={transaction}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Day;
