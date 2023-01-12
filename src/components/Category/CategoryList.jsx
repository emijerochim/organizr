import React from "react";
import Category from "./Category";
import "./CategoryList.scss";

function CategoryList({ user, setUser, setCategory, triggers, setTriggers }) {
  const handleCloseButton = () => {
    setTriggers({ ...triggers, categoryList: false });
  };
  const handleNewCategoryButton = () => {
    setTriggers({ ...triggers, categoryList: false, newCategory: true });
  };

  return (
    <div className="category-view-container">
      <h2>Categories</h2>
      <button className="categories-close-button" onClick={handleCloseButton}>
        X
      </button>
      <div className="categories-container">
        {user.categories.map((category, index) => {
          if (category.name !== "Balance Update")
            return (
              <Category
                user={user}
                setUser={setUser}
                category={category}
                setCategory={setCategory}
                triggers={triggers}
                setTriggers={setTriggers}
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
