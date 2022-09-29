import React from "react";
import "./ViewTypeChange.scss";

function ViewTypeChange(props) {
  const handleMonthViewClick = () => {
    props.setViewType("month");
  };
  const handleYearViewClick = () => {
    props.setViewType("year");
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

export default ViewTypeChange;
