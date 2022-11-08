import React, { useState } from "react";
import "./TransactionEdit.scss";

function TransactionEdit(transaction, setTransaction, editMode, setEditMode) {
  const [date, setDate] = useState({ date: transaction.date });
  const [amount, setAmount] = useState({ amount: transaction.amount });
  const [description, setDescription] = useState({
    description: transaction.description,
  });
  const [category, setCategory] = useState({ category: transaction.category });

  const onDateChange = (event) => {
    setDate(event.target.value);
  };
  const onAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    setTransaction({
      date: date,
      amount: amount,
      description: description,
      category: category,
    });
  };

  return (
    <div>
      <h1>Edit Transaction</h1>
      <form>
        <label htmlFor="date">Date</label>
        <input type="text" name="date" value={date} onChange={onDateChange} />
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={onAmountChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={onDescriptionChange}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={onCategoryChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default TransactionEdit;
