import React, { useState, useRef } from "react";
import "./EditTransaction.scss";

function EditTransaction({
  user,
  setUser,
  transaction,
  dayToView,
  triggerEditTransaction,
  setTriggerEditTransaction,
  setTransactionToEdit,
}) {
  const [amount, setAmount] = useState(transaction.amount);
  const [description, setDescription] = useState(transaction.description);
  const [category, setCategory] = useState(transaction.category);

  const onAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const categoryInput = useRef(null);
  const onCategoryChange = (event) => {
    categoryInput.current.placeholder = event.target.value;
    setCategory(
      user.categories.find(
        (category) => category.description === event.target.value
      )
    );
    categoryInput.current.value = "";
  };
  const onExit = () => {
    setTriggerEditTransaction(false);
    setTransactionToEdit(null);
  };

  const handleSubmit = () => {
    transaction.amount = amount;
    transaction.description = description;
    transaction.category = category;

    fetch(`http://localhost:3001/transactions/${user.username}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          const newTx = data.data[0];
          const newTransactions = user.transactions.map((tx) => {
            if (tx.id === newTx.id) {
              return newTx;
            } else {
              return tx;
            }
          });
          setUser({ ...user, transactions: newTransactions });
        }
      });

    setTriggerEditTransaction(false);
  };

  return triggerEditTransaction ? (
    <div>
      <h1>Edit Transaction</h1>
      <button onClick={onExit}>X</button>
      <form>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          description="amount"
          value={amount}
          onChange={onAmountChange}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          description="Description"
          value={description}
          onChange={onDescriptionChange}
        />

        <label htmlFor="category">Category</label>
        <input
          id="category-input"
          ref={categoryInput}
          description="Category"
          list="categories"
          onChange={onCategoryChange}
          placeholder={category.description}
        />
        <datalist id="categories">
          {user.categories.map((c, index) => (
            <option value={c.description} key={index} />
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
