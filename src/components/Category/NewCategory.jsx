import React, { useState, useEffect, useRef } from "react";
import { HuePicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import "../../styles/form.scss";
import API_URL from "../../util/env";

function NewCategory({ user, setUser, triggers, setTriggers }) {
  const id = uuidv4();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [type, setType] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const incomeBox = useRef(null);
  const expenseBox = useRef(null);

  const onExit = () => {
    setTriggers({ ...triggers, newCategory: false });
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onColorChange = (color, event) => {
    setColor(color.hex);
  };
  const onTypeChange = (event) => {
    if (event.target.id === "income-box") {
      setType("income");
      expenseBox.current.checked = false;
    } else if (event.target.id === "expense-box") {
      setType("expense");
      incomeBox.current.checked = false;
    }
  };

  useEffect(() => {
    name && color && type
      ? setDisableSubmitButton(false)
      : setDisableSubmitButton(true);
  }, [name, color, type]);

  const handleSubmit = async () => {
    const newCategory = {
      token: localStorage.getItem("token"),
      id,
      name,
      color,
      type,
    };

    await fetch(`${API_URL}/categories/${user.username}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser({ ...user, categories: data.categories });
        }
      });
    setTriggers({ ...triggers, newCategory: false });
  };

  return (
    <div className="form">
      <button className="exit-button" onClick={onExit}>
        X
      </button>
      <h1>New Category</h1>
      <form id="new-category-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="input"
          name="name"
          value={name}
          onChange={onNameChange}
        />

        <label htmlFor="color" className="label">
          Color
        </label>
        <HuePicker color={color} onChangeComplete={onColorChange} />
        <div className="type-container">
          <label htmlFor="type" className="label">
            Type
          </label>
          <div className="type-boxes">
            <label htmlFor="income-box">Income</label>
            <input
              type="checkbox"
              onChange={onTypeChange}
              id="income-box"
              ref={incomeBox}
            />
            <input
              type="checkbox"
              onChange={onTypeChange}
              id="expense-box"
              ref={expenseBox}
            />
            <label htmlFor="expense-box">Expense</label>
          </div>
        </div>
        <div className="submit-button-container">
          <button
            type="submit"
            className="submit-button"
            disabled={disableSubmitButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCategory;
