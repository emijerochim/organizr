import React, { useState } from "react";
import Transaction from "../Transaction/Transaction";
import "./Day.scss";

const Day = (props) => {
  const [transactions, setTransactions] = useState([]);

  const handleDayClick = () => {
    props.setViewType("day");
  };

  return (
    <div className="calendar-day" onClick={handleDayClick}>
      <div className="day-header">
        <p className="day-date">{props.date}</p>
        <p className="day-balance">450</p>
      </div>
      <div className="transactions-container">
        {transactions.map((transaction) => {
          return (
            <Transaction
              setViewType={props.setViewType}
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
