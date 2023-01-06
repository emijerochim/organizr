import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTransaction.scss";

function NewTransaction({
  user,
  setUser,
  dayToView,
  setTriggerNewTransaction,
  triggerNewTransaction,
}) {
  const id = uuidv4();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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
    setTriggerNewTransaction(false);
  };

  const handleSubmit = async () => {
    const newTransaction = {
      token: user.token,
      date: dayToView.format(),
      id,
      amount,
      description,
      category,
    };

    await fetch(`http://localhost:3001/transactions/${user.username}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser({ ...user, transactions: data.data });
        }
      });

    setTriggerNewTransaction(false);
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

  return triggerNewTransaction ? (
    <div>
      <h1>New Transaction</h1>
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
          description="description"
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
          placeholder={category}
        />
        <datalist id="categories"></datalist>

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
