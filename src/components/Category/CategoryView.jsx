import React from "react";
import Category from "./Category";
import "./CategoryView.scss";

function CategoryView({ categories, setCategories }) {
  return (
    <div className="category-view-container">
      <h2>Categories</h2>
      <div className="categories-container">
        {categories.map((category) => {
          return <Category category={category} key={category._id} />;
        })}
      </div>
    </div>
  );
}

export default CategoryView;
