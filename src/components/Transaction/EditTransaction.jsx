import React, { useState, useEffect } from "react";
import "./EditTransaction.scss";

function EditTransaction({
  user,
  transaction,
  dayToView,
  triggerEditTransaction,
  setTriggerEditTransaction,
  setTransactionToEdit,
}) {
  const id = transaction.id;
  const [amount, setAmount] = useState(transaction.amount);
  const [description, setDescription] = useState(transaction.description);
  const [category, setCategory] = useState(transaction.category);

  const onAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const onExit = () => {
    setTriggerEditTransaction(false);
    setTransactionToEdit(null);
  };

  const handleSubmit = () => {
    const newTransaction = {
      token: user.token,
      date: dayToView.format(),
      id,
      amount,
      description,
      category,
    };

    fetch(`http://localhost:3001/transactions/${user.username}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTransaction),
    }).then((res) => res.json());

    setTriggerEditTransaction(false);
  };

  useEffect(() => {
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setCategory(transaction.category.name);
  }, [transaction]);

  return triggerEditTransaction ? (
    <div>
      <h1>Edit Transaction</h1>
      <button onClick={onExit}>X</button>
      <form>
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

        <input list="categories" onChange={onCategoryChange} value={category} />
        <datalist id="categories">
          {user.categories.map((category) => (
            <option value={category.name} key={category.name} />
          ))}
        </datalist>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    ""
  );
}

export default EditTransaction;
