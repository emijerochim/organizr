import React, { useEffect, useState } from "react";
import { getTransactionsFromDay } from "./transactionFunctions";
import Transaction from "../Transaction/Transaction";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import moment from "moment/moment";
import "./DayView.scss";

function DayView({ user, day, setDay, setTransaction, triggers, setTriggers }) {
  let [dayTransactions, setDayTransactions] = useState([]);

  useEffect(() => {
    setDayTransactions(getTransactionsFromDay(user.transactions, day));
  }, [day, user.transactions]);

  const handlePreviousDayButton = () => {
    setDay(moment(day).subtract(1, "days"));
  };
  const handleNextDayButton = () => {
    setDay(moment(day).add(1, "days"));
  };
  const handleCloseButton = () => {
    setTriggers({ ...triggers, dayView: false });
  };
  const openNewTransaction = () => {
    setTriggers({ ...triggers, newTransaction: true });
  };

  return triggers.dayView ? (
    <div className="day-view-container">
      <div className="day-view-header">
        <div className="day-view-buttons">
          <div className="day-change-buttons-container">
            <button
              className="next-day-button"
              onClick={handlePreviousDayButton}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="previous-day-button"
              onClick={handleNextDayButton}
            >
              <ChevronRightIcon />
            </button>
          </div>
          <div className="close-button-container">
            <button className="close-button" onClick={handleCloseButton}>
              X
            </button>
          </div>
        </div>
        <div className="day-view-date">
          <h2>{day.format("DD-MM")}</h2>
        </div>
      </div>
      <div className="transactions-container">
        {dayTransactions.map((transaction, index) => {
          return (
            <Transaction
              transaction={transaction}
              setTransaction={setTransaction}
              triggers={triggers}
              setTriggers={setTriggers}
              isRenderedFromDayView={true}
              key={index}
            />
          );
        })}
      </div>
      <div className="day-view-footer">
        <button className="new-tx-button" onClick={openNewTransaction}>
          Add new transaction
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DayView;
