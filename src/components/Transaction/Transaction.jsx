import React from "react";
import "./Transaction.scss";

function Transaction({
  transaction,
  setTransaction,
  triggers,
  setTriggers,
  isRenderedFromDayView,
}) {
  return (
    <div
      className={`transaction is-rendered-from-day-view-${isRenderedFromDayView}`}
      onClick={() => {
        //
        if (isRenderedFromDayView) {
          setTriggers({ ...triggers, dayView: false, editTransaction: true });
          setTransaction(transaction);
        }
      }}
      style={{ backgroundColor: transaction.category.color }}
    >
      <div className="transaction-amount">{transaction.amount}</div>
      <div className="transaction-description">{transaction.description}</div>
      <div className="transaction-category">{transaction.category.name}</div>
    </div>
  );
}

export default Transaction;
