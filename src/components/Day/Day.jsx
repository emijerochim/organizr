import React, { useState, useEffect } from "react";
import Transaction from "../Transaction/Transaction";
import moment from "moment/moment";
import "./Day.scss";

function Day({
  day,
  user,
  setDayToView,
  setTriggerDayView,
  setTriggerNewTransaction,
  setTriggerEditTransaction,
  setTransactionToEdit,
}) {
  let [transactions, setTransactions] = useState([]);
  let [balance, setBalance] = useState(0);

  useEffect(() => {
    let txs = user.transactions.filter((transaction) =>
      moment(transaction.date).isSame(day.format())
    );
    setTransactions(txs);
    setBalance(
      txs.reduce((acc, tx) => {
        return acc + tx.amount;
      }, 0)
    );
  }, [day, user.transactions]);

  const openDayView = () => {
    setTriggerDayView(true);
    setDayToView(moment(day));
  };
  const openNewTransaction = () => {
    setDayToView(moment(day));
    setTriggerNewTransaction(true);
  };

  return (
    <div className="calendar-day">
      <div className="day-header">
        <div className="day-header-clickable" onClick={openDayView}>
          <div className="day-date-container">
            <p className="day-date">{day.format("D")}</p>
          </div>
          <div className="day-balance-container">
            <p className="day-balance">${balance}</p>
          </div>
        </div>
        <div className="add-transaction-button-container">
          <button
            className="add-transaction-button"
            onClick={openNewTransaction}
          >
            +
          </button>
        </div>
      </div>

      <div className="transactions-container">
        {transactions.map((transaction, txIndex) => {
          return (
            <Transaction
              transaction={transaction}
              setTriggerEditTransaction={setTriggerEditTransaction}
              setTransactionToEdit={setTransactionToEdit}
              setDayToView={setDayToView}
              key={txIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Day;
