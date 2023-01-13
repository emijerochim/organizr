import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../styles/form.scss";

function NewTransaction({ user, setUser, day, triggers, setTriggers }) {
  const id = uuidv4();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

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
    setTriggers({ ...triggers, newTransaction: false });
  };

  const handleSubmit = async () => {
    const newTransaction = {
      token: user.token,
      date: day.format(),
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
          setUser({ ...user, transactions: data.transactions });
        }
      });

    setTriggers({ ...triggers, newTransaction: false });
  };

  useEffect(() => {
    const categories = user.categories.map((c) => c.name);
    const datalist = document.getElementById("categories");
    categories.forEach((c) => {
      const option = document.createElement("option");
      option.value = c;
      datalist.appendChild(option);
    });

    amount && description && category
      ? setDisableSubmitButton(false)
      : setDisableSubmitButton(true);
  }, [user.categories, amount, description, category]);

  return (
    <div className="form">
      <h1>New Transaction</h1>
      <button className="exit-button" onClick={onExit}>
        X
      </button>
      <form id="new-transaction-form">
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
          placeholder={category.name}
        />
        <datalist id="categories"></datalist>
        <div className="submit-button-container">
          <button
            type="button"
            className="submit-button"
            disabled={disableSubmitButton}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTransaction;
