import React from "react";
import moment from "moment/moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { getBalanceByDay } from "../../util/balance";
import "./NavBar.scss";

const NavBar = ({ user, setUser, day, setDay, triggers, setTriggers }) => {
  const handleLeftArrowClick = () => {
    setDay(moment(day).subtract(1, "months"));
  };

  const handleRightArrowClick = () => {
    setDay(moment(day).add(1, "months"));
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setUser({});
  };
  const handleCategoriesClick = () => {
    setTriggers({ ...triggers, categoryList: true });
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
            fill="#333"
          />
        </svg>
      </div>
      <div className="user-data-container">
        <div className="today-date-container">
          <p className="today-date">{moment().format("DD-MM")}</p>
        </div>
        <div className="user-balance-container">
          <p className="user-balance">
            ${getBalanceByDay(user.transactions, day)}
          </p>
        </div>
      </div>
      <div className="date-change-container">
        <button className="left-arrow" onClick={handleLeftArrowClick}>
          <ChevronLeftIcon fontSize="small" />
        </button>
        <div className="date-container">
          <p className="date">{day.format("MM-YYYY")}</p>
        </div>
        <button className="right-arrow" onClick={handleRightArrowClick}>
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
      <div className="categories-button-container">
        <button className="categories-button" onClick={handleCategoriesClick}>
          <p>Categories</p>
        </button>
      </div>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogoutClick}>
          <LogoutIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
