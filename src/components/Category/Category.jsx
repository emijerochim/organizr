import React, { useState } from "react";
import CategoryEdit from "./CategoryEdit";
import "./Category.scss";

function Category({ category, user, setUser }) {
  let [editMode, setEditMode] = useState(false);

  return editMode ? (
    <CategoryEdit
      category={category}
      user={user}
      setUser={setUser}
      setEditMode={setEditMode}
    />
  ) : (
    <div>
      <div className="color-container">
        <p>{category.color}</p>
      </div>
      <div className="category-name">
        <h2>{category.name}</h2>
      </div>
      <div className="category-type">
        <p>{category.type}</p>
      </div>
    </div>
  );
}

export default Category;
