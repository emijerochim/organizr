import React from "react";
import Category from "./Category";
import "../../styles/list.scss";

function CategoryList({ user, setUser, setCategory, triggers, setTriggers }) {
  const handleCloseButton = () => {
    setTriggers({ ...triggers, categoryList: false });
  };
  const handleNewCategoryButton = () => {
    setTriggers({ ...triggers, categoryList: false, newCategory: true });
  };

  return (
    <div className="list">
      <h2>Categories</h2>
      <button className="exit-button" onClick={handleCloseButton}>
        X
      </button>
      <div className="new-button-container">
        <button className="new-button" onClick={handleNewCategoryButton}>
          New Category
        </button>
      </div>
      <div className="items-container">
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
    </div>
  );
}

export default CategoryList;
