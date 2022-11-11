import React, { useState } from "react";
import "./TransactionEdit.scss";

function TransactionEdit({ transaction, user, setUser, setEditMode }) {
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
  const onExit = () => {
    setEditMode(false);
  };

  const handleSubmit = () => {
    setUser({
      ...user,
      transactions: user.transactions.map((tx) => {
        if (tx._id === transaction._id) {
          return {
            ...transaction,
            date,
            amount,
            description,
            category,
          };
        } else {
          return transaction;
        }
      }),
    });
    fetch(`http://localhost:3001/transactions/${user.username}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        transactions: user.transactions,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    setEditMode(false);
  };

  return (
    <div>
      <h1>Edit Transaction</h1>
      <button onClick={onExit}>X</button>
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

        <input list="categories" onChange={onCategoryChange} />
        <datalist id="categories">
          {user.categories.map((category) => (
            <option value={category.name} />
          ))}
        </datalist>

        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default TransactionEdit;
