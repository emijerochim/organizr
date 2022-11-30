import React from "react";
import Category from "./Category";
import "./CategoryView.scss";

function CategoryView({ user, setUser }) {
  return (
    <div className="category-view-container">
      <h2>Categories</h2>
      <div className="categories-container">
        {user.categories.map((category, index) => {
          return (
            <Category
              category={category}
              user={user}
              setUser={setUser}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryView;
