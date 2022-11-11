import React, { useState } from "react";
import TransactionEdit from "./TransactionEdit";
import "./Transaction.scss";

function Transaction({ transaction, user, setUser }) {
  let [editMode, setEditMode] = useState(false);
  return editMode ? (
    <TransactionEdit
      transaction={transaction}
      user={user}
      setUser={setUser}
      setEditMode={setEditMode}
    />
  ) : (
    <div
      className="transaction-container"
      onClick={() => {
        editMode = true;
      }}
    >
      <p className="transaction-amount">{transaction.amount}</p>
      <p className="transaction-description">{transaction.description}</p>
      <p className="transaction-category">{transaction.category}</p>
    </div>
  );
}

export default Transaction;
