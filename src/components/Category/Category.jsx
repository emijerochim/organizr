import React from "react";
import "./Category.scss";

function Category({ name, color, type }) {
  return (
    <div>
      <div className="color-container">
        <p>{color}</p>
      </div>
      <div className="category-name">
        <h2>{name}</h2>
      </div>
      <div className="category-type">
        <p>{type}</p>
      </div>
    </div>
  );
}

export default Category;
