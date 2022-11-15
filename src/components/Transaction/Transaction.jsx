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
      className="transaction"
      onClick={() => {
        editMode = true;
      }}
    >
      <div className="transaction-amount">{transaction.amount}</div>
      <div className="transaction-description">{transaction.description}</div>
    </div>
  );
}

export default Transaction;
