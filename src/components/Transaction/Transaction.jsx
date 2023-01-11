import React from "react";
import "./Transaction.scss";
import moment from "moment/moment";

function Transaction({
  transaction,
  setTransactionToEdit,
  setTriggerEditTransaction,
  setDayToView,
}) {
  return (
    <div
      className="transaction"
      onClick={() => {
        setTriggerEditTransaction(true);
        setTransactionToEdit(transaction);
        setDayToView(moment(transaction.date));
      }}
      style={{ backgroundColor: transaction.category.color }}
    >
      <div className="transaction-amount">{transaction.amount}</div>
      <div className="transaction-description">{transaction.description}</div>
    </div>
  );
}

export default Transaction;
