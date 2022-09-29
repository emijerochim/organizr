import Transaction from "../Transaction/Transaction";
import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import "./Day.scss";

const Day = (props) => {
  const [transactions, setTransactions] = useState([]);

  return <div className="calendar-day">{props.date}</div>;
};

export default Day;
