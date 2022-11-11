import React, { useState, useEffect } from "react";
import Month from "../Month/Month";
import NavBar from "./NavBar";
import getCalendarMonths from "../../util/getCalendarMonths";
import "./YearView.scss";

function YearView({ user, setUser, viewDate, setViewType }) {
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
                user={user}
                setUser={setUser}
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
