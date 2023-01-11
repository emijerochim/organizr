import React, { useEffect, useState } from "react";
import { getTransactionsBalances } from "./transactionFunctions";
import Transaction from "../Transaction/Transaction";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import moment from "moment/moment";
import "./DayView.scss";

function DayView({
  user,
  triggerDayView,
  setTriggerDayView,
  dayToView,
  setDayToView,
  setTransactionToEdit,
  setTriggerEditTransaction,
  setTriggerNewTransaction,
}) {
  let [dayTransactions, setDayTransactions] = useState([]);

  useEffect(() => {
    setDayTransactions(getTransactionsBalances(user.transactions, dayToView));
  }, [dayToView, setDayToView, user.transactions]);

  const handlePreviousDayButton = () => {
    setDayToView(moment(dayToView).subtract(1, "days"));
  };
  const handleNextDayButton = () => {
    setDayToView(moment(dayToView).add(1, "days"));
  };
  const handleCloseButton = () => {
    setTriggerDayView(false);
  };
  const openNewTransaction = () => {
    setTriggerNewTransaction(true);
  };

  return triggerDayView ? (
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
          <h2>{dayToView.format("DD-MM")}</h2>
        </div>
      </div>
      <div className="transactions-container">
        {dayTransactions.map((transaction, index) => {
          return (
            <Transaction
              transaction={transaction}
              setTriggerEditTransaction={setTriggerEditTransaction}
              setTransactionToEdit={setTransactionToEdit}
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
