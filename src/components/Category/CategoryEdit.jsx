import React, { useState } from "react";
import "./CategoryEdit.scss";

function CategoryEdit({ category, user, setUser, setEditMode }) {
  const [name, setName] = useState({ name: category.name });
  const [color, setColor] = useState({ color: category.color });
  const [type, setType] = useState({ type: category.type });

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
    setEditMode(false);
  };

  const handleSubmit = () => {
    setUser({
      ...user,
      categories: user.categories.map((cat) => {
        if (cat._id === category._id) {
          return {
            ...category,
            name,
            color,
            type,
          };
        } else {
          return category;
        }
      }),
    });

    fetch(`http://localhost:3001/categories/${user.username}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        categories: user.categories,
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
      <h1>Edit Category</h1>
      <button onClick={onExit}>X</button>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={onNameChange} />
        <label htmlFor="description">Color</label>
        <input
          type="text"
          name="color"
          value={color}
          onChange={onColorChange}
        />
        <label htmlFor="description">Type</label>
        <input type="text" name="type" value={type} onChange={onTypeChange} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default CategoryEdit;
