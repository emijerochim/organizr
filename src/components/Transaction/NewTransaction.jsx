import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTransaction.scss";

function NewTransaction({
  user,
  dayToView,
  setTriggerNewTransaction,
  triggerNewTransaction,
  setTransactionToEdit,
}) {
  const id = uuidv4();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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
    setTriggerNewTransaction(false);
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
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTransaction),
    }).then((res) => res.json());

    user.transactions.push(newTransaction);
    setTriggerNewTransaction(false);
  };

  return triggerNewTransaction ? (
    <div>
      <h1>New Transaction</h1>
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

export default NewTransaction;
