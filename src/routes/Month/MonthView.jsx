import React, { useState, useEffect } from "react";
import Day from "../../components/Day/Day";
import NavBar from "./NavBar";
import getCalendarDays from "../../util/getCalendarDays";
import "./MonthView.scss";

function MonthView({ user, setUser, viewDate, setViewDate }) {
  let [days, setDays] = useState([]);

  useEffect(() => {
    setDays(getCalendarDays(viewDate));
  }, [viewDate]);

  return (
    <main>
      <NavBar
        user={user}
        setUser={setUser}
        viewDate={viewDate}
        setViewDate={setViewDate}
      />
      <div className="calendar-container">
        <div className="weekday-list">
          <div className="weekday-item">
            <p>SUNDAY</p>
          </div>
          <div className="weekday-item">
            <p>MONDAY</p>
          </div>
          <div className="weekday-item">
            <p>TUESDAY</p>
          </div>
          <div className="weekday-item">
            <p>WEDNESDAY</p>
          </div>
          <div className="weekday-item">
            <p>THURSDAY</p>
          </div>
          <div className="weekday-item">
            <p>FRIDAY</p>
          </div>
          <div className="weekday-item">
            <p>SATURDAY</p>
          </div>
        </div>
        <div className="calendar">
          {days.map((day) => {
            return <Day date={day} user={user} setUser={setUser} key={day} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default MonthView;
