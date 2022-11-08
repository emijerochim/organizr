import React, { useState } from "react";
import TransactionEdit from "./TransactionEdit";
import "./Transaction.scss";

function Transaction({ transaction, setTransactions }) {
  let [editMode, setEditMode] = useState(false);
  return editMode ? (
    <TransactionEdit
      transaction={transaction}
      editMode={editMode}
      setEditMode={setEditMode}
    />
  ) : (
    <div className="transaction-container" onClick={(editMode = true)}>
      <p className="transaction-amount">{transaction.amount}</p>
      <p className="transaction-description">{transaction.description}</p>
      <p className="transaction-category">{transaction.category}</p>
    </div>
  );
}

export default Transaction;
