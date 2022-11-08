import React, { useState } from "react";
import Transaction from "../Transaction/Transaction";
import filterTransactions from "../../util/filterTransactions";
import DayEdit from "./DayEdit";
import "./Day.scss";

const Day = ({ date, transactions, setTransactions }) => {
  let [editMode, setEditMode] = useState(false);
  const dayTransactions = filterTransactions(transactions, "day");

  return editMode ? (
    <DayEdit editMode={editMode} setEditMode={setEditMode} />
  ) : (
    <div className="calendar-day" onClick={(editMode = true)}>
      <div className="day-header">
        <p className="day-date">{date}</p>
        <p className="day-balance">450</p>
      </div>
      <div className="transactions-container">
        {dayTransactions.map((transaction) => {
          return (
            <Transaction
              setTransactions={setTransactions}
              key={transaction._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Day;
