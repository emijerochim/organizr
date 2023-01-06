import React from "react";
import moment from "moment/moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.scss";

function NavBar({
  user,
  setUser,
  dayToView,
  setDayToView,
  setTriggerCategoryView,
}) {
  const handleLeftArrowClick = () => {
    setDayToView(moment(dayToView).subtract(1, "months"));
  };

  const handleRightArrowClick = () => {
    setDayToView(moment(dayToView).add(1, "months"));
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setUser({});
  };
  const handleCategoriesClick = () => {
    setTriggerCategoryView(true);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <EventNoteIcon fontSize="large" />
      </div>
      <div className="user-data-container">
        <p>{user.username}</p>
        <p>$450</p>
      </div>
      <div className="categories-button-container">
        <button className="categories-button" onClick={handleCategoriesClick}>
          <p>Categories</p>
        </button>
      </div>
      <div className="stats-container"></div>
      <div className="date-change-container">
        <button className="left-arrow" onClick={handleLeftArrowClick}>
          <ChevronLeftIcon fontSize="small" />
        </button>
        <p>{dayToView.format("MM-YYYY")}</p>
        <button className="right-arrow" onClick={handleRightArrowClick}>
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
      <button className="logout-container" onClick={handleLogoutClick}>
        <LogoutIcon fontSize="large" />
      </button>
    </div>
  );
}

export default NavBar;
