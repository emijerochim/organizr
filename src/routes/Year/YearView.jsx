import React, { useState, useEffect } from "react";
import Month from "../Month/Month";
import NavBar from "./NavBar";
import getCalendarMonths from "../../util/getCalendarMonths";
import filterTransactions from "../../util/filterTransactions";
import "./YearView.scss";

function YearView({ viewDate, setViewType, transactions, setTransactions }) {
  const yearTransactions = filterTransactions(transactions, "year");
  let [months, setMonths] = useState([]);

  useEffect(() => {
    setMonths(getCalendarMonths(viewDate));
  }, [viewDate]);

  return (
    <main>
      <NavBar />
      <div className="calendar-container">
        <div className="calendar">
          {months.map((month) => {
            return (
              <Month
                transactions={yearTransactions}
                setTransactions={setTransactions}
                setViewType={setViewType}
                date={month}
                key={month}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default YearView;
