import React from "react";
import Transaction from "../Transaction/Transaction";
import moment from "moment/moment";
import filterTransactions from "../../util/filterTransactions";
import "./DayView.scss";

function DayView({ user, setUser, viewDate, setViewDate }) {
  let dayTransactions = [];
  if (user.transactions) {
    dayTransactions = filterTransactions(user.transactions, "day", viewDate);
  }

  return (
    <div className="day-view-container">
      <div className="day-view-header">
        <div className="day-view-date">
          <h2>{moment(viewDate).format("MMMM Do YYYY")}</h2>
        </div>
        <div className="day-change-buttons">
          <button
            className="next-day-button"
            onClick={() => setViewDate(viewDate.add(1, "days"))}
          ></button>
          <button
            className="previous-day-button"
            onClick={() => setViewDate(viewDate.subtract(1, "days"))}
          ></button>
        </div>
      </div>
      <div className="transactions-container">
        {dayTransactions.map((transaction) => {
          return (
            <Transaction
              transaction={transaction}
              user={user}
              setUser={setUser}
              key={transaction._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DayView;
