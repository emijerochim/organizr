import React from "react";
import { Navigate } from "react-router-dom";
import "./MonthYearSwitch.scss";

function MonthYearSwitch({ setViewType }) {
  const handleMonthViewClick = () => {
    <Navigate to="/month" />;
  };
  const handleYearViewClick = () => {
    <Navigate to="/year" />;
  };

  return (
    <div className="view-type-container">
      <button className="month-view" onClick={handleMonthViewClick}>
        MONTH
      </button>
      <button className="year-view" onClick={handleYearViewClick}>
        YEAR
      </button>
    </div>
  );
}

export default MonthYearSwitch;
