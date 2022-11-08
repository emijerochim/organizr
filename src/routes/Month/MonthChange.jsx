import React from "react";
import moment from "moment/moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./MonthChange.scss";

function MonthChange({ viewDate, setViewDate, viewType }) {
  const handleLeftArrowClick = () => {
    setViewDate(moment(viewDate).subtract(1, "months"));
  };

  const handleRightArrowClick = () => {
    setViewDate(moment(viewDate).add(1, "months"));
  };

  const date =
    viewType === "month" ? viewDate.format("MM-YYYY") : viewDate.format("YYYY");

  return (
    <div className="date-change-container">
      <button className="left-arrow" onClick={handleLeftArrowClick}>
        <ChevronLeftIcon fontSize="large" />
      </button>
      <p>{date}</p>
      <button className="right-arrow" onClick={handleRightArrowClick}>
        <ChevronRightIcon fontSize="large" />
      </button>
    </div>
  );
}

export default MonthChange;
