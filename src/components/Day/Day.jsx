import Transaction from "../Transaction/Transaction";
import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import "./Day.scss";

const Day = (props) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="calendar-day">
      <div className="day-header">
        <p className="day-date">{props.date}</p>
        <p className="day-balance">450</p>
      </div>
    </div>
  );
};

export default Day;
