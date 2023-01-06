import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTransaction.scss";

function NewCategory({
  user,
  setUser,
  setTriggerNewCategory,
  triggerNewCategory,
}) {
  const id = uuidv4();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onColorChange = (event) => {
    setColor(event.target.value);
  };
  const onTypeChange = (event) => {
    setType(event.target.value);
  };

  const onExit = () => {
    setTriggerNewCategory(false);
  };

  const handleSubmit = async () => {
    const newCategory = {
      token: user.token,
      id,
      name,
      color,
      type,
    };

    await fetch(`http://localhost:3001/categories/${user.username}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser({ ...user, categories: data.data });
        }
      });
    setTriggerNewCategory(false);
  };

  return triggerNewCategory ? (
    <div id="new-category" className="new-category">
      <button id="exit-button" onClick={onExit}>
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
        <input
          type="text"
          id="color"
          className="input"
          name="color"
          value={color}
          onChange={onColorChange}
        />

        <label htmlFor="type" className="label">
          Type
        </label>
        <input
          type="text"
          id="type"
          className="input"
          name="type"
          value={type}
          onChange={onTypeChange}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  ) : null;
}

export default NewCategory;
