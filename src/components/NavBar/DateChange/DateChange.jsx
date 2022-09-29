import React from "react";
import moment from "moment/moment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./DateChange.scss";

function DateChange(props) {
  const handleLeftArrowClick = () => {
    props.setViewDate(moment(props.viewDate).subtract(1, "months"));
  };

  const handleRightArrowClick = () => {
    props.setViewDate(moment(props.viewDate).add(1, "months"));
  };

  const date =
    props.viewType === "month"
      ? props.viewDate.format("MM-YYYY")
      : props.viewDate.format("YYYY");

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

export default DateChange;
