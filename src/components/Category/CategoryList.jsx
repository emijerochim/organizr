import React from "react";
import Category from "./Category";
import "./CategoryList.scss";

function CategoryList({
  user,
  setUser,
  setTriggerCategoryList,
  setTriggerNewCategory,
}) {
  const handleCloseButton = () => {
    setTriggerCategoryList(false);
  };
  const handleNewCategoryButton = () => {
    setTriggerCategoryList(false);
    setTriggerNewCategory(true);
  };

  return (
    <div className="category-view-container">
      <h2>Categories</h2>
      <button className="categories-close-button" onClick={handleCloseButton}>
        X
      </button>
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
      <button className="new-category-button" onClick={handleNewCategoryButton}>
        New Category
      </button>
    </div>
  );
}

export default CategoryList;
