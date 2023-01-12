import React from "react";
import "./Category.scss";

function Category({ category, setCategory, triggers, setTriggers }) {
  const openCategoryList = () => {
    setCategory(category);
    setTriggers({ ...triggers, categoryList: false, editCategory: true });
  };

  return (
    <div
      className="category"
      onClick={openCategoryList}
      style={{ backgroundColor: category.color }}
    >
      <div className="category-name">
        <h2>{category.name}</h2>
      </div>
      <div className="category-type">
        <p>{category.type}</p>
      </div>
      <div className="category-color">
        <p>{category.color}</p>
      </div>
    </div>
  );
}

export default Category;
