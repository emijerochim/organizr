import React, { useState, useRef, useEffect } from "react";
import "./EditTransaction.scss";

function EditTransaction({
  user,
  setUser,
  transaction,
  triggerEditTransaction,
  setTriggerEditTransaction,
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
  const onCategoryChange = async (event) => {
    await setCategory(
      user.categories.find((category) => category.name === event.target.value)
    );
    categoryInput.current.placeholder = event.target.value;
    categoryInput.current.value = "";
  };
  const onExit = () => {
    setTriggerEditTransaction(false);
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

  const handleDeleteSubmit = () => {
    const newTransactions = user.transactions.filter(
      (tx) => tx.id !== transaction.id
    );

    fetch(`http://localhost:3001/transactions/${user.username}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ token: user.token, id: transaction.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser({ ...user, transactions: newTransactions });
        }
      });

    setTriggerEditTransaction(false);
  };

  useEffect(() => {
    const categories = user.categories.map((c) => c.name);
    const datalist = document.getElementById("categories");
    categories.forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      datalist.appendChild(option);
    });
  }, [user.categories]);

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
          placeholder={category.name}
        />
        <datalist id="categories"></datalist>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <button type="button" onClick={handleDeleteSubmit}>
        Delete
      </button>
    </div>
  ) : (
    ""
  );
}

export default EditTransaction;
