import React from "react";
import Category from "./Category";
import "./CategoryView.scss";

function CategoryView({ user, setUser }) {
  return (
    <div className="category-view-container">
      <h2>Categories</h2>
      <div className="categories-container">
        {user.categories.map((category) => {
          return (
            <Category
              category={category}
              user={user}
              setUser={setUser}
              key={category._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryView;
