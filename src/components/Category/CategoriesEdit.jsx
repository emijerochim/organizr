import React, { useState } from "react";
import "./CategoriesEdit.scss";

function CategoriesEdit(category, setCategory) {
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

  const handleSubmit = () => {
    setCategory({ name: name, color: color, type: type });
  };

  return (
    <div>
      <h1>Edit Category</h1>
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

export default CategoriesEdit;
